import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { AlertTriangle, CheckCircle, MessageSquare } from 'lucide-react';

const Complaints = () => {
    const { t } = useLanguage();
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-xl font-bold text-maintext">{t("admin.complaints.title")}</h2>

            <div className="bg-card border border-border rounded-xl">
                <div className="p-6 text-center text-subtext py-12">
                    <AlertTriangle className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p>{t("admin.complaints.noComplaints")}</p>
                    <p className="text-sm opacity-60">{t("admin.complaints.systemSmooth")}</p>
                </div>
            </div>

            {/* Example of what a ticket would look like */}
            <div className="opacity-50 pointer-events-none filter blur-[1px]">
                <p className="text-xs uppercase text-subtext mb-2 font-bold tracking-wider">{t("admin.complaints.exampleTicket")}</p>
                <div className="bg-card border border-border rounded-xl p-4 flex gap-4">
                    <div className="p-2 bg-red-500/10 text-red-500 rounded-lg h-fit">
                        <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between">
                            <h3 className="font-semibold text-maintext">Agent Crash on Startup</h3>
                            <span className="text-xs font-medium text-green-500 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> {t("admin.complaints.resolved")}</span>
                        </div>
                        <p className="text-sm text-subtext mt-1">Reported by User #4491 regarding Agent 'FinanceBot'...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Complaints;
