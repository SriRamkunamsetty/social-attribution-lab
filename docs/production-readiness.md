# Production-readiness checklist

## Before real deployment

- Implement OAuth per approved platform and encrypt refresh tokens with a managed KMS.
- Implement the connector contract in `src/connectors.mjs` for each approved provider; retain source references and sync cursors to make every metric reproducible.
- Confirm platform terms, consent, data residency, retention, and permitted benchmark use.
- Replace seeded data with a warehouse and tested provider adapters; never scrape restricted data.
- Add SSO, RBAC, tenant isolation, audit logs, secret rotation, backups, and deletion workflows.
- Instrument request latency, connector failure rate, freshness lag, and metric-completeness alerts.
- Use a background queue for ingestion; enforce idempotency keys and exponential backoff.
- Validate every metric calculation with fixture-based unit tests and data-quality checks.
- Route report generation through analyst approval; label forecasts, correlations, and simulations accurately.

## Current implementation

- No external data collection or credentials.
- Security headers, method allow-list, local rate limiting, request IDs, payload-size limits, and safe static-path handling.
- Versioned API routes (`/api/v1`), input validation, role checks, report queue contract, audit-event contract, health and readiness endpoints.
- Postgres tenant schema, row-level-security policies, Docker/Compose deployment configuration, and GitHub CI.
- Deterministic data for review; the in-memory repository exists only for demo mode and must be replaced by a Postgres adapter for persistence.
