# Architecture

```text
Approved platform APIs / client files
  -> connector workers (OAuth, retries, idempotency, rate limits)
  -> raw immutable storage
  -> validated transformations + metric dictionary
  -> analytics API + audit ledger
  -> dashboard, alerts, narrative exports
```

The runnable demonstration uses seeded data at the API boundary. In production, isolate each provider adapter; retain raw payloads with access controls; normalize records into `account`, `post`, `metric_observation`, `campaign`, `creator`, `mention`, and `recommendation` entities. Every derived claim must retain its metric definition version, filters, source refresh timestamp, and query identifier.
