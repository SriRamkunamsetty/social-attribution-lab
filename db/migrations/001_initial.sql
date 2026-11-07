-- PostgreSQL 16+ / tenant-isolated social analytics application schema.
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE tenants (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE users (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), tenant_id uuid NOT NULL REFERENCES tenants(id), email citext NOT NULL, role text NOT NULL CHECK (role IN ('viewer','analyst','editor','admin')), created_at timestamptz NOT NULL DEFAULT now(), UNIQUE(tenant_id,email));
CREATE TABLE platform_connections (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), tenant_id uuid NOT NULL REFERENCES tenants(id), provider text NOT NULL, encrypted_refresh_token bytea NOT NULL, scopes text[] NOT NULL, status text NOT NULL DEFAULT 'active', last_synced_at timestamptz, UNIQUE(tenant_id,provider));
CREATE TABLE campaigns (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), tenant_id uuid NOT NULL REFERENCES tenants(id), name text NOT NULL, starts_at timestamptz, ends_at timestamptz, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE metric_observations (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), tenant_id uuid NOT NULL REFERENCES tenants(id), campaign_id uuid REFERENCES campaigns(id), provider text NOT NULL, metric_key text NOT NULL, observed_at timestamptz NOT NULL, dimensions jsonb NOT NULL DEFAULT '{}', value numeric NOT NULL, source_ref text NOT NULL, ingested_at timestamptz NOT NULL DEFAULT now(), UNIQUE(tenant_id,provider,metric_key,observed_at,source_ref));
CREATE INDEX metric_observations_tenant_time ON metric_observations(tenant_id, observed_at DESC);
CREATE TABLE audit_events (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), tenant_id uuid NOT NULL REFERENCES tenants(id), actor_id uuid, project_slug text NOT NULL, event_type text NOT NULL, entity_id text, payload jsonb NOT NULL DEFAULT '{}', created_at timestamptz NOT NULL DEFAULT now());
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE metric_observations ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_events ENABLE ROW LEVEL SECURITY;
-- At request setup, execute: SELECT set_config('app.tenant_id', '<tenant uuid>', true);
CREATE POLICY tenant_campaigns ON campaigns USING (tenant_id::text = current_setting('app.tenant_id', true));
CREATE POLICY tenant_metrics ON metric_observations USING (tenant_id::text = current_setting('app.tenant_id', true));
CREATE POLICY tenant_audit ON audit_events USING (tenant_id::text = current_setting('app.tenant_id', true));
