import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Search, Filter, Clock, Loader2, Eye, X, User, DollarSign, Calendar } from 'lucide-react';
import apiService from '../../services/apiService';

const TransactionHistory = () => {
    const { t } = useLanguage();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const data = await apiService.getAdminTransactions();
            setTransactions(data);
        } catch (err) {
            console.error("Failed to fetch transactions:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleViewDetails = (transaction) => {
        setSelectedTransaction(transaction);
        setShowDetailsModal(true);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-xl md:text-2xl font-bold text-maintext">{t("admin.finance.transactionHistory")}</h1>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="relative group flex-1 sm:flex-none">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-subtext group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder={t("admin.finance.searchPlaceholder")}
                            className="w-full bg-card border border-border rounded-xl py-2 md:py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all outline-none sm:min-w-[240px] md:min-w-[280px] text-maintext placeholder:text-subtext/50"
                        />
                    </div>
                    <button className="flex items-center justify-center gap-2 px-4 py-2 md:py-2.5 bg-card border border-border rounded-xl text-sm font-bold text-subtext hover:bg-secondary transition-all">
                        <Filter className="w-4 h-4" />
                        {t("admin.finance.filter")}
                    </button>
                </div>
            </div>

            <div className="bg-card border border-border rounded-2xl md:rounded-[32px] overflow-hidden shadow-sm">
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px] md:min-w-[1200px]">
                        <thead className="bg-secondary border-b border-border">
                            <tr>
                                <th className="px-3 md:px-4 py-4 text-[10px] font-bold text-subtext uppercase tracking-[1.5px] w-[100px] md:w-[140px]">{t("admin.finance.id")}</th>
                                <th className="px-3 md:px-4 py-4 text-[10px] font-bold text-subtext uppercase tracking-[1.5px] w-[100px] md:w-[120px]">{t("admin.finance.date")}</th>
                                <th className="px-3 md:px-4 py-4 text-[10px] font-bold text-subtext uppercase tracking-[1.5px] w-[120px] md:w-[140px]">{t("admin.finance.type")}</th>
                                <th className="px-3 md:px-4 py-4 text-[10px] font-bold text-subtext uppercase tracking-[1.5px] min-w-[150px]">{t("admin.users.tableAgents")} / {t("admin.finance.details")}</th>
                                <th className="px-3 md:px-4 py-4 text-[10px] font-bold text-subtext uppercase tracking-[1.5px] w-[100px] md:w-[120px]">{t("admin.finance.amount")}</th>
                                <th className="px-3 md:px-4 py-4 text-[10px] font-bold text-subtext uppercase tracking-[1.5px] w-[120px] md:w-[140px]">{t("admin.finance.status")}</th>
                                <th className="px-3 md:px-4 py-4 text-[10px] font-bold text-subtext uppercase tracking-[1.5px] text-right w-[100px] md:w-[120px]">{t("admin.finance.actions")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="py-24 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                                            <p className="mt-4 text-sm font-bold text-subtext">{t("admin.finance.loading")}</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : transactions.length > 0 ? (
                                transactions.map((transaction) => (
                                    <tr key={transaction.id} className="border-b border-secondary hover:bg-secondary transition-colors last:border-0 group">
                                        <td className="px-3 md:px-4 py-4">
                                            <span className="text-[10px] md:text-xs font-bold text-maintext">#{transaction.id.substring(transaction.id.length - 8).toUpperCase()}</span>
                                        </td>
                                        <td className="px-3 md:px-4 py-4">
                                            <span className="text-[10px] md:text-xs font-medium text-subtext">{formatDate(transaction.date)}</span>
                                        </td>
                                        <td className="px-3 md:px-4 py-4">
                                            <div className="flex items-center gap-1.5 md:gap-2">
                                                <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-blue-500" />
                                                <span className="text-[10px] md:text-[11px] font-bold text-maintext uppercase tracking-wide">{transaction.type}</span>
                                            </div>
                                        </td>
                                        <td className="px-3 md:px-4 py-4">
                                            <span className="text-xs md:text-sm font-bold text-maintext group-hover:text-primary transition-colors truncate block max-w-[120px] md:max-w-none">{transaction.appName}</span>
                                        </td>
                                        <td className="px-3 md:px-4 py-4">
                                            <span className="text-xs md:text-sm font-black text-maintext">₹{transaction.amount.toFixed(2)}</span>
                                        </td>
                                        <td className="px-3 md:px-4 py-4">
                                            <div className="inline-flex items-center gap-1 px-2 md:px-3 py-0.5 md:py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full border border-green-500/20 text-[9px] md:text-[10px] font-black uppercase tracking-wider whitespace-nowrap">
                                                <div className="w-1 md:w-1.5 h-1 md:h-1.5 bg-green-500 rounded-full" />
                                                {transaction.status}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-right">
                                            <button
                                                onClick={() => handleViewDetails(transaction)}
                                                className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary text-maintext rounded-xl text-xs font-bold hover:bg-border transition-all whitespace-nowrap"
                                                title={t("admin.finance.details")}
                                            >
                                                <Eye className="w-3.5 h-3.5" />
                                                {t("admin.finance.details")}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="py-24 text-center">
                                        <div className="flex flex-col items-center justify-center space-y-3">
                                            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-2">
                                                <Clock className="w-8 h-8 text-subtext/20" />
                                            </div>
                                            <p className="text-subtext text-sm font-medium">{t("admin.finance.noTransactions")}</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-border/50">
                    {loading ? (
                        <div className="p-12 text-center">
                            <Loader2 className="w-8 h-8 mx-auto text-primary animate-spin" />
                            <p className="mt-4 text-sm font-bold text-subtext">{t("admin.finance.loading")}</p>
                        </div>
                    ) : transactions.length > 0 ? (
                        transactions.map((transaction) => (
                            <div key={transaction.id} className="p-4 space-y-3 hover:bg-secondary/50 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <p className="text-[10px] font-bold text-maintext">#{transaction.id.substring(transaction.id.length - 8).toUpperCase()}</p>
                                        <p className="text-[9px] text-subtext font-medium">{formatDate(transaction.date)}</p>
                                    </div>
                                    <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-500/10 text-green-600 rounded-full border border-green-500/20 text-[9px] font-black uppercase">
                                        <div className="w-1 h-1 bg-green-500 rounded-full" />
                                        {transaction.status}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-maintext">{transaction.appName}</span>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1 h-1 rounded-full bg-blue-500" />
                                            <span className="text-[10px] font-bold text-subtext uppercase">{transaction.type}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-1">
                                        <span className="text-[9px] font-black text-subtext uppercase tracking-widest">{t("admin.finance.amount")}</span>
                                        <span className="text-sm font-black text-maintext">₹{transaction.amount.toFixed(2)}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleViewDetails(transaction)}
                                    className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-secondary text-maintext rounded-xl text-xs font-bold hover:bg-border transition-all"
                                >
                                    <Eye className="w-3.5 h-3.5" />
                                    {t("admin.finance.details")}
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="p-12 text-center">
                            <Clock className="w-12 h-12 mx-auto mb-3 text-subtext/10" />
                            <p className="text-subtext text-xs font-medium">{t("admin.finance.noTransactions")}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Transaction Details Modal */}
            {showDetailsModal && selectedTransaction && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-card w-full max-w-2xl rounded-2xl md:rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in duration-200 overflow-y-auto max-h-[90vh]">
                        <div className="p-5 md:p-8">
                            <div className="flex items-center justify-between mb-4 md:mb-6">
                                <h2 className="text-xl md:text-2xl font-bold text-maintext">{t("admin.finance.modalTitle")}</h2>
                                <button
                                    onClick={() => setShowDetailsModal(false)}
                                    className="p-1.5 md:p-2 hover:bg-secondary rounded-xl transition-colors"
                                >
                                    <X className="w-5 h-5 text-subtext" />
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-secondary rounded-2xl p-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs font-bold text-subtext uppercase mb-2">{t("admin.finance.id")}</p>
                                            <p className="text-sm font-bold text-maintext">#{selectedTransaction.id.substring(selectedTransaction.id.length - 12).toUpperCase()}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-subtext uppercase mb-2">{t("admin.finance.date")}</p>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-subtext" />
                                                <p className="text-sm font-medium text-maintext">{formatDate(selectedTransaction.date)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* App Details */}
                                <div>
                                    <p className="text-xs font-bold text-subtext uppercase mb-3">{t("admin.agents.agentName")} / Product</p>
                                    <div className="bg-card border border-border rounded-2xl p-4">
                                        <p className="text-lg font-bold text-maintext">{selectedTransaction.appName}</p>
                                        <p className="text-xs text-subtext mt-1">{selectedTransaction.type}</p>
                                    </div>
                                </div>

                                {/* Amount Breakdown */}
                                <div>
                                    <p className="text-xs font-bold text-subtext uppercase mb-3">{t("admin.finance.breakdown")}</p>
                                    <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="w-4 h-4 text-subtext" />
                                                <span className="text-sm font-medium text-subtext">{t("admin.finance.grossAmount")}</span>
                                            </div>
                                            <span className="text-sm font-bold text-maintext">₹{selectedTransaction.amount.toFixed(2)}</span>
                                        </div>
                                        <div className="border-t border-border pt-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-subtext">{t("admin.finance.platformFeePerc")}</span>
                                                <span className="text-sm font-bold text-amber-600 dark:text-amber-400">-₹{(selectedTransaction.amount * 0.5).toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <div className="border-t border-border pt-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-bold text-maintext">{t("admin.finance.vendorEarnings")}</span>
                                                <span className="text-lg font-black text-green-600 dark:text-green-400">₹{(selectedTransaction.amount * 0.5).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Status */}
                                <div>
                                    <p className="text-xs font-bold text-subtext uppercase mb-3">{t("admin.finance.status")}</p>
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 dark:text-green-400 rounded-xl border border-green-500/20">
                                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                                        <span className="text-sm font-bold uppercase">{selectedTransaction.status}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button
                                    onClick={() => setShowDetailsModal(false)}
                                    className="px-6 py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary/90 transition-all"
                                >
                                    {t("admin.finance.close")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransactionHistory;
