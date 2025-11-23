# M2

Media stack and Nextcloud with auth and Cloudflare Tunnel, refreshed with community guidance current through **November 25, 2024**.

## Installer website (updated Nov 25, 2024)

The `web/` directory contains **M2 Installer Studio**, a single-page app that now includes:

- **Quick-start templates** powered by Reddit/Discord-popular stacks (media, photo AI, productivity, etc.) so you can load a community-vetted baseline with one click.
- **Full Nextcloud catalog entry** with the env variables the Compose generator already knew how to render, ensuring collaboration services show up alongside the media stack.
- **Field insights + popover tips** for every profile/toggle input, summarizing what the social/self-hosted crowd was recommending on 11/25/2024.
- **Progress ring + background particles** to keep you oriented through the seven-step wizard without reloading the page.
- **AI Configuration Assistant** anchored to the bottom-right of the screen for quick reminders sourced from popular homelab discussions.

Use the **Load sample stack** button in Step 1 to preload a representative plan
with Jellyfin, Radarr/Sonarr/qBittorrent, Prowlarr, subtitle and request
helpers, plus Nextcloud and FileBrowser for documents. The previews will update
instantly so you can copy a working example or tweak it for your environment.

Open `web/index.html` in your browser to start designing your deployment. No backend is required; everything runs client-side.

## Automated smoke tests

Run the browser smoke in CI or before deploying to ensure the template gallery and AI assistant stay functional:

```bash
npm install
npx playwright install
npm run test:e2e
```

The Playwright suite boots a local `python3 -m http.server` from `web/`, navigates through the wizard to confirm the template gallery renders cards, and toggles the AI assistant window open/closed.

GitHub Actions (`.github/workflows/e2e.yml`) runs the very same command on every push and pull request so regressions block merges automatically.

## Memory log

See `IMPROVEMENTS.md` for a point-in-time log of the ten fixes/improvements implemented during this review. It references where each decision came from (blog posts, social feeds, etc.) so future reviewers know why a change was made.
