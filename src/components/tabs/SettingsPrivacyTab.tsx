import React, { useState } from 'react';
import { 
  Settings, 
  Lock, 
  ShieldCheck, 
  UserCheck, 
  Sliders, 
  Trash2, 
  Database, 
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  RefreshCw 
} from 'lucide-react';
import { UserRole } from '../../types';

interface SettingsPrivacyTabProps {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

export const SettingsPrivacyTab: React.FC<SettingsPrivacyTabProps> = ({
  userRole,
  setUserRole,
}) => {
  const [suppressionThreshold, setSuppressionThreshold] = useState<number>(5);
  const [retentionPolicy, setRetentionPolicy] = useState<'30' | '90' | '365'>('90');
  const [zScoreSensitivity, setZScoreSensitivity] = useState<number>(2.5);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const roles = [
    {
      id: 'dho' as UserRole,
      title: 'District Health Officer (DHO) / Public Health Authority',
      scope: 'District-wide aggregated clinical surveillance, public health emergency advisories, PHC triage orders.',
      privacyLevel: 'Aggregated Health Data · Small-Cell Protected'
    },
    {
      id: 'safety_lead' as UserRole,
      title: 'Workplace Health & Safety Manager (OHS)',
      scope: 'Factory floor thermal indices, work-rest scheduling, industrial hygiene mitigation, zero PII access.',
      privacyLevel: 'Occupational Aggregate · Zero Individual Medical Records'
    },
    {
      id: 'state_epi' as UserRole,
      title: 'State Epidemiologist / MoHFW Directorate',
      scope: 'Cross-district epidemic trends, policy allocation, state disaster coordination, macro backtesting.',
      privacyLevel: 'State Macro Analytics'
    },
    {
      id: 'compliance' as UserRole,
      title: 'Privacy & Data Protection Compliance Officer',
      scope: 'Small-cell suppression audit, k-anonymity verification, audit log verification, data retention oversight.',
      privacyLevel: 'Security & Privacy Administration'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Title & Privacy By Design Constitution Header */}
      <div className="p-5 rounded-xl bg-slate-850 border border-slate-700/70 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
              <Lock className="w-4 h-4 text-teal-400" />
              Module I · Privacy By Design & Security Architecture
            </div>
            <h1 className="text-xl font-bold text-white mt-1">
              Privacy Governance, Small-Cell Suppression & Access Control
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl mt-0.5">
              Enforcing k-anonymity, small-cell suppression, zero individual medical exposure, and tamper-evident operational audit logs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-mono font-bold bg-teal-500/15 border border-teal-500/40 text-teal-300 rounded-lg flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>DPDP Act 2023 & ISO 27701 Compliant</span>
            </span>
          </div>
        </div>
      </div>

      {/* Save alert banner */}
      {isSaved && (
        <div className="p-3 bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-semibold rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-teal-400" />
          <span>Surveillance thresholds and privacy parameters updated successfully.</span>
        </div>
      )}

      {/* Role-Based Access Control (RBAC) Section */}
      <div className="p-6 rounded-xl bg-slate-850 border border-slate-700/70 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-teal-400" />
            Active Role-Based Access Control (RBAC) Profile
          </h2>
          <span className="text-xs text-slate-400 font-mono">Current: {userRole.toUpperCase()}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {roles.map((r) => {
            const isCurrent = userRole === r.id;
            return (
              <div
                key={r.id}
                onClick={() => setUserRole(r.id)}
                className={`p-4 rounded-lg border transition-all cursor-pointer space-y-2 ${
                  isCurrent
                    ? 'bg-slate-800 border-teal-400/80 shadow-md ring-1 ring-teal-400/30'
                    : 'bg-slate-800/40 border-slate-700/70 hover:border-slate-600'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs font-bold text-white">{r.title}</div>
                  {isCurrent && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40">
                      ACTIVE
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{r.scope}</p>
                <div className="text-[11px] text-teal-400 font-mono pt-1 border-t border-slate-700/40">
                  {r.privacyLevel}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Privacy By Design Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Small-Cell Suppression & Data Minimization */}
        <div className="p-6 rounded-xl bg-slate-850 border border-slate-700/70 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            Small-Cell Suppression & K-Anonymity Rules
          </h2>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex items-center justify-between text-slate-300 mb-1">
                <span className="font-semibold">Small-Cell Count Suppression Threshold</span>
                <span className="font-mono text-teal-400 font-bold">&lt; {suppressionThreshold} Cases</span>
              </div>
              <input
                type="range"
                min="3"
                max="10"
                value={suppressionThreshold}
                onChange={(e) => setSuppressionThreshold(Number(e.target.value))}
                className="w-full accent-teal-400 cursor-pointer"
              />
              <span className="text-[11px] text-slate-400 block pt-1">
                Any health incidence count strictly below {suppressionThreshold} is automatically masked to prevent demographic cross-linking or re-identification of patients in small shift cohorts.
              </span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <div className="font-bold text-white">Ethical Non-Punitive Workforce Guarantee:</div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Under platform security policy, employer and OHS dashboards receive strictly anonymized shift-level aggregates. Individual medical complaints are never stored in plain-text or exposed to supervisory teams.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Surveillance Engine Thresholds & Data Retention */}
        <div className="p-6 rounded-xl bg-slate-850 border border-slate-700/70 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            Surveillance Calibration & Data Retention Policy
          </h2>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex items-center justify-between text-slate-300 mb-1">
                <span className="font-semibold">Early Warning Anomaly Sensitivity (Z-Score Threshold)</span>
                <span className="font-mono text-amber-400 font-bold">Z ≥ +{zScoreSensitivity}σ</span>
              </div>
              <input
                type="range"
                min="1.5"
                max="3.5"
                step="0.1"
                value={zScoreSensitivity}
                onChange={(e) => setZScoreSensitivity(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <span className="text-[11px] text-slate-400 block pt-1">
                Standard epidemiological baseline: Z &gt; 2.5 flags top 0.6% statistical outliers as priority early warnings.
              </span>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Configurable Data Retention Policy</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '30', label: '30 Days', desc: 'Active Emergency' },
                  { id: '90', label: '90 Days', desc: 'Quarterly Audit (Default)' },
                  { id: '365', label: '1 Year', desc: 'Annual Regulatory Review' }
                ].map((ret) => (
                  <button
                    key={ret.id}
                    onClick={() => setRetentionPolicy(ret.id as any)}
                    className={`p-2.5 rounded border text-left cursor-pointer transition-colors ${
                      retentionPolicy === ret.id
                        ? 'bg-slate-800 border-teal-400 text-teal-300 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs">{ret.label}</div>
                    <div className="text-[10px] text-slate-400">{ret.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Save Settings Footer */}
      <div className="p-4 bg-slate-850 rounded-xl border border-slate-700/70 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          Parameters are verified against Indian Digital Personal Data Protection (DPDP) Act standards.
        </span>
        <button
          onClick={handleSave}
          className="px-5 py-2 bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs font-bold rounded-lg transition-colors cursor-pointer"
        >
          Save Privacy & Surveillance Configuration
        </button>
      </div>

    </div>
  );
};
