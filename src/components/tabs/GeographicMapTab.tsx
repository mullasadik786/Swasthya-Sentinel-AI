import React, { useState } from 'react';
import { 
  MapPin, 
  ShieldAlert, 
  Wind, 
  Users, 
  Thermometer, 
  Activity, 
  Layers, 
  Lock, 
  AlertTriangle,
  Info,
  CheckCircle2
} from 'lucide-react';
import { DistrictMetric } from '../../types';
import { formatPrivacyCell } from '../../utils/analyticsEngine';

interface GeographicMapTabProps {
  districts: DistrictMetric[];
  selectedDistrict: DistrictMetric;
  setSelectedDistrict: (d: DistrictMetric) => void;
  onNavigateTab: (tab: string) => void;
}

export const GeographicMapTab: React.FC<GeographicMapTabProps> = ({
  districts,
  selectedDistrict,
  setSelectedDistrict,
  onNavigateTab,
}) => {
  const [activeLayer, setActiveLayer] = useState<'risk' | 'thermal' | 'aqi' | 'workforce'>('risk');
  const [regionFilter, setRegionFilter] = useState<'ALL' | 'WEST' | 'NORTH' | 'SOUTH'>('ALL');

  const filteredDistricts = districts.filter((d) => {
    if (regionFilter === 'WEST') return ['Gujarat', 'Maharashtra'].includes(d.state);
    if (regionFilter === 'NORTH') return ['Delhi NCR'].includes(d.state);
    if (regionFilter === 'SOUTH') return ['Telangana', 'Andhra Pradesh', 'Tamil Nadu', 'Karnataka'].includes(d.state);
    return true;
  });

  const getDistrictMarkerColor = (d: DistrictMetric) => {
    if (activeLayer === 'risk') {
      if (d.riskLevel === 'HIGH') return '#f43f5e'; // Rose
      if (d.riskLevel === 'MODERATE') return '#f59e0b'; // Amber
      return '#10b981'; // Emerald
    }
    if (activeLayer === 'thermal') {
      if (d.temperatureC >= 42) return '#ef4444';
      if (d.temperatureC >= 38) return '#f97316';
      return '#38bdf8';
    }
    if (activeLayer === 'aqi') {
      if (d.aqi >= 300) return '#a855f7'; // Purple (Severe)
      if (d.aqi >= 150) return '#f59e0b';
      return '#10b981';
    }
    if (activeLayer === 'workforce') {
      if (d.sicknessAbsencePct >= 8) return '#f43f5e';
      if (d.sicknessAbsencePct >= 5) return '#f59e0b';
      return '#10b981';
    }
    return '#14b8a6';
  };

  return (
    <div className="space-y-6">
      
      {/* Title & Privacy-Preserving Notice */}
      <div className="p-5 rounded-xl bg-slate-850 border border-slate-700/70 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-teal-400" />
              Module E · Geographic Risk Intelligence & Spatial Cluster Surveillance
            </div>
            <h1 className="text-xl font-bold text-white mt-1">
              National & Industrial Corridor Epidemiological Heatmap
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl mt-0.5">
              Aggregated district and industrial perimeter intelligence. Small-cell suppression active to guarantee non-re-identification.
            </p>
          </div>

          {/* Layer toggles */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-800 rounded-lg border border-slate-700 text-xs">
            <span className="text-[11px] text-slate-400 px-2 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-teal-400" />
              Layer:
            </span>
            <button
              onClick={() => setActiveLayer('risk')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                activeLayer === 'risk' ? 'bg-slate-700 text-teal-300 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Overall Risk
            </button>
            <button
              onClick={() => setActiveLayer('thermal')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                activeLayer === 'thermal' ? 'bg-slate-700 text-orange-300 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              WBGT Heat
            </button>
            <button
              onClick={() => setActiveLayer('aqi')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                activeLayer === 'aqi' ? 'bg-slate-700 text-purple-300 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Air Quality
            </button>
            <button
              onClick={() => setActiveLayer('workforce')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                activeLayer === 'workforce' ? 'bg-slate-700 text-rose-300 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Absenteeism
            </button>
          </div>
        </div>

        {/* Region Cluster filter buttons */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-700/60 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Cluster Filter:</span>
            <div className="flex items-center gap-1">
              {(['ALL', 'WEST', 'NORTH', 'SOUTH'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRegionFilter(r)}
                  className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                    regionFilter === r 
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 font-semibold' 
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {r === 'ALL' ? 'All India (8 Corridors)' : r === 'WEST' ? 'Western Belt (Gujarat/Maha)' : r === 'NORTH' ? 'Northern Belt (NCR)' : 'Southern Corridor'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-400 text-[11px] font-mono">
            <Lock className="w-3.5 h-3.5 text-teal-400" />
            <span>Small-Cell Protection: Counts &lt;5 suppressed</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Map & Details Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive Vector Map (7 Cols) */}
        <div className="lg:col-span-7 p-5 rounded-xl bg-slate-850 border border-slate-700/70 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <span>Spatial Surveillance Grid</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400 capitalize">Active: {activeLayer} Layer</span>
            </span>
            <span className="text-[11px] text-slate-400 font-mono">SVG Coordinate Precision</span>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative w-full h-[420px] sm:h-[460px] bg-slate-900 rounded-lg border border-slate-800 overflow-hidden flex items-center justify-center">
            
            {/* Background Grid Lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>

            <svg viewBox="0 0 600 650" className="w-full h-full p-4">
              
              {/* Stylized Geo Boundaries of India Outline */}
              <path
                d="M 280,60 
                   C 320,80 340,110 355,140 
                   C 380,160 410,180 430,200 
                   C 460,210 500,200 520,230 
                   C 540,250 510,270 480,280 
                   C 460,300 480,340 450,380 
                   C 430,420 400,470 380,530 
                   C 365,560 350,590 345,610 
                   C 335,580 315,530 290,470 
                   C 265,420 240,380 230,340 
                   C 215,310 190,290 200,260 
                   C 220,240 240,220 250,180 
                   C 260,140 250,90 280,60 Z"
                fill="#0f172a"
                stroke="#334155"
                strokeWidth="2"
                strokeLinejoin="round"
                className="transition-colors"
              />

              {/* Major Maritime & Shoreline accents */}
              <path
                d="M 230,340 C 240,380 265,420 290,470 C 315,530 335,580 345,610"
                fill="none"
                stroke="#14b8a6"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.4"
              />
              <path
                d="M 450,380 C 430,420 400,470 380,530 C 365,560 350,590 345,610"
                fill="none"
                stroke="#14b8a6"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.4"
              />

              {/* District & Industrial Corridor Markers */}
              {filteredDistricts.map((d) => {
                const color = getDistrictMarkerColor(d);
                const isSelected = selectedDistrict.id === d.id;
                return (
                  <g 
                    key={d.id} 
                    transform={`translate(${d.coordinates.x}, ${d.coordinates.y})`}
                    onClick={() => setSelectedDistrict(d)}
                    className="cursor-pointer group"
                  >
                    {/* Pulsing ring for high risk */}
                    {d.riskLevel === 'HIGH' && (
                      <circle 
                        r="18" 
                        fill={color} 
                        opacity="0.25" 
                        className="animate-ping"
                      />
                    )}

                    {/* Selection outer aura */}
                    {isSelected && (
                      <circle 
                        r="16" 
                        fill="none" 
                        stroke="#38bdf8" 
                        strokeWidth="2" 
                        strokeDasharray="3 3"
                      />
                    )}

                    {/* Base marker circle */}
                    <circle 
                      r="9" 
                      fill={color} 
                      stroke="#0f172a" 
                      strokeWidth="2.5" 
                      className="transition-transform group-hover:scale-125"
                    />

                    {/* Numeric Risk label */}
                    <text
                      y="3.5"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="monospace"
                      pointerEvents="none"
                    >
                      {activeLayer === 'risk' ? d.currentRiskScore : 
                       activeLayer === 'thermal' ? Math.round(d.temperatureC) : 
                       activeLayer === 'aqi' ? d.aqi : 
                       `${d.sicknessAbsencePct}%`}
                    </text>

                    {/* Pin Name Label */}
                    <text
                      x="14"
                      y="4"
                      fill={isSelected ? '#38bdf8' : '#e2e8f0'}
                      fontSize="10"
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      fontFamily="system-ui"
                      className="pointer-events-none drop-shadow-md"
                    >
                      {d.name.split(' ')[0]}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Map Legend */}
            <div className="absolute bottom-3 left-3 bg-slate-900/90 border border-slate-700/80 p-2.5 rounded-lg text-[10px] space-y-1 font-mono">
              <span className="font-bold text-slate-300 block font-sans">Surveillance Legend</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span>High Priority Cluster (Z &gt; 2.5σ)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span>Moderate Observation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>Baseline Stable</span>
              </div>
            </div>

            {/* Geographic Limitation Transparency Tag */}
            <div className="absolute top-3 right-3 bg-slate-900/90 border border-slate-700/80 p-2 rounded-lg text-[10px] text-slate-400 flex items-center gap-1">
              <Info className="w-3 h-3 text-teal-400" />
              <span>Location: Aggregated District Level</span>
            </div>
          </div>
        </div>

        {/* Right Column: Selected Corridor Detail Drawer (5 Cols) */}
        <div className="lg:col-span-5 p-5 rounded-xl bg-slate-850 border border-slate-700/70 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                selectedDistrict.riskLevel === 'HIGH' 
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' 
                  : selectedDistrict.riskLevel === 'MODERATE'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}>
                {selectedDistrict.riskLevel} PRIORITY CORRIDOR
              </span>
              <h2 className="text-lg font-bold text-white mt-1">{selectedDistrict.name}</h2>
              <div className="text-xs text-slate-400">{selectedDistrict.state} · Geo Coordinates: {selectedDistrict.coordinates.lat}° N, {selectedDistrict.coordinates.lng}° E</div>
            </div>
            <div className="p-2.5 rounded bg-slate-800 border border-slate-700 text-right font-mono">
              <span className="text-[10px] text-slate-400 block font-sans">Risk Score</span>
              <span className="text-xl font-bold text-white">{selectedDistrict.currentRiskScore}</span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300">
            <strong className="text-teal-300">Primary Surveillance Factor: </strong>
            {selectedDistrict.primaryRiskFactor}
          </div>

          {/* Metric Quad */}
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700 space-y-0.5">
              <span className="text-slate-400 block font-sans text-[11px]">Ambient Peak / WBGT</span>
              <span className="text-base font-bold text-white">{selectedDistrict.temperatureC} °C</span>
              <span className="text-[10px] text-orange-400 block">WBGT: {selectedDistrict.wbgtC} °C</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700 space-y-0.5">
              <span className="text-slate-400 block font-sans text-[11px]">Air Quality (AQI)</span>
              <span className="text-base font-bold text-teal-300">{selectedDistrict.aqi}</span>
              <span className="text-[10px] text-slate-400 block">Relative Humidity: {selectedDistrict.relativeHumidity}%</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700 space-y-0.5">
              <span className="text-slate-400 block font-sans text-[11px]">Sickness Absence</span>
              <span className={`text-base font-bold ${selectedDistrict.sicknessAbsencePct > 6 ? 'text-rose-400' : 'text-slate-200'}`}>
                {selectedDistrict.sicknessAbsencePct} %
              </span>
              <span className="text-[10px] text-slate-400 block">Baseline: {selectedDistrict.baselineAbsencePct}%</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700 space-y-0.5">
              <span className="text-slate-400 block font-sans text-[11px]">Industrial Workforce</span>
              <span className="text-base font-bold text-white">
                {selectedDistrict.workforceCount.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400 block">Monitored Shifts</span>
            </div>
          </div>

          {/* Action trigger */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => onNavigateTab('early-warning')}
              className="w-full py-2 px-3 text-xs font-bold text-teal-300 bg-teal-500/15 hover:bg-teal-500/25 border border-teal-500/30 rounded-lg transition-colors cursor-pointer text-center"
            >
              Inspect Active Alerts in {selectedDistrict.name}
            </button>
            <button
              onClick={() => onNavigateTab('environmental')}
              className="w-full py-2 px-3 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer text-center"
            >
              View Environmental Sensor Telemetry
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
