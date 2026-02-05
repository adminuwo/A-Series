import React, { useState } from 'react';
import { X, Sparkles, AlertCircle, Settings } from 'lucide-react';
import { useToast } from '../Toast/ToastContext';
import { useLanguage } from '../../context/LanguageContext';

const CreateAppModal = ({ isOpen, onClose, onSubmit }) => {
    const toast = useToast();
    const { t } = useLanguage();
    const initialFormData = {
        agentName: '',
        description: '',
        agentUrl: '',
        category: 'Business OS',
        pricing: 'Free'
    };

    const [formData, setFormData] = useState(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [showSubscriptionConfig, setShowSubscriptionConfig] = useState(false);
    const [isPricingSaved, setIsPricingSaved] = useState(false);
    const [activeEditingPlan, setActiveEditingPlan] = useState('Basic');
    const [activeDropdown, setActiveDropdown] = useState(null); // 'category' | 'pricing' | null
    const [subscriptionConfig, setSubscriptionConfig] = useState({
        plans: ['Basic'], // Default selected
        currency: 'USD',
        prices: {
            Basic: { monthly: 0, yearly: 0 },
            Pro: { monthly: 0, yearly: 0 }
        },
        billingCycle: 'monthly'
    });

    if (!isOpen) return null;

    const resetForm = () => {
        setFormData(initialFormData);
        setShowSubscriptionConfig(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.agentName.trim() || !formData.description.trim()) {
            toast.error("Please fill the required fields");
            return;
        }

        setIsSubmitting(true);
        try {
            // Merge subscription config if pricing is Subscription
            const finalData = {
                ...formData,
                pricingConfig: formData.pricing === 'Subscription' ? subscriptionConfig : null
            };
            await onSubmit(finalData);
            resetForm();
            onClose();
        } catch (error) {
            console.error("Failed to create app:", error);
            toast.error("Failed to create agent");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePlanToggle = (plan) => {
        setSubscriptionConfig(prev => {
            let newPlans = prev.plans.includes(plan)
                ? prev.plans.filter(p => p !== plan)
                : [...prev.plans, plan];

            // Logic to switch active editing plan if current one is removed
            // or if a new paid plan is added and we were on Free/None
            if (plan !== 'Free' && !prev.plans.includes(plan)) {
                // Just added a paid plan, make it active
                setActiveEditingPlan(plan);
            } else if (plan !== 'Free' && prev.plans.includes(plan) && activeEditingPlan === plan) {
                // Removing currently active plan, switch to another paid plan if exists
                const otherPaid = newPlans.find(p => p !== 'Free');
                if (otherPaid) setActiveEditingPlan(otherPaid);
            }

            return { ...prev, plans: newPlans };
        });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, avatar: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePriceChange = (value) => {
        if (activeEditingPlan === 'Free') return; // Double check safety

        setSubscriptionConfig(prev => ({
            ...prev,
            prices: {
                ...prev.prices,
                [activeEditingPlan]: {
                    ...prev.prices[activeEditingPlan],
                    [prev.billingCycle]: parseFloat(value) || 0
                }
            }
        }));
    };

    // Sub-modal for Subscription Configuration
    if (showSubscriptionConfig) {
        return (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 md:p-4 bg-black/60 backdrop-blur-sm">
                <div className="bg-card w-full max-w-[420px] rounded-2xl md:rounded-[32px] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 border border-border flex flex-col max-h-[90vh]">
                    <div className="px-5 md:px-6 py-4 md:py-5 border-b border-border flex justify-between items-center bg-surface/50 shrink-0">
                        <div>
                            <h3 className="text-sm md:text-base font-bold text-maintext flex items-center gap-2">
                                <Settings className="w-4 h-4 text-primary" />
                                {t('admin.agents.createModal.configureSubscription')}
                            </h3>
                            <p className="text-[10px] text-subtext mt-0.5">{t('admin.agents.createModal.setupPricing')}</p>
                        </div>
                        <button
                            onClick={() => setShowSubscriptionConfig(false)}
                            className="p-1.5 hover:bg-secondary rounded-full transition-colors text-subtext hover:text-red-500"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="p-5 md:p-6 space-y-4 md:space-y-5 overflow-y-auto">
                        {/* Plan Selection */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-extrabold text-subtext uppercase tracking-wider ml-1">{t('admin.agents.createModal.selectPlans')}</label>
                            <div className="flex bg-secondary/50 p-1.5 rounded-3xl border border-border/50">
                                {['Free', 'Basic', 'Pro'].map(plan => (
                                    <button
                                        key={plan}
                                        onClick={() => handlePlanToggle(plan)}
                                        className={`flex-1 py-2 text-xs font-bold rounded-2xl transition-all ${subscriptionConfig.plans.includes(plan) ? 'bg-white dark:bg-card text-primary shadow-sm border border-border/50' : 'text-subtext hover:text-maintext'}`}
                                    >
                                        {plan} {subscriptionConfig.plans.includes(plan) && '✓'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Currency */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-extrabold text-subtext uppercase tracking-wider ml-1">{t('admin.agents.createModal.currency')}</label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setActiveDropdown(activeDropdown === 'currency' ? null : 'currency')}
                                    className="w-full bg-card border border-border rounded-3xl px-4 py-3 text-xs font-medium text-maintext outline-none focus:border-primary flex items-center justify-between shadow-sm group hover:border-primary/50 transition-colors"
                                >
                                    <span>{subscriptionConfig.currency === 'USD' ? 'United States (USD)' : subscriptionConfig.currency === 'INR' ? 'India (INR)' : 'Europe (EUR)'}</span>
                                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`text-subtext transition-transform duration-200 ${activeDropdown === 'currency' ? 'rotate-180 text-primary' : 'group-hover:text-primary'}`}><path d="M1 1L5 5L9 1" /></svg>
                                </button>

                                {activeDropdown === 'currency' && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setActiveDropdown(null)} />
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-[20px] shadow-xl z-20 overflow-hidden py-1.5 animate-in fade-in zoom-in-95 duration-200">
                                            {[
                                                { label: 'United States (USD)', value: 'USD' },
                                                { label: 'India (INR)', value: 'INR' },
                                                { label: 'Europe (EUR)', value: 'EUR' }
                                            ].map(opt => (
                                                <button
                                                    key={opt.value}
                                                    type="button"
                                                    onClick={() => {
                                                        setSubscriptionConfig(prev => ({ ...prev, currency: opt.value }));
                                                        setActiveDropdown(null);
                                                    }}
                                                    className={`w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-primary/5 hover:text-primary transition-colors flex items-center justify-between ${subscriptionConfig.currency === opt.value ? 'text-primary bg-primary/5 font-bold' : 'text-maintext'}`}
                                                >
                                                    {opt.label}
                                                    {subscriptionConfig.currency === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Price Input Section */}
                        {subscriptionConfig.plans.filter(p => p !== 'Free').length > 0 ? (
                            <div className="bg-secondary/30 rounded-[24px] p-4 border border-border/50 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex bg-card rounded-2xl p-1 border border-border/50">
                                        {subscriptionConfig.plans.filter(p => p !== 'Free').map(plan => (
                                            <button
                                                key={plan}
                                                onClick={() => setActiveEditingPlan(plan)}
                                                className={`px-3 py-1.5 text-[10px] font-bold rounded-xl transition-all ${activeEditingPlan === plan ? 'bg-primary text-white shadow-sm' : 'text-subtext hover:text-maintext'}`}
                                            >
                                                {plan}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex bg-card rounded-2xl p-1 border border-border/50">
                                        {['monthly', 'yearly'].map(cycle => (
                                            <button
                                                key={cycle}
                                                onClick={() => setSubscriptionConfig(prev => ({ ...prev, billingCycle: cycle }))}
                                                className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded-xl transition-all ${subscriptionConfig.billingCycle === cycle ? 'bg-primary text-white' : 'text-subtext hover:text-maintext'}`}
                                            >
                                                {cycle}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="relative">
                                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-lg font-bold text-subtext">$</span>
                                        <input
                                            type="number"
                                            placeholder="0.00"
                                            value={subscriptionConfig.prices[activeEditingPlan]?.[subscriptionConfig.billingCycle] || ''}
                                            className="w-full bg-card border border-border rounded-3xl pl-10 pr-4 py-3.5 text-xl font-bold text-maintext outline-none focus:border-primary transition-colors text-center shadow-sm"
                                            onChange={(e) => handlePriceChange(e.target.value)}
                                        />
                                    </div>

                                    <div className="grid grid-cols-4 gap-2">
                                        {[9, 19, 49, 99].map(price => (
                                            <button
                                                key={price}
                                                onClick={() => handlePriceChange(price)}
                                                className="py-1.5 border border-border rounded-xl text-[10px] font-bold text-subtext hover:border-primary hover:text-primary hover:bg-primary/5 transition-all bg-card"
                                            >
                                                ${price}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="py-6 text-center bg-secondary/30 rounded-[24px] border border-dashed border-border flex flex-col items-center justify-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-blue-500" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-maintext">{t('admin.agents.createModal.freePlanSelected')}</p>
                                    <p className="text-[10px] text-subtext">{t('admin.agents.createModal.freePlanDesc')}</p>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-3 pt-2">
                            <button onClick={() => setShowSubscriptionConfig(false)} className="flex-1 py-2.5 text-xs font-bold text-subtext hover:bg-secondary rounded-2xl transition-colors">{t('admin.agents.createModal.cancel')}</button>
                            <button
                                onClick={() => {
                                    setIsPricingSaved(true);
                                    setTimeout(() => {
                                        setShowSubscriptionConfig(false);
                                        setIsPricingSaved(false);
                                    }, 800);
                                }}
                                className={`flex-1 py-2.5 rounded-2xl text-xs font-bold shadow-lg transition-all ${isPricingSaved ? 'bg-green-500 text-white shadow-green-500/20 scale-105' : 'bg-primary text-white hover:shadow-primary/20 hover:scale-[1.02]'}`}
                            >
                                {isPricingSaved ? t('admin.agents.createModal.saved') : t('admin.agents.createModal.confirm')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-card w-full max-w-lg rounded-2xl md:rounded-[24px] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200 border border-border flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="px-4 md:px-5 py-3 md:py-4 border-b border-border flex items-center justify-between bg-surface/50 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 shrink-0">
                            <Sparkles className="w-4 h-4 text-primary" />
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-sm md:text-base font-bold text-maintext truncate">{t('admin.agents.createModal.title')}</h2>
                            <p className="text-[9px] md:text-[10px] text-subtext truncate">{t('admin.agents.createModal.subtitle')}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 hover:bg-secondary rounded-lg transition-colors text-subtext hover:text-red-500"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-4 md:px-5 py-4 md:py-5 space-y-4 overflow-y-auto flex-1">

                    {/* Basic Info Section */}
                    <div className="bg-secondary/30 rounded-2xl p-4 border border-border/50 space-y-3">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-1 h-3 bg-primary rounded-full"></span>
                            <span className="text-[10px] font-extrabold text-subtext uppercase tracking-wider">{t('admin.agents.createModal.basicDetails')}</span>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <input
                                    type="text"
                                    name="agentName"
                                    required
                                    placeholder={t('admin.agents.createModal.namePlaceholder')}
                                    autoComplete="off"
                                    value={formData.agentName}
                                    onChange={handleChange}
                                    className="w-full bg-card border border-border rounded-3xl px-4 py-3 text-sm font-semibold focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-subtext/40 text-maintext shadow-sm"
                                />
                            </div>
                            <div>
                                <textarea
                                    name="description"
                                    required
                                    rows={2}
                                    placeholder={t('admin.agents.createModal.descPlaceholder')}
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full bg-card border border-border rounded-3xl px-4 py-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all resize-none text-maintext placeholder:text-subtext/40 shadow-sm min-h-[60px]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Configuration Section */}
                    {/* Configuration Section */}
                    <div className="bg-secondary/30 rounded-[28px] p-5 border border-border/50 space-y-4">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="w-1 h-3 bg-primary rounded-full"></span>
                            <span className="text-[10px] font-extrabold text-subtext uppercase tracking-wider">{t('admin.agents.createModal.configuration')}</span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="flex-1 space-y-1">
                                <label className="text-[10px] font-bold text-subtext ml-2">{t('admin.agents.createModal.liveUrl')}</label>
                                <input
                                    type="text"
                                    name="agentUrl"
                                    placeholder="https://"
                                    value={formData.agentUrl}
                                    onChange={handleChange}
                                    className="w-full bg-card border border-border rounded-xl md:rounded-3xl px-4 py-2.5 md:py-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-subtext/40 text-maintext shadow-sm"
                                />
                            </div>

                            <div className="w-full sm:w-20 flex flex-col space-y-1">
                                <label className="text-[10px] font-bold text-subtext sm:text-center block ml-2 sm:ml-0">{t('admin.agents.createModal.icon')}</label>
                                <label className="w-full h-12 sm:h-[46px] bg-card border border-dashed border-border rounded-xl md:rounded-2xl flex items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group shadow-sm mt-0.5">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                    />
                                    {formData.avatar ? (
                                        <img src={formData.avatar} alt="Icon" className="w-full h-full object-cover rounded-xl md:rounded-2xl" />
                                    ) : (
                                        <div className="flex items-center gap-2 sm:gap-0 sm:flex-col text-subtext group-hover:text-primary transition-colors">
                                            <span className="text-[20px] leading-none">+</span>
                                            <span className="text-[10px] sm:hidden font-bold">{t('admin.agents.createModal.browse')}</span>
                                        </div>
                                    )}
                                </label>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-subtext ml-2">{t('admin.agents.createModal.category')}</label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setActiveDropdown(activeDropdown === 'category' ? null : 'category')}
                                        className="w-full bg-card border border-border rounded-3xl px-4 py-3 text-xs font-medium text-maintext outline-none focus:border-primary flex items-center justify-between shadow-sm group hover:border-primary/50 transition-colors"
                                    >
                                        <span>{t(`admin.agents.createModal.categories.${formData.category}`) || formData.category}</span>
                                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`text-subtext transition-transform duration-200 ${activeDropdown === 'category' ? 'rotate-180 text-primary' : 'group-hover:text-primary'}`}><path d="M1 1L5 5L9 1" /></svg>
                                    </button>

                                    {activeDropdown === 'category' && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setActiveDropdown(null)} />
                                            <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-[20px] shadow-xl z-20 overflow-hidden py-1.5 animate-in fade-in zoom-in-95 duration-200">
                                                {[
                                                    'Business OS',
                                                    'Data & Intelligence',
                                                    'Sales & Marketing',
                                                    'HR & Finance',
                                                    'Design & Creative',
                                                    'Medical & Health AI',
                                                    'general'
                                                ].map(opt => (
                                                    <button
                                                        key={opt}
                                                        type="button"
                                                        onClick={() => {
                                                            setFormData(p => ({ ...p, category: opt }));
                                                            setActiveDropdown(null);
                                                        }}
                                                        className={`w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-primary/5 hover:text-primary transition-colors flex items-center justify-between ${formData.category === opt ? 'text-primary bg-primary/5 font-bold' : 'text-maintext'}`}
                                                    >
                                                        {t(`admin.agents.createModal.categories.${opt}`) || opt}
                                                        {formData.category === opt && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                                                    </button>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-subtext ml-2">{t('admin.agents.createModal.pricing')}</label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <button
                                            type="button"
                                            onClick={() => setActiveDropdown(activeDropdown === 'pricing' ? null : 'pricing')}
                                            className="w-full bg-card border border-border rounded-3xl px-4 py-3 text-xs font-medium text-maintext outline-none focus:border-primary flex items-center justify-between shadow-sm group hover:border-primary/50 transition-colors"
                                        >
                                            <span>{t(`admin.agents.createModal.pricingOptions.${formData.pricing}`) || formData.pricing}</span>
                                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`text-subtext transition-transform duration-200 ${activeDropdown === 'pricing' ? 'rotate-180 text-primary' : 'group-hover:text-primary'}`}><path d="M1 1L5 5L9 1" /></svg>
                                        </button>

                                        {activeDropdown === 'pricing' && (
                                            <>
                                                <div className="fixed inset-0 z-10" onClick={() => setActiveDropdown(null)} />
                                                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-[20px] shadow-xl z-20 overflow-hidden py-1.5 animate-in fade-in zoom-in-95 duration-200">
                                                    {['Free', 'Subscription'].map(opt => (
                                                        <button
                                                            key={opt}
                                                            type="button"
                                                            onClick={() => {
                                                                setFormData(p => ({ ...p, pricing: opt }));
                                                                setActiveDropdown(null);
                                                            }}
                                                            className={`w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-primary/5 hover:text-primary transition-colors flex items-center justify-between ${formData.pricing === opt ? 'text-primary bg-primary/5 font-bold' : 'text-maintext'}`}
                                                        >
                                                            {t(`admin.agents.createModal.pricingOptions.${opt}`) || opt}
                                                            {formData.pricing === opt && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                                                        </button>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    {formData.pricing === 'Subscription' && (
                                        <button
                                            type="button"
                                            onClick={() => setShowSubscriptionConfig(true)}
                                            className="px-3 py-3 bg-primary/10 text-primary rounded-full text-[10px] font-bold hover:bg-primary/20 transition-colors border border-primary/20 aspect-square flex items-center justify-center"
                                            title="Configure"
                                        >
                                            <Settings className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notice */}
                    <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-3 flex gap-3 items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                            <AlertCircle className="w-4 h-4 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-[11px] font-bold text-maintext">{t('admin.agents.createModal.draftMode')}</p>
                            <p className="text-[10px] text-subtext">
                                {t('admin.agents.createModal.draftModeDesc')}
                            </p>
                        </div>
                    </div>

                </form>

                {/* Footer */}
                <div className="px-4 md:px-5 py-3 md:py-4 border-t border-border flex items-center justify-end gap-3 bg-secondary/20 shrink-0">
                    <button
                        onClick={onClose}
                        className="text-xs font-bold text-subtext hover:text-maintext transition-colors px-3 py-2"
                    >
                        {t('admin.agents.createModal.cancel')}
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="bg-primary text-white px-5 md:px-6 py-2 md:py-2.5 rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
                    >
                        {isSubmitting ? <span className="animate-pulse">{t('admin.agents.createModal.creating')}</span> : t('admin.agents.createModal.createAgent')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateAppModal;
