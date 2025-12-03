# M2 Installer Studio

Design a self-hosted media, AI, and collaboration stack, generate a ready-to-run `docker-compose.yml` + `.env`, and capture a Markdown runbook in one browser-based workflow. Guidance verified through **December 3, 2025**.

_Last verified: 2025-12-03_

---

## Highlights

- **Seven-step browser wizard** covering Jellyfin + *arr services, Immich, Nextcloud, Cloudflare Tunnel, and Authelia/Authenik, mirroring the stacks Reddit/Discord users recommend today.
- **Per-service env builder** with inline context, so you export a clean `.env` without guesswork.
- **Runbook + user-variable locker** that stores API tokens, GPU selections, DNS targets, and Zero Trust decisions for future audits.
- **AI Configuration Assistant** seeded with community guidance current through 2025-12-03 for instant “what should I pick?” answers.
- **Zero build tooling** — everything ships as static assets in `web/`. Open `index.html` directly or serve it via any static host; npm/Playwright tooling is optional.

---

## Audience compass

| If you are… | Start with | Why |
| --- | --- | --- |
| **New to self-hosting / “just give me the files”** | [New to self-hosting: click-through install](#new-to-self-hosting-click-through-install) | No CLI required, preset stack matches community best practices, and exports happen with a few clicks. |
| **Comfortable with Git/CI or running teams** | [Experienced operator workflow](#experienced-operator-workflow) | Unlock scripted tests, catalog customization, CI smoke tests, and Git-based review of `.env` changes. |

Related docs for deeper dives:

- `USAGE.md` – day-2 auth, tunnel, and backup runbook.
- `DESIGN.md` – how UX decisions were made.
- `IMPROVEMENTS.md` – installer refresh change log.
- `FUNCTIONALITY_REPORT.md` – verification evidence.

---

## Requirements at a glance

| Scenario | Requirements |
| --- | --- |
| **Browser-only use** | Any up-to-date desktop browser (Chrome, Edge, Firefox, Safari). No Node.js needed. |
| **Local HTTP serving (optional)** | `python3` or a static server such as `npm i -g serve`. |
| **Automated tests / CI** | Node.js 18+, npm, ability to run `npx playwright install`. |
| **Deploying the generated stack** | Docker Engine + Compose v2, Cloudflare account + `cloudflared`, and access to the homelab host that will run the containers. |

> 💡 Everything runs client-side. There is no backend to deploy—the wizard writes to your browser only until you download the artifacts.

---

## New to self-hosting: click-through install

1. **Download or clone** this repository and open the `web/` folder.
2. **Launch the wizard** by double-clicking `web/index.html` (or drag-drop it into your browser).
3. **Press “🚀 Start Easy Setup Wizard.”** The sidebar shows all seven steps plus progress tracking.
4. **Load the sample stack.** It preselects Jellyfin, Radarr/Sonarr/qBittorrent, Prowlarr, Immich, FileBrowser, Nextcloud, Cloudflare Tunnel, and Authelia.
5. **Walk through each step:**
   - _Profile_: project name (`COMPOSE_PROJECT_NAME`), base domain, storage roots, timezone.
   - _Media coverage & stack_: toggle services, GPUs, object storage, tunnels.
   - _Access & identity_: choose Authelia vs Authentik and decide on Cloudflare Access posture checks.
   - _`.env` builder_: edit ports, API keys, storage paths, and lock repeated secrets in “User variables” so they auto-fill everywhere.
   - _Outputs_: watch the Compose + runbook previews update live.
6. **Download artifacts** using the buttons beneath the previews:
   - `.env`
   - `docker-compose.yml`
   - `variables.md` (runbook)
7. **Copy the files** to your homelab host (see [Deploy your generated stack](#deploy-your-generated-stack)) and bring the containers online with Docker Compose.
8. **Keep the runbook** with your files so you remember domain, tunnel, GPU, and access decisions when you revisit the stack later.

No npm install, builds, or terminal work is required for this path—just a browser.

---

## Experienced operator workflow

1. **Clone + inspect**

   ```bash
   git clone https://github.com/Morlock52/M2.git
   cd M2
   ```

2. **Install tooling (once per machine)**

   ```bash
   npm install
   npx playwright install
   ```

3. **Serve the wizard for teammates**  
   Pick one:
   - `python3 -m http.server 4173` inside `web/`.
   - `serve -l 4173` if you prefer the npm `serve` CLI.
   - Upload `web/` to Netlify, Pages, S3, or another CDN—no build step required.

4. **Run the Playwright smoke before merging changes**

   ```bash
   npm test
   ```

   The script starts `python3 -m http.server 4173`, opens `tests/installer.spec.js`, walks the wizard, toggles the AI chat, and confirms user variables propagate into `.env`, Compose, and the runbook preview.

5. **Customize the catalog or UX**
   - Edit `serviceCatalog` in `web/app.js` (≈ line 980) to add/remove services, defaults, and env vars.
   - Adjust theming/motion in `web/styles.css` and the `themes` + `applyTheme` helpers in `web/app.js`.
   - Update the AI assistant responses inside the `AIChat` component (search for “AI Configuration Assistant”).

6. **Version-control artifacts** by exporting `.env`, `docker-compose.yml`, and `variables.md`, then committing them to a private repo so you can PR stack changes, trigger automation, or roll back.

7. **Plug into CI** by reusing `npm test` inside your pipeline to guarantee the static wizard you publish matches what contributors validated locally.

---

## Serve the wizard over HTTP (optional, reduces browser security nags)

| Option | Command | Notes |
| --- | --- | --- |
| **Python stdlib** | ```bash\ncd web\npython3 -m http.server 4173\n``` | Matches the Playwright harness. Visit `http://127.0.0.1:4173`. |
| **Node-based static server** | ```bash\nnpm install -g serve\ncd web\nserve -l 4173\n``` | Any static host works (Caddy, nginx, Netlify, GitHub Pages). |

---

## Wizard map

1. **Profile** – Project name (`COMPOSE_PROJECT_NAME`), domain, timezone, storage roots. “Auto-fill safe defaults” mirrors late-2025 community templates.
2. **Media coverage** – Declare file types to see which services meet each need.
3. **Pick your stack** – Toggle GPUs, Cloudflare Tunnel, object storage, then select services. Cards list required env vars and hints.
4. **Access & identity** – Choose Authelia, Authentik, or OAuth2 Proxy and review Cloudflare Access pairings.
5. **Build the `.env`** – Edit variables in one grid, store secrets in “User variables,” and keep the Compose file clean.
6. **Compose output** – Live preview with `x-user-vars`, tunnel definitions, mounts, and networks reflecting your selections.
7. **Runbook** – Document reasoning per service, then export `variables.md` for audit trails.

Sidecar helpers: the **AI Configuration Assistant** (bottom-right) plus tooltips summarizing guidance gathered up to 2025-12-03.

---

## Deploy your generated stack

1. **Transfer artifacts** from your workstation to the host that will run containers:

   ```bash
   scp docker-compose.yml .env user@homelab:/srv/m2-stack/
   scp variables.md user@homelab:/srv/m2-stack/docs/   # optional but recommended
   ```

2. **Review secrets** – Replace placeholder passwords, API tokens, and Cloudflare credentials. Keep `x-user-vars` anchors in Compose if you want other tooling to surface secrets safely.

3. **Bring up the stack**:

   ```bash
   cd /srv/m2-stack
   docker compose pull
   docker compose up -d
   docker compose ps
   ```

4. **Wire Cloudflare Tunnel + Zero Trust** (`USAGE.md` has step-by-step detail):
   - Create/authorize the tunnel with `cloudflared`.
   - Map hostnames per service (Cloudflare made hostname-based routing free on 2025-09-18, so the wizard assumes this model).
   - Enforce Access policies (MFA/passkeys, device posture checks).
   - Enable the WARP post-quantum tunnel rollout announced 2025-09-24 for stronger encryption.

5. **Record verification** – Append notes to `variables.md` (e.g., firmware versions, Access policy IDs, GPU SKUs) so upgrades stay auditable.

6. **Optional: translate to other orchestrators** by treating `.env` as the source of truth and porting Compose blocks into Helm charts, Nomad jobs, etc.

---

## Stack snapshot (Dec 3, 2025)

| Component | Latest release | Published | Why we reference it |
| --- | --- | --- | --- |
| Jellyfin | [10.11.4](https://github.com/jellyfin/jellyfin/releases/tag/v10.11.4) | 2025‑12‑01 | Confirms the media server row matches the newest bugfix build, including HDR fallback fixes noted in the changelog. |
| Nextcloud | [v32.0.2](https://github.com/nextcloud/server/releases/tag/v32.0.2) | 2025‑11‑20 | Keeps collaboration guidance aligned with Hub 8-era PHP/Postgres requirements. |
| Immich | [v2.3.1](https://github.com/immich-app/immich/releases/tag/v2.3.1) | 2025‑11‑20 | Fixes the web UI freeze caused by the update-notification loop, so the photo stack template points at a stable tag. |
| Authelia | [v4.39.15](https://github.com/authelia/authelia/releases/tag/v4.39.15) | 2025‑11‑29 | Addresses LDAP health checks and server-authorization defaults, matching the auth guidance in the wizard. |
| Cloudflare Zero Trust (WARP) | [Post-quantum WARP rollout](https://blog.cloudflare.com/post-quantum-warp/) | 2025‑09‑24 | Explains why the runbook nudges you to enable PQC tunnels. |
| Cloudflare Tunnel routing | [Hostname routing now free](https://blog.cloudflare.com/tunnel-hostname-routing/) | 2025‑09‑18 | Justifies the host-per-service default used throughout the wizard and runbook. |

---

## Testing & CI

```bash
npm install
npx playwright install          # once per machine/runner
npm test                        # runs @playwright/test via tests/installer.spec.js
```

What the smoke test covers:

- Spins up `python3 -m http.server 4173` against `web/`.
- Walks the wizard, asserts template cards render, confirms the AI chat opens/closes, and verifies user variables propagate into `.env`/Compose previews.
- Ensures the runbook download includes headings so static site deployments remain trustworthy.

---

## Advanced customization (experts)

- **Service catalog tweaks** – Edit `serviceCatalog` in `web/app.js` to add/remove services, change defaults, or expand env var schemas. Updates flow automatically into the `.env` builder, Compose generator, and runbook.
- **Theme + motion** – Adjust glassmorphism styles in `web/styles.css` and the `themes` + `applyTheme` logic in `web/app.js` for custom branding or light/dark tailoring.
- **AI assistant** – Extend canned answers or wire the UI to an actual model by editing the `AIChat` component (search for “AI Configuration Assistant”).
- **Static hosting** – Deploy the `web/` folder to Netlify, GitHub Pages, Cloudflare Pages, or any CDN; `web/netlify.toml` is a ready-made starter.
- **Artifact versioning** – Commit exported `.env`, `docker-compose.yml`, and `variables.md` to a private Git repo so you can PR stack changes, trigger infrastructure pipelines, or audit secret rotations.

---

## Troubleshooting quick hits

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Browser blocks downloads via `file://` | Security restrictions on local file URLs | Serve via `python3 -m http.server` or any static server. |
| Wizard buttons do nothing | `web/app.js` failed to load (corrupt copy, ad-blocker) | Re-clone the repo or check DevTools console for 404s. |
| Playwright tests hang | Playwright browsers not installed | Re-run `npx playwright install` and ensure `python3` is on PATH. |
| `cloudflared` reconnect loops | Time drift or outbound firewall rules | Sync NTP and allow outbound TCP 7844/443. |
| Cloudflare Access login loops | Callback URLs mismatch between Access and your auth provider | Update redirect URIs and clear cookies (see `USAGE.md`). |
| Slow Jellyfin streams | CPU transcoding without HW acceleration | Enable VAAPI/NVENC or prefer direct play; adjust GPU flags in the wizard and `.env`. |

---

## Source links (Dec 2025 verification)

- [Jellyfin 10.11.4 release (2025-12-01)](https://github.com/jellyfin/jellyfin/releases/tag/v10.11.4)
- [Nextcloud server v32.0.2 (2025-11-20)](https://github.com/nextcloud/server/releases/tag/v32.0.2)
- [Immich v2.3.1 hot fix (2025-11-20)](https://github.com/immich-app/immich/releases/tag/v2.3.1)
- [Authelia v4.39.15 (2025-11-29)](https://github.com/authelia/authelia/releases/tag/v4.39.15)
- [Cloudflare Zero Trust WARP post-quantum announcement (2025-09-24)](https://blog.cloudflare.com/post-quantum-warp/)
- [Cloudflare Tunnel hostname routing update (2025-09-18)](https://blog.cloudflare.com/tunnel-hostname-routing/)

Re-run the same release/blog checks before your next upgrade cycle to keep the installer guidance fresh.
