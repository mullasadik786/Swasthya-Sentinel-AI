import React, { useState } from 'react';
import { 
  X, 
  Play, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  ShieldAlert, 
  Thermometer, 
  Users, 
  Activity, 
  CheckCircle2, 
  AlertTriangle,
  Info
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface SimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyScenarioToDashboard: () => void;
}

export const SimulationModal: React.FC<SimulationModalProps> = ({
  isOpen,
  onClose,
  onApplyScenarioToDashboard,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 6;

  if (!isOpen) return null;

  // Step definitions based on Prompt Specification Section 6
  const steps = [
    {
      step: 1,
      phase: 'Normal Baseline Operations',
      title: 'Baseline Surveillance in Surat Industrial Corridor',
      description: 'Atmospheric conditions and workforce health parameters operate within standard seasonal parameters. Hospital visits and workplace absence reflect expected statistical variations.',
      metrics: {
        temp: '36.5 °C',
        humidity: '52%',
        wbgt: '28.2 °C',
        absence: '3.2%',
        heatVisits: '6 cases/day',
        riskScore: 28,
        riskLevel: 'LOW',
        statusText: 'Nominal Baseline Monitoring'
      },
      signals: [
        { label: 'Ambient Temperature', val: 'Normal (36.5°C)', status: 'normal' },
        { label: 'Wet-Bulb Globe Temp (WBGT)', val: 'Safe (<29°C)', status: 'normal' },
        { label: 'Workforce Sickness Absence', val: '3.2% (Target <3.5%)', status: 'normal' },
        { label: 'Hospital Heat Admissions', val: '6 cases / day', status: 'normal' }
      ]
    },
    {
      step: 2,
      phase: 'Environmental Thermal Inversion',
      title: 'Extreme Heatwave & Humidity Surge Begins',
      description: 'Regional meteorological station and on-site factory telemetry report consecutive spikes in dry bulb temperature reaching 43.4°C with a thermal inversion holding relative humidity at 68%.',
      metrics: {
        temp: '43.4 °C',
        humidity: '68%',
        wbgt: '33.6 °C',
        absence: '4.8%',
        heatVisits: '14 cases/day',
        riskScore: 62,
        riskLevel: 'MODERATE',
        statusText: 'Thermal Threshold Exceeded'
      },
      signals: [
        { label: 'Ambient Temperature', val: 'Severe (+6.9°C anomaly)', status: 'critical' },
        { label: 'WBGT Heat Index', val: '33.6°C (OSHA Red Zone)', status: 'critical' },
        { label: 'Workforce Sickness Absence', val: 'Rising to 4.8%', status: 'warning' },
        { label: 'Hospital Heat Admissions', val: '14 cases / day', status: 'warning' }
      ]
    },
    {
      step: 3,
      phase: 'Clinical & Workforce Escalation',
      title: 'Surge in Aggregated Illness & Shopfloor Sickness Absence',
      description: 'Within 48 hours, aggregated primary health center consultations record an unprecedented spike in dehydration, cramps, and syncope. Absenteeism leaps to 11.4%, paralyzing high-radiant foundry lines.',
      metrics: {
        temp: '43.8 °C',
        humidity: '66%',
        wbgt: '33.8 °C',
        absence: '11.4%',
        heatVisits: '48 cases/day',
        riskScore: 84,
        riskLevel: 'HIGH',
        statusText: 'Critical Multi-Signal Anomaly'
      },
      signals: [
        { label: 'Ambient Temperature', val: 'Sustained 43.8°C', status: 'critical' },
        { label: 'WBGT Heat Index', val: '33.8°C Extreme', status: 'critical' },
        { label: 'Workforce Sickness Absence', val: '11.4% (256% over baseline)', status: 'critical' },
        { label: 'Hospital Heat Admissions', val: '48 cases / day (420% jump)', status: 'critical' }
      ]
    },
    {
      step: 4,
      phase: 'AI Sentinel Early Warning',
      title: 'Multi-Signal Correlation Engine Triggers HIGH Priority Alert',
      description: 'The AI surveillance engine identifies the non-linear coupling between thermal indices and absenteeism (Z-Score +3.82σ). It generates Alert #ALT-2026-0891 with explainable signal contributions.',
      metrics: {
        temp: '43.8 °C',
        humidity: '66%',
        wbgt: '33.8 °C',
        absence: '11.4%',
        heatVisits: '48 cases/day',
        riskScore: 84,
        riskLevel: 'HIGH',
        statusText: 'HIGH Priority Alert Dispatched'
      },
      signals: [
        { label: 'Cross-Signal Correlation (r)', val: 'r = 0.91 (Strong Co-occurrence)', status: 'critical' },
        { label: 'Lead Time Gain', val: '3.8 Days ahead of IDSP reporting', status: 'optimal' },
        { label: 'Data Completeness', val: '96% (1 sensor imputed)', status: 'optimal' },
        { label: 'Assigned Officer', val: 'Workplace OHS Lead & Surat DHO', status: 'optimal' }
      ]
    },
    {
      step: 5,
      phase: 'Targeted Preventive Execution',
      title: 'Rapid Deployment of Preventive Interventions',
      description: 'Mandatory preventive orders executed: 45/15 shaded rest cycles in foundry bays, 18 mist cooling canopies, continuous ORS electrolyte distribution, and rescheduling high-heat pours to dawn.',
      metrics: {
        temp: '42.2 °C',
        humidity: '62%',
        wbgt: '31.2 °C',
        absence: '7.6%',
        heatVisits: '26 cases/day',
        riskScore: 58,
        riskLevel: 'MODERATE',
        statusText: 'Interventions Active & Verified'
      },
      signals: [
        { label: '45/15 Work-Rest Roster', val: '100% Implemented (Verified)', status: 'optimal' },
        { label: 'ORS Hydration Points', val: '24 Stations Operational', status: 'optimal' },
        { label: 'Peak Shift Reschedule', val: 'Pours moved to 05:00 - 10:00', status: 'optimal' },
        { label: 'First-Aid Room Triage', val: 'Active Chilled Saline Infusion', status: 'optimal' }
      ]
    },
    {
      step: 6,
      phase: 'Measurable Stabilization',
      title: 'Risk Curve Flattens & Operational Continuity Restored',
      description: 'Simulated post-intervention response confirms a 64% reduction in clinical heat admissions and absenteeism receding towards 4.1%. Zero severe heat-stroke fatalities were recorded in the cohort.',
      metrics: {
        temp: '38.5 °C',
        humidity: '56%',
        wbgt: '29.1 °C',
        absence: '4.1%',
        heatVisits: '11 cases/day',
        riskScore: 38,
        riskLevel: 'LOW',
        statusText: 'Epidemic Curve Stabilized'
      },
      signals: [
        { label: 'Clinical Heat Reduction', val: '-77% vs Peak Influx', status: 'optimal' },
        { label: 'Workforce Recovery', val: 'Absenteeism down to 4.1%', status: 'optimal' },
        { label: 'Preventable Lost Hours', val: '14,200 Workdays Saved (Est.)', status: 'optimal' },
        { label: 'Statutory Compliance', val: 'Factory Inspectorate Sign-off', status: 'optimal' }
      ]
    }
  ];

  const current = steps[currentStep - 1];

  // Chart data simulating the 6 phases
  const trajectoryData = [
    { phase: 'P1: Baseline', risk: 28, temp: 36.5, absence: 3.2, visits: 6 },
    { phase: 'P2: Inversion', risk: 62, temp: 43.4, absence: 4.8, visits: 14 },
    { phase: 'P3: Crisis Surge', risk: 84, temp: 43.8, absence: 11.4, visits: 48 },
    { phase: 'P4: Sentinel AI', risk: 84, temp: 43.8, absence: 11.4, visits: 48 },
    { phase: 'P5: Intervention', risk: 58, temp: 42.2, absence: 7.6, visits: 26 },
    { phase: 'P6: Stabilized', risk: 38, temp: 38.5, absence: 4.1, visits: 11 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl text-slate-100 overflow-hidden my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-slate-850 border-b border-slate-700/80">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-xs font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                REQUIRED DEMONSTRATION SCENARIO · SECTION 6
              </span>
              <span className="text-xs text-slate-400">Industrial Workforce Heatwave Crisis</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Surat Industrial Corridor Heat-Stress Early Warning & Prevention Simulation
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Phase Step Tracker */}
        <div className="px-6 py-3 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between gap-1 overflow-x-auto text-xs">
          {steps.map((s) => (
            <button
              key={s.step}
              onClick={() => setCurrentStep(s.step)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all whitespace-nowrap cursor-pointer ${
                currentStep === s.step
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold'
                  : currentStep > s.step
                  ? 'text-teal-300 bg-slate-800/80'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-slate-700 text-[10px] flex items-center justify-center font-mono">
                {s.step}
              </span>
              <span>{s.phase}</span>
            </button>
          ))}
        </div>

        {/* Body content */}
        <div className="p-6 space-y-6 max-h-[64vh] overflow-y-auto">
          
          {/* Active Phase Card */}
          <div className="p-4 rounded-lg bg-slate-850 border border-slate-700/70 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
                  Stage {current.step} of {totalSteps}: {current.phase}
                </span>
                <span className="text-slate-500">·</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded font-mono ${
                  current.metrics.riskLevel === 'HIGH'
                    ? 'bg-rose-500/20 text-rose-300'
                    : current.metrics.riskLevel === 'MODERATE'
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-emerald-500/20 text-emerald-300'
                }`}>
                  Risk Score: {current.metrics.riskScore} / 100 ({current.metrics.riskLevel})
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">Status: {current.metrics.statusText}</span>
            </div>

            <h3 className="text-base font-bold text-white">{current.title}</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{current.description}</p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/60 font-mono">
              <span className="text-[11px] text-slate-400 block font-sans">Max Ambient Temp</span>
              <span className="text-lg font-bold text-white flex items-center gap-1">
                <Thermometer className="w-4 h-4 text-rose-400" />
                {current.metrics.temp}
              </span>
              <span className="text-[10px] text-slate-400">WBGT: {current.metrics.wbgt}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/60 font-mono">
              <span className="text-[11px] text-slate-400 block font-sans">Relative Humidity</span>
              <span className="text-lg font-bold text-teal-300">{current.metrics.humidity}</span>
              <span className="text-[10px] text-slate-400">Moisture Inversion</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/60 font-mono">
              <span className="text-[11px] text-slate-400 block font-sans">Sickness Absence</span>
              <span className={`text-lg font-bold flex items-center gap-1 ${
                parseFloat(current.metrics.absence) > 7 ? 'text-rose-400' : 'text-slate-100'
              }`}>
                <Users className="w-4 h-4" />
                {current.metrics.absence}
              </span>
              <span className="text-[10px] text-slate-400">Baseline: 3.2%</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/60 font-mono">
              <span className="text-[11px] text-slate-400 block font-sans">Clinical Heat Influx</span>
              <span className={`text-lg font-bold flex items-center gap-1 ${
                parseFloat(current.metrics.heatVisits) > 20 ? 'text-rose-400' : 'text-slate-100'
              }`}>
                <Activity className="w-4 h-4" />
                {current.metrics.heatVisits}
              </span>
              <span className="text-[10px] text-slate-400">Hospital Inpatient Surge</span>
            </div>
          </div>

          {/* Trajectory Graph across 6 simulation phases */}
          <div className="p-4 rounded-lg bg-slate-850 border border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200">Simulated Trajectory: Risk Score & Absenteeism Curve</span>
              <span className="text-slate-400 font-mono">Phase Progression 1 → 6</span>
            </div>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trajectoryData}>
                  <defs>
                    <linearGradient id="riskGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="absGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                  <XAxis dataKey="phase" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#94a3b8" tick={{ fontSize: 10 }} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }}
                    labelStyle={{ color: '#f1f5f9', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="risk" stroke="#f59e0b" strokeWidth={2} fill="url(#riskGrad)" name="Risk Score (0-100)" />
                  <Area type="monotone" dataKey="absence" stroke="#f43f5e" strokeWidth={2} fill="url(#absGrad)" name="Absence Rate (%)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Measured signals for current phase */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Surveillance Telemetry Feed Status
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {current.signals.map((sig, idx) => (
                <div 
                  key={idx}
                  className="p-2.5 rounded bg-slate-800/40 border border-slate-700 flex items-center justify-between text-xs"
                >
                  <span className="text-slate-300">{sig.label}</span>
                  <span className={`font-mono font-bold ${
                    sig.status === 'critical' ? 'text-rose-400' :
                    sig.status === 'warning' ? 'text-amber-400' :
                    sig.status === 'optimal' ? 'text-emerald-400' : 'text-slate-300'
                  }`}>
                    {sig.val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Scientific Disclaimer as specified in prompt */}
          <div className="p-3 rounded bg-slate-800/20 border border-slate-700/40 flex items-start gap-2 text-[11px] text-slate-400">
            <Info className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <p>
              <strong>Demonstration Disclaimer: </strong>
              All simulated scenarios, risk indicators, and post-intervention stabilization metrics are calibrated synthetic demonstration data. They illustrate surveillance engine mechanisms and are not presented as real-world clinical patient outcomes.
            </p>
          </div>

        </div>

        {/* Footer Navigation */}
        <div className="p-4 bg-slate-850 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={() => setCurrentStep(1)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Simulation</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              disabled={currentStep === 1}
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
              className="flex items-center gap-1 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed rounded transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Stage</span>
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={() => setCurrentStep((prev) => Math.min(totalSteps, prev + 1))}
                className="flex items-center gap-1 px-4 py-1.5 text-xs font-semibold text-amber-950 bg-amber-400 hover:bg-amber-300 rounded transition-colors cursor-pointer"
              >
                <span>Advance to Stage {currentStep + 1}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  onApplyScenarioToDashboard();
                  onClose();
                }}
                className="flex items-center gap-1 px-4 py-1.5 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Apply Scenario State to Live Dashboard</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
