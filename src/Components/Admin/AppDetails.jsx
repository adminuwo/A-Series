import React, { useState, useRef } from 'react';
import { Shield, Check, Info, ArrowLeft, Trash2, Globe, Loader2, Users, CreditCard, Eye, LayoutGrid, Camera } from 'lucide-react';
import apiService from '../../services/apiService';

import { getUserData } from '../../userStore/userData';

const AppDetails = ({ app, onBack, onDelete, onUpdate, isAdmin: propsIsAdmin }) => {
    const [fullApp, setFullApp] = useState(app);
    const [status, setStatus] = useState(app ? (app.status || 'Inactive') : 'Inactive');
    const [reviewStatus, setReviewStatus] = useState(app ? (app.reviewStatus || 'Draft') : 'Draft');
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // URL Editing State
    const [isEditingUrl, setIsEditingUrl] = useState(false);
    const [editedUrl, setEditedUrl] = useState(app ? (app.url || '') : '');
    const [urlUpdateLoading, setUrlUpdateLoading] = useState(false);

    // Description Editing State
    const [isEditingDesc, setIsEditingDesc] = useState(false);
    const [editedDesc, setEditedDesc] = useState(app ? (app.description || '') : '');
    const [descUpdateLoading, setDescUpdateLoading] = useState(false);

    const [avatarLoading, setAvatarLoading] = useState(false);
    const fileInputRef = useRef(null);

    const userData = getUserData();
    const isAdmin = propsIsAdmin !== undefined ? propsIsAdmin : (userData?.role === 'admin');

    const handleAvatarEdit = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                try {
                    setAvatarLoading(true);
                    const base64Avatar = reader.result;
                    await apiService.updateAgent(app._id || app.id, { avatar: base64Avatar });
                    setFullApp(prev => ({ ...prev, avatar: base64Avatar }));
                    if (onUpdate) onUpdate();
                } catch (error) {
                    console.error("Failed to update avatar:", error);
                } finally {
                    setAvatarLoading(false);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    React.useEffect(() => {
        const fetchFullDetails = async () => {
            if (app && (app._id || app.id)) {
                try {
                    const data = await apiService.getAgentById(app._id || app.id);
                    setFullApp(data);
                    setStatus(data.status || 'Inactive');
                    setReviewStatus(data.reviewStatus || 'Draft');
                    setEditedUrl(data.url || '');
                    setEditedDesc(data.description || '');
                } catch (err) {
                    console.error("Failed to fetch full agent details:", err);
                }
            }
        };
        fetchFullDetails();
    }, [app]);

    if (!app) return null;

    const handleGoLive = async () => {
        try {
            setIsUpdating(true);
            await apiService.updateAgent(app._id || app.id, { status: 'Live' });
            setStatus('Live');
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error("Failed to go live:", error);
            alert("Failed to update status.");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleUpdateUrl = async () => {
        try {
            setUrlUpdateLoading(true);
            await apiService.updateAgent(app._id || app.id, { url: editedUrl });
            app.url = editedUrl; // Optimistic update
            setIsEditingUrl(false);
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error("Failed to update URL:", error);
            alert("Failed to update URL.");
        } finally {
            setUrlUpdateLoading(false);
        }
    };

    const handleUpdateDesc = async () => {
        try {
            setDescUpdateLoading(true);
            await apiService.updateAgent(app._id || app.id, { description: editedDesc });
            app.description = editedDesc; // Optimistic update
            setIsEditingDesc(false);
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error("Failed to update Description:", error);
            alert("Failed to update Description.");
        } finally {
            setDescUpdateLoading(false);
        }
    };

    const handleSubmitForReview = async () => {
        try {
            setIsUpdating(true);
            const updated = await apiService.submitForReview(app._id || app.id);
            setReviewStatus('Pending Review');
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error("Failed to submit review:", error);
            alert("Failed to submit for review.");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this agent? This action cannot be undone.")) return;

        try {
            setIsDeleting(true);
            await apiService.deleteAgent(app.id);
            if (onDelete) onDelete();
        } catch (error) {
            console.error("Failed to delete app:", error);
            alert("Failed to delete app.");
        } finally {
            setIsDeleting(false);
        }
    };

    // Helper to format price display
    const formatPrice = () => {
        if (!app.pricing) return 'Free';
        // Handle string "Free" or "Paid"
        if (typeof app.pricing === 'string') return app.pricing;
        // Handle object { type: 'Subscription', ... }
        if (app.pricing.type) return app.pricing.type;
        return 'Free';
    };

    return (
        <div className="bg-secondary min-h-screen pb-12">
            {/* Header */}
            <div className="bg-card border border-border md:shadow-xl md:shadow-black/5 rounded-2xl md:rounded-[32px] mb-6 md:mb-8">
                <div className="max-w-[1200px] mx-auto py-5 md:py-6 px-4 md:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-5 md:gap-6">
                        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full md:w-auto">
                            <div className="relative group shrink-0">
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-[28px] overflow-hidden shadow-xl border-2 border-white bg-white flex items-center justify-center relative">
                                    {avatarLoading ? (
                                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center backdrop-blur-sm z-10">
                                            <Loader2 className="w-5 h-5 md:w-6 md:h-6 text-white animate-spin" />
                                        </div>
                                    ) : null}

                                    {fullApp?.avatar || app.avatar ? (
                                        <img src={fullApp?.avatar || app.avatar} alt="Icon" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    ) : (
                                        <Shield className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                                    )}

                                    {/* Edit Overlay */}
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center cursor-pointer"
                                    >
                                        <Camera className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                    </button>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleAvatarEdit}
                                />
                            </div>

                            <div className="text-center sm:text-left min-w-0 flex-1">
                                <h1 className="text-xl md:text-3xl font-extrabold text-maintext tracking-tight mb-1 truncate">
                                    {fullApp?.name || fullApp?.agentName || app.name || app.agentName}
                                </h1>
                                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                                    <span className={`px-2 py-0.5 rounded-full text-[9px] md:text-[10px] uppercase font-bold tracking-wider border ${reviewStatus === 'Approved' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' :
                                        reviewStatus === 'Pending Review' ? 'bg-blue-400/10 text-blue-500 border-blue-400/20' :
                                            reviewStatus === 'Rejected' ? 'bg-slate-500/10 text-slate-600 border-slate-500/20' :
                                                'bg-secondary text-subtext border-border'
                                        }`}>
                                        {reviewStatus}
                                    </span>
                                    {status === 'Live' && (
                                        <span className="px-2 py-0.5 rounded-full text-[9px] md:text-[10px] uppercase font-bold tracking-wider bg-blue-500/10 text-blue-600 border border-blue-500/20">
                                            Live
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 md:gap-3 w-full md:w-auto justify-center md:justify-end">
                            <button onClick={onBack} className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-subtext bg-secondary hover:bg-border/50 rounded-xl transition-colors">
                                Back
                            </button>

                            {/* Actions */}
                            {isAdmin && status !== 'Live' && (
                                <button
                                    onClick={handleGoLive}
                                    disabled={isUpdating}
                                    className="flex-1 sm:flex-none px-4 md:px-5 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
                                >
                                    {isUpdating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                                    Approve & Go Live
                                </button>
                            )}

                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="flex-1 sm:flex-none px-4 md:px-5 py-2 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                            >
                                {isDeleting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-4 md:py-8 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

                {/* Left Column: Details */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Rejection Notice */}
                    {reviewStatus === 'Rejected' && app.rejectionReason && (
                        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex gap-4">
                            <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-bold text-blue-800 text-sm">Submission Rejected</h4>
                                <p className="text-blue-600 text-sm mt-1">{app.rejectionReason}</p>
                            </div>
                        </div>
                    )}

                    {/* About */}
                    <section>
                        <h3 className="text-xs font-bold text-subtext uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Info className="w-4 h-4" /> About Agent
                        </h3>

                        {isEditingDesc ? (
                            <div className="bg-card border border-border rounded-2xl p-5 md:p-8 shadow-sm flex flex-col gap-4 min-h-[160px]">
                                <textarea
                                    value={editedDesc}
                                    onChange={(e) => setEditedDesc(e.target.value)}
                                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm font-medium text-maintext focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all min-h-[120px]"
                                    placeholder="Enter a description for your agent..."
                                />
                                <div className="flex items-center gap-2 justify-end">
                                    <button
                                        onClick={() => {
                                            setIsEditingDesc(false);
                                            setEditedDesc(app.description || '');
                                        }}
                                        className="px-4 py-2 text-xs font-bold text-subtext hover:bg-secondary rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleUpdateDesc}
                                        disabled={descUpdateLoading}
                                        className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
                                    >
                                        {descUpdateLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Save Description'}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-card border border-border rounded-2xl p-5 md:p-8 shadow-sm flex justify-between items-start gap-4 group min-h-[160px]">
                                <p className="text-maintext leading-relaxed whitespace-pre-wrap text-sm flex-1">
                                    {app.description || <span className="text-subtext italic">No description provided.</span>}
                                </p>
                                <button
                                    onClick={() => setIsEditingDesc(true)}
                                    className="text-xs font-bold text-primary hover:text-primary/80 bg-primary/10 px-3 py-1.5 rounded-lg transition-colors shrink-0"
                                >
                                    Edit
                                </button>
                            </div>
                        )}
                    </section>

                    {/* Configuration */}
                    <section>
                        <h3 className="text-xs font-bold text-subtext uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Globe className="w-4 h-4" /> Configuration
                        </h3>
                        <div className="bg-card border border-border rounded-2xl p-5 md:p-8 shadow-sm space-y-6 min-h-[160px]">
                            <div>
                                <label className="text-[10px] font-bold text-subtext uppercase mb-1.5 block">Live URL</label>

                                {isEditingUrl ? (
                                    <div className="flex flex-col gap-3">
                                        <input
                                            type="text"
                                            value={editedUrl}
                                            onChange={(e) => setEditedUrl(e.target.value)}
                                            className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm font-medium text-maintext focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                            placeholder="https://your-app-url.com"
                                        />
                                        <div className="flex items-center gap-2 justify-end">
                                            <button
                                                onClick={() => {
                                                    setIsEditingUrl(false);
                                                    setEditedUrl(app.url || '');
                                                }}
                                                className="px-4 py-2 text-xs font-bold text-subtext hover:bg-secondary rounded-lg transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleUpdateUrl}
                                                disabled={urlUpdateLoading}
                                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2"
                                            >
                                                {urlUpdateLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Save URL'}
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl border border-border group hover:border-primary/30 transition-colors">
                                        <span className={`text-sm font-medium truncate max-w-[80%] ${app.url ? 'text-blue-600 underline cursor-pointer' : 'text-subtext italic'}`} onClick={() => app.url && window.open(app.url, '_blank')}>
                                            {app.url || 'Not configured'}
                                        </span>
                                        <button
                                            onClick={() => setIsEditingUrl(true)}
                                            className="text-xs font-bold text-primary hover:text-primary/80 bg-primary/10 px-3 py-1.5 rounded-lg transition-colors"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                )}
                            </div>
                            {!app.url && !isEditingUrl && (
                                <div className="flex gap-2 text-blue-600 bg-blue-50 p-3 rounded-xl text-xs font-medium border border-blue-100/50">
                                    <Info className="w-4 h-4 shrink-0" />
                                    Missing Live URL prevents this agent from being published to the marketplace.
                                </div>
                            )}
                        </div>
                    </section>
                </div>

                {/* Right Column: Stats & Meta */}
                <div className="space-y-6">
                    {/* Status Card */}
                    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                        <div className="p-4 border-b border-border bg-secondary/20">
                            <h3 className="text-[11px] font-bold text-subtext uppercase tracking-wider">Performance</h3>
                        </div>
                        <div className="grid grid-cols-2 divide-x divide-border">
                            <div className="p-5 flex flex-col items-center justify-center text-center hover:bg-secondary/10 transition-colors">
                                <span className="text-3xl font-bold text-maintext mb-1">{app.activeUsers || 0}</span>
                                <span className="text-[10px] uppercase font-bold text-subtext tracking-wider">Active Users</span>
                            </div>
                            <div className="p-5 flex flex-col items-center justify-center text-center hover:bg-secondary/10 transition-colors">
                                <span className="text-3xl font-bold text-maintext mb-1">{app.subscribers || 0}</span>
                                <span className="text-[10px] uppercase font-bold text-subtext tracking-wider">Subscribers</span>
                            </div>
                        </div>
                    </div>

                    {/* Meta Info */}
                    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                        <div className="p-4 border-b border-border bg-secondary/20">
                            <h3 className="text-[11px] font-bold text-subtext uppercase tracking-wider">Agent Details</h3>
                        </div>

                        <div className="divide-y divide-border">
                            <div className="flex justify-between items-center p-4 hover:bg-secondary/5 transition-colors">
                                <span className="text-sm font-medium text-subtext flex items-center gap-2">
                                    <LayoutGrid className="w-4 h-4 text-subtext/70" /> Category
                                </span>
                                <span className="text-sm font-bold text-maintext text-right">{app.category || 'General'}</span>
                            </div>

                            <div className="flex justify-between items-center p-4 hover:bg-secondary/5 transition-colors">
                                <span className="text-sm font-medium text-subtext flex items-center gap-2">
                                    <CreditCard className="w-4 h-4 text-subtext/70" /> Pricing Model
                                </span>
                                <div className="flex flex-col items-end">
                                    <span className="text-sm font-bold text-maintext">{app.pricingModel || formatPrice()}</span>
                                    {/* Optional: Show price amount if available and not identical to model */}
                                    {app.pricing && typeof app.pricing === 'string' && app.pricing !== 'Free' && (
                                        <span className="text-xs text-subtext">{app.pricing}</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-between items-center p-4 hover:bg-secondary/5 transition-colors">
                                <span className="text-sm font-medium text-subtext flex items-center gap-2">
                                    <Eye className="w-4 h-4 text-subtext/70" /> Visibility
                                </span>
                                <span className={`flex items-center gap-1.5 text-sm font-bold ${status === 'Live' ? 'text-blue-600' : 'text-blue-400'}`}>
                                    <div className={`w-2 h-2 rounded-full ${status === 'Live' ? 'bg-blue-500' : 'bg-blue-300'}`}></div>
                                    {status === 'Live' ? 'Public' : 'Private'}
                                </span>
                            </div>

                            <div className="flex justify-between items-center p-4 hover:bg-secondary/5 transition-colors">
                                <span className="text-sm font-medium text-subtext flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-subtext/70" /> Review Status
                                </span>
                                <span className={`text-xs px-2 py-1 rounded-md font-bold uppercase tracking-wide ${reviewStatus === 'Approved' ? 'bg-blue-100 text-blue-700' :
                                    reviewStatus === 'Pending Review' ? 'bg-blue-50 text-blue-600' :
                                        reviewStatus === 'Rejected' ? 'bg-slate-100 text-slate-700' :
                                            'bg-secondary text-subtext'
                                    }`}>
                                    {reviewStatus}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default AppDetails;
