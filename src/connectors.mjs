// Provider adapters deliberately receive only an authorized connection and a bounded window.
// Each adapter must write raw payload metadata, use idempotency keys, and map fields to the
// metric dictionary before records are exposed to analytics or reporting APIs.
export const connectorContract = {
  requiredMethods: ["authorize", "refresh", "fetchAccounts", "fetchContent", "fetchMetrics", "health"],
  requiredRecordFields: ["provider", "sourceRef", "observedAt", "metricKey", "value", "dimensions"],
  operationalRules: ["honor provider rate limits", "backoff on 429/5xx", "never log tokens", "record sync cursor", "deduplicate on provider+sourceRef+metric+observedAt"]
};

export function assertNormalizedRecord(record) {
  for (const field of connectorContract.requiredRecordFields) if (record[field] === undefined || record[field] === null) throw new Error(`connector_record_missing_${field}`);
  if (!Number.isFinite(Number(record.value))) throw new Error("connector_record_value_invalid");
  return record;
}
