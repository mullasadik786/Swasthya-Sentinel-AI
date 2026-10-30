export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH';

export type AlertCategory = 
  | 'heat_stress' 
  | 'air_quality' 
  | 'waterborne' 
  | 'occupational_injury' 
  | 'respiratory_cluster';

export type UserRole = 
  | 'dho'          // District Health Officer / Public Health Authority
  | 'safety_lead'  // Workplace Health & Safety Lead (OHS)
  | 'state_epi'    // State Epidemiologist
  | 'compliance';  // Data Auditor & Privacy Officer

export interface ContributingSignal {
  signalName: string;
  category: 'clinical' | 'environmental' | 'workforce' | 'community';
  observedValue: string | number;
  baselineValue: string | number;
  deviationPct: number;
  zScore: number;
  weightPct: number;
  trend: 'rising' | 'stable' | 'falling';
}

export interface AlertAuditEntry {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: 'CREATED' | 'ACKNOWLEDGED' | 'ESCALATED' | 'INTERVENTION_ORDERED' | 'RESOLVED';
  notes: string;
}

export interface HealthAlert {
  id: string;
  title: string;
  category: AlertCategory;
  riskLevel: RiskLevel;
  riskScore: number; // 0 - 100
  confidenceScore: number; // 0 - 100%
  dataCompleteness: number; // 0 - 100%
  missingInputsCount: number;
  districtId: string;
  districtName: string;
  zone: string;
  timestamp: string;
  detectedAt: string;
  anomalySummary: string;
  baselineComparison: {
    metric: string;
    baseline: number;
    current: number;
    unit: string;
    changePct: number;
  }[];
  contributingSignals: ContributingSignal[];
  recommendedActions: string[];
  responsibleRole: string;
  targetInterventionTimeframe: string;
  status: 'ACTIVE' | 'ACKNOWLEDGED' | 'IN_PROGRESS' | 'RESOLVED' | 'ESCALATED';
  auditTrail: AlertAuditEntry[];
  locationReliability: 'HIGH' | 'AGGREGATED_DISTRICT' | 'COARSE_REGION';
}

export interface DistrictMetric {
  id: string;
  name: string;
  state: string;
  population: number;
  workforceCount: number;
  coordinates: { x: number; y: number; lat: number; lng: number }; // SVG coordinate and geo
  currentRiskScore: number;
  riskLevel: RiskLevel;
  trend: 'rising' | 'stable' | 'declining';
  activeAlertsCount: number;
  primaryRiskFactor: string;
  aqi: number;
  temperatureC: number;
  relativeHumidity: number;
  wbgtC: number; // Wet bulb globe temp
  sicknessAbsencePct: number;
  baselineAbsencePct: number;
  clinicalSurgeIndex: number; // 0 - 100
  dataQualityPct: number;
  isSmallCellSuppressed: boolean; // Privacy by design
}

export interface DailyObservation {
  date: string;
  districtId: string;
  // Environmental
  temperatureMaxC: number;
  temperatureAvgC: number;
  humidityPct: number;
  wbgtC: number;
  aqi: number;
  pm25: number;
  rainfallMm: number;
  waterTurbidityNtu: number;
  // Clinical
  aggregatedHospitalVisits: number;
  respiratoryVisits: number;
  heatRelatedIllnessCount: number;
  gastrointestinalVisits: number;
  labPositivityRatePct: number;
  // Workforce
  workforceActive: number;
  sicknessAbsenceRatePct: number;
  workplaceIncidentCount: number;
  heatStressObservationCount: number;
  lostWorkdays: number;
  // Computed Risk
  compositeRiskScore: number;
  anomalyDetected: boolean;
  notes?: string;
}

export interface PreventiveAction {
  id: string;
  alertId?: string;
  title: string;
  category: AlertCategory;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'ROUTINE';
  responsibleRole: string;
  operationalOwner: string;
  districtName: string;
  locationDetails: string;
  deadline: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'IMPLEMENTED' | 'VERIFIED';
  rationale: string;
  evidenceRequired: string;
  completionProof?: string;
  verifiedBy?: string;
  verifiedAt?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  timestamp: string;
  type: 'ALERT_HIGH' | 'ALERT_MODERATE' | 'ACTION_DUE' | 'DATA_GAP' | 'SYSTEM';
  message: string;
  read: boolean;
  districtId?: string;
  alertId?: string;
}

export interface ValidationMetric {
  metricName: string;
  score: string;
  target: string;
  description: string;
  datasetContext: string;
  validationMethod: string;
}

export interface BacktestRecord {
  scenarioId: string;
  name: string;
  eventPeriod: string;
  historicalOutbreakType: string;
  leadTimeGainDays: number;
  detectionAccuracyPct: number;
  falseAlarmRatePct: number;
  status: 'VALIDATED_EXCELLENT' | 'VALIDATED_PASS';
}
