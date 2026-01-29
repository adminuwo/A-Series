import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, ChevronDown } from 'lucide-react';
import { getUserData, clearUser, userData, resetUserDataState } from '../../userStore/userData';
import { AppRoute } from '../../types';
import { useRecoilValue } from 'recoil';
import { useLanguage } from '../../context/LanguageContext';

const Navbar = () => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Use Recoil state for real-time updates
    const { user } = useRecoilValue(userData);
    const { t } = useLanguage();

    useEffect(() => {
        // Close dropdown when clicking outside
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const handleLogout = () => {
        clearUser();
        setIsDropdownOpen(false);
        // Force a full app reload to reset all Recoil state
        window.location.href = AppRoute.LANDING;
    };

    const handleProfileClick = () => {
        setIsDropdownOpen(false);
        navigate(AppRoute.PROFILE);
    };

    // If no user logged in, don't show navbar (Login is in sidebar)
    if (!user || !user.email) {
        return null;
    }

    // Logged in state - show user dropdown
    return (
        <div className="hidden lg:flex items-center gap-4 px-6 py-3 relative" ref={dropdownRef}>
            {/* User Dropdown Trigger */}
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-surface transition-all group"
            >
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm uppercase shrink-0 overflow-hidden border-2 border-primary/30 group-hover:border-primary/50 transition-colors">
                    {user.avatar ? (
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                const parent = e.target.parentElement;
                                if (parent) {
                                    parent.classList.add("flex", "items-center", "justify-center");
                                    parent.innerText = user.name ? user.name.charAt(0).toUpperCase() : "U";
                                }
                            }}
                        />
                    ) : (
                        user.name ? user.name.charAt(0).toUpperCase() : "U"
                    )}
                </div>

                {/* User Name */}
                <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-maintext group-hover:text-primary transition-colors">
                        {t('hi')}, {user.name?.split(' ')[0] || 'User'}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-subtext group-hover:text-primary transition-all ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isDropdownOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-full right-6 mt-2 w-56 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-50"
                    >
                        {/* User Info Header */}
                        <div className="px-4 py-3 bg-secondary/30 border-b border-border">
                            <p className="text-sm font-bold text-maintext truncate">{user.name}</p>
                            <p className="text-xs text-subtext truncate">{user.email}</p>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                            <button
                                onClick={handleProfileClick}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-surface transition-colors group"
                            >
                                <User className="w-4 h-4 text-subtext group-hover:text-primary transition-colors" />
                                <span className="text-sm font-medium text-maintext group-hover:text-primary transition-colors">
                                    {t('profile')}
                                </span>
                            </button>

                            <div className="my-1 px-3">
                                <div className="h-px bg-border"></div>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-red-500/5 transition-colors group"
                            >
                                <LogOut className="w-4 h-4 text-subtext group-hover:text-red-600 transition-colors" />
                                <span className="text-sm font-medium text-maintext group-hover:text-red-600 transition-colors">
                                    {t('logout')}
                                </span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Navbar;
