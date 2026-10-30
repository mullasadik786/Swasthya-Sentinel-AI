import React, { useState } from 'react';
import { 
  X, 
  ShieldAlert, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  ArrowUpRight, 
  FileCheck, 
  History, 
  Send,
  Building,
  UserCheck
} from 'lucide-react';
import { HealthAlert, UserRole } from '../types';

interface ExplainableAlertModalProps {
  alert: HealthAlert | null;
  onClose: () => void;
  userRole: UserRole;
  onAcknowledgeAlert: (alertId: string, notes: string) => void;
  onEscalateAlert: (alertId: string, notes: string) => void;
  onOrderIntervention: (alertId: string, actionTitle: string) => void;
}

export const ExplainableAlertModal: React.FC<ExplainableAlertModalProps> = ({
  alert,
  onClose,
  userRole,
  onAcknowledgeAlert,
  onEscalateAlert,
  onOrderIntervention,
}) => {
  const [activeTab, setActiveTab] = useState<'explanation' | 'baseline' | 'actions' | 'audit'>('explanation');
  const [auditNote, setAuditNote] = useState('');
  const [customActionText, setCustomActionText] = useState('');
  const [actionSuccessMessage, setActionSuccessMessage] = useState('');

  if (!alert) return null;

  const handleAcknowledge = () => {
    onAcknowledgeAlert(alert.id, auditNote || 'Alert reviewed and acknowledged by authorized surveillance officer.');
    setAuditNote('');
    setActionSuccessMessage('Alert status updated to ACKNOWLEDGED with official audit entry.');
    setTimeout(() => setActionSuccessMessage(''), 3000);
  };

  const handleEscalate = () => {
    onEscalateAlert(alert.id, auditNote || 'High priority multi-signal risk escalated to State Disaster & Health Directorate.');
    setAuditNote('');
    setActionSuccessMessage('Alert ESCALATED to Tier-2 State Public Health Authority.');
    setTimeout(() => setActionSuccessMessage(''), 3000);
  };

  const handleOrderQuickAction = (actionStr: string) => {
    onOrderIntervention(alert.id, actionStr);
    setActionSuccessMessage(`Intervention ordered: "${actionStr}"`);
    setTimeout(() => setActionSuccessMessage(''), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl text-slate-100 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 bg-slate-850 border-b border-slate-700/80">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className={`px-2.5 py-0.5 text-xs font-bold rounded ${
                alert.riskLevel === 'HIGH' 
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' 
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}>
                {alert.riskLevel} PRIORITY EARLY WARNING
              </span>
              <span className="text-xs text-slate-400 font-mono">ID: {alert.id}</span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                Detected: {alert.detectedAt}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight leading-snug">
              {alert.title}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              <span className="font-semibold text-slate-200">{alert.districtName}</span>
              <span className="text-slate-500">—</span>
              <span className="text-slate-400">{alert.zone}</span>
              <span className="text-slate-500">·</span>
              <span className="text-xs text-slate-400">
                Location Reliability: <strong className="text-slate-300">{alert.locationReliability}</strong>
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action feedback banner */}
        {actionSuccessMessage && (
          <div className="px-6 py-2.5 bg-teal-500/15 border-b border-teal-500/30 text-teal-300 text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
            <span>{actionSuccessMessage}</span>
          </div>
        )}

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-4 px-6 border-b border-slate-800 bg-slate-900/60 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('explanation')}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'explanation'
                ? 'border-teal-400 text-teal-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Explainable Signal Synthesis
          </button>
          <button
            onClick={() => setActiveTab('baseline')}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'baseline'
                ? 'border-teal-400 text-teal-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Historical Baseline Comparison
          </button>
          <button
            onClick={() => setActiveTab('actions')}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'actions'
                ? 'border-teal-400 text-teal-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Preventive Actions & Ownership
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'audit'
                ? 'border-teal-400 text-teal-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Audit Trail & Escalation Log
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 max-h-[62vh] overflow-y-auto space-y-6">

          {/* TAB 1: EXPLAINABLE SYNTHESIS */}
          {activeTab === 'explanation' && (
            <div className="space-y-6">
              {/* Question 1: What was detected? */}
              <div className="p-4 rounded-lg bg-slate-800/60 border border-slate-700/60 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-300 uppercase tracking-wider">
                  <ShieldAlert className="w-4 h-4 text-teal-400" />
                  What Anomaly Was Detected?
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {alert.anomalySummary}
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400 border-t border-slate-700/50">
                  <div>
                    Composite Risk Score: <strong className="text-white font-mono text-sm">{alert.riskScore} / 100</strong>
                  </div>
                  <div>·</div>
                  <div>
                    Detection Confidence: <strong className="text-emerald-400 font-mono">{alert.confidenceScore}%</strong>
                  </div>
                  <div>·</div>
                  <div>
                    Data Completeness: <strong className="text-slate-200 font-mono">{alert.dataCompleteness}%</strong>
                  </div>
                  {alert.missingInputsCount > 0 && (
                    <>
                      <div>·</div>
                      <div className="text-amber-400">
                        {alert.missingInputsCount} sensor feed(s) imputed using temporal regression
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Question 2: Which indicators contributed? */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-teal-400" />
                    Multi-Signal Contribution Breakdown
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    Weighted Bayesian Ensemble & Standard Deviation Deviations (Z-Scores)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {alert.contributingSignals.map((sig, idx) => (
                    <div 
                      key={idx}
                      className="p-3.5 rounded-lg bg-slate-800/40 border border-slate-700/60 flex flex-col justify-between"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <div className="text-xs font-semibold text-white">{sig.signalName}</div>
                          <div className="text-[11px] text-slate-400 capitalize">Category: {sig.category}</div>
                        </div>
                        <span className="text-[11px] font-mono font-bold text-teal-300 bg-teal-500/10 px-1.5 py-0.5 rounded">
                          {sig.weightPct}% weight
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs py-2 my-1 border-y border-slate-700/40 font-mono">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Observed</span>
                          <span className="text-white font-bold">{sig.observedValue}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Baseline</span>
                          <span className="text-slate-300">{sig.baselineValue}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="text-rose-400 font-medium">
                          +{sig.deviationPct}% vs baseline
                        </span>
                        <span className="font-mono text-slate-300 text-[11px]">
                          Z-Score: <strong className="text-amber-400">+{sig.zScore}σ</strong>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Reliability & Limitation Notice */}
              <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/40 text-xs text-slate-400 space-y-1">
                <div className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-teal-400" />
                  Model Calibration & Geolocation Transparency Notice
                </div>
                <p>
                  Risk scores reflect calibrated statistical deviations from established seasonal baselines. In compliance with public health privacy regulations, individual medical records are strictly aggregated to district and industrial sector clusters. Geolocation represents aggregated administrative zones to guarantee small-cell privacy and prevent re-identification.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: HISTORICAL BASELINE COMPARISON */}
          {activeTab === 'baseline' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Historical 30-Day Moving Baseline vs Current Telemetry</h3>
                  <p className="text-xs text-slate-400">Statistical anomalies flagged when observed metric exceeds 2.5 standard deviations.</p>
                </div>
              </div>

              <div className="overflow-x-auto border border-slate-700 rounded-lg">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-800/80 text-slate-300 font-semibold border-b border-slate-700">
                    <tr>
                      <th className="py-2.5 px-4">Surveillance Metric</th>
                      <th className="py-2.5 px-4 text-right">30-Day Baseline</th>
                      <th className="py-2.5 px-4 text-right">Current Observed</th>
                      <th className="py-2.5 px-4 text-right">Variance (Δ%)</th>
                      <th className="py-2.5 px-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono">
                    {alert.baselineComparison.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/30">
                        <td className="py-3 px-4 font-sans font-medium text-slate-200">
                          {row.metric}
                        </td>
                        <td className="py-3 px-4 text-right text-slate-400">
                          {row.baseline} {row.unit}
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-white">
                          {row.current} {row.unit}
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-rose-400">
                          +{row.changePct}%
                        </td>
                        <td className="py-3 px-4 text-center font-sans">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                            Critical Spike
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-3 rounded-lg bg-teal-500/5 border border-teal-500/20 text-xs text-slate-300">
                <strong className="text-teal-300">Epidemiological Note: </strong>
                The convergence of rising thermal exposure (WBGT &gt; 33°C) and clinical heat illness exhibits a Pearson correlation of <strong className="text-white font-mono">r = 0.91</strong> across historic industrial summer shifts.
              </div>
            </div>
          )}

          {/* TAB 3: PREVENTIVE ACTIONS & OWNERSHIP */}
          {activeTab === 'actions' && (
            <div className="space-y-5">
              <div className="p-3.5 rounded-lg bg-slate-800/50 border border-slate-700 space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <UserCheck className="w-4 h-4 text-teal-400" />
                  Primary Operational Ownership Assigned
                </div>
                <div className="text-sm font-bold text-white flex items-center justify-between">
                  <span>{alert.responsibleRole}</span>
                  <span className="text-xs text-amber-400 font-mono">Target SLA: {alert.targetInterventionTimeframe}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Recommended Targeted Preventive Measures
                </h3>
                <div className="space-y-2">
                  {alert.recommendedActions.map((action, idx) => (
                    <div 
                      key={idx}
                      className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/60 flex items-start justify-between gap-4"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 text-xs flex items-center justify-center font-mono font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-xs text-slate-200 leading-relaxed">{action}</p>
                      </div>
                      <button
                        onClick={() => handleOrderQuickAction(action)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-teal-300 bg-teal-500/15 border border-teal-500/30 rounded hover:bg-teal-500/25 transition-colors shrink-0 cursor-pointer"
                      >
                        Order Protocol
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AUDIT TRAIL & ESCALATION */}
          {activeTab === 'audit' && (
            <div className="space-y-4">
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <History className="w-4 h-4 text-teal-400" />
                  Tamper-Evident Operational Audit Log
                </h3>
                <div className="border border-slate-700 rounded-lg divide-y divide-slate-800">
                  {alert.auditTrail.map((log) => (
                    <div key={log.id} className="p-3 text-xs space-y-1">
                      <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
                        <span>{log.timestamp}</span>
                        <span className="font-bold text-teal-300">{log.action}</span>
                      </div>
                      <div className="text-slate-200 font-medium">
                        {log.actor} ({log.role})
                      </div>
                      <div className="text-slate-400 text-[11px] leading-relaxed">
                        {log.notes}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Audit Note / Escalation input */}
              <div className="p-3.5 rounded-lg bg-slate-800/40 border border-slate-700 space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  Add Operational Note or Escalation Directive (Role: {userRole})
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={auditNote}
                    onChange={(e) => setAuditNote(e.target.value)}
                    placeholder="e.g. Field inspection completed; dispatched 5,000 ORS packs..."
                    className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white placeholder-slate-500 outline-none focus:border-teal-400"
                  />
                  <button
                    onClick={handleAcknowledge}
                    className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-xs font-semibold text-white rounded transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Log Entry</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-slate-850 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Alert Status:</span>
            <span className="font-mono font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
              {alert.status}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAcknowledge}
              className="px-4 py-2 text-xs font-semibold text-teal-300 bg-teal-500/20 border border-teal-500/40 rounded-lg hover:bg-teal-500/30 transition-colors cursor-pointer"
            >
              Acknowledge Alert
            </button>
            <button
              onClick={handleEscalate}
              className="px-4 py-2 text-xs font-semibold text-rose-200 bg-rose-600/80 hover:bg-rose-600 rounded-lg transition-colors cursor-pointer"
            >
              Escalate to State Directorate
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
