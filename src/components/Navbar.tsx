import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Activity, 
  TrendingUp, 
  MapPin, 
  Wind, 
  Users, 
  CheckSquare, 
  FileText, 
  Database, 
  Settings, 
  Play, 
  Award, 
  Bell, 
  X,
  UserCheck
} from 'lucide-react';
import { UserRole, NotificationItem } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  onOpenSimulation: () => void;
  onOpenValidation: () => void;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  onOpenSimulation,
  onOpenValidation,
  notifications,
  onMarkNotificationRead,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const roleLabels: Record<UserRole, { label: string; desc: string }> = {
    dho: { label: 'District Health Officer', desc: 'Public Health Authority & IDSP' },
    safety_lead: { label: 'Workplace Safety Lead', desc: 'Occupational Health & Safety (OHS)' },
    state_epi: { label: 'State Epidemiologist', desc: 'Population Surveillance & Policy' },
    compliance: { label: 'Privacy & Data Auditor', desc: 'Compliance & Small-Cell Privacy' },
  };

  const navLinks = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'early-warning', label: 'Early Warning', icon: ShieldAlert },
    { id: 'risk-analytics', label: 'Risk Analytics', icon: TrendingUp },
    { id: 'geographic', label: 'Geographic Map', icon: MapPin },
    { id: 'environmental', label: 'Environmental', icon: Wind },
    { id: 'workforce', label: 'Workforce', icon: Users },
    { id: 'prevention', label: 'Actions', icon: CheckSquare },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'data-management', label: 'Data Ingest', icon: Database },
    { id: 'settings', label: 'Privacy & Config', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
      {/* Strict Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (Nav Links) - Zone 3 (Actions) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        
        {/* Zone 1: Brand Wordmark (Single text element wordmark, no badge sandwiches) */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <ShieldAlert className="w-5 h-5 text-teal-400" />
          </div>
          <div className="flex flex-col">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); setActiveTab('overview'); }}
              className="text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap hover:text-teal-300 transition-colors"
            >
              Swasthya Sentinel AI
            </a>
            <span className="text-[10px] text-slate-400 font-medium tracking-wide">
              Bharat Innovation · Shaik Mulla Sadik
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Single-line, clean unboxed hover states) */}
        <nav className="hidden xl:flex items-center gap-1 overflow-x-auto py-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-slate-800 text-teal-300 font-semibold border border-slate-700'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (Simulation Launcher, Validation Benchmark, Role, Notification) */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Quick Scenario Demonstration Button */}
          <button
            onClick={onOpenSimulation}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-amber-500/15 border border-amber-500/40 text-amber-300 hover:bg-amber-500/25 transition-all cursor-pointer whitespace-nowrap"
            title="Launch required heat stress workforce demonstration scenario"
          >
            <Play className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="hidden sm:inline">Heat Scenario Demo</span>
          </button>

          {/* Scientific Validation Benchmark Button */}
          <button
            onClick={onOpenValidation}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-teal-500/15 border border-teal-500/40 text-teal-300 hover:bg-teal-500/25 transition-all cursor-pointer whitespace-nowrap"
            title="View empirical sensitivity, precision, lead time & backtesting metrics"
          >
            <Award className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden md:inline">Validation (92.4%)</span>
          </button>

          {/* Role Switcher Dropdown for RBAC */}
          <div className="relative group">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-md bg-slate-800/80 border border-slate-700 text-slate-200 cursor-pointer hover:bg-slate-800">
              <UserCheck className="w-3.5 h-3.5 text-teal-400" />
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value as UserRole)}
                className="bg-transparent text-xs text-slate-200 outline-none cursor-pointer pr-1"
                aria-label="Active Security & Surveillance Role"
              >
                <option value="dho" className="bg-slate-900 text-white">Role: District Health Officer</option>
                <option value="safety_lead" className="bg-slate-900 text-white">Role: Workplace Safety Lead</option>
                <option value="state_epi" className="bg-slate-900 text-white">Role: State Epidemiologist</option>
                <option value="compliance" className="bg-slate-900 text-white">Role: Privacy & Compliance Officer</option>
              </select>
            </div>
          </div>

          {/* Notification Center Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-300 hover:text-white rounded-md bg-slate-850 hover:bg-slate-800 border border-slate-700/80 cursor-pointer"
              aria-label="Alert Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Drawer Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl z-50 p-3">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-teal-400" />
                    <span className="text-xs font-bold text-white">Real-Time Surveillance Alerts</span>
                  </div>
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => onMarkNotificationRead(item.id)}
                      className={`p-2.5 rounded-md border text-left cursor-pointer transition-colors ${
                        item.read 
                          ? 'bg-slate-800/40 border-slate-800 text-slate-400' 
                          : 'bg-slate-800 border-slate-700 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className={`font-semibold ${item.type === 'ALERT_HIGH' ? 'text-rose-400' : 'text-teal-400'}`}>
                          {item.title}
                        </span>
                        <span className="text-slate-400">{item.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{item.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Sub-navigation Bar */}
      <div className="xl:hidden flex items-center gap-1 px-4 py-2 bg-slate-900/90 border-t border-slate-800 overflow-x-auto text-xs">
        {navLinks.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded whitespace-nowrap ${
                isActive ? 'bg-slate-800 text-teal-300 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
