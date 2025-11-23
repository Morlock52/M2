# M2 Design Overview (as of 2024-11-25)

The M2 project bundles a modern media automation stack, a collaborative Nextcloud instance, centralized authentication, and secure edge publishing via Cloudflare Tunnel. This document captures the intended architecture, design rationale, and extension points informed by best practices discussed across engineering blogs, OSS forums, Discord stages, Reddit AMAs, and social media through **November 25, 2024**.

## 1. Architectural Principles

1. **Zero Trust by default** – All HTTP requests must traverse Cloudflare Access (with 2024 device posture checks) and an authentication proxy before touching application pods/containers.
2. **Loose coupling** – Media services, Nextcloud, authentication, and tunnel components communicate over well-defined HTTP/TCP interfaces so they can be swapped independently.
3. **Infrastructure as code** – Compose/Kubernetes manifests should be version-controlled with secrets injected at runtime.
4. **Observability-first** – Every container exports logs/metrics that can be scraped by Prometheus/Loki; slowdowns visible before they affect remote viewers.
5. **Resilience through isolation** – Downloaders and user-facing apps run in separate namespaces/VLANs to contain compromise (reinforced by 2024 homelab incident reports shared on Discord/Reddit).

## 2. Component Diagram

```
[ Internet Clients ]
        |
  Cloudflare Edge (WAF, TLS, CDN)
        |
  Cloudflare Tunnel (cloudflared connector)
        |
  Authentication Gateway (Authelia/Authentik/OAuth2 Proxy)
        |
  -------------------------------------------------------
  |                     Internal LAN / Cluster          |
  |                                                     |
  |  Nextcloud Web + App Pods   Media Apps (Jellyfin,   |
  |  + Redis + Database         Sonarr/Radarr/qBittorrent)
  |          |                          |
  |   Object Storage /           Media Storage Pools    |
  |   Backup Targets             (ZFS, Ceph, SMB)       |
  -------------------------------------------------------
```

## 3. Data Flows

1. **User Access**
   - User hits `https://media.example.com`.
   - Cloudflare Access validates identity (email OTP, IdP SSO, or social login such as GitHub/Google as of 2023-11-25).
   - Traffic tunnels through `cloudflared` to the auth gateway, which adds session headers/cookies.
   - Gateway routes to Jellyfin/Nextcloud based on hostname/path.

2. **Media Automation**
   - Sonarr/Radarr monitor RSS feeds or indexers.
   - When releases appear, download clients run inside a segregated container network and deposit files into an ingest directory mounted read-only by Jellyfin.
   - Library refresh triggers metadata fetchers; GPU/CPU transcodes stream to clients.

3. **File Collaboration**
   - Nextcloud app servers talk to a dedicated database (Postgres) and cache (Redis) within the internal network.
   - External storage (S3-compatible) is mounted via signed credentials rotated every 90 days.

## 4. Authentication & Authorization Design

- **Primary IdP**: Authentik/Authelia connected to OAuth providers (Google Workspace, Microsoft Entra ID) and optionally community SSO (Discord) to meet the "social media" login expectations repeatedly requested on X/Fediverse in 2024.
- **Access Policies**: Cloudflare Access groups map to user personas (Media-only, Power user, Admin). Policies enforce device posture checks (up-to-date OS, enrolled CrowdStrike, etc.) where available.
- **Session Management**: Cookies scoped per subdomain, short-lived (1h) with sliding refresh; complements Cloudflare Access tokens which default to 24h as of late 2023.

## 5. Networking & Security Layers

| Layer | Purpose | Notes |
| --- | --- | --- |
| ISP Router | Blocks unsolicited inbound; only egress to Cloudflare allowed. | Use IPv6 filtering as IPv6 tunnels are now default in Cloudflare, per 2024 Zero Trust updates.
| Host Firewall | Allows Docker/K8s node-to-node traffic and DNS/NTP. | Documented best practice per 2024 Cloudflare and Authentik webinars.
| Overlay Tunnel | `cloudflared` uses QUIC/TCP 7844->Cloudflare POP. | Supports failover connectors for HA; Access posture checks rolled out mid-2024.
| Service Mesh (optional) | mTLS between internal services (Linkerd/Istio). | Popular request from enterprise-minded self-hosters continuing through 2024.

## 6. Storage Layout

- **Media**: Large ZFS pool with dataset per content type; snapshots replicated off-site.
- **Nextcloud data**: Separate SSD-backed volume for performance; object storage tiering for user shares >100 GB to keep sync fast.
- **Databases**: Postgres on mirrored SSDs with WAL archiving to object storage.
- **Backups**: Restic to B2/Wasabi + local borg repo. Backup integrity tested weekly via automated restore job (as advocated by /r/DataHoarder top posts, Nov 2023).

## 7. Scaling Strategy

1. **Vertical scaling**: Add GPU (Intel ARC, Nvidia Turing) to accelerate Jellyfin/Emby transcodes.
2. **Horizontal scaling**: Run multiple app replicas behind Traefik or Nginx ingress; sticky sessions not required thanks to shared Redis + object storage.
3. **Global reach**: Deploy additional `cloudflared` connectors in geographically distributed VPS nodes to reduce latency; Cloudflare automatically load-balances them.

## 8. Observability & Alerting

- **Metrics**: Prometheus scrapes container exporters; Grafana dashboards highlight CPU/GPU transcode usage, Nextcloud PHP-FPM queues, tunnel RTT.
- **Logs**: Loki/Elastic ingest container stdout + audit events. Alerts triggered on repeated auth failures, Cloudflare Access denies, or Nextcloud file locking errors.
- **User Feedback Loop**: Provide a form/Matrix room; social media DMs are often used by remote collaborators to flag buffering issues before metrics spike.

## 9. Failure Scenarios & Mitigations

| Failure | Impact | Mitigation |
| --- | --- | --- |
| Cloudflare outage | Remote access unavailable | Maintain WireGuard VPN fallback reachable via dynamic DNS. |
| Auth gateway crash | Services inaccessible | Run at least two replicas + health-checked load balancer. |
| Storage corruption | Data loss | Nightly snapshots + quarterly full restore drills documented in runbooks. |
| Download client compromise | Malware/ransomware | Network isolation + read-only mounts + ClamAV scanning pipeline. |

## 10. Roadmap Considerations

- **Object storage first-class support**: Evaluate Nextcloud Infinite Scale once stable (late 2024 release trains show tangible progress per official announcements).
- **Federated sharing**: Integrate ActivityPub/Matrix bridges so collaborators can receive media/Nextcloud notifications through their preferred social platform.
- **Automation**: GitOps pipeline (Flux/Argo) to auto-apply Compose/K8s updates when new container tags pass integration tests, echoing the GitOps wave across 2024 homelab talks.

---
Document owner: Platform/Ops. Update whenever upstream vendors (Cloudflare, Nextcloud, Authelia, Jellyfin) announce breaking changes—especially those amplified across Reddit, Discord, and Mastodon after Nov 25, 2024.
