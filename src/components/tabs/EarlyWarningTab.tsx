import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Filter, 
  MapPin, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUpRight,
  UserCheck,
  Search,
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { HealthAlert, UserRole, RiskLevel, AlertCategory } from '../../types';

interface EarlyWarningTabProps {
  alerts: HealthAlert[];
  onSelectAlert: (a: HealthAlert) => void;
  userRole: UserRole;
  onAcknowledgeAlert: (alertId: string, notes: string) => void;
  onEscalateAlert: (alertId: string, notes: string) => void;
}

export const EarlyWarningTab: React.FC<EarlyWarningTabProps> = ({
  alerts,
  onSelectAlert,
  userRole,
  onAcknowledgeAlert,
  onEscalateAlert,
}) => {
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<'ALL' | RiskLevel>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredAlerts = alerts.filter((alert) => {
    if (selectedRiskFilter !== 'ALL' && alert.riskLevel !== selectedRiskFilter) return false;
    if (selectedCategory !== 'ALL' && alert.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        alert.title.toLowerCase().includes(q) ||
        alert.districtName.toLowerCase().includes(q) ||
        alert.anomalySummary.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Module Title & Calibration Explainer */}
      <div className="p-5 rounded-xl bg-slate-850 border border-slate-700/70 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-teal-400" />
              Module A & F · Explainable AI Early Warning Engine
            </div>
            <h1 className="text-xl font-bold text-white mt-1">
              Active Multi-Signal Health & Occupational Surveillance Alerts
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl mt-0.5">
              Transparent Bayesian risk classification calibrated to historical seasonal variances. Anomaly detection flags statistical co-occurrences without claiming causation.
            </p>
          </div>

          {/* Three Risk Tiers as mandated by specification */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <div className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300">
              <span className="text-emerald-400 font-bold">LOW (0-39)</span>
              <span className="block text-[10px] text-slate-400 font-sans">Baseline Monitoring</span>
            </div>
            <div className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300">
              <span className="text-amber-400 font-bold">MODERATE (40-69)</span>
              <span className="block text-[10px] text-slate-400 font-sans">Observation & Review</span>
            </div>
            <div className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300">
              <span className="text-rose-400 font-bold">HIGH (70-100)</span>
              <span className="block text-[10px] text-slate-400 font-sans">Targeted Intervention</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Filter Bar */}
      <div className="p-4 rounded-xl bg-slate-850 border border-slate-700/70 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword, district, syndrome..."
              className="pl-8 pr-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 text-xs outline-none focus:border-teal-400 w-56 sm:w-64"
            />
          </div>

          {/* Risk Level Segmented Selector */}
          <div className="flex items-center gap-1 p-1 bg-slate-800 rounded-lg border border-slate-700">
            {(['ALL', 'HIGH', 'MODERATE', 'LOW'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedRiskFilter(lvl)}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  selectedRiskFilter === lvl
                    ? 'bg-slate-700 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 text-xs outline-none cursor-pointer"
            aria-label="Filter by Hazard Category"
          >
            <option value="ALL">All Threat Categories</option>
            <option value="heat_stress">Heat Stress & Thermal Fatigue</option>
            <option value="air_quality">Air Inversion & Particulate (AQI)</option>
            <option value="waterborne">Waterborne & Enteric Influx</option>
            <option value="occupational_injury">Workplace Industrial Hazard</option>
          </select>
        </div>

        <div className="text-slate-400 font-mono text-[11px]">
          Showing <strong>{filteredAlerts.length}</strong> of {alerts.length} Surveillance Alerts
        </div>
      </div>

      {/* Alerts Grid */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="p-12 text-center bg-slate-850 rounded-xl border border-slate-700/60 space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-base font-bold text-white">No Active Alerts In Current Filter</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              All multi-signal health and environmental feeds are currently tracking within acceptable baseline variance.
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className="p-5 rounded-xl bg-slate-850 border border-slate-700/70 hover:border-slate-600 transition-all space-y-4 shadow-sm"
            >
              {/* Alert Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                      alert.riskLevel === 'HIGH'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : alert.riskLevel === 'MODERATE'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}>
                      {alert.riskLevel} PRIORITY
                    </span>
                    <span className="text-xs font-mono text-slate-400">{alert.id}</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      Detected: {alert.detectedAt}
                    </span>
                    <span className="text-slate-500">·</span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-teal-400" />
                      {alert.districtName}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {alert.title}
                  </h3>
                  <div className="text-xs text-slate-400">
                    Affected Zone: <strong className="text-slate-200">{alert.zone}</strong>
                  </div>
                </div>

                {/* Risk Score Pill */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-right font-mono">
                    <span className="text-xs text-slate-400 block font-sans">Risk Score</span>
                    <span className={`text-xl font-bold ${
                      alert.riskLevel === 'HIGH' ? 'text-rose-400' : 'text-amber-400'
                    }`}>
                      {alert.riskScore} <span className="text-xs text-slate-400 font-sans">/ 100</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Anomaly Summary Prose */}
              <div className="p-3.5 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs sm:text-sm text-slate-200 leading-relaxed">
                {alert.anomalySummary}
              </div>

              {/* Contributing Signals Visual Mini-Grid */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">Contributing Signal Synthesis</span>
                  <span className="font-mono text-[11px]">Model Confidence: <strong className="text-teal-400">{alert.confidenceScore}%</strong></span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {alert.contributingSignals.map((sig, idx) => (
                    <div 
                      key={idx}
                      className="p-2.5 rounded bg-slate-800/40 border border-slate-700 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white truncate">{sig.signalName}</span>
                        <span className="text-[10px] font-mono text-teal-400">{sig.weightPct}% wt</span>
                      </div>
                      <div className="flex items-center justify-between font-mono text-[11px]">
                        <span className="text-slate-400">{sig.observedValue}</span>
                        <span className="text-rose-400 font-bold">Z: +{sig.zScore}σ</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-700/60 text-xs">
                <div className="flex items-center gap-4 text-slate-400">
                  <div>
                    Assigned Role: <strong className="text-slate-200">{alert.responsibleRole}</strong>
                  </div>
                  <div>·</div>
                  <div>
                    SLA: <strong className="text-amber-400 font-mono">{alert.targetInterventionTimeframe}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onAcknowledgeAlert(alert.id, `Acknowledged by ${userRole} from early warning feed.`)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
                  >
                    Acknowledge
                  </button>
                  <button
                    onClick={() => onSelectAlert(alert)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-teal-300 bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/30 rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Full Explainability & Protocol</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};
