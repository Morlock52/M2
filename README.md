# M2 Installer Studio

Design a self-hosted media, AI, and collaboration stack, generate a ready-to-run `docker-compose.yml` + `.env`, and capture a Markdown runbook in one browser-based workflow. The installer UX is frozen to community guidance current through **December 3, 2025**.

---

## Why you might want this

- **Seven-step wizard** that mirrors Reddit/Discord-favorite media stacks (Jellyfin, *arr family, Immich, Nextcloud, Cloudflare Tunnel, Authentik/Authelia, etc.).
- **Per-service env builder** with inline insights so you copy/paste a clean `.env` without guesswork.
- **User variable locker + runbook export** for tracking API tokens, domains, GPU choices, and Cloudflare Access decisions.
- **AI Configuration Assistant** and tooltips summarizing the best practices that were circulating as of 2025-12-03.
- **Zero build tooling** — open `web/index.html` in any modern browser; run Playwright tests only if you want CI coverage.

---

## Audience cheat sheet

| If you are… | Focus on |
| --- | --- |
| **New to self-hosting** | Quick Start section below. Load the sample stack, edit paths/domains, and download the generated files. No CLI skills required. |
| **Experienced / automation-heavy** | Advanced sections on customizing `serviceCatalog`, piping `.env`/Compose into Git, and running the Playwright CI smoke. |

Related docs:

- `USAGE.md` – day-2 operations guide (auth, Cloudflare Tunnel, backups).
- `DESIGN.md` – UX decisions and data sources.
- `IMPROVEMENTS.md` – change log for the latest installer refresh.
- `FUNCTIONALITY_REPORT.md` – validation evidence.

## Stack snapshot (Dec 3, 2025)

| Component | Latest drop | Why it matters |
| --- | --- | --- |
| Jellyfin | [10.11.4 (2025-12-01)](https://github.com/jellyfin/jellyfin/releases/tag/v10.11.4) | Confirms the media server row in the wizard still aligns with the newest bugfix build, including safer HDR fallback behaviour noted in the release notes. |
| Nextcloud | [v32.0.2 (2025-11-20)](https://github.com/nextcloud/server/releases/tag/v32.0.2) | Keeps the collaboration profile current with Hub 8-era features and database requirements. |
| Immich | [v2.3.1 (2025-11-20)](https://github.com/immich-app/immich/releases/tag/v2.3.1) | Highlights the hot fix that stops the web UI from freezing on update notifications, so the photo stack template points at a stable tag. |
| Authelia | [v4.39.15 (2025-11-29)](https://github.com/authelia/authelia/releases/tag/v4.39.15) | Addresses LDAP health checks and server-authorization defaults—the access wizard leans on these fixes when recommending Authelia. |
| Cloudflare Zero Trust | [WARP post-quantum rollout (2025-09-24)](https://blog.cloudflare.com/post-quantum-warp/) | Emphasizes that Cloudflare’s WARP/One Agent now supports post-quantum tunnels, so the generated runbook nudges you to enable PQC for tunnels. |
| Cloudflare Tunnel routing | [Hostname-based routing now free (2025-09-18)](https://blog.cloudflare.com/tunnel-hostname-routing/) | Explains why the wizard defaults to hostname-per-service guidance instead of IP allowlists. |

---

## Prerequisites

| Scenario | Requirements |
| --- | --- |
| **Open the wizard locally** | Any modern desktop browser (Chrome, Firefox, Safari, Edge). |
| **Serve it over HTTP (optional but handy for mobile testing)** | `python3` or any static HTTP server. |
| **Run automated tests / integrate with CI** | Node.js 18+, npm, and the ability to install Playwright browsers (`npx playwright install`). |

> 💡 *You never have to deploy a backend.* Everything — templates, catalog, AI assistant, runbook export — runs client-side from the `web/` folder.

---

## Quick start (GUI only, no terminal)

1. **Download or clone** this repository and open the `web/` folder.
2. **Double-click `index.html`** (or drag-drop it into your browser). All assets load locally.
3. **Click “🚀 Start Easy Setup Wizard.”** The sidebar shows the seven steps and progress ring.
4. **Press “Load sample stack.”** This pre-selects Jellyfin, Radarr/Sonarr/qBittorrent, Prowlarr, Immich, FileBrowser, Nextcloud, and Cloudflare Tunnel.
5. **Walk through the steps:**
   - Fill in project profile → choose media types → toggle services → pick auth/tunnel → build the `.env`.
   - Use the inline “insights” badges that cite the releases above (Jellyfin 10.11.4, Nextcloud 32.0.2, Immich 2.3.1, Authelia 4.39.15) plus Cloudflare’s September 2025 Zero Trust updates.
6. **Download artifacts:**
   - `.env` for secrets and ports.
   - `docker-compose.yml` (Compose v3.9 with `x-user-vars` stub if you saved custom values).
   - `variables.md` runbook describing every decision.
7. Copy those three files to your homelab host and continue with “Deploy your generated stack” below.

That’s it — you have a runnable plan without touching npm, Vite, or React.

---

## Serving the wizard over HTTP (recommended for shared or mobile testing)

Although double-clicking works, local HTTP avoids browser security nags (especially around downloads). Pick one:

### Option A – Python’s built-in server

```bash
cd web
python3 -m http.server 4173
```

Visit `http://127.0.0.1:4173`. This is the same command the Playwright suite uses.

### Option B – Any static file server (`npm`, Docker, Caddy, etc.)

For example, using `serve`:

```bash
npm install -g serve
cd web
serve -l 4173
```

---

## The seven-step wizard at a glance

1. **Profile** – Set project name (`COMPOSE_PROJECT_NAME`), base domain, timezone, and filesystem roots. “Auto-fill safe defaults” matches late-2025 community templates.
2. **File type coverage** – Click the media types you care about; the coverage summary highlights which services meet each need.
3. **Pick your stack** – Toggle GPU hints, Cloudflare Tunnel, or object storage, then choose services from the catalog. Each card exposes required env vars.
4. **Access & identity** – Select Authelia, Authentik, or OAuth2 Proxy. Notes explain common Cloudflare Access pairings.
5. **Build the `.env`** – Edit every variable in one grid. Saved “User variables” let you store API tokens once and drop them into both `.env` and the Compose extension field.
6. **Compose output** – Live preview of the generated YAML with `x-user-vars` anchors, Cloudflare tunnel blocks, storage mounts, and chosen services wired together.
7. **Runbook** – Document reasoning per service, then export a Markdown changelog for future audits.

Sidecar helpers you can rely on:

- **AI Configuration Assistant** (button in the lower-right). It answers common “what should I pick?” questions using canned guidance from the December 2025 homelab scene.
- **Progress ring + keyboard focus** so you always know where you are in the flow.

---

## Deploy your generated stack

Once you download the `.env`, `docker-compose.yml`, and optional `variables.md`:

1. **Copy the files** to the host that will run the containers (for example via `scp`):

   ```bash
   scp docker-compose.yml .env user@homelab:/srv/m2-stack/
   scp variables.md user@homelab:/srv/m2-stack/docs/   # optional but recommended
   ```

2. **Review secrets** – Replace any placeholder passwords/API keys that you didn’t already edit inside the wizard. Keep `x-user-vars` in the Compose file if you want to surface tokens for other tooling.
3. **Bring up the stack** (Docker example):

   ```bash
   cd /srv/m2-stack
   docker compose pull          # grab latest images
   docker compose up -d
   docker compose ps            # confirm containers are healthy
   ```

4. **Wire up Cloudflare Tunnel + auth** following the step-by-step playbook in `USAGE.md`, then enable the post-quantum WARP/One Agent rollout ([Cloudflare, Sep 24 2025](https://blog.cloudflare.com/post-quantum-warp/)) and hostname-based routing ([Cloudflare, Sep 18 2025](https://blog.cloudflare.com/tunnel-hostname-routing/)) so your Zero Trust posture matches the generated host-per-service guidance.
5. **Record outcomes** – Append verification notes to the exported `variables.md` runbook so future upgrades stay traceable.

> 📌 Looking for Kubernetes or Nomad instructions? Re-use the `.env` as your source of truth and translate the generated Compose file into Helm charts or job specs; the service list in `web/app.js` shows every required variable.

---

## Testing & CI (for experts or teams)

Automated smoke tests ensure the wizard still renders, the AI assistant toggles, and user variables persist.

```bash
npm install
npx playwright install
npm test
```

What happens:

- A static server (`python3 -m http.server 4173`) hosts `web/`.
- Tests in `tests/installer.spec.js` click through the wizard, assert that template cards render, confirm the AI chat opens/closes, verify user variables flow into `.env`/Compose previews, and ensure the runbook download includes service headings.
- CI environments can reuse the exact script; see `playwright.config.js` for details.

---

## Advanced customization (experts)

- **Add or edit catalog entries** – Modify `serviceCatalog` in `web/app.js` (around line 980). Each service controls its card copy, default selection, and env variable schema. Additions automatically flow into the `.env`, Compose generator, and runbook.
- **Tweak theming and motion** – `web/styles.css` holds the glassmorphism layout, while the theme system in `web/app.js` (`themes` + `applyTheme`) controls color palettes, auto-switching, and persistence.
- **AI assistant scripting** – Extend the canned responses inside `AIChat` (search for “AI Configuration Assistant” in `web/app.js`) to reflect your organization’s standards or to link to internal runbooks.
- **Netlify / CDN hosting** – Use `web/netlify.toml` as a drop-in config, or upload the folder to any static host (GitHub Pages, Cloudflare Pages, S3, etc.). No build step is required.
- **Version the generated artifacts** – Store `.env`, `docker-compose.yml`, and `variables.md` in a private Git repo so you can PR changes, trigger infrastructure pipelines, or audit who changed credentials.

---

## Troubleshooting highlights

- **Downloads blocked?** Serve via `python3 -m http.server` so the browser trusts file URLs.
- **Nothing happens when clicking steps?** Check the console for script errors; confirm you didn’t strip `web/app.js` when copying files.
- **Playwright failures on CI?** Ensure the runner exposes a display-less environment (headless is default) and that `python3` is available to start the static server.
- **Need deeper operational help?** Read `USAGE.md` for Cloudflare Tunnel, auth gateway, and backup guidance, or visit the communities listed in that document.

---

## License

MIT — see `LICENSE` if present in your clone, or treat the repo under the default MIT terms defined by the author.

---

## Sources for December 2025 data

- Jellyfin 10.11.4 release notes (2025-12-01) – https://github.com/jellyfin/jellyfin/releases/tag/v10.11.4
- Nextcloud server v32.0.2 (2025-11-20) – https://github.com/nextcloud/server/releases/tag/v32.0.2
- Immich v2.3.1 hot fix (2025-11-20) – https://github.com/immich-app/immich/releases/tag/v2.3.1
- Authelia v4.39.15 (2025-11-29) – https://github.com/authelia/authelia/releases/tag/v4.39.15
- Cloudflare Zero Trust WARP PQC announcement (2025-09-24) – https://blog.cloudflare.com/post-quantum-warp/
- Cloudflare Tunnel hostname routing (2025-09-18) – https://blog.cloudflare.com/tunnel-hostname-routing/
