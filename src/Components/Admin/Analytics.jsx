import { TrendingUp, Users, Download } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Analytics = () => {
    const { t } = useLanguage();
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-maintext">{t('admin.analytics.title')}</h2>
                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-secondary border border-border rounded-lg text-sm hover:bg-border transition-colors w-full sm:w-auto">
                    <Download className="w-4 h-4" />
                    {t('admin.finance.filter')}
                </button>
            </div>

            {/* Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card border border-border p-6 rounded-xl h-64 flex flex-col justify-between">
                    <h3 className="font-bold text-maintext flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-500" /> {t('admin.analytics.revenueGrowth')}</h3>
                    {/* Mock Chart Area */}
                    <div className="flex-1 flex items-end justify-between px-2 gap-2 mt-4">
                        {[40, 55, 45, 60, 75, 65, 80, 95].map((h, i) => (
                            <div key={i} className="flex-1 bg-green-500/20 hover:bg-green-500/30 rounded-t transition-all" style={{ height: `${h}%` }}></div>
                        ))}
                    </div>
                </div>

                <div className="bg-card border border-border p-6 rounded-xl h-64 flex flex-col justify-between">
                    <h3 className="font-bold text-maintext flex items-center gap-2"><Users className="w-4 h-4 text-blue-500" /> {t('admin.analytics.newUsers')}</h3>
                    {/* Mock Chart Area */}
                    <div className="flex-1 flex items-end justify-between px-2 gap-2 mt-4">
                        {[30, 40, 35, 50, 45, 60, 55, 70].map((h, i) => (
                            <div key={i} className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 rounded-t transition-all" style={{ height: `${h}%` }}></div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-bold text-maintext mb-4">{t('admin.analytics.topPerforming')}</h3>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between border-b border-border/50 pb-2 last:border-0 last:pb-0">
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-subtext">#{i}</span>
                                <div>
                                    <p className="font-semibold text-maintext">Agent Delta {i}</p>
                                    <p className="text-xs text-subtext">{t('admin.analytics.vendor')}: TechSol</p>
                                </div>
                            </div>
                            <p className="font-bold text-primary">2.4k {t('admin.analytics.installs')}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Analytics;
