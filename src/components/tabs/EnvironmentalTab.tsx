import React, { useState } from 'react';
import { 
  Wind, 
  Thermometer, 
  Droplets, 
  Sun, 
  CloudRain, 
  AlertTriangle, 
  CheckCircle2, 
  Waves,
  ShieldCheck,
  TrendingUp 
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { DailyObservation, DistrictMetric } from '../../types';

interface EnvironmentalTabProps {
  observations: DailyObservation[];
  districts: DistrictMetric[];
  selectedDistrict: DistrictMetric;
  setSelectedDistrict: (d: DistrictMetric) => void;
}

export const EnvironmentalTab: React.FC<EnvironmentalTabProps> = ({
  observations,
  districts,
  selectedDistrict,
  setSelectedDistrict,
}) => {
  const [metricView, setMetricView] = useState<'thermal' | 'aqi' | 'water'>('thermal');

  const latest = observations[observations.length - 1];

  return (
    <div className="space-y-6">
      
      {/* Title & Sensor Telemetry Overview */}
      <div className="p-5 rounded-xl bg-slate-850 border border-slate-700/70 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
              <Wind className="w-4 h-4 text-teal-400" />
              Module B · Environmental Exposure & Atmospheric Surveillance
            </div>
            <h1 className="text-xl font-bold text-white mt-1">
              Multi-Source Ambient Telemetry & Industrial Exposure Feeds
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl mt-0.5">
              Integrating Automated Weather Stations (AWS), Central Pollution Control Board (CPCB) continuous air monitors, and water supply turbidity sensors.
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

        {/* View toggles */}
        <div className="flex items-center gap-1.5 pt-2 border-t border-slate-700/60 text-xs">
          <span className="text-slate-400">Surveillance Dimension:</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setMetricView('thermal')}
              className={`px-3 py-1 rounded text-xs transition-colors cursor-pointer ${
                metricView === 'thermal'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Thermal Exposure & WBGT
            </button>
            <button
              onClick={() => setMetricView('aqi')}
              className={`px-3 py-1 rounded text-xs transition-colors cursor-pointer ${
                metricView === 'aqi'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 font-semibold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Particulate Air Quality (AQI / PM2.5)
            </button>
            <button
              onClick={() => setMetricView('water')}
              className={`px-3 py-1 rounded text-xs transition-colors cursor-pointer ${
                metricView === 'water'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Hydrological & Turbidity Telemetry
            </button>
          </div>
        </div>
      </div>

      {/* 4 Environmental KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-xl bg-slate-850 border border-slate-700/70 font-mono">
          <span className="text-xs text-slate-400 block font-sans">Ambient Peak Temperature</span>
          <div className="text-2xl font-bold text-rose-400 pt-1 flex items-center gap-1">
            <Thermometer className="w-5 h-5" />
            {selectedDistrict.temperatureC} °C
          </div>
          <span className="text-[10px] text-slate-400 block pt-1">
            Historical Mean: 36.5 °C (Z: +3.24σ)
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-850 border border-slate-700/70 font-mono">
          <span className="text-xs text-slate-400 block font-sans">Wet Bulb Globe Temp (WBGT)</span>
          <div className="text-2xl font-bold text-amber-400 pt-1 flex items-center gap-1">
            <Sun className="w-5 h-5" />
            {selectedDistrict.wbgtC} °C
          </div>
          <span className="text-[10px] text-rose-400 font-semibold block pt-1">
            OSHA Red Zone (&gt; 32°C Critical)
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-850 border border-slate-700/70 font-mono">
          <span className="text-xs text-slate-400 block font-sans">Air Quality Index (AQI)</span>
          <div className={`text-2xl font-bold pt-1 flex items-center gap-1 ${
            selectedDistrict.aqi > 250 ? 'text-purple-400' : 'text-teal-300'
          }`}>
            <Wind className="w-5 h-5" />
            {selectedDistrict.aqi}
          </div>
          <span className="text-[10px] text-slate-400 block pt-1">
            PM2.5: {Math.round(selectedDistrict.aqi * 0.58)} µg/m³
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-850 border border-slate-700/70 font-mono">
          <span className="text-xs text-slate-400 block font-sans">Relative Humidity Inversion</span>
          <div className="text-2xl font-bold text-sky-400 pt-1 flex items-center gap-1">
            <Droplets className="w-5 h-5" />
            {selectedDistrict.relativeHumidity} %
          </div>
          <span className="text-[10px] text-slate-400 block pt-1">
            Impedes Sweat Evaporation
          </span>
        </div>

      </div>

      {/* Main Environmental Chart */}
      <div className="p-5 rounded-xl bg-slate-850 border border-slate-700/70 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-teal-400" />
              <span>
                {metricView === 'thermal' ? '30-Day Thermal Inversion: Max Temperature & WBGT Index' :
                 metricView === 'aqi' ? '30-Day Air Quality & Fine Particulate (PM2.5) Spikes' :
                 '30-Day Hydrological Rainfall & Water Turbidity (NTU) Log'}
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Sensor feeds synchronized from automated meteorological telemetry.
            </p>
          </div>
        </div>

        <div className="h-64 sm:h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={observations}>
              <defs>
                <linearGradient id="envGrad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={metricView === 'thermal' ? '#f97316' : metricView === 'aqi' ? '#a855f7' : '#0284c7'} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={metricView === 'thermal' ? '#f97316' : metricView === 'aqi' ? '#a855f7' : '#0284c7'} stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="date" stroke="#94a3b8" tick={{ fontSize: 10 }} tickFormatter={(d) => d.slice(5)} />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 10 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }}
                labelStyle={{ color: '#f8fafc', fontWeight: 'bold' }}
              />
              <Area 
                type="monotone" 
                dataKey={metricView === 'thermal' ? 'temperatureMaxC' : metricView === 'aqi' ? 'aqi' : 'rainfallMm'} 
                stroke={metricView === 'thermal' ? '#f97316' : metricView === 'aqi' ? '#a855f7' : '#0284c7'} 
                strokeWidth={2} 
                fill="url(#envGrad1)" 
                name={metricView === 'thermal' ? 'Max Temp (°C)' : metricView === 'aqi' ? 'AQI Index' : 'Rainfall (mm)'} 
              />
              {metricView === 'thermal' && (
                <Area 
                  type="monotone" 
                  dataKey="wbgtC" 
                  stroke="#fbbf24" 
                  strokeWidth={1.5} 
                  strokeDasharray="4 4" 
                  fill="none" 
                  name="WBGT Index (°C)" 
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Occupational Thermal Stress Standards Reference Table (OSHA / Indian NIOH) */}
      <div className="p-5 rounded-xl bg-slate-850 border border-slate-700/70 space-y-3">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-teal-400" />
          Occupational Thermal Stress Thresholds (OSHA & NIOH India Standard)
        </h3>
        <div className="overflow-x-auto border border-slate-700 rounded-lg">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-800 text-slate-300 font-semibold border-b border-slate-700">
              <tr>
                <th className="py-2.5 px-3">WBGT Range</th>
                <th className="py-2.5 px-3">Hazard Category</th>
                <th className="py-2.5 px-3">Mandated Work-Rest Ratio</th>
                <th className="py-2.5 px-3">Hydration Standard</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono">
              <tr className="hover:bg-slate-800/40">
                <td className="py-2.5 px-3 text-slate-300">&lt; 28.0 °C</td>
                <td className="py-2.5 px-3 text-emerald-400 font-sans">Low / Nominal</td>
                <td className="py-2.5 px-3 text-slate-300 font-sans">Continuous Standard Shift</td>
                <td className="py-2.5 px-3 text-slate-300 font-sans">Standard water access</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="py-2.5 px-3 text-slate-300">28.0 - 31.0 °C</td>
                <td className="py-2.5 px-3 text-amber-400 font-sans">Moderate Thermal Load</td>
                <td className="py-2.5 px-3 text-slate-300 font-sans">50 min work / 10 min shaded rest</td>
                <td className="py-2.5 px-3 text-slate-300 font-sans">500 ml/hr electrolytic solution</td>
              </tr>
              <tr className="hover:bg-slate-800/40 bg-rose-500/5">
                <td className="py-2.5 px-3 text-rose-400 font-bold">&gt; 32.0 °C (Current: 33.6°C)</td>
                <td className="py-2.5 px-3 text-rose-400 font-bold font-sans">Critical Hazard (Active Alert)</td>
                <td className="py-2.5 px-3 text-rose-300 font-bold font-sans">45 min work / 15 min shaded rest</td>
                <td className="py-2.5 px-3 text-rose-300 font-bold font-sans">1,000 ml/hr chilled ORS mandatory</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
