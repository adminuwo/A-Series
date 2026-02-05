import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { FileText, Search } from 'lucide-react';

const AuditLogs = () => {
    const { t } = useLanguage();
    const logs = [
        { id: 1, action: "Vendor_Approved", user: "Admin_Sarah", target: "TechSolutions", time: "10:45 AM" },
        { id: 2, action: "System_Config_Change", user: "SuperAdmin_Bhoom", target: "Global_Throttling", time: "09:12 AM" },
        { id: 3, action: "Refund_Processed", user: "Support_Bot", target: "Order_#992", time: "Yesterday" },
        { id: 4, action: "Agent_Rejected", user: "Admin_Sarah", target: "SpamBot_v1", time: "Yesterday" },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
                <h2 className="text-xl font-bold text-maintext">{t("admin.auditLogs.title")}</h2>
                {/* Assuming a button might be added here for responsiveness, e.g., for export or filter */}
                {/* <button className="flex items-center justify-center gap-2 px-4 py-2 bg-secondary border border-border rounded-lg text-sm hover:bg-border transition-colors w-full sm:w-auto">
                    <FileText className="w-4 h-4" />
                    {t('admin.auditLogs.export')}
                </button> */}
            </div>

            <div className="bg-card border border-border rounded-xl p-4 flex gap-2 mx-2 sm:mx-0">
                <Search className="w-5 h-5 text-subtext" />
                <input type="text" placeholder={t("admin.support.searchPlaceholder")} className="bg-transparent outline-none flex-1 text-maintext placeholder:text-subtext" />
            </div>

            <div className="bg-card rounded-xl border border-border overflow-x-auto mx-2 sm:mx-0">
                <table className="w-full text-left text-sm min-w-[600px]">
                    <thead className="bg-secondary border-b border-border text-subtext">
                        <tr>
                            <th className="px-5 py-3 font-medium whitespace-nowrap">{t("admin.auditLogs.action")}</th>
                            <th className="px-5 py-3 font-medium whitespace-nowrap">{t("admin.auditLogs.user")}</th>
                            <th className="px-5 py-3 font-medium whitespace-nowrap">{t("admin.auditLogs.target")}</th>
                            <th className="px-5 py-3 font-medium text-right whitespace-nowrap">{t("admin.auditLogs.time")}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {logs.map((log) => (
                            <tr key={log.id} className="hover:bg-secondary font-mono text-xs cursor-pointer transition-colors">
                                <td className="px-5 py-3 text-primary font-bold">{log.action}</td>
                                <td className="px-5 py-3 text-maintext">{log.user}</td>
                                <td className="px-5 py-3 text-subtext">{log.target}</td>
                                <td className="px-5 py-3 text-right text-subtext whitespace-nowrap">{log.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AuditLogs;
