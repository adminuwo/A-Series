import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const PolicyModal = ({ isOpen, onClose, type, contactInfo = { email: 'admin@uwo24.com' } }) => {
    const { t } = useLanguage();
    if (!isOpen) return null;

    const content = {
        privacy: {
            title: t('policies.privacy.title'),
            sections: [
                {
                    h: t('policies.privacy.compliance.heading'),
                    p: t('policies.privacy.compliance.content')
                },
                {
                    h: t('policies.privacy.zeroTraining.heading'),
                    p: t('policies.privacy.zeroTraining.content')
                },
                {
                    h: t('policies.privacy.rightToForgotten.heading'),
                    p: t('policies.privacy.rightToForgotten.content')
                },
                {
                    h: t('policies.privacy.grievance.heading'),
                    p: `${t('policies.privacy.grievance.content')} ${contactInfo.email}`
                }
            ]
        },
        terms: {
            title: t('policies.terms.title'),
            sections: [
                {
                    h: t('policies.terms.intellectualProperty.heading'),
                    p: t('policies.terms.intellectualProperty.content')
                },
                {
                    h: t('policies.terms.acceptableUse.heading'),
                    p: t('policies.terms.acceptableUse.content')
                },
                {
                    h: t('policies.terms.aiSafety.heading'),
                    p: t('policies.terms.aiSafety.content')
                },
                {
                    h: t('policies.terms.highRisk.heading'),
                    p: t('policies.terms.highRisk.content')
                }
            ]
        },
        cookie: {
            title: t('policies.cookie.title'),
            sections: [
                {
                    h: t('policies.cookie.howWeUse.heading'),
                    p: t('policies.cookie.howWeUse.content')
                },
                {
                    h: t('policies.cookie.types.heading'),
                    p: t('policies.cookie.types.content')
                },
                {
                    h: t('policies.cookie.thirdParty.heading'),
                    p: t('policies.cookie.thirdParty.content')
                }
            ]
        }
    };

    const active = content[type] || content.privacy;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-secondary border border-border rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl"
            >
                <div className="p-6 border-b border-border flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-maintext">{active.title}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-surface rounded-xl text-subtext transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-8 overflow-y-auto space-y-8 custom-scrollbar">
                    {active.sections.map((s, i) => (
                        <div key={i} className="space-y-3">
                            <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                {s.h}
                            </h3>
                            <p className="text-subtext leading-relaxed">{s.p}</p>
                        </div>
                    ))}
                </div>
                <div className="p-6 border-t border-border bg-secondary/50 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
                    >
                        {t('policies.gotIt')}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default PolicyModal;
