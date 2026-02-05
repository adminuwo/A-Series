import React, { useEffect, useState } from 'react';
import { apiService } from '../services/apiService';
import {
  MessageSquare, Cpu, Clock, Zap, TrendingUp, Users, ArrowUpRight, IndianRupee
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const DashboardOverview = () => {
  const [stats, setStats] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await apiService.getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to load dashboard stats:", err);
      }
    };
    loadStats();
  }, []);

  if (!stats) return (
    <div className="p-8 text-subtext">
      {t('dashboardData.loading')}
    </div>
  );

  return (
    <div className="p-4 md:p-8 h-full overflow-y-auto bg-secondary">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-maintext mb-2">{t('dashboardData.overview')}</h1>
        <p className="text-sm md:text-base text-subtext">
          {t('dashboardData.welcomeMessage')}
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">

        {/* Total Chats */}
        <div className="bg-card border border-border p-6 rounded-2xl relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <MessageSquare className="w-16 h-16 text-primary" />
          </div>
          <div className="flex items-center gap-3 mb-2 text-primary">
            <MessageSquare className="w-5 h-5" />
            <span className="font-semibold text-sm uppercase tracking-wide">{t('dashboardData.totalChats')}</span>
          </div>
          <div className="text-3xl font-bold text-maintext mb-1">{stats.totalChats}</div>
          <div className="text-xs text-subtext flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +12% from last week
          </div>
        </div>

        {/* Tokens Used */}
        <div className="bg-card border border-border p-6 rounded-2xl relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <IndianRupee className="w-16 h-16 text-primary" />
          </div>
          <div className="flex items-center gap-3 mb-2 text-primary">
            <IndianRupee className="w-5 h-5" />
            <span className="font-semibold text-sm uppercase tracking-wide">{t('dashboardData.totalCredits')}</span>
          </div>
          <div className="text-3xl font-bold text-maintext mb-1">
            {/* {(stats.tokensUsed / 1000).toFixed(1)}k */}
            0
          </div>
          <div className="text-xs text-subtext">{t('dashboardData.nextReset')}</div>
        </div>

        {/* Active Agents */}
        <div className="bg-card border border-border p-6 rounded-2xl relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Zap className="w-16 h-16 text-primary" />
          </div>
          <div className="flex items-center gap-3 mb-2 text-primary">
            <Zap className="w-5 h-5 " />
            <span className="font-semibold text-sm uppercase tracking-wide">{t('dashboardData.activeAgents')}</span>
          </div>
          <div className="text-3xl font-bold text-maintext mb-1">
            {stats.activeAgents}
          </div>
          <div className="text-xs text-subtext flex items-center gap-1">
            {t('dashboardData.allSystemsOperational')}
          </div>
        </div>

        {/* Time Saved */}
        <div className="bg-card border border-border p-6 rounded-2xl relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Clock className="w-16 h-16 text-primary" />
          </div>
          <div className="flex items-center gap-3 mb-2 text-primary">
            <Clock className="w-5 h-5" />
            <span className="font-semibold text-sm uppercase tracking-wide">{t('dashboardData.timeSaved')}</span>
          </div>
          <div className="text-3xl font-bold text-maintext mb-1">{stats.savedTime}</div>
          <div className="text-xs text-subtext">{t('dashboardData.manualWorkEquivalent')}</div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-maintext">{t('dashboardData.recentActivity')}</h2>
            <button className="text-sm text-primary hover:text-opacity-80">{t('dashboardData.viewAll')}</button>
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-xl bg-surface hover:bg-gray-100 transition-colors cursor-pointer group border border-transparent hover:border-border"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-maintext font-medium truncate">Project Analysis Chat</h4>
                    <p className="text-xs text-subtext truncate">
                      Modified 2 hours ago • General Assistant
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-subtext group-hover:text-primary transition-colors shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-maintext mb-6">{t('dashboardData.quickActions')}</h2>

          <div className="space-y-3">
            <button className="w-full p-3 rounded-xl bg-primary text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
              <MessageSquare className="w-4 h-4" /> {t('dashboardData.newChat')}
            </button>

            <button className="w-full p-3 rounded-xl bg-surface border border-border text-subtext hover:bg-gray-100 hover:text-maintext transition-colors flex items-center justify-center gap-2">
              <Users className="w-4 h-4" /> {t('dashboardData.inviteTeam')}
            </button>

            <button className="w-full p-3 rounded-xl bg-surface border border-border text-subtext hover:bg-gray-100 hover:text-maintext transition-colors flex items-center justify-center gap-2">
              <Cpu className="w-4 h-4" /> {t('dashboardData.deployAgent')}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardOverview;