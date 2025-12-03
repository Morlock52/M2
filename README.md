# M2 Installer Studio

**Build Your Self-Hosted Media Stack in Minutes** - Design your perfect media server setup with Jellyfin, Nextcloud, Immich, and more. Get ready-to-use Docker files instantly.

**Last Updated:** December 3, 2025

---

## 🎯 What Is This?

**M2 Installer Studio** is a **web-based configuration tool** that helps you create a complete media server without writing code.

Think of it like a wizard that asks you questions about what you want (movie streaming? photo backup? file sharing?) and then generates all the technical files you need to run it.

### What You Get

When you're done, you'll have:
- **docker-compose.yml** - Instructions for Docker to run all your apps
- **.env file** - All your settings and passwords in one place
- **Runbook** - Step-by-step guide to deploy and maintain your stack
- **Variable notes** - Documentation of why you configured things the way you did

---

## ✨ What Can You Build?

### Media Server Stack
- **Jellyfin** - Stream your movies and TV shows (like personal Netflix)
- **Sonarr** - Automatically download and organize TV shows
- **Radarr** - Automatically download and organize movies
- **qBittorrent** - Download manager with web interface
- **Prowlarr** - Manage all your download sources in one place
- **Overseerr** - Let family request movies/shows to download

### Photo & File Management
- **Immich** - Google Photos alternative (AI-powered photo organization)
- **Nextcloud** - Personal cloud storage (like Dropbox)
- **FileBrowser** - Simple web file manager

### Infrastructure & Security
- **Cloudflare Tunnel** - Securely access your apps from anywhere (no port forwarding!)
- **Authelia** or **Authentik** - Add login protection to all your apps
- **Prometheus** - Monitor your server health
- **Grafana** - Visualize server performance

### Storage Options
- **MinIO** - Object storage for backups (S3-compatible)
- GPU acceleration support for Jellyfin

---

## 🚀 Quick Start - Get Your Media Stack Running

### Step 1: Open the Installer

**Option A: Use It Right Now** (No installation!)
1. Open the `web/index.html` file in your browser
2. That's it! Works completely offline

**Option B: Run a Local Server** (Recommended)
```bash
# Navigate to the web folder
cd web

# Start a simple server
python3 -m http.server 4173

# Open in browser
# Visit http://localhost:4173
```

### Step 2: Complete the 7-Step Wizard

The installer walks you through everything:

#### **Step 1: Profile**
Set up your basic info:
- **Project name** - What to call your stack (e.g., "media-server")
- **Domain** - Your website address (e.g., "media.yourdomain.com")
- **Timezone** - So logs show the right time
- **Storage paths** - Where to store your media files

**Tip:** Click "Load sample stack" to see an example configuration!

#### **Step 2: File Type Coverage**
Tell us what media you have:
- Movies & TV shows
- Music
- Photos
- eBooks
- Documents

The installer will suggest which apps you need.

#### **Step 3: Choose Your Stack**
Select which apps you want:
- Check boxes for Jellyfin, Sonarr, Radarr, etc.
- Toggle **GPU acceleration** if you have a graphics card
- Toggle **Cloudflare Tunnel** for secure remote access
- Toggle **Object Storage** if you want MinIO for backups

**Templates available:**
- "Sample media stack" - Full Jellyfin setup with downloaders
- "Photo vault" - Immich + Nextcloud combo
- Custom - Pick exactly what you want

#### **Step 4: Access & Identity**
Choose security options:
- **Auth gateway** - Pick Authelia, Authentik, or OAuth2 Proxy
- Enable/disable Cloudflare Tunnel
- Enable/disable object storage (S3/MinIO)

#### **Step 5: Build the .env**
Configure each app:
- The installer shows a form with all settings
- Required fields are marked
- **User Variables** - Save API keys and reuse them everywhere
- **Service Runbook** - Add notes about why you configured things

**Pro tip:** Use "User variable storage" to save things like:
- Cloudflare API tokens
- Database passwords
- Shared API keys

Then insert them wherever needed with one click!

#### **Step 6: Compose Output**
Review your generated Docker Compose file:
- See all services listed
- Networks and health checks included
- Click **Download compose.yml** to save it

#### **Step 7: Runbook**
Get deployment instructions:
1. Create files: `touch .env compose.yml`
2. Paste the generated content
3. Validate: `docker compose config`
4. Start: `docker compose up -d`
5. Check status: `docker compose ps`

---

## 📖 How to Use the Installer

### Understanding the Interface

**Top Bar:**
- **Theme selector** - Choose dark, midnight, ocean, forest, or cyberpunk themes
- **Progress ring** - Shows which step you're on (1-7)
- **Status pill** - "Updated for 2025 best practices"

**Left Sidebar:**
- **Flow** - Click any step to jump to it
- **Guidance** - Helpful tips:
  - Save often using download buttons
  - GPU toggle adds VAAPI/NVENC support
  - Tunnel/storage toggles update the catalog

**Main Area:**
- Current step content
- **Back/Next buttons** - Navigate between steps
- **Download buttons** - Save your files anytime

### User Variable Storage Feature

This is a **powerful feature** that saves you time:

**What it does:**
- Store values once (like API keys, passwords, hostnames)
- Reuse them in multiple places
- Keep them in both .env and compose files

**How to use it:**

1. **Click "Add variable"** in Step 5
2. Fill in:
   - **Label** - Human name (e.g., "Cloudflare API Token")
   - **Key** - Variable name (e.g., "CF_API_TOKEN")
   - **Value** - The actual secret/password
   - **Description** - What it's for
3. Choose where to use it:
   - ✅ Include in .env
   - ✅ Expose in compose (under x-user-vars)
4. **Save it**

Now you can:
- Select it from dropdown
- Click in any .env field
- Click "Insert into .env" to paste it

**Example use cases:**
- Save your domain once, use it for all services
- Store API keys without typing them repeatedly
- Keep database passwords consistent

### Service Runbook Feature

Document WHY you configured things:

**For each service you can add notes like:**
- "Using NVENC because we have an NVIDIA GPU"
- "Port 8096 forwarded from router"
- "Connected to Overseerr with API key XYZ"

**Export the runbook** to get a Markdown file with:
- All your configuration decisions
- Variable explanations
- Deployment notes
- Future reference guide

### Downloading Your Files

**Three files to download:**

1. **.env file**
   - Contains all your secrets and settings
   - NEVER commit this to Git
   - Keep it secure

2. **docker-compose.yml**
   - Defines all your services
   - Can be committed to Git (no secrets in it)
   - Ready to run with Docker

3. **variables.md** (Runbook)
   - Your documentation
   - Explains all decisions
   - Keep it with your files for future reference

---

## 🏃 Deploying Your Stack

### What You Need

**Before deployment:**
- A server or computer running Linux (Ubuntu, Debian, etc.)
- Docker and Docker Compose installed
- Enough disk space for your media
- (Optional) A domain name if you want remote access

### Installing Docker

If you don't have Docker yet:

```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
# Log out and back in

# Verify it works
docker --version
docker compose version
```

### Deploying Your Stack

1. **Create a folder for your stack:**
```bash
mkdir -p /home/yourname/media-stack
cd /home/yourname/media-stack
```

2. **Copy your files:**
   - Download .env from the installer
   - Download docker-compose.yml from the installer
   - Download variables.md (optional but recommended)
   - Put all three files in your folder

3. **Edit the .env file:**
```bash
nano .env
```
   - Replace placeholder passwords
   - Add your actual API keys
   - Set your domain name
   - Save and exit (Ctrl+X, then Y, then Enter)

4. **Validate your configuration:**
```bash
docker compose config
```
   - Should show your complete config
   - If errors, fix them in .env or compose.yml

5. **Start everything:**
```bash
docker compose up -d
```
   - `-d` means "run in background"
   - First time takes 5-10 minutes to download images

6. **Check status:**
```bash
docker compose ps
```
   - All services should show "healthy" or "running"

7. **View logs if needed:**
```bash
docker compose logs -f servicename
```
   - Replace `servicename` with jellyfin, sonarr, etc.
   - Ctrl+C to stop watching logs

### Accessing Your Apps

**Local access (on same network):**
- Jellyfin: http://your-server-ip:8096
- Sonarr: http://your-server-ip:8989
- Radarr: http://your-server-ip:7878
- etc.

**Remote access (from anywhere):**
- Set up Cloudflare Tunnel (see below)
- Or use a VPN like Tailscale
- **Never** expose ports directly to internet!

---

## 🔐 Setting Up Cloudflare Tunnel (Optional)

Cloudflare Tunnel lets you access your apps from anywhere **without opening ports** on your router.

### Why Use Cloudflare Tunnel?

- ✅ No port forwarding needed
- ✅ Free for personal use
- ✅ Encrypted connection
- ✅ Can add authentication
- ✅ DDoS protection included

### Setup Steps

1. **Create Cloudflare account:**
   - Visit [cloudflare.com](https://www.cloudflare.com/)
   - Sign up (free)
   - Add your domain (must own a domain name)

2. **Install cloudflared:**
```bash
# Ubuntu/Debian
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb
```

3. **Login to Cloudflare:**
```bash
cloudflared tunnel login
```
   - Opens browser to authenticate
   - Select your domain

4. **Create tunnel:**
```bash
cloudflared tunnel create media-tunnel
```
   - Saves credentials to `~/.cloudflared/`

5. **Configure tunnel:**
```bash
nano ~/.cloudflared/config.yml
```

   Add:
```yaml
tunnel: YOUR-TUNNEL-ID
credentials-file: /home/yourname/.cloudflared/YOUR-TUNNEL-ID.json

ingress:
  - hostname: jellyfin.yourdomain.com
    service: http://localhost:8096
  - hostname: sonarr.yourdomain.com
    service: http://localhost:8989
  - service: http_status:404
```

6. **Create DNS records:**
```bash
cloudflared tunnel route dns media-tunnel jellyfin.yourdomain.com
cloudflared tunnel route dns media-tunnel sonarr.yourdomain.com
```

7. **Run tunnel:**
```bash
cloudflared tunnel run media-tunnel
```

8. **Make it permanent:**
```bash
sudo cloudflared service install
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

Now access your apps from anywhere:
- https://jellyfin.yourdomain.com
- https://sonarr.yourdomain.com

**Cloudflare Zero Trust Update (November 2024):**
- Tunnels are now the recommended method (safer than port forwarding)
- Free hostname-based routing (changed Sept 18, 2025)
- Post-quantum encryption available (enabled Sept 24, 2025)

---

## 🎨 Theme Customization

The installer supports **5 themes**:

1. **Dark** (default) - Modern dark with purple accents
2. **Midnight** - Pure black with blue highlights
3. **Ocean** - Teal and aqua tones
4. **Forest** - Green nature theme
5. **Cyberpunk** - Neon pink and cyan

**Change theme:** Use dropdown in top-right corner

**Your choice is saved** - persists across page reloads

---

## 💡 Pro Tips & Best Practices

### Storage Planning

**Recommended structure:**
```
/srv/
├── media/           # Your actual media files
│   ├── movies/
│   ├── tv/
│   ├── music/
│   └── photos/
└── m2-data/         # App configurations
    ├── jellyfin/
    ├── sonarr/
    └── ...
```

**Why this structure?**
- Media on large slow HDD (cheap storage)
- Config on fast SSD (better performance)
- Easy to backup just the config folder
- Can share media folder with multiple apps

### Security Best Practices

1. **Use strong passwords** - At least 16 characters
2. **Never expose services directly** - Use Cloudflare Tunnel or VPN
3. **Enable 2FA** - If your auth gateway supports it
4. **Keep .env secret** - Add to .gitignore if using Git
5. **Regular updates** - Run `docker compose pull` monthly

### Backup Strategy

**What to backup:**
- ✅ .env file
- ✅ docker-compose.yml
- ✅ /srv/m2-data/ folder (all configs)
- ✅ variables.md runbook
- ❌ Don't backup media (too large, easy to re-download)

**How often:**
- Configs: After every change
- Full backup: Weekly
- Test restores: Monthly

### Performance Optimization

**GPU Acceleration (Jellyfin):**
- Enable "GPU hints" in Step 3
- Adds VAAPI (Intel) or NVENC (NVIDIA) support
- Makes video streaming much faster
- Reduces CPU usage by 80%

**Monitoring:**
- Add Prometheus + Grafana from the catalog
- Track CPU, RAM, disk usage
- Get alerts when things go wrong
- See which app uses most resources

---

## 🐛 Troubleshooting

### Installer Issues

**"Page won't load" or "Blank screen":**
- Make sure JavaScript is enabled
- Try a different browser (Chrome, Firefox, Edge)
- Check browser console for errors (F12 → Console tab)
- Clear cache and reload

**"Download buttons don't work":**
- Check if browser is blocking downloads
- Try right-click → Save As
- Use HTTP server instead of file:// URL
- Allow downloads in browser settings

**"My selections disappeared":**
- Installer saves to browser storage
- Clearing cookies deletes progress
- Export files often as backup
- Use "Download" buttons after each step

### Deployment Issues

**"docker: command not found":**
- Docker isn't installed
- Follow Docker installation steps above
- Make sure you logged out/in after install
- Try `sudo docker` if permissions issue

**"port is already allocated":**
- Another service uses that port
- Change port in .env file
- Or stop the conflicting service
- Check with: `sudo netstat -tulpn | grep :8096`

**"service unhealthy" in docker compose ps:**
- View logs: `docker compose logs servicename`
- Common issues:
  - Wrong password in .env
  - Missing required variable
  - Permission denied on volumes
  - Not enough disk space

**"Cannot connect to jellyfin:8096":**
- Check if container is running: `docker ps`
- Check if port is open: `curl http://localhost:8096`
- Check firewall: `sudo ufw status`
- Look at logs: `docker logs media-stack-jellyfin-1`

### Cloudflare Tunnel Issues

**"tunnel won't connect":**
- Check cloudflared is running: `systemctl status cloudflared`
- View logs: `journalctl -u cloudflared -f`
- Verify credentials file exists
- Check internet connection
- Restart tunnel: `systemctl restart cloudflared`

**"404 when accessing via tunnel":**
- DNS record not created correctly
- Wrong service URL in config.yml
- Service not running locally
- Check ingress rules match your services

### General Debugging

1. **Check Docker status:**
```bash
docker compose ps
docker compose logs
```

2. **Verify .env values:**
```bash
cat .env | grep KEY_NAME
```

3. **Test network connectivity:**
```bash
docker compose exec jellyfin ping -c 3 radarr
```

4. **Restart everything:**
```bash
docker compose down
docker compose up -d
```

5. **Check disk space:**
```bash
df -h
```

---

## 📊 Sample Stacks

### Beginner Setup (Just Jellyfin)
**What you get:** Personal Netflix
- Jellyfin (streaming)
- FileBrowser (upload files)

**Resources needed:**
- 2GB RAM
- 100GB+ storage
- Any CPU works

### Intermediate Setup (Full Media Stack)
**What you get:** Automated downloads + streaming
- Jellyfin (streaming)
- Sonarr (TV shows)
- Radarr (movies)
- qBittorrent (downloads)
- Prowlarr (indexer manager)

**Resources needed:**
- 4GB RAM
- 500GB+ storage
- Dual-core CPU or better

### Advanced Setup (Everything!)
**What you get:** Complete self-hosted cloud
- All media apps above
- Immich (Google Photos alternative)
- Nextcloud (cloud storage)
- Cloudflare Tunnel (remote access)
- Authelia (login protection)
- Prometheus + Grafana (monitoring)

**Resources needed:**
- 8GB+ RAM
- 1TB+ storage
- Quad-core CPU
- GPU for Jellyfin (optional but nice)

---

## 🎓 Learning Resources

### New to Self-Hosting?

**What is Docker?**
- [Docker in 100 Seconds](https://www.youtube.com/watch?v=Gjnup-PuquQ)
- [Docker Docs for Beginners](https://docs.docker.com/get-started/)
- Think of it like: Each app runs in its own container (isolated)

**What is Docker Compose?**
- [Docker Compose Tutorial](https://docs.docker.com/compose/gettingstarted/)
- One file (docker-compose.yml) that starts all your apps
- Edit one file, control everything

**Linux Basics:**
- [Linux Command Line for Beginners](https://ubuntu.com/tutorials/command-line-for-beginners)
- [The Missing Semester of CS](https://missing.csail.mit.edu/)

### Self-Hosting Communities

**Reddit:**
- r/selfhosted - General self-hosting community
- r/homelab - Home server enthusiasts
- r/DataHoarder - Storage and backup discussions
- r/jellyfin - Jellyfin-specific help

**Discord Servers:**
- [Self-Hosted Discord](https://discord.gg/selfhosted)
- [Homelab Discord](https://discord.gg/homelab)

**Forums:**
- [Jellyfin Forums](https://forum.jellyfin.org/)
- [Nextcloud Community](https://help.nextcloud.com/)
- [TrueNAS Forums](https://www.truenas.com/community/)

### App-Specific Docs

**Media Apps:**
- [Jellyfin Documentation](https://jellyfin.org/docs/)
- [Sonarr Wiki](https://wiki.servarr.com/sonarr)
- [Radarr Wiki](https://wiki.servarr.com/radarr)
- [TRaSH Guides](https://trash-guides.info/) - Best practices for *arr apps

**Photos & Files:**
- [Immich Documentation](https://immich.app/docs/overview/introduction)
- [Nextcloud Admin Manual](https://docs.nextcloud.com/server/latest/admin_manual/)

**Security:**
- [Authelia Documentation](https://www.authelia.com/docs/)
- [Cloudflare Tunnel Setup](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/)

---

## 🔒 Privacy & Security

### Your Data Stays Local

**This installer:**
- ✅ Runs entirely in your browser
- ✅ Never sends data to any server
- ✅ No analytics or tracking
- ✅ No account required
- ✅ Works completely offline

**Your generated files:**
- Contain passwords and secrets
- Never shared or uploaded anywhere
- Stored only where you save them

### Recommended Security Setup

**Minimum:**
1. Use Cloudflare Tunnel (no open ports)
2. Strong passwords in .env
3. Enable firewall: `sudo ufw enable`

**Better:**
4. Add Authelia/Authentik for login
5. Enable 2FA where supported
6. Regular updates: `docker compose pull`

**Best:**
7. Use hardware security key (YubiKey)
8. Separate VLAN for media stack
9. Intrusion detection (Fail2ban)
10. Regular security audits

### Data Privacy

**Apps that phone home:**
- Jellyfin - NO (fully private)
- Nextcloud - NO (fully private)
- Immich - NO (fully private)
- Sonarr/Radarr - YES (for updates and metadata)
- qBittorrent - NO (unless you enable trackers)

**How to maximize privacy:**
- Use VPN for download apps
- Disable telemetry where available
- Host your own metadata server (advanced)
- Block outgoing connections (firewall)

---

## 📞 Support & Community

**Found a bug in the installer?**
- [Report on GitHub Issues](https://github.com/Morlock52/M2/issues)

**Need help with deployment?**
- Ask in r/selfhosted
- Join Self-Hosted Discord
- Check app-specific forums

**Want to contribute?**
- [GitHub Repository](https://github.com/Morlock52/M2)
- Submit pull requests
- Improve documentation
- Share your templates

---

## 🗺️ Verified Information

This installer reflects community best practices current through **December 3, 2025**:

| Component | Version | Release Date | Why Referenced |
|-----------|---------|--------------|----------------|
| Jellyfin | [10.11.4](https://github.com/jellyfin/jellyfin/releases/tag/v10.11.4) | 2025-12-01 | Latest stable with HDR fixes |
| Nextcloud | [v32.0.2](https://github.com/nextcloud/server/releases/tag/v32.0.2) | 2025-11-20 | Hub 8 era PHP/Postgres requirements |
| Immich | [v2.3.1](https://github.com/immich-app/immich/releases/tag/v2.3.1) | 2025-11-20 | Fixed web UI freeze bug |
| Authelia | [v4.39.15](https://github.com/authelia/authelia/releases/tag/v4.39.15) | 2025-11-29 | LDAP health checks fixed |
| CF Tunnel | [Hostname routing free](https://blog.cloudflare.com/tunnel-hostname-routing/) | 2025-09-18 | Makes host-per-service default |
| CF Zero Trust | [Post-quantum WARP](https://blog.cloudflare.com/post-quantum-warp/) | 2025-09-24 | Stronger encryption available |

**Community sources:**
- Reddit r/selfhosted discussions (Nov 25, 2024)
- Homelab Discord best practices (Nov 2024)
- r/DataHoarder storage polls (Nov 2024)
- Mastodon self-hosting threads (Nov 2024)
- Cloudflare Zero Trust updates (Sept-Nov 2025)

---

## 📝 Changelog

**December 3, 2025** - Documentation refresh
- Updated with latest component versions
- Added Cloudflare Tunnel post-quantum info
- Verified all community best practices current

**Previous updates:**
- User variable storage system
- Per-service runbook export
- Multiple theme support
- GPU acceleration hints
- Object storage integration

---

## 📄 License

This project is licensed under the ISC License.

---

**Built with ❤️ for self-hosters who want media freedom**

*Questions? Check r/selfhosted or the GitHub Issues page*

---

## Quick Links

**Official Docs:**
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [Cloudflare Tunnel Guide](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/)

**Community Resources:**
- [r/selfhosted Wiki](https://www.reddit.com/r/selfhosted/wiki/index)
- [Awesome-Selfhosted](https://github.com/awesome-selfhosted/awesome-selfhosted)
- [TRaSH Guides](https://trash-guides.info/)

**Component Links:**
- [Jellyfin](https://jellyfin.org/) | [Sonarr](https://sonarr.tv/) | [Radarr](https://radarr.video/)
- [Immich](https://immich.app/) | [Nextcloud](https://nextcloud.com/)
- [Authelia](https://www.authelia.com/) | [Authentik](https://goauthentik.io/)
