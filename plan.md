# M2 Installer Website Plan

This plan describes the interactive installer website we want for M2. The goal is to turn the existing documentation-only repo into a web-based builder that produces a tailored Docker Compose stack and `.env` file for a media platform. It now folds in the improvements logged on **Nov 25, 2024** (template gallery, AI assistant, progress ring, and field insights sourced from Reddit/Discord feedback).

## Objectives
- Collect user requirements (domains, storage locations, preferred apps, authentication, observability).
- Generate a Compose file and `.env` tailored to those choices.
- Provide sensible defaults aligned with modern homelab/community guidance.
- Offer step-by-step commands for running the generated stack.
- Keep everything client-side so the page can be opened locally without extra tooling.

## Core Features
1. **Profile questionnaire** that asks for:
   - Project name, base domain, timezone, media storage path.
   - Preferred auth gateway (Authelia, Authentik, or OAuth2 Proxy).
   - Whether to include Cloudflare Tunnel, observability, object storage, and GPU acceleration.
2. **Service catalog** to toggle:
   - Jellyfin media server, Sonarr/Radarr automation, qBittorrent download client.
   - Nextcloud collaboration stack with Postgres and Redis.
   - Optional MinIO/S3 backend for object storage.
   - Prometheus/Grafana/Loki logging + metrics bundle.
3. **Dynamic `.env` model** built from the chosen services with defaults and inline helper text.
4. **Compose generator** that outputs a ready-to-save YAML with:
   - Networks separated for ingress and downloads.
   - Sensible healthchecks and resource hints.
   - Hooks for Cloudflare Tunnel routes and auth proxy.
5. **Export actions** to copy or download the Compose and `.env` previews.
6. **Runbook snippets** summarizing the docker commands to execute.
7. **Quality-of-life helpers** adopted from community feedback:
   - Quick-start template gallery highlighting stacks popular on social media.
   - Popover insights for every form input so users see the “why” straight from Nov 25, 2024 community threads.
   - A progress ring + AI assistant to keep users oriented without leaving the page.
   - A Playwright smoke test (`npm run test:e2e`) that loads the template gallery and AI assistant so regressions can gate pull requests.

## UX Notes
- The generator should stay readable on mobile and desktop.
- Surface inline tips based on community practices (e.g., hardware transcoding, tunnel egress rules).
- Prefer descriptive labels instead of raw variable names; show both in the env table.

## Non-Goals
- No backend or server-side persistence.
- No automatic cloud account creation; the user supplies their own credentials.

This plan should guide the implementation of the installer page and can be updated as the stack evolves.
