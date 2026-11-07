// Product-specific decision rules. Inputs are normalized records in production;
// the seeded values make the methods inspectable in this portfolio build.
export const featureWorkspaces = {
  "campaign-command-center": () => ({
    kind: "campaign_optimization",
    scenario: { recommendedBudgetShiftPct: 12, from: "broad paid reach", to: "creator amplification", guardrail: "Do not shift if qualified CPV exceeds $0.055 for two consecutive days." },
    definitions: { qualifiedView: "View meeting the approved duration threshold for its platform", cpv: "Paid spend / qualified views" }
  }),
  "release-hype-radar": () => {
    const baseline = [18, 20, 24, 22, 31, 37, 45]; const current = 116;
    const mean = baseline.reduce((a, b) => a + b, 0) / baseline.length;
    const deviation = Math.sqrt(baseline.reduce((a, b) => a + (b - mean) ** 2, 0) / baseline.length);
    return { kind: "listening_alert", detection: { method: "rolling z-score", baselineWindowDays: 7, observed: current, baselineMean: Number(mean.toFixed(1)), zScore: Number(((current - mean) / deviation).toFixed(2)), threshold: 2.5 }, triage: { owner: "regional social lead", targetResponseMinutes: 30, status: "investigating" } };
  },
  "creative-intelligence-lab": () => ({
    kind: "creative_association",
    finding: { feature: "Lead character visible in first 1.5 seconds", comparison: "+7.4 percentage points 3-second hold rate", sampleSize: 284, adjustedFor: ["platform", "asset duration", "audience", "paid status"], causalStatus: "association_only" },
    experiment: { hypothesis: "An earlier character reveal improves the opening hold rate", primaryMetric: "three_second_hold_rate", guardrails: ["completion_rate", "negative_comment_rate"], minimumSamplePerCell: 500 }
  }),
  "creator-measurement-studio": () => ({
    kind: "creator_scorecard",
    weights: { audienceFit: 0.35, qualifiedCPV: 0.25, audienceOverlap: 0.20, brandSafety: 0.20 },
    policy: { manualSafetyReviewRequired: true, automatedScoreCannotAutoApprove: true, scoreVersion: "1.0.0" }
  }),
  "executive-narrative-copilot": () => ({
    kind: "evidence_ledger",
    claimPolicy: { publicationRequires: ["approved_metric_definition", "query_identifier", "data_freshness", "analyst_approval"], blockedTermsWithoutExperiment: ["caused", "proved", "incremental"] },
    reportStatus: { claimsVerified: 18, claimsPending: 0, recommendationsAssigned: 2 }
  }),
  "social-attribution-lab": () => ({ kind: "incrementality_measurement", design: { method: "matched_market", confidenceLevel: 0.95, preRegistered: true, treatmentLift: 0.078 }, policy: { lastClickIsNotIncrementality: true, requiredCaveat: "Observational attribution is reported separately from experimental lift." } }),
  "fan-lifecycle-intelligence": () => ({ kind: "consent_based_lifecycle", stages: ["aware", "engaged", "activated", "advocate"], policy: { consentRequiredForOwnedIdentity: true, sensitiveAttributeInferenceProhibited: true, retentionWindowDays: 30 } }),
  "paid-social-budget-optimizer": () => ({ kind: "pacing_scenario", guardrails: { maxFrequency: 4.5, conversionLagDays: 7, changesRequireApproval: true }, scenario: { reallocateUsd: 14200, from: "retargeting", to: "prospecting" } }),
  "competitive-intelligence-engine": () => ({ kind: "benchmark_governance", methodology: { taxonomyVersion: "2.1", sourceTypes: ["public", "licensed"], paidSpendInferenceProhibited: true }, quality: { sourceCoverageReviewRequired: true } }),
  "community-care-operations": () => ({ kind: "social_care_workflow", service: { responseSlaMinutes: 30, qaSampleSize: 240 }, policy: { safetyCriticalFinalDecisionHumanOnly: true, escalationComplianceTarget: 0.99 } })
};

export function workspaceFor(slug) { return featureWorkspaces[slug]?.() ?? null; }
