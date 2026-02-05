import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, ChevronDown } from 'lucide-react';
import { clearUser, userData } from '../../userStore/userData';
import { AppRoute } from '../../types';
import { useRecoilValue } from 'recoil';
import { useLanguage } from '../../context/LanguageContext';

const UserDropdown = ({ isMobile = false }) => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const { user } = useRecoilValue(userData);
    const { t } = useLanguage();

    useEffect(() => {
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
        window.location.href = AppRoute.LANDING;
    };

    const handleProfileClick = () => {
        setIsDropdownOpen(false);
        navigate(AppRoute.PROFILE);
    };

    if (!user || !user.email) return null;

    const getDisplayName = () => {
        if (!user.name) return "U";
        if (user.name === 'Admin') return t('adminName');
        return user.name;
    };

    const displayName = getDisplayName();

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-surface transition-all group ${isMobile ? 'pr-1' : ''}`}
            >
                {/* Avatar */}
                <div className={`rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold uppercase shrink-0 overflow-hidden border border-primary/20 group-hover:bg-primary/30 transition-colors ${isMobile ? 'w-8 h-8 text-xs' : 'w-9 h-9 text-sm border-2 border-primary/30'}`}>
                    {user.avatar ? (
                        <img
                            src={user.avatar}
                            alt={displayName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                const parent = e.target.parentElement;
                                if (parent) {
                                    parent.classList.add("flex", "items-center", "justify-center");
                                    parent.innerText = displayName.charAt(0).toUpperCase();
                                }
                            }}
                        />
                    ) : (
                        displayName.charAt(0).toUpperCase()
                    )}
                </div>

                {/* User Name & Chevron */}
                <div className="flex items-center gap-1.5">
                    <span className={`font-bold text-maintext group-hover:text-primary transition-colors truncate ${isMobile ? 'text-xs max-w-[80px]' : 'text-sm'}`}>
                        {t('hi')}, {user.name === 'Admin' ? displayName : (displayName.split(' ')[0] || 'User')}
                    </span>
                    <ChevronDown className={`text-subtext group-hover:text-primary transition-all ${isMobile ? 'w-3 h-3' : 'w-4 h-4'} ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
            </button>

            <AnimatePresence>
                {isDropdownOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className={`absolute top-full right-0 mt-2 w-56 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-[100]`}
                    >
                        <div className="px-4 py-3 bg-secondary/30 border-b border-border">
                            <p className="text-sm font-bold text-maintext truncate">{displayName}</p>
                            <p className="text-xs text-subtext truncate">{user.email}</p>
                        </div>

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

export default UserDropdown;
