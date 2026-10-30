/**
 * Synthetic Multi-Signal Epidemiological & Occupational Dataset
 * Swasthya Sentinel AI - Bharat Innovation
 * Project Lead: Shaik Mulla Sadik
 * NOTE: All records are realistic synthetic demonstration data calibrated to Indian industrial and public health baselines.
 */

import { DistrictMetric, HealthAlert, DailyObservation, PreventiveAction, NotificationItem, ValidationMetric, BacktestRecord } from '../types';

export const MONITORED_DISTRICTS: DistrictMetric[] = [
  {
    id: 'dist-surat',
    name: 'Surat Industrial Corridor',
    state: 'Gujarat',
    population: 4460000,
    workforceCount: 820000,
    coordinates: { x: 260, y: 340, lat: 21.1702, lng: 72.8311 },
    currentRiskScore: 84,
    riskLevel: 'HIGH',
    trend: 'rising',
    activeAlertsCount: 2,
    primaryRiskFactor: 'Extreme Heat & Occupational Thermal Stress',
    aqi: 168,
    temperatureC: 43.4,
    relativeHumidity: 68,
    wbgtC: 33.6,
    sicknessAbsencePct: 11.4,
    baselineAbsencePct: 3.2,
    clinicalSurgeIndex: 82,
    dataQualityPct: 96,
    isSmallCellSuppressed: false,
  },
  {
    id: 'dist-pune',
    name: 'Pune MIDC Industrial Hub',
    state: 'Maharashtra',
    population: 3120000,
    workforceCount: 540000,
    coordinates: { x: 300, y: 395, lat: 18.5204, lng: 73.8567 },
    currentRiskScore: 68,
    riskLevel: 'MODERATE',
    trend: 'rising',
    activeAlertsCount: 1,
    primaryRiskFactor: 'Rising Workplace Temperatures & Dehydration',
    aqi: 132,
    temperatureC: 40.1,
    relativeHumidity: 58,
    wbgtC: 30.8,
    sicknessAbsencePct: 7.2,
    baselineAbsencePct: 3.4,
    clinicalSurgeIndex: 61,
    dataQualityPct: 94,
    isSmallCellSuppressed: false,
  },
  {
    id: 'dist-delhi',
    name: 'South Delhi / Okhla Industrial Cluster',
    state: 'Delhi NCR',
    population: 2750000,
    workforceCount: 390000,
    coordinates: { x: 345, y: 190, lat: 28.5355, lng: 77.2650 },
    currentRiskScore: 78,
    riskLevel: 'HIGH',
    trend: 'rising',
    activeAlertsCount: 2,
    primaryRiskFactor: 'Severe Air Inversion & Particulate Exposure (PM2.5)',
    aqi: 342,
    temperatureC: 32.5,
    relativeHumidity: 74,
    wbgtC: 27.2,
    sicknessAbsencePct: 8.9,
    baselineAbsencePct: 3.6,
    clinicalSurgeIndex: 79,
    dataQualityPct: 98,
    isSmallCellSuppressed: false,
  },
  {
    id: 'dist-hyderabad',
    name: 'Hyderabad Genome & Pharma Valley',
    state: 'Telangana',
    population: 3800000,
    workforceCount: 460000,
    coordinates: { x: 370, y: 410, lat: 17.3850, lng: 78.4867 },
    currentRiskScore: 54,
    riskLevel: 'MODERATE',
    trend: 'stable',
    activeAlertsCount: 1,
    primaryRiskFactor: 'Chemical Solvent Exposure & Occupational Ergonomics',
    aqi: 145,
    temperatureC: 38.6,
    relativeHumidity: 52,
    wbgtC: 28.9,
    sicknessAbsencePct: 5.1,
    baselineAbsencePct: 3.0,
    clinicalSurgeIndex: 48,
    dataQualityPct: 92,
    isSmallCellSuppressed: false,
  },
  {
    id: 'dist-vizag',
    name: 'Visakhapatnam Port & Industrial Zone',
    state: 'Andhra Pradesh',
    population: 2090000,
    workforceCount: 310000,
    coordinates: { x: 450, y: 395, lat: 17.6868, lng: 83.2185 },
    currentRiskScore: 61,
    riskLevel: 'MODERATE',
    trend: 'rising',
    activeAlertsCount: 1,
    primaryRiskFactor: 'High Humidity Coastal Heat Index & Harbor Safety',
    aqi: 128,
    temperatureC: 37.8,
    relativeHumidity: 82,
    wbgtC: 32.1,
    sicknessAbsencePct: 6.4,
    baselineAbsencePct: 3.1,
    clinicalSurgeIndex: 56,
    dataQualityPct: 91,
    isSmallCellSuppressed: false,
  },
  {
    id: 'dist-chennai',
    name: 'Chennai Oragadam Automotive Belt',
    state: 'Tamil Nadu',
    population: 2600000,
    workforceCount: 480000,
    coordinates: { x: 385, y: 510, lat: 12.8342, lng: 79.9544 },
    currentRiskScore: 36,
    riskLevel: 'LOW',
    trend: 'stable',
    activeAlertsCount: 0,
    primaryRiskFactor: 'Nominal Baseline Monitoring',
    aqi: 88,
    temperatureC: 34.2,
    relativeHumidity: 65,
    wbgtC: 27.0,
    sicknessAbsencePct: 3.2,
    baselineAbsencePct: 3.1,
    clinicalSurgeIndex: 28,
    dataQualityPct: 95,
    isSmallCellSuppressed: false,
  },
  {
    id: 'dist-ahmedabad',
    name: 'Ahmedabad Naroda-Vatva Zone',
    state: 'Gujarat',
    population: 3200000,
    workforceCount: 490000,
    coordinates: { x: 250, y: 300, lat: 23.0225, lng: 72.5714 },
    currentRiskScore: 59,
    riskLevel: 'MODERATE',
    trend: 'stable',
    activeAlertsCount: 1,
    primaryRiskFactor: 'Water Turbidity Anomaly & GI Complaints',
    aqi: 182,
    temperatureC: 41.0,
    relativeHumidity: 46,
    wbgtC: 29.5,
    sicknessAbsencePct: 5.8,
    baselineAbsencePct: 3.3,
    clinicalSurgeIndex: 52,
    dataQualityPct: 89,
    isSmallCellSuppressed: false,
  },
  {
    id: 'dist-bengaluru',
    name: 'Bengaluru Peenya Industrial Area',
    state: 'Karnataka',
    population: 2900000,
    workforceCount: 420000,
    coordinates: { x: 350, y: 475, lat: 13.0285, lng: 77.5197 },
    currentRiskScore: 24,
    riskLevel: 'LOW',
    trend: 'declining',
    activeAlertsCount: 0,
    primaryRiskFactor: 'Optimal Controlled Ambient & Routine Surveillance',
    aqi: 72,
    temperatureC: 29.4,
    relativeHumidity: 55,
    wbgtC: 23.2,
    sicknessAbsencePct: 2.8,
    baselineAbsencePct: 2.9,
    clinicalSurgeIndex: 18,
    dataQualityPct: 97,
    isSmallCellSuppressed: false,
  },
];

// Generate 30 days of synthetic observations for Surat (the primary high-risk cluster)
export function generate30DayObservations(districtId: string = 'dist-surat'): DailyObservation[] {
  const result: DailyObservation[] = [];
  const today = new Date('2026-10-30');

  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];

    // In the last 8 days (i <= 7), simulate an escalating heatwave anomaly
    const isEscalation = i <= 7;
    const progress = isEscalation ? (8 - i) / 8 : 0;

    // Environmental
    const baseTemp = 36.5;
    const tempMax = isEscalation ? baseTemp + 2 + progress * 5.2 : baseTemp + (Math.sin(i) * 1.5);
    const humidity = isEscalation ? 55 + progress * 14 : 52 + (Math.cos(i) * 6);
    // Approximate WBGT formula
    const wbgt = 0.7 * (tempMax * 0.75) + 0.3 * (tempMax * (humidity / 100));
    const aqi = isEscalation ? 140 + Math.round(progress * 38) : 120 + Math.round(Math.sin(i * 0.8) * 20);

    // Clinical
    const baseVisits = 450;
    const heatVisits = isEscalation ? Math.round(8 + progress * 42) : Math.round(6 + Math.random() * 5);
    const respiratoryVisits = Math.round(35 + (aqi / 15) + (Math.random() * 8));
    const giVisits = Math.round(22 + (Math.random() * 6));
    const totalVisits = baseVisits + heatVisits + respiratoryVisits + giVisits;

    // Workforce
    const activeWorkforce = 820000;
    const baseAbsenceRate = 3.2;
    const absenceRate = isEscalation 
      ? Number((baseAbsenceRate + progress * 8.2).toFixed(1)) 
      : Number((baseAbsenceRate + (Math.random() * 0.4 - 0.2)).toFixed(1));
    const heatStressObs = isEscalation ? Math.round(4 + progress * 28) : Math.round(2 + Math.random() * 3);
    const incidents = isEscalation ? Math.round(3 + progress * 9) : Math.round(2 + Math.random() * 2);
    const lostWorkdays = Math.round(activeWorkforce * (absenceRate / 100) * 0.4);

    // Risk calculation
    const riskScore = isEscalation 
      ? Math.min(100, Math.round(38 + progress * 48)) 
      : Math.round(28 + Math.sin(i * 0.5) * 8);

    result.push({
      date: dateStr,
      districtId,
      temperatureMaxC: Number(tempMax.toFixed(1)),
      temperatureAvgC: Number((tempMax - 5.5).toFixed(1)),
      humidityPct: Math.round(humidity),
      wbgtC: Number(wbgt.toFixed(1)),
      aqi,
      pm25: Math.round(aqi * 0.58),
      rainfallMm: i === 14 ? 12.4 : 0,
      waterTurbidityNtu: 2.1,
      aggregatedHospitalVisits: totalVisits,
      respiratoryVisits,
      heatRelatedIllnessCount: heatVisits,
      gastrointestinalVisits: giVisits,
      labPositivityRatePct: 4.2,
      workforceActive: activeWorkforce,
      sicknessAbsenceRatePct: absenceRate,
      workplaceIncidentCount: incidents,
      heatStressObservationCount: heatStressObs,
      lostWorkdays,
      compositeRiskScore: riskScore,
      anomalyDetected: isEscalation && riskScore >= 70,
      notes: isEscalation ? 'Multi-signal thermal anomaly detected' : 'Within normal baseline variance',
    });
  }

  return result;
}

export const INITIAL_ALERTS: HealthAlert[] = [
  {
    id: 'ALT-2026-0891',
    title: 'Potential Heat-Related Workforce Health Risk & Dehydration Surge',
    category: 'heat_stress',
    riskLevel: 'HIGH',
    riskScore: 84,
    confidenceScore: 94,
    dataCompleteness: 96,
    missingInputsCount: 1,
    districtId: 'dist-surat',
    districtName: 'Surat Industrial Corridor',
    zone: 'Zone 4: Heavy Metal Casting & Chemical Plant Belt',
    timestamp: '2026-10-30T01:45:00Z',
    detectedAt: '2026-10-30 07:15 IST',
    anomalySummary: 'Unusual multi-signal cluster: ambient temperatures exceed 43°C with 68% relative humidity, triggering a 256% surge in sickness absence and a 420% jump in heat-exhaustion clinical admissions vs 30-day baseline.',
    baselineComparison: [
      { metric: 'Wet Bulb Globe Temp (WBGT)', baseline: 28.2, current: 33.6, unit: '°C', changePct: 19.1 },
      { metric: 'Aggregated Heat Complaints', baseline: 8.4, current: 48.0, unit: 'cases/day', changePct: 471.4 },
      { metric: 'Workforce Sickness Absence Rate', baseline: 3.2, current: 11.4, unit: '%', changePct: 256.3 },
      { metric: 'Occupational Heat Incidents', baseline: 3.1, current: 12.0, unit: 'events', changePct: 287.1 },
    ],
    contributingSignals: [
      { signalName: 'Ambient Peak Temperature', category: 'environmental', observedValue: '43.4 °C', baselineValue: '36.5 °C', deviationPct: 18.9, zScore: 3.24, weightPct: 30, trend: 'rising' },
      { signalName: 'Workforce Sickness Absence', category: 'workforce', observedValue: '11.4 %', baselineValue: '3.2 %', deviationPct: 256.3, zScore: 3.82, weightPct: 35, trend: 'rising' },
      { signalName: 'Clinical Heat Exhaustion Admissions', category: 'clinical', observedValue: '48 visits', baselineValue: '8 visits', deviationPct: 500.0, zScore: 4.15, weightPct: 25, trend: 'rising' },
      { signalName: 'Relative Humidity Inversion', category: 'environmental', observedValue: '68 %', baselineValue: '52 %', deviationPct: 30.7, zScore: 2.11, weightPct: 10, trend: 'rising' },
    ],
    recommendedActions: [
      'Issue immediate Heat-Stress Advisory to plant floor managers in Zone 4',
      'Mandate 45-minute work / 15-minute shaded cooling rest cycles for non-air-conditioned bays',
      'Deploy ORS (Oral Rehydration Salts) and chilled potable water stations across all active shifts',
      'Shift heavy molten metal and high-radiant work hours to early morning (05:00 - 10:00)',
      'Activate sentinel primary health center (PHC) triage beds for dehydration treatment',
    ],
    responsibleRole: 'Workplace Health & Safety Officer & District Disaster Management Coordinator',
    targetInterventionTimeframe: 'Immediate (< 4 Hours)',
    status: 'ACTIVE',
    locationReliability: 'AGGREGATED_DISTRICT',
    auditTrail: [
      { id: 'aud-1', timestamp: '2026-10-30 07:15 IST', actor: 'Sentinel Surveillance Engine', role: 'System Automated', action: 'CREATED', notes: 'Automated anomaly detection triggered by 4 correlated signals exceeding Z > 2.5' },
      { id: 'aud-2', timestamp: '2026-10-30 07:40 IST', actor: 'Dr. M. K. Patel', role: 'District Health Officer', action: 'ACKNOWLEDGED', notes: 'Verified correlation with civil hospital inpatient logs. OHS notified.' }
    ],
  },
  {
    id: 'ALT-2026-0887',
    title: 'Severe Particulate Air Inversion & Acute Bronchial Influx',
    category: 'air_quality',
    riskLevel: 'HIGH',
    riskScore: 78,
    confidenceScore: 96,
    dataCompleteness: 98,
    missingInputsCount: 0,
    districtId: 'dist-delhi',
    districtName: 'South Delhi / Okhla Industrial Cluster',
    zone: 'Okhla Phase I & II Fabrication Corridor',
    timestamp: '2026-10-29T22:15:00Z',
    detectedAt: '2026-10-30 03:45 IST',
    anomalySummary: 'Critical winter particulate inversion: AQI spiked to 342 with PM2.5 reaching 198 µg/m³. Hospital emergency outpatient logs indicate 89% surge in acute bronchial asthma and COPD exacerbations.',
    baselineComparison: [
      { metric: 'Air Quality Index (AQI)', baseline: 145.0, current: 342.0, unit: 'AQI', changePct: 135.8 },
      { metric: 'Particulate Matter (PM2.5)', baseline: 65.0, current: 198.0, unit: 'µg/m³', changePct: 204.6 },
      { metric: 'Emergency Respiratory Admissions', baseline: 38.0, current: 79.0, unit: 'patients/day', changePct: 107.8 },
      { metric: 'Outdoor Workforce Sickness Absence', baseline: 3.6, current: 8.9, unit: '%', changePct: 147.2 },
    ],
    contributingSignals: [
      { signalName: 'Ambient PM2.5 Concentration', category: 'environmental', observedValue: '198 µg/m³', baselineValue: '65 µg/m³', deviationPct: 204.6, zScore: 3.61, weightPct: 40, trend: 'rising' },
      { signalName: 'Aggregated Respiratory Outpatient Visits', category: 'clinical', observedValue: '79 visits', baselineValue: '38 visits', deviationPct: 107.8, zScore: 2.85, weightPct: 35, trend: 'rising' },
      { signalName: 'Outdoor Logistics Absence Rate', category: 'workforce', observedValue: '8.9 %', baselineValue: '3.6 %', deviationPct: 147.2, zScore: 2.44, weightPct: 25, trend: 'rising' },
    ],
    recommendedActions: [
      'Enforce mandatory N95 / FFP2 respirator usage for all open-air freight and yard workers',
      'Deploy mobile wet-dust suppression and mechanical street sweepers across industrial spines',
      'Issue localized public health advisory for vulnerable elderly and pediatric populations in Okhla',
      'Instruct district hospitals to replenish nebulizer kits, bronchodilators, and oxygen cylinders',
    ],
    responsibleRole: 'District Surveillance Officer & Industrial Hygiene Inspector',
    targetInterventionTimeframe: '< 6 Hours',
    status: 'ACTIVE',
    locationReliability: 'HIGH',
    auditTrail: [
      { id: 'aud-3', timestamp: '2026-10-30 03:45 IST', actor: 'Sentinel Surveillance Engine', role: 'System Automated', action: 'CREATED', notes: 'Cross-sensor PM2.5 and PHC outpatient respiratory spike triggered warning.' }
    ],
  },
  {
    id: 'ALT-2026-0882',
    title: 'Workplace Dehydration & Thermal Fatigue Warning',
    category: 'heat_stress',
    riskLevel: 'MODERATE',
    riskScore: 68,
    confidenceScore: 92,
    dataCompleteness: 94,
    missingInputsCount: 2,
    districtId: 'dist-pune',
    districtName: 'Pune MIDC Industrial Hub',
    zone: 'Bhosari & Chakan Auto Component Belt',
    timestamp: '2026-10-29T18:30:00Z',
    detectedAt: '2026-10-30 00:00 IST',
    anomalySummary: 'Shop floor ambient heat sensors record steady thermal buildup reaching 40.1°C with early indicators of micro-fatigue incidents and a 2.1x rise in first-aid hydration requests.',
    baselineComparison: [
      { metric: 'Maximum Shopfloor Temperature', baseline: 34.5, current: 40.1, unit: '°C', changePct: 16.2 },
      { metric: 'First-Aid Room Fatigue Visits', baseline: 4.0, current: 14.0, unit: 'consults', changePct: 250.0 },
      { metric: 'Workforce Sickness Absence', baseline: 3.4, current: 7.2, unit: '%', changePct: 111.7 },
    ],
    contributingSignals: [
      { signalName: 'Shopfloor Temperature Spike', category: 'environmental', observedValue: '40.1 °C', baselineValue: '34.5 °C', deviationPct: 16.2, zScore: 2.15, weightPct: 40, trend: 'rising' },
      { signalName: 'First-Aid Dehydration Reports', category: 'workforce', observedValue: '14 visits', baselineValue: '4 visits', deviationPct: 250.0, zScore: 2.42, weightPct: 35, trend: 'rising' },
      { signalName: 'Assembly Line Micro-Incidents', category: 'workforce', observedValue: '6 incidents', baselineValue: '2 incidents', deviationPct: 200.0, zScore: 1.88, weightPct: 25, trend: 'rising' },
    ],
    recommendedActions: [
      'Increase air-blower and industrial HVLS fan speeds across Assembly Line 3 and 4',
      'Provide electrolytic glucose supplements during mid-shift rest breaks',
      'Implement rotation schedules for workers operating near curing furnaces',
    ],
    responsibleRole: 'Workplace Safety Manager (OHS) & Plant Medical Officer',
    targetInterventionTimeframe: '< 12 Hours',
    status: 'IN_PROGRESS',
    locationReliability: 'HIGH',
    auditTrail: [
      { id: 'aud-4', timestamp: '2026-10-30 00:00 IST', actor: 'Sentinel Surveillance Engine', role: 'System Automated', action: 'CREATED', notes: 'Moderate early warning raised' },
      { id: 'aud-5', timestamp: '2026-10-30 06:15 IST', actor: 'Vikram Joshi (OHS)', role: 'Workplace Safety Lead', action: 'INTERVENTION_ORDERED', notes: 'Electrolytic fluids dispatched; shift rotation active.' }
    ],
  },
  {
    id: 'ALT-2026-0879',
    title: 'Water Source Turbidity Anomaly & Acute Enteric Warning',
    category: 'waterborne',
    riskLevel: 'MODERATE',
    riskScore: 59,
    confidenceScore: 89,
    dataCompleteness: 90,
    missingInputsCount: 3,
    districtId: 'dist-ahmedabad',
    districtName: 'Ahmedabad Naroda-Vatva Zone',
    zone: 'Vatva Canal Drainage Perimeter',
    timestamp: '2026-10-28T14:20:00Z',
    detectedAt: '2026-10-28 19:50 IST',
    anomalySummary: 'Municipal pipeline turbidity telemetry recorded a sudden spike to 6.8 NTU, coinciding with a 48% increase in gastrointestinal consultations in nearby worker residential wards.',
    baselineComparison: [
      { metric: 'Water Turbidity Level', baseline: 1.8, current: 6.8, unit: 'NTU', changePct: 277.7 },
      { metric: 'Acute Diarrheal Complaints', baseline: 14.0, current: 31.0, unit: 'cases/day', changePct: 121.4 },
      { metric: 'Workforce GI Sickness Absence', baseline: 1.1, current: 2.8, unit: '%', changePct: 154.5 },
    ],
    contributingSignals: [
      { signalName: 'Pipeline Turbidity Sensor', category: 'environmental', observedValue: '6.8 NTU', baselineValue: '1.8 NTU', deviationPct: 277.7, zScore: 2.68, weightPct: 45, trend: 'rising' },
      { signalName: 'PHC Enteric Illness Consults', category: 'clinical', observedValue: '31 cases', baselineValue: '14 cases', deviationPct: 121.4, zScore: 2.12, weightPct: 35, trend: 'rising' },
      { signalName: 'Residential Absence Cluster', category: 'workforce', observedValue: '2.8 %', baselineValue: '1.1 %', deviationPct: 154.5, zScore: 1.95, weightPct: 20, trend: 'rising' },
    ],
    recommendedActions: [
      'Inspect supply trunk pipeline for back-siphonage or construction contamination in Vatva',
      'Distribute chlorine purification tablets and boil-water advisory to worker settlements',
      'Collect water samples for immediate bacteriological (E. coli) laboratory culture',
    ],
    responsibleRole: 'Municipal Public Health Engineer & Chief Medical Officer',
    targetInterventionTimeframe: '< 8 Hours',
    status: 'ACKNOWLEDGED',
    locationReliability: 'AGGREGATED_DISTRICT',
    auditTrail: [
      { id: 'aud-6', timestamp: '2026-10-28 19:50 IST', actor: 'Sentinel Surveillance Engine', role: 'System Automated', action: 'CREATED', notes: 'Turbidity anomaly cross-referenced with PHC logs' }
    ],
  }
];

export const INITIAL_PREVENTIVE_ACTIONS: PreventiveAction[] = [
  {
    id: 'ACT-2026-101',
    alertId: 'ALT-2026-0891',
    title: 'Deploy High-Volume ORS & Potable Water Stations',
    category: 'heat_stress',
    priority: 'CRITICAL',
    responsibleRole: 'Occupational Health & Safety Manager',
    operationalOwner: 'R. K. Sharma (Surat Plant Operations)',
    districtName: 'Surat Industrial Corridor',
    locationDetails: 'Foundry & Heavy Chemical Sheds (Bays 1-6)',
    deadline: '2026-10-30 11:00 IST',
    status: 'IN_PROGRESS',
    rationale: 'Severe WBGT reading of 33.6°C indicates imminent heat syncope and heat exhaustion in physical labor sectors.',
    evidenceRequired: 'Digital log of water delivery, electrolyte refill schedule, and supervisory signoff.',
  },
  {
    id: 'ACT-2026-102',
    alertId: 'ALT-2026-0891',
    title: 'Implement 45-Min Work / 15-Min Shaded Rest Cycles',
    category: 'heat_stress',
    priority: 'CRITICAL',
    responsibleRole: 'Industrial Hygiene Officer',
    operationalOwner: 'P. Verma (Workforce Scheduling)',
    districtName: 'Surat Industrial Corridor',
    locationDetails: 'Zone 4 Fabrication Yards',
    deadline: '2026-10-30 09:30 IST',
    status: 'IMPLEMENTED',
    rationale: 'OSHA & Indian National Institute of Occupational Health (NIOH) thermal fatigue guidelines for WBGT > 32°C.',
    evidenceRequired: 'Adjusted shift roster and automated turnstile log verification.',
    completionProof: 'Shift rosters adjusted to 45/15 protocol; 18 shaded canopies with mist fans operational.',
    verifiedBy: 'Dr. M. K. Patel (DHO)',
    verifiedAt: '2026-10-30 09:15 IST'
  },
  {
    id: 'ACT-2026-103',
    alertId: 'ALT-2026-0887',
    title: 'Mandate N95 Respirators & Industrial Anti-Dust Fogging',
    category: 'air_quality',
    priority: 'CRITICAL',
    responsibleRole: 'District Surveillance Officer',
    operationalOwner: 'S. Banerjee (Okhla Industrial Association)',
    districtName: 'South Delhi / Okhla Industrial Cluster',
    locationDetails: 'Okhla Freight & Logistics Depots',
    deadline: '2026-10-30 12:00 IST',
    status: 'IN_PROGRESS',
    rationale: 'Particulate inversion PM2.5 > 190 µg/m³ directly triggers acute bronchospasm in outdoor workers.',
    evidenceRequired: 'PPE distribution receipts and GPS logs of water sprinkler trucks.',
  },
  {
    id: 'ACT-2026-104',
    alertId: 'ALT-2026-0882',
    title: 'Upgrade Shopfloor Industrial HVLS Air Circulators',
    category: 'heat_stress',
    priority: 'HIGH',
    responsibleRole: 'Plant Maintenance Lead',
    operationalOwner: 'Vikram Joshi (OHS)',
    districtName: 'Pune MIDC Industrial Hub',
    locationDetails: 'Bhosari Auto Component Line 3 & 4',
    deadline: '2026-10-30 16:00 IST',
    status: 'IN_PROGRESS',
    rationale: 'Air velocity increase of 1.5 m/s reduces effective skin thermal sensation by ~2.8°C.',
    evidenceRequired: 'Anemometer air speed readings and maintenance completion sheet.',
  },
  {
    id: 'ACT-2026-105',
    alertId: 'ALT-2026-0879',
    title: 'Execute Water Trunk Super-Chlorination & Bacteriological Sampling',
    category: 'waterborne',
    priority: 'HIGH',
    responsibleRole: 'Municipal Public Health Engineer',
    operationalOwner: 'A. Desai (Water Works Dept)',
    districtName: 'Ahmedabad Naroda-Vatva Zone',
    locationDetails: 'Vatva Sector 3 Pipeline Junction',
    deadline: '2026-10-30 14:00 IST',
    status: 'PENDING',
    rationale: 'Turbidity excursion > 5 NTU neutralizes standard residual chlorine, increasing pathogen survival.',
    evidenceRequired: 'Lab culture report for Coliform / E. coli and residual chlorine titration test log.',
  },
  {
    id: 'ACT-2026-106',
    title: 'Routine Occupational Ergonomics & Chemical Fume Audit',
    category: 'occupational_injury',
    priority: 'MEDIUM',
    responsibleRole: 'Industrial Hygiene Inspector',
    operationalOwner: 'Dr. T. Rao (OHS Hyderabad)',
    districtName: 'Hyderabad Genome & Pharma Valley',
    locationDetails: 'Bulk Drug Extraction Unit 2',
    deadline: '2026-11-02 17:00 IST',
    status: 'PENDING',
    rationale: 'Monthly scheduled occupational hygiene check under Factory Inspectorate guidelines.',
    evidenceRequired: 'Chemical exposure badge readings and ergonomic posture risk survey.',
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'HIGH ALERT: Surat Industrial Heat Crisis Detected',
    timestamp: '15 mins ago',
    type: 'ALERT_HIGH',
    message: 'Extreme thermal index WBGT 33.6°C + 256% jump in sickness absence flagged by AI early warning engine.',
    read: false,
    districtId: 'dist-surat',
    alertId: 'ALT-2026-0891'
  },
  {
    id: 'notif-2',
    title: 'HIGH ALERT: South Delhi Winter Smog & Particulate Surge',
    timestamp: '3 hours ago',
    type: 'ALERT_HIGH',
    message: 'AQI 342 with 107% surge in emergency asthma visits. Action required for open-air workforce.',
    read: false,
    districtId: 'dist-delhi',
    alertId: 'ALT-2026-0887'
  },
  {
    id: 'notif-3',
    title: 'Action Due: Surat Rest Cycle Verification',
    timestamp: '4 hours ago',
    type: 'ACTION_DUE',
    message: 'Workplace scheduling officer must verify 45/15 rest interval implementation for Foundry bays.',
    read: true,
    districtId: 'dist-surat'
  },
  {
    id: 'notif-4',
    title: 'Data Completeness Notice: Vatva Water Sensors',
    timestamp: 'Yesterday',
    type: 'DATA_GAP',
    message: '3 secondary water telemetry sensors experienced transient latency. Missing data imputed using Kalman filter.',
    read: true,
    districtId: 'dist-ahmedabad'
  }
];

export const SCIENTIFIC_VALIDATION_METRICS: ValidationMetric[] = [
  {
    metricName: 'Sensitivity (True Positive Rate)',
    score: '92.4%',
    target: '≥ 88.0%',
    description: 'Proportion of actual historical health surges and occupational clusters correctly flagged in advance.',
    datasetContext: 'Evaluated against 1,480 documented historical occupational and public health surge events across 14 industrial belts.',
    validationMethod: 'Stratified 5-Fold Cross Validation & Temporal Split'
  },
  {
    metricName: 'Positive Predictive Value (Precision)',
    score: '88.1%',
    target: '≥ 85.0%',
    description: 'Proportion of early warnings that corresponded to verified on-ground clinical surges or occupational illness.',
    datasetContext: 'Validated through matched clinical hospital inpatient records and verified factory incident reports.',
    validationMethod: 'Epidemiological Retrospective Confirmation'
  },
  {
    metricName: 'False Alarm Rate',
    score: '4.8%',
    target: '< 6.0%',
    description: 'Rate of spurious alerts triggering unnecessary administrative or operational disruption.',
    datasetContext: 'Measured during baseline non-epidemic periods across 12 consecutive calendar months.',
    validationMethod: 'Continuous False Positive Audit Rate'
  },
  {
    metricName: 'Detection Lead Time Gain',
    score: '3.8 Days',
    target: '≥ 2.5 Days',
    description: 'Average time gained prior to conventional hospital inpatient registry or statutory labor incident reporting.',
    datasetContext: 'Comparison against traditional Integrated Disease Surveillance Programme (IDSP) portal latency.',
    validationMethod: 'Temporal Event Onset Difference Analysis'
  },
  {
    metricName: 'Missing Data Resilience',
    score: 'Up to 35% Packet Loss',
    target: '≥ 25% Loss',
    description: 'Maintains alert sensitivity (>85%) under synthetic dropout of environmental or clinical telemetry feeds.',
    datasetContext: 'Stress tested with random sensor dropouts, network blackouts, and delayed hospital sync.',
    validationMethod: 'Monte Carlo Sensor Degradation Simulation'
  },
  {
    metricName: 'Model Calibration (Brier Score)',
    score: '0.082',
    target: '< 0.100',
    description: 'Measures how well predicted probabilities match empirical observation frequencies (0 is perfect).',
    datasetContext: 'Platt scaling and isotonic calibration applied across multi-signal logistic ensemble.',
    validationMethod: 'Reliability Diagram & Brier Decomposition'
  }
];

export const HISTORICAL_BACKTEST_RECORDS: BacktestRecord[] = [
  {
    scenarioId: 'BT-2025-01',
    name: '2025 Western India Pre-Monsoon Heatwave',
    eventPeriod: 'April 14 - May 02, 2025',
    historicalOutbreakType: 'Industrial Heat Stress & Severe Dehydration',
    leadTimeGainDays: 4.2,
    detectionAccuracyPct: 94.6,
    falseAlarmRatePct: 3.8,
    status: 'VALIDATED_EXCELLENT'
  },
  {
    scenarioId: 'BT-2024-04',
    name: '2024 Delhi-NCR Post-Harvest Winter Inversion',
    eventPeriod: 'November 02 - November 24, 2024',
    historicalOutbreakType: 'Acute Particulate Bronchial Influx',
    leadTimeGainDays: 3.6,
    detectionAccuracyPct: 91.8,
    falseAlarmRatePct: 4.5,
    status: 'VALIDATED_EXCELLENT'
  },
  {
    scenarioId: 'BT-2024-02',
    name: '2024 Gujarat Coastal Monsoon Flood Cluster',
    eventPeriod: 'July 18 - August 05, 2024',
    historicalOutbreakType: 'Waterborne Enteric / Acute Diarrheal Surge',
    leadTimeGainDays: 3.1,
    detectionAccuracyPct: 89.4,
    falseAlarmRatePct: 5.2,
    status: 'VALIDATED_PASS'
  },
  {
    scenarioId: 'BT-2023-09',
    name: '2023 Telangana Industrial Solvents Exposure',
    eventPeriod: 'September 10 - September 28, 2023',
    historicalOutbreakType: 'Occupational Chemical Irritant Cluster',
    leadTimeGainDays: 4.5,
    detectionAccuracyPct: 93.0,
    falseAlarmRatePct: 4.1,
    status: 'VALIDATED_EXCELLENT'
  }
];
