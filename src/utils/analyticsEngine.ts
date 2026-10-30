/**
 * Swasthya Sentinel AI - Core Anomaly Detection & Statistical Surveillance Engine
 * Bharat Innovation - Project Lead: Shaik Mulla Sadik
 */

import { DailyObservation, RiskLevel } from '../types';

/**
 * Privacy by Design: Small-Cell Suppression
 * Prevents re-identification of individuals in low-count scenarios.
 * Any health incidence count below 5 is masked as '<5' or suppressed in granular tables.
 */
export function formatPrivacyCell(count: number, threshold: number = 5): string {
  if (count <= 0) return '0';
  if (count < threshold) return '<5';
  return count.toLocaleString();
}

/**
 * Calculates mean of an array of numbers
 */
export function calculateMean(values: number[]): number {
  if (!values.length) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

/**
 * Calculates standard deviation
 */
export function calculateStdDev(values: number[], mean?: number): number {
  if (values.length < 2) return 0;
  const m = mean !== undefined ? mean : calculateMean(values);
  const variance = values.reduce((sum, v) => sum + Math.pow(v - m, 2), 0) / (values.length - 1);
  return Math.sqrt(variance);
}

/**
 * Calculates Z-score: z = (observed - mean) / stdDev
 */
export function calculateZScore(observed: number, mean: number, stdDev: number): number {
  if (stdDev <= 0.0001) return 0;
  return Number(((observed - mean) / stdDev).toFixed(2));
}

/**
 * Moving Average Calculation (rolling N days)
 */
export function calculateRollingAverage(series: number[], windowSize: number = 7): number[] {
  const result: number[] = [];
  for (let i = 0; i < series.length; i++) {
    const start = Math.max(0, i - windowSize + 1);
    const window = series.slice(start, i + 1);
    result.push(Number(calculateMean(window).toFixed(1)));
  }
  return result;
}

/**
 * Multi-Signal Pearson Correlation Coefficient (r)
 * Explains statistical co-occurrence without claiming causality.
 */
export function calculatePearsonCorrelation(seriesA: number[], seriesB: number[]): number {
  const n = Math.min(seriesA.length, seriesB.length);
  if (n < 3) return 0;

  const a = seriesA.slice(0, n);
  const b = seriesB.slice(0, n);

  const meanA = calculateMean(a);
  const meanB = calculateMean(b);

  let numerator = 0;
  let denomA = 0;
  let denomB = 0;

  for (let i = 0; i < n; i++) {
    const diffA = a[i] - meanA;
    const diffB = b[i] - meanB;
    numerator += diffA * diffB;
    denomA += diffA * diffA;
    denomB += diffB * diffB;
  }

  const denominator = Math.sqrt(denomA * denomB);
  if (denominator === 0) return 0;

  return Number((numerator / denominator).toFixed(2));
}

/**
 * Risk Level Classifier according to Platform Specification:
 * - LOW: 0 - 39 (Normal baseline monitoring)
 * - MODERATE: 40 - 69 (Increased observation & preventive measures)
 * - HIGH: 70 - 100 (Immediate review and targeted intervention)
 */
export function classifyRiskLevel(score: number): RiskLevel {
  if (score >= 70) return 'HIGH';
  if (score >= 40) return 'MODERATE';
  return 'LOW';
}

/**
 * Time-series exponential smoothing forecast for next 7 days
 */
export function generateForecast(
  history: DailyObservation[],
  horizonDays: number = 7,
  alpha: number = 0.35
): { date: string; projectedRiskScore: number; lowerBound: number; upperBound: number }[] {
  if (!history.length) return [];

  const scores = history.map((d) => d.compositeRiskScore);
  let smoothed = scores[0];

  for (let i = 1; i < scores.length; i++) {
    smoothed = alpha * scores[i] + (1 - alpha) * smoothed;
  }

  const lastObs = history[history.length - 1];
  const lastDate = new Date(lastObs.date);
  const forecast = [];

  // Recent trend factor
  const recentDiff = scores[scores.length - 1] - scores[Math.max(0, scores.length - 4)];
  const trendSlope = recentDiff / 3;

  for (let d = 1; d <= horizonDays; d++) {
    const nextDate = new Date(lastDate);
    nextDate.setDate(lastDate.getDate() + d);

    // Damped trend projection
    const projected = Math.min(
      100,
      Math.max(5, smoothed + trendSlope * d * Math.pow(0.85, d))
    );
    const uncertaintyBand = d * 2.2;

    forecast.push({
      date: nextDate.toISOString().split('T')[0],
      projectedRiskScore: Math.round(projected),
      lowerBound: Math.max(0, Math.round(projected - uncertaintyBand)),
      upperBound: Math.min(100, Math.round(projected + uncertaintyBand)),
    });
  }

  return forecast;
}
