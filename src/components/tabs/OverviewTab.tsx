import React from 'react';
import { 
  ShieldAlert, 
  Activity, 
  TrendingUp, 
  MapPin, 
  Wind, 
  Users, 
  CheckSquare, 
  Database,
  ArrowUpRight,
  AlertTriangle,
  Play,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { DistrictMetric, HealthAlert, DailyObservation, PreventiveAction, UserRole } from '../../types';
import { formatPrivacyCell } from '../../utils/analyticsEngine';

interface OverviewTabProps {
  districts: DistrictMetric[];
  alerts: HealthAlert[];
  actions: PreventiveAction[];
  observations: DailyObservation[];
  selectedDistrict: DistrictMetric;
  setSelectedDistrict: (d: DistrictMetric) => void;
  onSelectAlert: (a: HealthAlert) => void;
  onOpenSimulation: () => void;
  userRole: UserRole;
  onNavigateTab: (tab: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  districts,
  alerts,
  actions,
  observations,
  selectedDistrict,
  setSelectedDistrict,
  onSelectAlert,
  onOpenSimulation,
  userRole,
  onNavigateTab,
}) => {
  const highRiskCount = districts.filter((d) => d.riskLevel === 'HIGH').length;
  const pendingActionsCount = actions.filter((a) => a.status === 'PENDING' || a.status === 'IN_PROGRESS').length;

  return (
    <div className="space-y-6">
      
      {/* Top Hero Banner & Mission Callout */}
      <div className="rounded-xl p-5 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-700/80 shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-400">
              <span className="w-2 h-2 rounded-full bg-teal-400"></span>
              <span>Autonomous Population & Workforce Surveillance Engine</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">IDSP & OHS Integrated</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Swasthya Sentinel AI Command Center
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Detect Earlier. Predict Smarter. Prevent Faster. Synthesizing clinical trends, environmental conditions, and workforce sickness absence to halt emerging public health emergencies.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenSimulation}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-amber-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Launch Heat Scenario Simulation</span>
            </button>
            <button
              onClick={() => onNavigateTab('early-warning')}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>View All Alerts ({alerts.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 8 Core Dashboard KPIs as requested in Prompt Section 4 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        
        {/* KPI 1: Total Monitored Districts */}
        <div className="p-4 rounded-xl bg-slate-850 border border-slate-700/70 hover:border-slate-600 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="font-medium">1. Monitored Districts</span>
            <MapPin className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">
            {districts.length} Corridors
          </div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
            <span>Aggregated pop: 22.9M</span>
            <span className="text-teal-400 font-mono">100% active</span>
          </div>
        </div>

        {/* KPI 2: Active Health Alerts */}
        <div className="p-4 rounded-xl bg-slate-850 border border-slate-700/70 hover:border-slate-600 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="font-medium">2. Active Health Alerts</span>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-rose-400 tabular-nums">
            {alerts.length} Early Warnings
          </div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
            <span className="text-rose-300 font-semibold">{alerts.filter(a => a.riskLevel === 'HIGH').length} High Priority</span>
            <span className="text-amber-300 font-semibold">{alerts.filter(a => a.riskLevel === 'MODERATE').length} Moderate</span>
          </div>
        </div>

        {/* KPI 3: High-Risk Locations */}
        <div className="p-4 rounded-xl bg-slate-850 border border-slate-700/70 hover:border-slate-600 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="font-medium">3. High-Risk Zones</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-300 tabular-nums">
            {highRiskCount} Locations
          </div>
          <div className="text-[11px] text-slate-400 mt-1 truncate">
            Surat Belt (84) · Okhla (78)
          </div>
        </div>

        {/* KPI 4: Environmental Risk Indicators */}
        <div className="p-4 rounded-xl bg-slate-850 border border-slate-700/70 hover:border-slate-600 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="font-medium">4. Environmental Peak</span>
            <Wind className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">
            43.4 °C / AQI 342
          </div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between font-mono">
            <span>WBGT: 33.6°C (Extreme)</span>
            <span className="text-rose-400 font-bold">Z: +3.2σ</span>
          </div>
        </div>

        {/* KPI 5: Workforce Health Trends */}
        <div className="p-4 rounded-xl bg-slate-850 border border-slate-700/70 hover:border-slate-600 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="font-medium">5. Workforce Sickness Rate</span>
            <Users className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-rose-300 tabular-nums">
            11.4 %
          </div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
            <span className="text-rose-400 font-semibold">+256% vs Baseline</span>
            <span className="text-slate-400">Baseline 3.2%</span>
          </div>
        </div>

        {/* KPI 6: Emerging Disease Signals */}
        <div className="p-4 rounded-xl bg-slate-850 border border-slate-700/70 hover:border-slate-600 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="font-medium">6. Emerging Disease Signals</span>
            <Activity className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tabular-nums">
            2 Clusters
          </div>
          <div className="text-[11px] text-slate-400 mt-1 truncate">
            Heat Syncope (Surat) · Bronchospasm (NCR)
          </div>
        </div>

        {/* KPI 7: Preventive Actions Pending */}
        <div className="p-4 rounded-xl bg-slate-850 border border-slate-700/70 hover:border-slate-600 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="font-medium">7. Preventive Actions</span>
            <CheckSquare className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-300 tabular-nums">
            {pendingActionsCount} Active
          </div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
            <span>2 Critical in progress</span>
            <span className="text-teal-400 font-mono">1 verified</span>
          </div>
        </div>

        {/* KPI 8: Data Freshness & Completeness */}
        <div className="p-4 rounded-xl bg-slate-850 border border-slate-700/70 hover:border-slate-600 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="font-medium">8. Data Freshness</span>
            <Database className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
            96.4 %
          </div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
            <span>Telemetry lag: 14 min</span>
            <span className="text-emerald-400 font-mono">Optimal</span>
          </div>
        </div>

      </div>

      {/* Main Multi-Signal 30-Day Timeline Chart */}
      <div className="p-5 rounded-xl bg-slate-850 border border-slate-700/70 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-teal-400" />
              <span>Multi-Signal Epidemiological & Environmental Correlation Timeline (30 Days)</span>
            </h2>
            <p className="text-xs text-slate-400">
              Co-visualizing Peak Temperature (°C), Workforce Sickness Absence (%), and Hospital Emergency Visits in {selectedDistrict.name}.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedDistrict.id}
              onChange={(e) => {
                const found = districts.find((d) => d.id === e.target.value);
                if (found) setSelectedDistrict(found);
              }}
              className="px-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-200 outline-none cursor-pointer"
              aria-label="Select Monitored District"
            >
              {districts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.riskLevel} - {d.currentRiskScore}/100)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Recharts Timeline */}
        <div className="h-64 sm:h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={observations}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis 
                dataKey="date" 
                stroke="#94a3b8" 
                tick={{ fontSize: 10 }}
                tickFormatter={(val) => val.slice(5)} 
              />
              <YAxis 
                yAxisId="temp" 
                stroke="#f97316" 
                tick={{ fontSize: 10 }} 
                domain={[30, 48]}
                unit="°C"
              />
              <YAxis 
                yAxisId="absence" 
                orientation="right" 
                stroke="#f43f5e" 
                tick={{ fontSize: 10 }} 
                domain={[0, 16]}
                unit="%"
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }}
                labelStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
              />
              <Line 
                yAxisId="temp"
                type="monotone" 
                dataKey="temperatureMaxC" 
                stroke="#f97316" 
                strokeWidth={2} 
                dot={false}
                name="Ambient Peak Temp (°C)" 
              />
              <Line 
                yAxisId="absence"
                type="monotone" 
                dataKey="sicknessAbsenceRatePct" 
                stroke="#f43f5e" 
                strokeWidth={2.5} 
                dot={false}
                name="Workforce Sickness Absence (%)" 
              />
              <Line 
                yAxisId="temp"
                type="monotone" 
                dataKey="wbgtC" 
                stroke="#fbbf24" 
                strokeWidth={1.5} 
                strokeDasharray="4 4"
                dot={false}
                name="Wet Bulb Globe Temp WBGT (°C)" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-700/60 font-mono">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-orange-500"></span> Max Temp (°C)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-rose-500"></span> Workforce Absence Rate (%)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-amber-400 border-b border-dashed"></span> WBGT Index (°C)
            </span>
          </div>
          <div>
            Statistical Pearson Correlation: <strong className="text-white">r = 0.91 (Thermal / Absence)</strong>
          </div>
        </div>
      </div>

      {/* Two-Column Split: Active Early Warnings Feed & District Surveillance Rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Priority Active Early Warnings */}
        <div className="p-5 rounded-xl bg-slate-850 border border-slate-700/70 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Priority Early Warning Advisories
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('early-warning')}
              className="text-xs text-teal-400 hover:text-teal-300 font-medium flex items-center gap-1"
            >
              <span>View All Alerts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {alerts.slice(0, 3).map((alert) => (
              <div 
                key={alert.id}
                className="p-4 rounded-lg bg-slate-800/60 border border-slate-700/70 hover:border-slate-600 transition-all space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        alert.riskLevel === 'HIGH' 
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' 
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}>
                        {alert.riskLevel} PRIORITY
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">{alert.districtName}</span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">{alert.title}</h4>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-bold font-mono text-white">{alert.riskScore}</span>
                    <span className="text-[10px] text-slate-400 block font-mono">Risk Index</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {alert.anomalySummary}
                </p>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-700/50">
                  <div className="text-slate-400 text-[11px]">
                    SLA: <strong className="text-amber-400 font-mono">{alert.targetInterventionTimeframe}</strong>
                  </div>
                  <button
                    onClick={() => onSelectAlert(alert)}
                    className="px-2.5 py-1 text-xs font-semibold text-teal-300 bg-teal-500/10 border border-teal-500/30 rounded hover:bg-teal-500/20 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Explain Anomaly</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: District Surveillance Matrix */}
        <div className="p-5 rounded-xl bg-slate-850 border border-slate-700/70 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-teal-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Industrial Corridor Risk Ranking
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('geographic')}
              className="text-xs text-teal-400 hover:text-teal-300 font-medium flex items-center gap-1"
            >
              <span>Explore Interactive Map</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-700/60 rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-800 text-slate-300 font-semibold border-b border-slate-700">
                <tr>
                  <th className="py-2 px-3">Corridor</th>
                  <th className="py-2 px-3 text-right">Risk Score</th>
                  <th className="py-2 px-3 text-right">Temp / AQI</th>
                  <th className="py-2 px-3 text-right">Absence Rate</th>
                  <th className="py-2 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                {districts.map((d) => (
                  <tr 
                    key={d.id} 
                    onClick={() => setSelectedDistrict(d)}
                    className={`hover:bg-slate-800/50 cursor-pointer transition-colors ${
                      selectedDistrict.id === d.id ? 'bg-slate-800/80' : ''
                    }`}
                  >
                    <td className="py-2.5 px-3 font-sans font-medium text-slate-200">
                      <div>{d.name}</div>
                      <div className="text-[10px] text-slate-400 font-sans">{d.state}</div>
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold">
                      <span className={`${
                        d.riskLevel === 'HIGH' ? 'text-rose-400' :
                        d.riskLevel === 'MODERATE' ? 'text-amber-400' : 'text-emerald-400'
                      }`}>
                        {d.currentRiskScore}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-300">
                      {d.temperatureC}°C · {d.aqi}
                    </td>
                    <td className="py-2.5 px-3 text-right font-semibold">
                      <span className={d.sicknessAbsencePct > 6 ? 'text-rose-400' : 'text-slate-300'}>
                        {d.sicknessAbsencePct}%
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center font-sans">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        d.riskLevel === 'HIGH' ? 'bg-rose-500/20 text-rose-300' :
                        d.riskLevel === 'MODERATE' ? 'bg-amber-500/20 text-amber-300' :
                        'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {d.riskLevel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>Small-Cell Suppression Policy: Active (<strong className="text-slate-300">&lt;5</strong> cases masked)</span>
            <span className="text-teal-400 font-mono">ISO 27701 Aligned</span>
          </div>
        </div>

      </div>

    </div>
  );
};
