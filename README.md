# Social Attribution Lab

## Purpose

Measures conversion contribution without confusing last-click attribution for incrementality. Designed for entertainment marketers deciding how much social investment creates additional outcomes rather than merely receiving credit.

## Core capabilities

- Compare attribution models with experiment-derived lift.
- Store matched-market or holdout design parameters, confidence level, and pre-registration status.
- Report incremental CPA separately from platform-reported or last-click CPA.
- Require caveats when a result is observational instead of experimental.

## Production requirements

- Approved conversion events, consented identity resolution, and data-processing agreements.
- Pre-registered test design, treatment/control definitions, and power analysis.
- Immutable analysis versions and reviewer approval for investment recommendations.
- No causal claims without a valid experimental or quasi-experimental design.

## Workspace API

`GET /api/v1/projects/social-attribution-lab/workspace`

Returns the matched-market measurement policy and required reporting caveats.
