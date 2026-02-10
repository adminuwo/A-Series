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
    // Create a shallow copy to avoid mutating read-only objects
    const updatedUser = { ...user };

    // Always attempt to set a better avatar if one isn't explicitly set, is the default, or is a relative path
    if (!updatedUser.avatar || updatedUser.avatar.includes('gravatar.com') || updatedUser.avatar === '/User.jpeg' || updatedUser.avatar.startsWith('/')) {
      updatedUser.avatar = getAvatarUrl(updatedUser);
    }
    return updatedUser;
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
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('last_chat_path');
  localStorage.removeItem('user_settings');
  // Preferences like user-language, user-region, and app_theme are preserved
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
  default: { subscripPgTgl: false, notify: false, sidebarOpen: false }
})

export const userData = atom({
  key: 'userData',
  default: { user: getUser() }
})

export const notificationsState = atom({
  key: 'notificationsState',
  default: []
})

export const sessionsData = atom({
  key: 'sessionsData',
  default: []
})
