import { atom } from "recoil"

const getAvatarUrl = (user) => {
  if (!user || !user.email) return "";
  const encodedName = encodeURIComponent(user.name || "User");
  const fallbackUrl = `https://ui-avatars.com/api/?name=${encodedName}&background=random&color=fff`;

  // If it's a Gmail address, specifically ask for the Google avatar
  if (user.email.toLowerCase().includes('@gmail.com')) {
    return `https://unavatar.io/google/${user.email}?fallback=${encodeURIComponent(fallbackUrl)}`;
  }

  // Default to generic for others
  return `https://unavatar.io/${user.email}?fallback=${encodeURIComponent(fallbackUrl)}`;
};

const processUser = (user) => {
  if (user) {
    // Only set fallback avatar if NO avatar exists OR it's explicitly a default gravatar
    // Do NOT override uploaded avatars (those from backend that are actual URLs)
    if (!user.avatar || user.avatar.includes('gravatar.com/avatar/default')) {
      user.avatar = getAvatarUrl(user);
    }
    // For uploaded avatars, add cache-busting if not already present
    else if (user.avatar && !user.avatar.includes('?t=') && !user.avatar.includes('unavatar.io')) {
      // Add timestamp query param to prevent caching
      const separator = user.avatar.includes('?') ? '&' : '?';
      user.avatar = `${user.avatar}${separator}t=${Date.now()}`;
    }
  }
  return user;
};

export const setUserData = (data) => {
  const processedData = processUser(data);
  localStorage.setItem("user", JSON.stringify(processedData))
}
export const getUserData = () => {
  const data = JSON.parse(localStorage.getItem('user'))
  return processUser(data);
}

// New helper to update avatar globally
export const updateUserAvatar = (avatarUrl) => {
  const user = getUserData();
  if (user) {
    // Add cache-busting timestamp
    const separator = avatarUrl.includes('?') ? '&' : '?';
    user.avatar = `${avatarUrl}${separator}t=${Date.now()}`;
    setUserData(user);
    return user;
  }
  return null;
};

// Reset function for Recoil state (to be called from components with useSetRecoilState)
export const resetUserDataState = () => ({
  user: null
});

export const clearUser = () => {
  localStorage.clear();
  // Note: Recoil state will be reset by components calling setUserData with resetUserDataState()
}
const getUser = () => {
  try {
    const item = localStorage.getItem('user');
    if (!item || item === "undefined" || item === "null") return null;
    const user = JSON.parse(item);
    if (user) {
      return processUser(user)
    }
  } catch (e) {
    console.error("Error parsing user from localStorage", e);
    localStorage.removeItem('user'); // Clear corrupted data
  }
  return null
}
export const toggleState = atom({
  key: "toggle",
  default: { subscripPgTgl: false, notify: false }
})

export const userData = atom({
  key: 'userData',
  default: { user: getUser() }
})

export const notificationsState = atom({
  key: 'notificationsState',
  default: []
})