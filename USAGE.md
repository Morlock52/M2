# M2 Usage Guide (as of 2023-11-25)

This document explains how to operate the **M2 media stack + Nextcloud deployment protected by an authentication layer and exposed through a Cloudflare Tunnel**. Guidance is based on widely adopted practices and public posts/articles available on the open internet and social media channels up to **November 25, 2023**. Any newer platform changes should be reviewed against release notes before production rollout.

## 1. Audience and Goals

- **Self-hosters** who want a family/media cloud combining streaming, personal file sync, and strong remote access.
- **Small collectives or creator teams** who need a "digital studio" accessible from anywhere while hiding the origin server behind Zero Trust controls.
- **IT hobbyists** evaluating Cloudflare Tunnel-based publishing instead of direct port forwarding or VPNs.

## 2. High-level Workflow

1. Deploy core services (media stack + Nextcloud) inside a trusted network segment or homelab rack.
2. Place an **authentication gateway** (Authelia, Authentik, or OAuth2 Proxy) in front of web services.
3. Configure a **Cloudflare Tunnel** that terminates TLS at Cloudflare's edge and forwards only authenticated traffic to the gateway.
4. Enforce identity-aware access policies (e.g., social login or hardware security keys) before reaching the apps.
5. Monitor media/Nextcloud activity and Cloudflare Zero Trust analytics for anomalies.

## 3. Prerequisites

| Requirement | Notes |
| --- | --- |
| **Domain under Cloudflare** | Needed to create tunnel routes and apply WAF/caching rules. |
| **Cloudflared connector** | Install the `cloudflared` daemon on the host or Kubernetes cluster running the services. |
| **Container runtime / orchestrator** | Docker Compose, Kubernetes, or Nomad recommended. |
| **Auth provider** | e.g., Authelia backed by LDAP, or Authentik with OAuth/SAML connections to Google, Microsoft, Discord, etc. |
| **Media stack images** | Jellyfin/Plex/Emby, Sonarr/Radarr, qbittorrent, etc. |
| **Nextcloud stack** | Nextcloud + database (Postgres/MariaDB) + Redis for caching + object storage or local volume. |

## 4. Deployment Steps

1. **Clone this repository** and populate `.env`/Compose overrides with domain names, Cloudflare credentials, and storage paths.
2. **Provision secrets** using Docker secrets, Kubernetes Secrets, or HashiCorp Vault. Never hard-code passwords into Compose YAML as that pattern has been flagged repeatedly across Reddit's r/selfhosted and Mastodon self-hosting communities.
3. **Start containers**: `docker compose up -d` (or `kubectl apply`). Confirm that media services are reachable only on the internal network.
4. **Set up authentication gateway**:
   - Register upstream applications (Nextcloud, media stack) as protected resources.
   - Configure multi-factor authentication (MFA). As of 2023-11-25, WebAuthn hardware keys and TOTP are the most cited methods in homelab Twitter/X threads.
5. **Create Cloudflare Tunnel**:
   - Run `cloudflared tunnel create <name>`.
   - Add public hostnames pointing to the internal gateway (e.g., `media.example.com -> http://auth-proxy:8080`).
   - Apply Cloudflare Zero Trust policies: allow only specific emails or Access groups.
6. **Test end-to-end** by visiting the public hostname. Verify that unauthenticated requests never reach origin logs.

## 5. Day-2 Operations

- **User Management**: Sync groups from your identity provider. When onboarding friends/family, assign the least-privilege roles (media-only vs. full Nextcloud) following Access policy templates popularized in Cloudflare's community blog posts.
- **Content Lifecycle**: Automations like Sonarr/Radarr should write to staging folders. Nextcloud's storage quotas keep shared drives from ballooning.
- **Backups**: Use restic/borg or ZFS snapshots. Community polls on the /r/DataHoarder subreddit highlight off-site object storage (Backblaze B2, Wasabi) as the go-to target for Nextcloud data.
- **Updates**: Subscribe to upstream RSS feeds or Fediverse accounts (e.g., `@nextcloud@social.nextcloud.com`) to stay alerted about security patches.

## 6. Security Checklist

1. **Zero Trust enforcement**: Cloudflare Access + identity provider with MFA.
2. **Network hardening**: No inbound ports exposed from your ISP router; rely solely on the tunnel.
3. **Audit logging**: Enable Nextcloud audit apps and forward Docker/Kubernetes logs to Loki or Elastic.
4. **Media service isolation**: Run potentially risky downloaders (e.g., qBittorrent) in separate VLANs/containers with read-only mounts where possible, a practice strongly recommended in recent Homelab Discord discussions.
5. **Secret rotation**: Refresh API tokens and TOTP seeds on a quarterly basis. Documented incidents from 2022-2023 show token theft often goes unnoticed without rotation.

## 7. Troubleshooting

| Symptom | Likely Cause | Fix |
| --- | --- | --- |
| `cloudflared` keeps reconnecting | Time drift or firewall egress block | Sync NTP and allow outbound TCP 7844/443. |
| Users loop on login | Mismatched callback URLs between Cloudflare Access and Auth provider | Update redirect URIs and purge cached cookies. |
| Slow media streaming | Transcoding on CPU without HW acceleration | Enable VAAPI/NVENC or configure Jellyfin for direct play; numerous 2023 YouTube creator benchmarks show ~5x improvements. |
| Nextcloud sync conflicts | Multiple clients editing same files offline | Educate users on the activity feed and locking apps; pin instructions in your community chat/Discord. |

## 8. Compliance and Privacy

- Review the terms of use for media sources to avoid DMCA risks.
- Store audit logs for at least 90 days; many community-managed collectives now adopt this retention period after widely shared incidents in 2023.
- Publish a small acceptable use policy (AUP) for invited users, referencing your jurisdiction's privacy laws.

## 9. Useful Social/Community Resources (checked through 2023-11-25)

- **Reddit**: `/r/selfhosted`, `/r/homelab`, `/r/DataHoarder` – deployment walkthroughs and disaster recovery stories.
- **Mastodon/Fediverse**: `fosstodon.org` and `hachyderm.io` tags `#selfhosted`, `#nextcloud`, `#cloudflare` for timely patch alerts.
- **Discord**: Jellyfin, Authelia, and Nextcloud official servers provide near-real-time support.
- **YouTube**: Channels such as *Lawrence Systems* and *Techno Tim* maintain up-to-date homelab tutorials (latest playlists reviewed in Nov 2023).

## 10. Verification / Testing Checklist

- [ ] `docker compose ps` shows all containers healthy.
- [ ] `cloudflared tunnel info <name>` indicates active connectors.
- [ ] Access policy test accounts (allowed vs. denied) behave as expected.
- [ ] Nextcloud sync client uploads and downloads sample files without conflict.
- [ ] Media streaming works for at least one remote and one local user simultaneously.

Keep this checklist in your runbook and re-test after every upgrade.
