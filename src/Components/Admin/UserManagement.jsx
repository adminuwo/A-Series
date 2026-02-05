import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Ban, Search, User, Loader2, Bot, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import apiService from '../../services/apiService';
import { useToast } from '../../Components/Toast/ToastContext';

const UserManagement = () => {
    const { t } = useLanguage();
    const toast = useToast();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedUser, setExpandedUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await apiService.getAllUsers();
            setUsers(data);
        } catch (err) {
            console.error("Failed to fetch users", err);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount || 0);
    };

    const toggleExpand = (userId) => {
        if (expandedUser === userId) {
            setExpandedUser(null);
        } else {
            setExpandedUser(userId);
        }
    };

    const filteredUsers = users.filter(user => {
        const term = searchTerm.toLowerCase();
        const matchesName = user.name?.toLowerCase().includes(term);
        const matchesEmail = user.email?.toLowerCase().includes(term);
        const matchesAgent = user.agents?.some(agent =>
            (agent.agentName || agent.name)?.toLowerCase().includes(term)
        );
        return matchesName || matchesEmail || matchesAgent;
    });

    const handleBlockUser = async (user) => {
        const newBlockState = !user.isBlocked;
        try {
            await apiService.toggleBlockUser(user.id, newBlockState);

            // Real-time update in state
            setUsers(prevUsers => prevUsers.map(u =>
                u.id === user.id
                    ? {
                        ...u,
                        isBlocked: newBlockState,
                        status: newBlockState ? 'Blocked' : (u.status === 'Blocked' ? 'Active' : u.status)
                    }
                    : u
            ));

            toast.success(newBlockState ? t("admin.users.toastBlocked") : t("admin.users.toastUnblocked"));
        } catch (err) {
            console.error("Block/Unblock failed:", err);
            toast.error(t("admin.users.toastError"));
        }
    };

    if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-2">
                <div>
                    <h2 className="text-xl md:text-2xl font-black text-maintext tracking-tight">{t("admin.users.title")}</h2>
                    <p className="text-xs md:text-sm text-subtext font-medium">{t("admin.users.subtitle")}</p>
                </div>
                <div className="flex w-full sm:w-auto gap-2">
                    <div className="relative group w-full sm:w-auto">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-subtext group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder={t("admin.users.searchPlaceholder")}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl md:rounded-2xl text-sm outline-none w-full md:w-80 focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all text-maintext placeholder-subtext/40 shadow-sm"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl md:rounded-[24px] shadow-sm overflow-hidden">
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left text-sm border-collapse md:min-w-[850px]">
                        <thead>
                            <tr className="bg-secondary/50 border-b border-border text-[10px] font-black text-subtext uppercase tracking-widest">
                                <th className="px-5 py-4">{t("admin.users.tableUser")}</th>
                                <th className="px-3 py-4">{t("admin.users.tableRole")}</th>
                                <th className="px-3 py-4">{t("admin.users.tableAgents")}</th>
                                <th className="px-3 py-4">{t("admin.users.tableStatus")}</th>
                                <th className="px-3 py-4 text-right">{t("admin.users.tableSpent")}</th>
                                <th className="px-5 py-4 text-right">{t("admin.users.tableActions")}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-primary/[0.02] transition-colors align-middle group">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/10 flex items-center justify-center text-primary font-black text-base shadow-sm shrink-0 overflow-hidden">
                                                    {user.avatar && !user.avatar.includes('User.jpeg') ? (
                                                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                                    ) : user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-bold text-maintext text-sm leading-tight truncate">{user.name}</p>
                                                    <p className="text-[10px] text-subtext/60 font-medium truncate">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-3 py-4">
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[9px] font-black border ${user.role === 'admin' ? 'bg-primary text-white border-primary shadow-sm' : 'bg-secondary/50 text-subtext border-border'} uppercase tracking-tighter whitespace-nowrap`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-3 py-4">
                                            <div className="relative">
                                                <button
                                                    onClick={() => toggleExpand(user.id)}
                                                    className="flex items-center gap-1 px-2 py-1 rounded-lg bg-secondary/30 hover:bg-secondary border border-border transition-all"
                                                >
                                                    <Bot className="w-3 h-3 text-primary" />
                                                    <span className="text-[10px] font-black text-maintext">{user.agents?.length || 0}</span>
                                                    {expandedUser === user.id ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                                </button>

                                                {expandedUser === user.id && (
                                                    <div className="absolute top-full left-0 mt-2 w-64 bg-card border border-border rounded-[20px] shadow-2xl z-20 animate-in fade-in zoom-in slide-in-from-top-2 duration-300 overflow-hidden">
                                                        <div className="p-3 space-y-1.5 max-h-60 overflow-y-auto custom-scrollbar">
                                                            {user.agents && user.agents.length > 0 ? (
                                                                user.agents.map((agent, idx) => (
                                                                    <div key={idx} className="flex items-center justify-between p-2.5 bg-secondary/20 hover:bg-primary/5 rounded-xl transition-all">
                                                                        <div className="flex items-center gap-2">
                                                                            <Bot className="w-3 h-3 text-primary" />
                                                                            <span className="text-[11px] font-bold text-maintext truncate max-w-[120px]">{agent.agentName || agent.name}</span>
                                                                        </div>
                                                                        <span className="text-[9px] font-black text-primary/60 uppercase">{agent.pricingModel || 'Free'}</span>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <div className="p-4 text-center text-[10px] text-subtext/40 font-black uppercase tracking-widest">{t("admin.users.noSubscriptions")}</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-3 py-4">
                                            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black border uppercase tracking-tighter shadow-sm whitespace-nowrap ${user.isBlocked ? 'bg-red-500/5 text-red-500 border-red-500/20' : (user.status === 'Active' ? 'bg-green-500/5 text-green-500 border-green-500/20' : 'bg-primary/5 text-primary border-primary/20')}`}>
                                                {user.isBlocked ? t("admin.users.blocked") : user.status}
                                            </span>
                                        </td>
                                        <td className="px-3 py-4 text-right">
                                            <p className="font-black text-maintext text-sm tracking-tighter leading-none">{formatCurrency(user.spent)}</p>
                                            <p className="text-[8px] text-subtext/40 font-black uppercase tracking-tighter mt-1">{t("admin.users.invested")}</p>
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <div className="flex items-center justify-end">
                                                <button
                                                    onClick={() => handleBlockUser(user)}
                                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${user.isBlocked ? 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20' : 'bg-secondary/30 text-subtext hover:bg-red-500/10 hover:text-red-500 border border-transparent hover:border-red-500/20'}`}
                                                    title={user.isBlocked ? "Activate User" : "Suspend User"}
                                                >
                                                    <Ban className={`w-3 h-3 ${user.isBlocked ? 'animate-pulse' : ''}`} />
                                                    {user.isBlocked ? t("admin.users.active") : t("admin.users.block")}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-8 py-20 text-center">
                                        <User className="w-12 h-12 mx-auto mb-4 text-subtext/10" />
                                        <p className="text-subtext font-black uppercase tracking-widest text-sm">{t("admin.users.noUsersFound")}</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-border/50">
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <div key={user.id} className="p-4 space-y-4 hover:bg-primary/[0.02] transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/10 flex items-center justify-center text-primary font-black text-base shadow-sm shrink-0 overflow-hidden">
                                            {user.avatar && !user.avatar.includes('User.jpeg') ? (
                                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                            ) : user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-bold text-maintext text-sm leading-tight truncate">{user.name}</p>
                                            <p className="text-[10px] text-subtext/60 font-medium truncate">{user.email}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black border ${user.role === 'admin' ? 'bg-primary text-white border-primary shadow-sm' : 'bg-secondary/50 text-subtext border-border'} uppercase tracking-tighter whitespace-nowrap`}>
                                        {user.role}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-subtext uppercase tracking-widest">{t("admin.users.tableStatus")}</p>
                                        <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-black border uppercase tracking-tighter shadow-sm whitespace-nowrap ${user.isBlocked ? 'bg-red-500/5 text-red-500 border-red-500/20' : (user.status === 'Active' ? 'bg-green-500/5 text-green-500 border-green-500/20' : 'bg-primary/5 text-primary border-primary/20')}`}>
                                            {user.isBlocked ? t("admin.users.blocked") : user.status}
                                        </span>
                                    </div>
                                    <div className="space-y-1 text-right">
                                        <p className="text-[9px] font-black text-subtext uppercase tracking-widest">{t("admin.users.tableSpent")}</p>
                                        <p className="font-black text-maintext text-sm tracking-tighter leading-none">{formatCurrency(user.spent)}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-subtext uppercase tracking-widest">{t("admin.users.tableAgents")}</p>
                                        <div className="flex items-center gap-1.5">
                                            <Bot className="w-3 h-3 text-primary" />
                                            <span className="text-[10px] font-black text-maintext">{user.agents?.length || 0} Agents</span>
                                        </div>
                                    </div>
                                    <div className="flex items-end justify-end">
                                        <button
                                            onClick={() => handleBlockUser(user)}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${user.isBlocked ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-secondary/30 text-subtext hover:bg-red-500/10 hover:text-red-500 border border-border/50'}`}
                                        >
                                            <Ban className="w-3 h-3" />
                                            {user.isBlocked ? t("admin.users.active") : t("admin.users.block")}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-12 text-center">
                            <User className="w-10 h-10 mx-auto mb-3 text-subtext/10" />
                            <p className="text-subtext font-black uppercase tracking-widest text-xs">{t("admin.users.noUsersFound")}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
