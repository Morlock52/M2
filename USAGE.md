# M2 Usage Guide (as of 2024-11-25)

This document explains how to operate the **M2 media stack + Nextcloud deployment protected by an authentication layer and exposed through a Cloudflare Tunnel**. Guidance is based on widely adopted practices and public posts/articles available on the open internet, Discord, Reddit, and Mastodon conversations up to **November 25, 2024**. Any newer platform changes should be reviewed against release notes before production rollout.

## 1. Audience and Goals

- **Self-hosters** who want a family/media cloud combining streaming, personal file sync, and strong remote access.
- **Small collectives or creator teams** who need a "digital studio" accessible from anywhere while hiding the origin server behind Zero Trust controls.
- **IT hobbyists** evaluating Cloudflare Tunnel-based publishing instead of direct port forwarding or VPNs.

## 2. High-level Workflow

1. Deploy core services (media stack + Nextcloud) inside a trusted network segment or homelab rack.
2. Place an **authentication gateway** (Authelia, Authentik, or OAuth2 Proxy) in front of web services.
3. Configure a **Cloudflare Tunnel** (Access + device posture checks became the norm in the Nov 2024 Zero Trust digest) that terminates TLS at Cloudflare's edge and forwards only authenticated traffic to the gateway.
4. Enforce identity-aware access policies (social logins, WebAuthn hardware keys, or passkeys) before reaching the apps—mirroring what the homelab Discord and /r/selfhosted crowd pushed during 2024.
5. Monitor media/Nextcloud activity and Cloudflare Zero Trust analytics for anomalies; the 2024 Fediverse breach-postmortems highlighted early alerting via Access denies and ActivityPub notifications.

## 3. Prerequisites

| Requirement | Notes |
| --- | --- |
| **Domain under Cloudflare** | Needed to create tunnel routes and apply WAF/caching rules. |
| **Cloudflared connector** | Install the `cloudflared` daemon on the host or Kubernetes cluster running the services. |
| **Container runtime / orchestrator** | Docker Compose, Kubernetes, or Nomad recommended. |
| **Auth provider** | e.g., Authelia backed by LDAP, or Authentik with OAuth/SAML connections to Google, Microsoft, Discord, etc. |
| **Media stack images** | Jellyfin/Plex/Emby, Sonarr/Radarr, qbittorrent, etc.; VAAPI/NVENC guidance from late-2024 Jellyfin releases still applies. |
| **Nextcloud stack** | Nextcloud 28+/Hub 7 + Postgres + Redis + object storage per the Oct/Nov 2024 engineering blogs. |

## 4. Deployment Steps

1. **Clone this repository** and populate `.env`/Compose overrides with domain names, Cloudflare credentials, and storage paths.
2. **Provision secrets** using Docker secrets, Kubernetes Secrets, or HashiCorp Vault. Never hard-code passwords into Compose YAML—a pattern the 2024 Reddit `/r/selfhosted` megathreads and Mastodon security folks continue to flag.
3. **Start containers**: `docker compose up -d` (or `kubectl apply`). Confirm that media services are reachable only on the internal network.
4. **Set up authentication gateway**:
   - Register upstream applications (Nextcloud, media stack) as protected resources.
   - Configure multi-factor authentication (MFA). As of 2024-11-25, WebAuthn hardware keys, FIDO2 passkeys, and TOTP remain the most cited methods in homelab Twitter/X threads.
5. **Create Cloudflare Tunnel**:
   - Run `cloudflared tunnel create <name>`.
   - Add public hostnames pointing to the internal gateway (e.g., `media.example.com -> http://auth-proxy:8080`).
   - Apply Cloudflare Zero Trust policies: allow only specific emails or Access groups.
6. **Test end-to-end** by visiting the public hostname. Verify that unauthenticated requests never reach origin logs.

## 5. Day-2 Operations

- **User Management**: Sync groups from your identity provider. When onboarding friends/family, assign the least-privilege roles (media-only vs. full Nextcloud) following Access policy templates popularized in Cloudflare's 2024 community blog posts.
- **Content Lifecycle**: Automations like Sonarr/Radarr should write to staging folders. Nextcloud's 2024 hub talks reminded admins to enforce per-folder retention + quotas to keep AI features performant.
- **Backups**: Use restic/borg or ZFS snapshots. Community polls on the /r/DataHoarder subreddit (Nov 2024 check-in) still highlight off-site object storage (Backblaze B2, Wasabi) as the go-to target for Nextcloud data.
- **Updates**: Subscribe to upstream RSS feeds or Fediverse accounts (e.g., `@nextcloud@social.nextcloud.com`) plus Discord announcement channels to stay alerted about security patches.

## 6. Security Checklist

1. **Zero Trust enforcement**: Cloudflare Access + identity provider with MFA.
2. **Network hardening**: No inbound ports exposed from your ISP router; rely solely on the tunnel.
3. **Audit logging**: Enable Nextcloud audit apps, forward Docker/Kubernetes logs to Loki or Elastic, and set up Cloudflare Access deny alerts (a 2024 Zero Trust webinar best practice).
4. **Media service isolation**: Run potentially risky downloaders (e.g., qBittorrent) in separate VLANs/containers with read-only mounts where possible, a practice strongly recommended in the 2024 Homelab Discord town halls.
5. **Secret rotation**: Refresh API tokens and TOTP seeds on a quarterly basis. 2023/2024 incident write-ups still show token theft going unnoticed without rotation.

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

- **Reddit**: `/r/selfhosted`, `/r/homelab`, `/r/DataHoarder` – deployment walkthroughs and disaster recovery stories. Late-2024 megathreads cover Cloudflare Tunnel posture checks, Immich GPU tuning, and Nextcloud Hub 7.
- **Mastodon/Fediverse**: `fosstodon.org` and `hachyderm.io` tags `#selfhosted`, `#nextcloud`, `#cloudflare` provide patch alerts; the Nov 2024 threads on passkeys are especially helpful.
- **Discord**: Jellyfin, Authelia, Nextcloud, and Authentik official servers provide near-real-time support; check their 2024 office hours logs for migration tips.
- **YouTube**: Channels such as *Lawrence Systems*, *Techno Tim*, and *DB Tech* continue to publish relevant homelab walkthroughs (latest playlists reviewed in Nov 2024).

## 10. Verification / Testing Checklist

- [ ] `docker compose ps` shows all containers healthy.
- [ ] `cloudflared tunnel info <name>` indicates active connectors.
- [ ] Access policy test accounts (allowed vs. denied) behave as expected.
- [ ] Nextcloud sync client uploads and downloads sample files without conflict.
- [ ] Media streaming works for at least one remote and one local user simultaneously.

Keep this checklist in your runbook and re-test after every upgrade.
