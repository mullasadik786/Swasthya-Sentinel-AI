import React, { useState } from 'react';
import { 
  Users, 
  ShieldAlert, 
  Activity, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  FileCheck, 
  Lock, 
  TrendingUp, 
  Building2 
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from 'recharts';
import { DailyObservation, DistrictMetric } from '../../types';

interface WorkforceHealthTabProps {
  observations: DailyObservation[];
  districts: DistrictMetric[];
  selectedDistrict: DistrictMetric;
  setSelectedDistrict: (d: DistrictMetric) => void;
  onNavigateTab: (tab: string) => void;
}

export const WorkforceHealthTab: React.FC<WorkforceHealthTabProps> = ({
  observations,
  districts,
  selectedDistrict,
  setSelectedDistrict,
  onNavigateTab,
}) => {
  const latest = observations[observations.length - 1];

  // Plant floor zone breakdown in selected corridor (e.g. Surat)
  const zoneHealth = [
    { zone: 'Foundry & Heavy Casting (Bay 1-4)', activeCount: 14200, absenceRate: 14.8, incidents: 8, status: 'CRITICAL_HEAT' },
    { zone: 'Chemical Synthesis & Reaction Units', activeCount: 9800, absenceRate: 11.2, incidents: 3, status: 'HIGH_EXPOSURE' },
    { zone: 'Textile Weaving & Finishing Sheds', activeCount: 22400, absenceRate: 8.6, incidents: 2, status: 'MODERATE_FATIGUE' },
    { zone: 'Precision Machine Shops (HVAC)', activeCount: 18600, absenceRate: 3.4, incidents: 0, status: 'NORMAL' },
    { zone: 'Logistics, Warehousing & Freight Yard', activeCount: 11500, absenceRate: 9.8, incidents: 4, status: 'HIGH_HEAT' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Title & Ethical Anti-Punitive Charter */}
      <div className="p-5 rounded-xl bg-slate-850 border border-slate-700/70 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
              <Users className="w-4 h-4 text-teal-400" />
              Module B · Aggregated Workforce Health & Occupational Safety
            </div>
            <h1 className="text-xl font-bold text-white mt-1">
              Shopfloor Absenteeism Trends & Thermal Stress Tracking
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl mt-0.5">
              Monitoring aggregated sickness absence, lost workdays, and ergonomic heat observations across industrial operational clusters.
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
              aria-label="Select Monitoring Corridor"
            >
              {districts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.state})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Mandatory Ethical Privacy & Non-Punitive Notice as specified in Section 3 Module I */}
        <div className="p-3.5 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-start gap-2.5 text-xs text-slate-300">
          <Lock className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <strong className="text-teal-300">Mandatory Privacy & Ethical Workforce Charter (Module I): </strong>
            <p className="leading-relaxed">
              This platform processes <strong>strictly aggregated</strong> shift-level indicators. Individual employee health histories, diagnosis records, and personally identifiable information (PII) are strictly suppressed. In accordance with platform governance, workforce health analytics <strong>shall never be utilized for punitive actions, discriminatory profiling, or individual employment decisions</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Workforce KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-xl bg-slate-850 border border-slate-700/70 font-mono">
          <span className="text-xs text-slate-400 block font-sans">Active Monitored Workforce</span>
          <div className="text-2xl font-bold text-white pt-1">
            {selectedDistrict.workforceCount.toLocaleString()}
          </div>
          <span className="text-[10px] text-teal-400 block pt-1 font-sans">
            Shift-aggregated turnstiles
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-850 border border-slate-700/70 font-mono">
          <span className="text-xs text-slate-400 block font-sans">Aggregated Sickness Absence</span>
          <div className="text-2xl font-bold text-rose-400 pt-1">
            {selectedDistrict.sicknessAbsencePct} %
          </div>
          <span className="text-[10px] text-rose-300 font-semibold block pt-1 font-sans">
            +256% vs baseline ({selectedDistrict.baselineAbsencePct}%)
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-850 border border-slate-700/70 font-mono">
          <span className="text-xs text-slate-400 block font-sans">Heat-Stress First-Aid Reports</span>
          <div className="text-2xl font-bold text-amber-400 pt-1">
            {latest?.heatStressObservationCount || 28} cases
          </div>
          <span className="text-[10px] text-slate-400 block pt-1 font-sans">
            Dehydration & thermal fatigue
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-850 border border-slate-700/70 font-mono">
          <span className="text-xs text-slate-400 block font-sans">Estimated Lost Workdays</span>
          <div className="text-2xl font-bold text-white pt-1">
            {latest?.lostWorkdays.toLocaleString() || '3,700'} days
          </div>
          <span className="text-[10px] text-slate-400 block pt-1 font-sans">
            Productivity exposure index
          </span>
        </div>

      </div>

      {/* Sickness Absence 30-Day Trend Chart */}
      <div className="p-5 rounded-xl bg-slate-850 border border-slate-700/70 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-rose-400" />
              <span>30-Day Sickness Absence Rate vs Established Operational Baseline (%)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Correlating daily shift absenteeism against 3.2% seasonal moving baseline in {selectedDistrict.name}.
            </p>
          </div>
        </div>

        <div className="h-64 sm:h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={observations}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="date" stroke="#94a3b8" tick={{ fontSize: 10 }} tickFormatter={(d) => d.slice(5)} />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 10 }} domain={[0, 16]} unit="%" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }}
                labelStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
              />
              <Bar 
                dataKey="sicknessAbsenceRatePct" 
                fill="#f43f5e" 
                radius={[4, 4, 0, 0]} 
                name="Sickness Absence Rate (%)" 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Operational Zone Health Matrix */}
      <div className="p-5 rounded-xl bg-slate-850 border border-slate-700/70 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-teal-400" />
            Operational Sector Vulnerability Breakdown ({selectedDistrict.name})
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">Aggregated Plant Units</span>
        </div>

        <div className="overflow-x-auto border border-slate-700 rounded-lg">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800 text-slate-300 font-semibold border-b border-slate-700">
              <tr>
                <th className="py-2.5 px-3">Operational Zone</th>
                <th className="py-2.5 px-3 text-right">Workforce Count</th>
                <th className="py-2.5 px-3 text-right">Sickness Absence</th>
                <th className="py-2.5 px-3 text-right">Heat Incidents</th>
                <th className="py-2.5 px-3 text-center">Exposure Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono">
              {zoneHealth.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40">
                  <td className="py-2.5 px-3 font-sans font-medium text-slate-200">
                    {row.zone}
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-400">
                    {row.activeCount.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold">
                    <span className={row.absenceRate > 8 ? 'text-rose-400' : 'text-slate-200'}>
                      {row.absenceRate}%
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right text-amber-400 font-semibold">
                    {row.incidents}
                  </td>
                  <td className="py-2.5 px-3 text-center font-sans">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      row.status.includes('CRITICAL') ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                      row.status.includes('HIGH') ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      row.status.includes('MODERATE') ? 'bg-amber-500/10 text-amber-400' :
                      'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {row.status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
