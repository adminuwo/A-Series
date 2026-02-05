import React, { useEffect, useState } from 'react';
import { Megaphone, X } from 'lucide-react';
import apiService from '../../services/apiService';
import { useLocation } from 'react-router';

const AnnouncementBanner = () => {
    const [announcement, setAnnouncement] = useState('');
    const [isVisible, setIsVisible] = useState(true);
    const location = useLocation();

    // Hide on login/signup pages if desired, or keep global
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                // We'll add this method to apiService
                const settings = await apiService.getPublicSettings();
                if (settings?.announcement) {
                    setAnnouncement(settings.announcement);
                }
            } catch (err) {
                console.error("Failed to fetch announcement", err);
            }
        };

        fetchSettings();
    }, []);

    if (!announcement || !isVisible || isAuthPage) return null;

    return (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 relative shadow-md animate-in slide-in-from-top-full duration-300 z-[999]">
            <div className="container mx-auto flex items-center justify-center gap-3">
                <Megaphone className="w-5 h-5 animate-bounce-subtle" />
                <p className="text-sm font-bold text-center tracking-wide">{announcement}</p>
            </div>
            <button
                onClick={() => setIsVisible(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Close announcement"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};

export default AnnouncementBanner;
