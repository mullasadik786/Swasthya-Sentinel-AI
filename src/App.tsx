import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ExplainableAlertModal } from './components/ExplainableAlertModal';
import { SimulationModal } from './components/SimulationModal';
import { ModelValidationModal } from './components/ModelValidationModal';

// Tabs
import { OverviewTab } from './components/tabs/OverviewTab';
import { EarlyWarningTab } from './components/tabs/EarlyWarningTab';
import { RiskAnalyticsTab } from './components/tabs/RiskAnalyticsTab';
import { GeographicMapTab } from './components/tabs/GeographicMapTab';
import { EnvironmentalTab } from './components/tabs/EnvironmentalTab';
import { WorkforceHealthTab } from './components/tabs/WorkforceHealthTab';
import { PreventionActionsTab } from './components/tabs/PreventionActionsTab';
import { ReportsTab } from './components/tabs/ReportsTab';
import { DataManagementTab } from './components/tabs/DataManagementTab';
import { SettingsPrivacyTab } from './components/tabs/SettingsPrivacyTab';

// Mock Data & Types
import { 
  MONITORED_DISTRICTS, 
  INITIAL_ALERTS, 
  INITIAL_PREVENTIVE_ACTIONS, 
  INITIAL_NOTIFICATIONS, 
  generate30DayObservations 
} from './data/mockData';
import { 
  DistrictMetric, 
  HealthAlert, 
  PreventiveAction, 
  NotificationItem, 
  UserRole, 
  DailyObservation 
} from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [userRole, setUserRole] = useState<UserRole>('dho');

  // Core surveillance datasets
  const [districts, setDistricts] = useState<DistrictMetric[]>(MONITORED_DISTRICTS);
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictMetric>(MONITORED_DISTRICTS[0]); // Surat
  const [alerts, setAlerts] = useState<HealthAlert[]>(INITIAL_ALERTS);
  const [actions, setActions] = useState<PreventiveAction[]>(INITIAL_PREVENTIVE_ACTIONS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [observations, setObservations] = useState<DailyObservation[]>(() => generate30DayObservations('dist-surat'));

  // Modals
  const [selectedAlert, setSelectedAlert] = useState<HealthAlert | null>(null);
  const [showSimulationModal, setShowSimulationModal] = useState<boolean>(false);
  const [showValidationModal, setShowValidationModal] = useState<boolean>(false);

  // When a district is selected, reload corresponding synthetic observations
  const handleSelectDistrict = (d: DistrictMetric) => {
    setSelectedDistrict(d);
    setObservations(generate30DayObservations(d.id));
  };

  // Alert Triaging Handlers
  const handleAcknowledgeAlert = (alertId: string, notes: string) => {
    setAlerts((prev) =>
      prev.map((a) => {
        if (a.id === alertId) {
          const newAudit = [
            ...a.auditTrail,
            {
              id: `aud-${Date.now()}`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' IST',
              actor: 'Authorized Officer',
              role: userRole.toUpperCase(),
              action: 'ACKNOWLEDGED' as const,
              notes,
            },
          ];
          return { ...a, status: 'ACKNOWLEDGED', auditTrail: newAudit };
        }
        return a;
      })
    );

    // Also update selectedAlert if modal open
    if (selectedAlert && selectedAlert.id === alertId) {
      setSelectedAlert((prev) => prev ? { ...prev, status: 'ACKNOWLEDGED' } : null);
    }
  };

  const handleEscalateAlert = (alertId: string, notes: string) => {
    setAlerts((prev) =>
      prev.map((a) => {
        if (a.id === alertId) {
          const newAudit = [
            ...a.auditTrail,
            {
              id: `aud-${Date.now()}`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' IST',
              actor: 'Authorized Officer',
              role: userRole.toUpperCase(),
              action: 'ESCALATED' as const,
              notes,
            },
          ];
          return { ...a, status: 'ESCALATED', auditTrail: newAudit };
        }
        return a;
      })
    );

    // Notify
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: `ESCALATED: ${alertId} to Tier-2 Directorate`,
        timestamp: 'Just now',
        type: 'ALERT_HIGH',
        message: notes,
        read: false,
      },
      ...prev,
    ]);

    if (selectedAlert && selectedAlert.id === alertId) {
      setSelectedAlert((prev) => prev ? { ...prev, status: 'ESCALATED' } : null);
    }
  };

  const handleOrderIntervention = (alertId: string, actionTitle: string) => {
    const newAct: PreventiveAction = {
      id: `ACT-${Date.now().toString().slice(-4)}`,
      alertId,
      title: actionTitle,
      category: 'heat_stress',
      priority: 'CRITICAL',
      responsibleRole: 'Occupational Health & Safety Manager',
      operationalOwner: 'Dispatched from Early Warning Modal',
      districtName: selectedAlert?.districtName || 'Surat Industrial Corridor',
      locationDetails: selectedAlert?.zone || 'Zone 4 Fabrication Yards',
      deadline: 'Immediate (< 4 Hours)',
      status: 'IN_PROGRESS',
      rationale: `Direct intervention ordered in response to active early warning ${alertId}.`,
      evidenceRequired: 'Digital confirmation and supervisor field signoff.',
    };

    setActions((prev) => [newAct, ...prev]);
  };

  const handleUpdateActionStatus = (id: string, status: PreventiveAction['status'], proof?: string) => {
    setActions((prev) =>
      prev.map((act) => {
        if (act.id === id) {
          return {
            ...act,
            status,
            completionProof: proof || act.completionProof,
            verifiedBy: status === 'VERIFIED' ? `Officer (${userRole.toUpperCase()})` : act.verifiedBy,
            verifiedAt: status === 'VERIFIED' ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' IST' : act.verifiedAt,
          };
        }
        return act;
      })
    );
  };

  const handleAddAction = (newAction: Omit<PreventiveAction, 'id'>) => {
    const act: PreventiveAction = {
      ...newAction,
      id: `ACT-${Date.now().toString().slice(-4)}`,
    };
    setActions((prev) => [act, ...prev]);
  };

  const handleUploadNewData = (newObs: DailyObservation[]) => {
    setObservations(newObs);
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Apply scenario state to dashboard (reflects post-intervention stabilization)
  const handleApplyScenarioToDashboard = () => {
    setDistricts((prev) =>
      prev.map((d) => {
        if (d.id === 'dist-surat') {
          return {
            ...d,
            currentRiskScore: 38,
            riskLevel: 'LOW',
            trend: 'declining',
            sicknessAbsencePct: 4.1,
            wbgtC: 29.1,
            primaryRiskFactor: 'Stabilized post-intervention protocol (45/15 rest & mist fans)',
          };
        }
        return d;
      })
    );

    setAlerts((prev) =>
      prev.map((a) => {
        if (a.id === 'ALT-2026-0891') {
          return {
            ...a,
            status: 'RESOLVED',
            riskLevel: 'LOW',
            riskScore: 38,
          };
        }
        return a;
      })
    );

    setActiveTab('overview');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-teal-500/30 selection:text-teal-200">
      
      {/* Top Bar Contract (Wordmark, Nav links, Role, Scenarios) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        onOpenSimulation={() => setShowSimulationModal(true)}
        onOpenValidation={() => setShowValidationModal(true)}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
      />

      {/* Main Workspace Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'overview' && (
          <OverviewTab
            districts={districts}
            alerts={alerts}
            actions={actions}
            observations={observations}
            selectedDistrict={selectedDistrict}
            setSelectedDistrict={handleSelectDistrict}
            onSelectAlert={(a) => setSelectedAlert(a)}
            onOpenSimulation={() => setShowSimulationModal(true)}
            userRole={userRole}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'early-warning' && (
          <EarlyWarningTab
            alerts={alerts}
            onSelectAlert={(a) => setSelectedAlert(a)}
            userRole={userRole}
            onAcknowledgeAlert={handleAcknowledgeAlert}
            onEscalateAlert={handleEscalateAlert}
          />
        )}

        {activeTab === 'risk-analytics' && (
          <RiskAnalyticsTab
            observations={observations}
            districts={districts}
            selectedDistrict={selectedDistrict}
            setSelectedDistrict={handleSelectDistrict}
          />
        )}

        {activeTab === 'geographic' && (
          <GeographicMapTab
            districts={districts}
            selectedDistrict={selectedDistrict}
            setSelectedDistrict={handleSelectDistrict}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'environmental' && (
          <EnvironmentalTab
            observations={observations}
            districts={districts}
            selectedDistrict={selectedDistrict}
            setSelectedDistrict={handleSelectDistrict}
          />
        )}

        {activeTab === 'workforce' && (
          <WorkforceHealthTab
            observations={observations}
            districts={districts}
            selectedDistrict={selectedDistrict}
            setSelectedDistrict={handleSelectDistrict}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'prevention' && (
          <PreventionActionsTab
            actions={actions}
            onUpdateActionStatus={handleUpdateActionStatus}
            onAddAction={handleAddAction}
            userRole={userRole}
          />
        )}

        {activeTab === 'reports' && (
          <ReportsTab
            districts={districts}
            alerts={alerts}
            observations={observations}
            actions={actions}
          />
        )}

        {activeTab === 'data-management' && (
          <DataManagementTab
            observations={observations}
            onUploadNewData={handleUploadNewData}
            districts={districts}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsPrivacyTab
            userRole={userRole}
            setUserRole={setUserRole}
          />
        )}
      </main>

      {/* Clean Footer adhering to Anti-Slop Guidelines (Quiet copyright & project metadata) */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">SWASTHYA SENTINEL AI</span>
            <span>·</span>
            <span>Bharat Innovation</span>
            <span>·</span>
            <span>Project Lead: Shaik Mulla Sadik</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Future Health Digital Innovation Challenge</span>
            <span>·</span>
            <span className="text-teal-400">Detect Earlier. Predict Smarter. Prevent Faster.</span>
          </div>
        </div>
      </footer>

      {/* Explainable AI Alert Modal */}
      {selectedAlert && (
        <ExplainableAlertModal
          alert={selectedAlert}
          onClose={() => setSelectedAlert(null)}
          userRole={userRole}
          onAcknowledgeAlert={handleAcknowledgeAlert}
          onEscalateAlert={handleEscalateAlert}
          onOrderIntervention={handleOrderIntervention}
        />
      )}

      {/* Required Demonstration Scenario (Heat Stress) */}
      <SimulationModal
        isOpen={showSimulationModal}
        onClose={() => setShowSimulationModal(false)}
        onApplyScenarioToDashboard={handleApplyScenarioToDashboard}
      />

      {/* Dedicated Scientific Model Validation Benchmark */}
      <ModelValidationModal
        isOpen={showValidationModal}
        onClose={() => setShowValidationModal(false)}
      />

    </div>
  );
}
