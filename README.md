# M2

Media stack and Nextcloud with auth and Cloudflare Tunnel.

## Installer website

The `web/` directory contains **M2 Installer Studio**, a single-page app that lets you:

- Pick services (Jellyfin, Sonarr/Radarr/qBittorrent, Nextcloud, auth gateway, Cloudflare Tunnel, observability, and MinIO/S3).
- Provide required `.env` values with safe defaults and helper text.
- See empty required inputs highlighted inline while you edit.
- Generate a tailored `compose.yml` and `.env` that you can copy or download.
- Follow a quick runbook to validate and start the stack.

Use the **Load sample stack** button in Step 1 to preload a representative plan
with Jellyfin, Radarr/Sonarr/qBittorrent, Prowlarr, subtitle and request
helpers, plus Nextcloud and FileBrowser for documents. The previews will update
instantly so you can copy a working example or tweak it for your environment.

Open `web/index.html` in your browser to start designing your deployment. No backend is required; everything runs client-side.
