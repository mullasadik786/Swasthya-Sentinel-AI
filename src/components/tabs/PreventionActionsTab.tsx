import React, { useState } from 'react';
import { 
  CheckSquare, 
  Plus, 
  Filter, 
  Clock, 
  UserCheck, 
  CheckCircle2, 
  AlertTriangle, 
  FileCheck, 
  MapPin, 
  ShieldCheck,
  Send,
  X
} from 'lucide-react';
import { PreventiveAction, AlertCategory, UserRole } from '../../types';

interface PreventionActionsTabProps {
  actions: PreventiveAction[];
  onUpdateActionStatus: (id: string, status: PreventiveAction['status'], proof?: string) => void;
  onAddAction: (action: Omit<PreventiveAction, 'id'>) => void;
  userRole: UserRole;
}

export const PreventionActionsTab: React.FC<PreventionActionsTabProps> = ({
  actions,
  onUpdateActionStatus,
  onAddAction,
  userRole,
}) => {
  const [statusFilter, setStatusFilter] = useState<'ALL' | PreventiveAction['status']>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [selectedActionForProof, setSelectedActionForProof] = useState<PreventiveAction | null>(null);
  const [proofText, setProofText] = useState<string>('');

  // Add Action Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<AlertCategory>('heat_stress');
  const [newPriority, setNewPriority] = useState<PreventiveAction['priority']>('HIGH');
  const [newResponsibleRole, setNewResponsibleRole] = useState('Occupational Health & Safety Manager');
  const [newOwner, setNewOwner] = useState('');
  const [newDistrict, setNewDistrict] = useState('Surat Industrial Corridor');
  const [newLocation, setNewLocation] = useState('');
  const [newDeadline, setNewDeadline] = useState('2026-10-31 12:00 IST');
  const [newRationale, setNewRationale] = useState('');
  const [newEvidence, setNewEvidence] = useState('');

  const filteredActions = actions.filter((a) => {
    if (statusFilter !== 'ALL' && a.status !== statusFilter) return false;
    if (priorityFilter !== 'ALL' && a.priority !== priorityFilter) return false;
    return true;
  });

  const handleCreateAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddAction({
      title: newTitle,
      category: newCategory,
      priority: newPriority,
      responsibleRole: newResponsibleRole,
      operationalOwner: newOwner || 'Operational Sector Lead',
      districtName: newDistrict,
      locationDetails: newLocation || 'Plant Zone Perimeter',
      deadline: newDeadline,
      status: 'PENDING',
      rationale: newRationale || 'Precautionary occupational hygiene protocol triggered by surveillance engine.',
      evidenceRequired: newEvidence || 'Supervisory checklist and digital audit log.',
    });

    setShowAddModal(false);
    setNewTitle('');
    setNewRationale('');
    setNewEvidence('');
  };

  const handleVerifyAction = (a: PreventiveAction) => {
    setSelectedActionForProof(a);
    setProofText(a.completionProof || 'Field verification inspection completed by authorized officer.');
  };

  const handleSubmitProof = () => {
    if (!selectedActionForProof) return;
    onUpdateActionStatus(selectedActionForProof.id, 'VERIFIED', proofText);
    setSelectedActionForProof(null);
    setProofText('');
  };

  return (
    <div className="space-y-6">
      
      {/* Title & Overview Banner */}
      <div className="p-5 rounded-xl bg-slate-850 border border-slate-700/70 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider">
              <CheckSquare className="w-4 h-4 text-teal-400" />
              Module G & H · Smart Prevention & Operational Action Tracking
            </div>
            <h1 className="text-xl font-bold text-white mt-1">
              Proportionate Preventive Interventions & Accountability Board
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl mt-0.5">
              Translating early warning surveillance alerts into binding operational mitigation protocols, role assignments, and verifiable audit evidence.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg shadow transition-colors cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create Prevention Directive</span>
          </button>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-700/60 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-400">Status:</span>
            <div className="flex items-center gap-1 p-0.5 bg-slate-800 rounded border border-slate-700">
              {(['ALL', 'PENDING', 'IN_PROGRESS', 'IMPLEMENTED', 'VERIFIED'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                    statusFilter === st ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {st.replace('_', ' ')}
                </button>
              ))}
            </div>

            <span className="text-slate-400 ml-2">Priority:</span>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded text-slate-200 text-xs outline-none cursor-pointer"
            >
              <option value="ALL">All Priorities</option>
              <option value="CRITICAL">Critical</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="ROUTINE">Routine</option>
            </select>
          </div>

          <span className="text-slate-400 font-mono text-[11px]">
            Showing <strong>{filteredActions.length}</strong> Actions
          </span>
        </div>
      </div>

      {/* Actions List Grid */}
      <div className="space-y-4">
        {filteredActions.map((action) => (
          <div
            key={action.id}
            className="p-5 rounded-xl bg-slate-850 border border-slate-700/70 hover:border-slate-600 transition-all space-y-3 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    action.priority === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                    action.priority === 'HIGH' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                    'bg-slate-700 text-slate-300'
                  }`}>
                    {action.priority}
                  </span>
                  <span className="font-mono text-slate-400">{action.id}</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-teal-400" />
                    {action.districtName} ({action.locationDetails})
                  </span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-400 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3 text-amber-400" />
                    Due: {action.deadline}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white tracking-tight">
                  {action.title}
                </h3>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2 shrink-0">
                <span className={`px-3 py-1 rounded text-xs font-bold font-mono ${
                  action.status === 'VERIFIED' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' :
                  action.status === 'IMPLEMENTED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                  action.status === 'IN_PROGRESS' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                  'bg-slate-800 text-slate-400 border border-slate-700'
                }`}>
                  {action.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            {/* Scientific Rationale */}
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
              <strong className="text-slate-200">Rationale: </strong>
              {action.rationale}
            </p>

            {/* Evidence & Ownership Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-2.5 rounded bg-slate-800/50 border border-slate-700/60 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                  <UserCheck className="w-3.5 h-3.5 text-teal-400" />
                  Operational Ownership
                </div>
                <div className="text-white font-medium">{action.operationalOwner}</div>
                <div className="text-[11px] text-slate-400">{action.responsibleRole}</div>
              </div>

              <div className="p-2.5 rounded bg-slate-800/50 border border-slate-700/60 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                  <FileCheck className="w-3.5 h-3.5 text-amber-400" />
                  Audit Proof Requirement
                </div>
                <div className="text-slate-300 text-[11px]">{action.evidenceRequired}</div>
                {action.completionProof && (
                  <div className="text-teal-300 text-[11px] font-mono mt-1 pt-1 border-t border-slate-700">
                    Proof: {action.completionProof} ({action.verifiedBy} at {action.verifiedAt})
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Status Progression Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-700/60 text-xs">
              <span className="text-slate-400">Update Action Progress:</span>

              <div className="flex items-center gap-2">
                {action.status === 'PENDING' && (
                  <button
                    onClick={() => onUpdateActionStatus(action.id, 'IN_PROGRESS')}
                    className="px-3 py-1.5 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 rounded border border-amber-500/40 font-semibold cursor-pointer transition-colors"
                  >
                    Mark In Progress
                  </button>
                )}
                {action.status === 'IN_PROGRESS' && (
                  <button
                    onClick={() => onUpdateActionStatus(action.id, 'IMPLEMENTED', 'Field implementation completed on schedule.')}
                    className="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 rounded border border-emerald-500/40 font-semibold cursor-pointer transition-colors"
                  >
                    Mark Implemented
                  </button>
                )}
                {action.status !== 'VERIFIED' && (
                  <button
                    onClick={() => handleVerifyAction(action)}
                    className="px-3 py-1.5 bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 rounded border border-teal-500/40 font-semibold cursor-pointer transition-colors flex items-center gap-1"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Audit & Verify Signoff</span>
                  </button>
                )}
                {action.status === 'VERIFIED' && (
                  <span className="text-teal-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Statutory Signoff Completed</span>
                  </span>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Add Directive Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-lg font-bold text-white">Create Targeted Prevention Directive</h2>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAction} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Directive Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Deploy 18 mist cooling fans to Foundry Bay 3"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white outline-none focus:border-teal-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Risk Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as AlertCategory)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white outline-none"
                  >
                    <option value="heat_stress">Heat Stress & Dehydration</option>
                    <option value="air_quality">Air Inversion / Respiratory</option>
                    <option value="waterborne">Waterborne & Turbidity</option>
                    <option value="occupational_injury">Workplace Safety & Injury</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as PreventiveAction['priority'])}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white outline-none"
                  >
                    <option value="CRITICAL">Critical (&lt; 4 Hours)</option>
                    <option value="HIGH">High (&lt; 12 Hours)</option>
                    <option value="MEDIUM">Medium (&lt; 48 Hours)</option>
                    <option value="ROUTINE">Routine</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Target Corridor</label>
                  <input
                    type="text"
                    value={newDistrict}
                    onChange={(e) => setNewDistrict(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Location Details</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. Zone 4 Casting Sheds"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Responsible Role</label>
                  <input
                    type="text"
                    value={newResponsibleRole}
                    onChange={(e) => setNewResponsibleRole(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Operational Owner</label>
                  <input
                    type="text"
                    value={newOwner}
                    onChange={(e) => setNewOwner(e.target.value)}
                    placeholder="e.g. R. K. Sharma"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Scientific Rationale</label>
                <textarea
                  rows={2}
                  value={newRationale}
                  onChange={(e) => setNewRationale(e.target.value)}
                  placeholder="Explain baseline deviation or environmental threshold triggering directive..."
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-white outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-400 hover:bg-teal-300 text-slate-950 rounded font-bold"
                >
                  Dispatch Directive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Verify & Proof Signoff Modal */}
      {selectedActionForProof && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-base font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-5 h-5 text-teal-400" />
                Audit & Verify Statutory Signoff
              </h2>
              <button onClick={() => setSelectedActionForProof(null)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Action: <strong className="text-white">{selectedActionForProof.title}</strong>
            </p>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-300">
                Field Completion Proof & Inspection Notes
              </label>
              <textarea
                rows={3}
                value={proofText}
                onChange={(e) => setProofText(e.target.value)}
                placeholder="Log physical site inspection date, digital photos attached, supervisor badge ID..."
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-xs text-white outline-none focus:border-teal-400"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800 text-xs">
              <button
                onClick={() => setSelectedActionForProof(null)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitProof}
                className="px-4 py-1.5 bg-teal-400 hover:bg-teal-300 text-slate-950 rounded font-bold cursor-pointer"
              >
                Confirm Verified Status
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
