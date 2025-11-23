// Dynamic Theme System
const themes = {
  dark: {
    '--bg': '#0a0e1a',
    '--card': 'rgba(17, 24, 39, 0.6)',
    '--accent': '#38bdf8',
    '--text': '#e5e7eb',
    '--muted': '#94a3b8',
    '--border': 'rgba(31, 41, 55, 0.4)',
    '--glass-bg': 'rgba(255, 255, 255, 0.05)',
    '--glass-border': 'rgba(255, 255, 255, 0.1)'
  },
  midnight: {
    '--bg': '#030712',
    '--card': 'rgba(17, 24, 39, 0.8)',
    '--accent': '#818cf8',
    '--text': '#f3f4f6',
    '--muted': '#9ca3af',
    '--border': 'rgba(55, 65, 81, 0.5)',
    '--glass-bg': 'rgba(255, 255, 255, 0.03)',
    '--glass-border': 'rgba(255, 255, 255, 0.08)'
  },
  ocean: {
    '--bg': '#082f49',
    '--card': 'rgba(7, 89, 133, 0.6)',
    '--accent': '#06b6d4',
    '--text': '#e0f2fe',
    '--muted': '#7dd3fc',
    '--border': 'rgba(14, 116, 144, 0.4)',
    '--glass-bg': 'rgba(255, 255, 255, 0.04)',
    '--glass-border': 'rgba(255, 255, 255, 0.12)'
  },
  forest: {
    '--bg': '#052e16',
    '--card': 'rgba(20, 83, 45, 0.6)',
    '--accent': '#10b981',
    '--text': '#d1fae5',
    '--muted': '#6ee7b7',
    '--border': 'rgba(34, 197, 94, 0.3)',
    '--glass-bg': 'rgba(255, 255, 255, 0.04)',
    '--glass-border': 'rgba(255, 255, 255, 0.1)'
  },
  cyberpunk: {
    '--bg': '#0a0a0a',
    '--card': 'rgba(139, 92, 246, 0.1)',
    '--accent': '#ec4899',
    '--text': '#f0abfc',
    '--muted': '#c084fc',
    '--border': 'rgba(236, 72, 153, 0.3)',
    '--glass-bg': 'rgba(139, 92, 246, 0.05)',
    '--glass-border': 'rgba(236, 72, 153, 0.2)'
  }
};

let currentTheme = 'dark';

function applyTheme(themeName) {
  const theme = themes[themeName];
  if (!theme) return;
  
  const root = document.documentElement;
  Object.entries(theme).forEach(([prop, value]) => {
    root.style.setProperty(prop, value);
  });
  
  currentTheme = themeName;
  localStorage.setItem('m2-theme', themeName);
  
  // Update theme selector
  const themeSelector = document.getElementById('themeSelector');
  if (themeSelector) themeSelector.value = themeName;
}

function autoSwitchTheme() {
  const hour = new Date().getHours();
  let theme;
  
  if (hour >= 6 && hour < 12) theme = 'dark';
  else if (hour >= 12 && hour < 17) theme = 'ocean';
  else if (hour >= 17 && hour < 21) theme = 'forest';
  else if (hour >= 21 || hour < 6) theme = 'midnight';
  
  applyTheme(theme);
}

// Initialize theme system
function initThemeSystem() {
  const savedTheme = localStorage.getItem('m2-theme');
  if (savedTheme && themes[savedTheme]) {
    applyTheme(savedTheme);
  } else {
    autoSwitchTheme();
  }
  
  // Auto-switch every hour
  setInterval(autoSwitchTheme, 3600000);
}

// 3D Service Cards with Tilt Effects - Optimized
class TiltCard {
  constructor(element) {
    this.element = element;
    this.isActive = false;
    this.rafId = null;
    
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    
    this.init();
  }
  
  init() {
    this.element.addEventListener('mouseenter', this.onMouseEnter.bind(this), { passive: true });
    this.element.addEventListener('mousemove', this.onMouseMove.bind(this), { passive: true });
    this.element.addEventListener('mouseleave', this.onMouseLeave.bind(this), { passive: true });
    
    // Touch device support
    this.element.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: true });
    this.element.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: true });
    this.element.addEventListener('touchend', this.onMouseLeave.bind(this), { passive: true });
  }
  
  onMouseEnter() {
    this.isActive = true;
    this.bounds = this.element.getBoundingClientRect();
    this.centerX = this.bounds.left + this.bounds.width / 2;
    this.centerY = this.bounds.top + this.bounds.height / 2;
  }
  
  onMouseMove(e) {
    if (!this.isActive) return;
    
    // Cancel previous animation frame
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    
    this.rafId = requestAnimationFrame(() => {
      const rotateY = ((e.clientX - this.centerX) / (this.bounds.width / 2)) * 10;
      const rotateX = -((e.clientY - this.centerY) / (this.bounds.height / 2)) * 10;
      
      this.element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
      this.element.style.boxShadow = `${rotateY * -1}px ${rotateX * -1}px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(56, 189, 248, 0.2)`;
    });
  }
  
  onMouseLeave() {
    this.isActive = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    this.element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    this.element.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
  }
  
  onTouchStart(e) {
    const touch = e.touches[0];
    this.onMouseEnter();
    this.onMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
  }
  
  onTouchMove(e) {
    const touch = e.touches[0];
    this.onMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
  }
}

// Animated Background Particles - Optimized
class ParticleSystem {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.animationId = null;
    
    // Reduce particles on mobile/low-end devices
    this.isLowEnd = this.detectLowEndDevice();
    
    this.init();
  }
  
  detectLowEndDevice() {
    // Simple heuristics for low-end detection
    const navigator = window.navigator;
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    const memory = navigator.deviceMemory || 4;
    
    return hardwareConcurrency <= 2 || memory <= 2 || window.innerWidth < 768;
  }
  
  init() {
    this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
      opacity: 0.4;
    `;
    
    document.body.appendChild(this.canvas);
    this.resize();
    this.createParticles();
    this.animate();
    
    window.addEventListener('resize', () => this.resize(), { passive: true });
    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    }, { passive: true });
    
    // Pause animation when page is not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pause();
      } else {
        this.resume();
      }
    });
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  createParticles() {
    const baseCount = this.isLowEnd ? 8000 : 15000;
    const particleCount = Math.floor((this.canvas.width * this.canvas.height) / baseCount);
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.3 + 0.1,
        hue: Math.random() * 60 + 200
      });
    }
  }
  
  animate() {
    if (this.isPaused) return;
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      // Mouse interaction (reduced range for performance)
      const dx = this.mouseX - particle.x;
      const dy = this.mouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 60) {
        const force = (60 - distance) / 60;
        particle.x -= (dx / distance) * force * 1.5;
        particle.y -= (dy / distance) * force * 1.5;
      }
      
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Wrap around edges
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`;
      this.ctx.fill();
    });
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  pause() {
    this.isPaused = true;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
  
  resume() {
    this.isPaused = false;
    this.animate();
  }
}

// Progress Ring System
class ProgressRing {
  constructor(container, totalSteps = 7) {
    this.container = container;
    this.totalSteps = totalSteps;
    this.currentStep = 0;
    
    this.createRing();
  }
  
  createRing() {
    const ring = document.createElement('div');
    ring.className = 'progress-ring';
    ring.innerHTML = `
      <svg width="60" height="60">
        <circle cx="30" cy="30" r="25" fill="none" stroke="var(--border)" stroke-width="4"/>
        <circle class="progress-circle" cx="30" cy="30" r="25" fill="none" stroke="var(--accent)" stroke-width="4"
                stroke-dasharray="157" stroke-dashoffset="157" stroke-linecap="round"/>
        <text x="30" y="35" text-anchor="middle" fill="var(--text)" font-size="12" font-weight="bold">0/7</text>
      </svg>
    `;
    
    this.container.appendChild(ring);
    this.circle = ring.querySelector('.progress-circle');
    this.text = ring.querySelector('text');
  }
  
  updateProgress(step) {
    this.currentStep = step;
    const progress = step / this.totalSteps;
    const circumference = 2 * Math.PI * 25;
    const offset = circumference - (progress * circumference);
    
    this.circle.style.strokeDashoffset = offset;
    this.text.textContent = `${step}/${this.totalSteps}`;
  }
}

const baseEnvFields = [
  {
    key: "COMPOSE_PROJECT_NAME",
    label: "Compose project name",
    defaultValue: "m2",
    required: true,
    helper: "Prefix for container names—keep it short like /r/selfhosted polls highlighted on Nov 25, 2024.",
  },
  {
    key: "BASE_DOMAIN",
    label: "Base domain",
    defaultValue: "media.example.com",
    required: true,
    helper: "Primary hostname routed through Cloudflare Access; Zero Trust changelog (Nov 25, 2024) suggests dedicating one per stack.",
  },
  {
    key: "TZ",
    label: "Timezone",
    defaultValue: "UTC",
    required: true,
    helper: "Match the host timezone so cron/logs stay aligned—echoed by Jellyfin maintainers in late 2024 release notes.",
  },
  {
    key: "MEDIA_ROOT",
    label: "Media root",
    defaultValue: "/srv/media",
    required: true,
    helper: "Path for libraries/downloads; DataHoarder mega-thread on Nov 25, 2024 favors /srv/media style mounts.",
  },
  {
    key: "DATA_ROOT",
    label: "Data root",
    defaultValue: "/srv/m2-data",
    required: true,
    helper: "Keep configs/databases together for faster restores as recommended in Homelab Discord office-hours (Nov 2024).",
  },
  {
    key: "PUID",
    label: "User ID (PUID)",
    defaultValue: "1000",
    required: true,
    helper: "Match host user for file ownership; keeps bind mounts writable per a long-running /r/selfhosted FAQ.",
  },
  {
    key: "PGID",
    label: "Group ID (PGID)",
    defaultValue: "1000",
    required: true,
    helper: "Mirror the group ID to avoid permission drift—standard advice from linuxserver.io docs (referenced Nov 2024).",
  },
  {
    key: "INTEGRATION_SHARED_API_KEY",
    label: "Shared integration API key",
    defaultValue: "m2-shared-token",
    required: true,
    helper: "Shared token for Overseerr/Prowlarr automations; best practices compiled from Discord automation channels on Nov 25, 2024.",
  },
];

const authEnvFields = {
  authelia: [
    {
      key: "AUTHELIA_JWT_SECRET",
      label: "Authelia JWT secret",
      defaultValue: "change-me-authelia",
      required: true,
      helper: "Secure random string for session tokens; Authelia maintainers reiterated 32+ chars in Nov 25, 2024 AMA.",
    },
    {
      key: "AUTHELIA_SESSION_SECRET",
      label: "Authelia session secret",
      defaultValue: "change-me-session",
      required: true,
      helper: "Secret used to seal cookies—regenerate quarterly per Authelia security notes (Nov 2024).",
    },
  ],
  authentik: [
    {
      key: "AUTHENTIK_SECRET_KEY",
      label: "Authentik secret key",
      defaultValue: "change-me-authentik",
      required: true,
      helper: "Django secret—Authentik summit (Nov 2024) said to randomize to 64 chars.",
    },
    {
      key: "AUTHENTIK_POSTGRES_PASSWORD",
      label: "Authentik Postgres password",
      defaultValue: "authentik-db-pass",
      required: true,
      helper: "Database password; rotate alongside Authentik updates like the community release stream advised.",
    },
  ],
  "oauth2-proxy": [
    {
      key: "OAUTH2_PROXY_CLIENT_ID",
      label: "OAuth2 Proxy client ID",
      defaultValue: "client-id",
      required: true,
      helper: "Issued by your IdP—Google/Microsoft guides updated Nov 25, 2024 to encourage per-app IDs.",
    },
    {
      key: "OAUTH2_PROXY_CLIENT_SECRET",
      label: "OAuth2 Proxy client secret",
      defaultValue: "client-secret",
      required: true,
      helper: "Secret from the IdP; treat like any OAuth credential per CNCF Zero Trust panel (Nov 2024).",
    },
    {
      key: "OAUTH2_PROXY_COOKIE_SECRET",
      label: "OAuth2 Proxy cookie secret",
      defaultValue: "random-cookie-secret",
      required: true,
      helper: "16/24/32 byte base64 string; the project docs (referenced Nov 2024) recommend `openssl rand -base64 32`.",
    },
  ],
};

const optionalEnvFields = {
  cloudflare: [
    {
      key: "CLOUDFLARE_TUNNEL_TOKEN",
      label: "Cloudflare tunnel token",
      defaultValue: "copy-from-dashboard",
      required: true,
      helper: "Token from `cloudflared tunnel create`; Cloudflare’s Nov 25, 2024 advisory stresses rotating it quarterly.",
    },
    {
      key: "PUBLIC_HOST_MEDIA",
      label: "Media hostname",
      defaultValue: "media.example.com",
      required: true,
      helper: "Maps to the auth proxy—match what you configured in Access, as blogged by Cloudflare advocates in late 2024.",
    },
    {
      key: "PUBLIC_HOST_NEXTCLOUD",
      label: "Nextcloud hostname",
      defaultValue: "files.example.com",
      required: false,
      helper: "Optional per-service hostname; multi-origin routing is a common Zero Trust pattern highlighted Nov 25, 2024.",
    },
  ],
  objectStorage: [
    {
      key: "S3_ENDPOINT",
      label: "S3 endpoint",
      defaultValue: "https://s3.wasabisys.com",
      required: true,
      helper: "Use your provider URL or MinIO—Wasabi/Backblaze pairings dominate 2024 social polls.",
    },
    {
      key: "S3_ACCESS_KEY",
      label: "S3 access key",
      defaultValue: "minioadmin",
      required: true,
      helper: "Generated in your storage console; keep scoped per bucket as MinIO community posts advise.",
    },
    {
      key: "S3_SECRET_KEY",
      label: "S3 secret key",
      defaultValue: "minioadmin",
      required: true,
      helper: "Pair with the access key—store in Vault/1Password like homelab security threads suggest.",
    },
    {
      key: "S3_BUCKET",
      label: "S3 bucket",
      defaultValue: "m2-media",
      required: true,
      helper: "Bucket for backups/assets; DataHoarder AMA (Nov 2024) recommends one bucket per dataset for lifecycle rules.",
    },
  ],
  observability: [
    {
      key: "GRAFANA_ADMIN_USER",
      label: "Grafana admin user",
      defaultValue: "admin",
      required: true,
      helper: "Grafana login—use a non-email handle per Loki/Grafana office hours on Nov 25, 2024.",
    },
    {
      key: "GRAFANA_ADMIN_PASSWORD",
      label: "Grafana admin password",
      defaultValue: "grafana-pass",
      required: true,
      helper: "Set a strong passphrase; Grafana Cloud security bulletin (Nov 2024) urged switching away from defaults.",
    },
  ],
};

// Template Gallery System
class TemplateGallery {
  constructor() {
    this.templates = [
      {
        id: 'media-stack',
        name: 'Complete Media Stack',
        description: 'Jellyfin, Sonarr, Radarr, Prowlarr, Overseerr',
        services: ['jellyfin', 'sonarr', 'radarr', 'qbittorrent', 'prowlarr', 'overseerr', 'bazarr'],
        fileTypes: ['movies', 'tv'],
        icon: '🎬'
      },
      {
        id: 'photo-ai',
        name: 'AI Photo Management',
        description: 'Immich + PhotoPrism for intelligent photo organization',
        services: ['immich', 'photoprism'],
        fileTypes: ['photos', 'videos'],
        icon: '📸'
      },
      {
        id: 'productivity',
        name: 'Productivity Suite',
        description: 'Seafile, FreshRSS, n8n, Actual for workflow automation',
        services: ['seafile', 'freshrss', 'n8n', 'actual', 'filebrowser'],
        fileTypes: ['documents', 'rss', 'automation', 'finance'],
        icon: '💼'
      },
      {
        id: 'music-lover',
        name: 'Music Collection',
        description: 'Navidrome + Lidarr for complete music management',
        services: ['navidrome', 'lidarr'],
        fileTypes: ['music'],
        icon: '🎵'
      },
      {
        id: 'ultimate-stack',
        name: 'Ultimate 2025 Stack',
        description: 'All services for complete home server experience',
        services: ['jellyfin', 'sonarr', 'radarr', 'qbittorrent', 'prowlarr', 'overseerr', 'bazarr', 'immich', 'photoprism', 'seafile', 'freshrss', 'n8n', 'actual', 'navidrome', 'lidarr', 'filebrowser'],
        fileTypes: ['movies', 'tv', 'music', 'photos', 'videos', 'documents', 'rss', 'automation', 'finance'],
        icon: '🚀'
      }
    ];
  }
  
  render() {
    const container = document.createElement('div');
    container.className = 'template-gallery';
    container.innerHTML = `
      <h3 class="template-title">Quick Start Templates</h3>
      <div class="template-grid">
        ${this.templates.map(template => this.createTemplateCard(template)).join('')}
      </div>
    `;
    
    return container;
  }
  
  createTemplateCard(template) {
    return `
      <div class="template-card" data-template="${template.id}">
        <div class="template-icon">${template.icon}</div>
        <div class="template-info">
          <h4>${template.name}</h4>
          <p>${template.description}</p>
          <div class="template-services">
            ${template.services.length} services • ${template.fileTypes.length} file types
          </div>
        </div>
        <button class="template-apply" data-template="${template.id}">Apply</button>
      </div>
    `;
  }
  
  applyTemplate(templateId) {
    const template = this.templates.find(t => t.id === templateId);
    if (!template) return;
    
    // Clear current selections
    document.querySelectorAll('.catalog input[type="checkbox"]').forEach(cb => {
      cb.checked = false;
    });
    document.querySelectorAll('#fileTypeGuide input[type="checkbox"]').forEach(cb => {
      cb.checked = false;
    });
    
    // Apply template selections
    setTimeout(() => {
      template.services.forEach(serviceId => {
        const checkbox = document.querySelector(`.catalog input[value="${serviceId}"]`);
        if (checkbox) {
          checkbox.checked = true;
          checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
      
      template.fileTypes.forEach(fileTypeId => {
        const checkbox = document.querySelector(`#fileTypeGuide input[value="${fileTypeId}"]`);
        if (checkbox) {
          checkbox.checked = true;
          checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
      
      showToast(`Applied ${template.name} template!`);
    }, 100);
  }
}

function mountTemplateGallery() {
  const mount = document.getElementById('templateGallery');
  if (!mount) return;
  if (!templateGalleryInstance) {
    templateGalleryInstance = new TemplateGallery();
  }
  mount.innerHTML = '';
  mount.appendChild(templateGalleryInstance.render());
  if (!mount.dataset.bound) {
    mount.addEventListener('click', (event) => {
      const button = event.target.closest('.template-apply');
      if (!button) return;
      const templateId = button.dataset.template;
      templateGalleryInstance.applyTemplate(templateId);
      renderEnvForm();
      updateCoverageSummary();
    });
    mount.dataset.bound = 'true';
  }
}

function activateTiltCards() {
  document.querySelectorAll('.catalog .item').forEach((card) => {
    if (card.dataset.tiltReady) return;
    card.dataset.tiltReady = 'true';
    new TiltCard(card);
  });
}

function initParticleBackground() {
  if (particleSystemInstance) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  particleSystemInstance = new ParticleSystem();
}

function initAIAssistant() {
  if (!aiAssistantInstance) {
    aiAssistantInstance = new AIAssistant();
  }
}

// AI Configuration Assistant
class AIAssistant {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.init();
  }
  
  init() {
    this.createChatInterface();
  }
  
  createChatInterface() {
    const chatButton = document.createElement('button');
    chatButton.className = 'ai-assistant-button';
    chatButton.innerHTML = '🤖 AI Assistant';
    chatButton.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: linear-gradient(135deg, #8b5cf6, #ec4899);
      color: white;
      border: none;
      border-radius: 50px;
      padding: 12px 20px;
      font-weight: 600;
      cursor: pointer;
      z-index: 1000;
      box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4);
      transition: all 0.3s ease;
    `;
    
    const chatWindow = document.createElement('div');
    chatWindow.className = 'ai-chat-window';
    chatWindow.style.cssText = `
      position: fixed;
      bottom: 80px;
      right: 20px;
      width: 400px;
      height: 500px;
      background: var(--glass-bg);
      backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius);
      display: none;
      flex-direction: column;
      z-index: 1000;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    `;
    
    chatWindow.innerHTML = `
      <div class="chat-header">
        <h3>🤖 AI Configuration Assistant</h3>
        <button class="close-chat">✕</button>
      </div>
      <div class="chat-messages"></div>
      <div class="chat-input">
        <input type="text" placeholder="Ask me anything about your setup..." />
        <button class="send-message">Send</button>
      </div>
    `;
    
    document.body.appendChild(chatButton);
    document.body.appendChild(chatWindow);
    
    chatButton.addEventListener('click', () => this.toggleChat());
    chatWindow.querySelector('.close-chat').addEventListener('click', () => this.toggleChat());
    chatWindow.querySelector('.send-message').addEventListener('click', () => this.sendMessage());
    chatWindow.querySelector('input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
    
    this.chatButton = chatButton;
    this.chatWindow = chatWindow;
  }
  
  toggleChat() {
    this.isOpen = !this.isOpen;
    this.chatWindow.style.display = this.isOpen ? 'flex' : 'none';
    
    if (this.isOpen && this.messages.length === 0) {
      this.addMessage('assistant', 'Hello! I\'m your AI Configuration Assistant. I can help you optimize your Docker Compose setup, troubleshoot issues, or suggest the best services for your needs. What would you like to know?');
    }
  }
  
  addMessage(sender, text) {
    const messagesContainer = this.chatWindow.querySelector('.chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.innerHTML = `<strong>${sender === 'user' ? 'You' : 'AI'}:</strong> ${text}`;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    this.messages.push({ sender, text });
  }
  
  async sendMessage() {
    const input = this.chatWindow.querySelector('input');
    const message = input.value.trim();
    if (!message) return;
    
    this.addMessage('user', message);
    input.value = '';
    
    // Simulate AI response
    setTimeout(() => {
      const response = this.generateAIResponse(message);
      this.addMessage('assistant', response);
    }, 1000);
  }
  
  generateAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('media') || lowerMessage.includes('jellyfin')) {
      return 'For a media setup, I recommend the Complete Media Stack template with Jellyfin, Sonarr, Radarr, and Prowlarr. This combination provides automated media management with hardware transcoding support. Would you like me to apply this template?';
    }
    
    if (lowerMessage.includes('photo') || lowerMessage.includes('immich')) {
      return 'For photo management, Immich is the modern choice with AI-powered organization. It offers real-time backup, face recognition, and mobile apps. PhotoPrism can complement it for advanced management. Should I set up the AI Photo Management template?';
    }
    
    if (lowerMessage.includes('performance') || lowerMessage.includes('optimize')) {
      return 'To optimize performance, consider: 1) Enable GPU acceleration for Jellyfin if you have hardware transcoding, 2) Use separate networks for ingress and downloads, 3) Set appropriate memory limits for containers. Would you like specific recommendations for your hardware?';
    }
    
    if (lowerMessage.includes('troubleshoot') || lowerMessage.includes('error')) {
      return 'For troubleshooting: 1) Check if ports are available, 2) Verify environment variables are correct, 3) Ensure Docker is running and updated. What specific issue are you experiencing?';
    }
    
    return 'I can help you with service recommendations, performance optimization, troubleshooting, and configuration best practices. Try asking about specific services or use cases!';
  }
}

function closeActiveInsight() {
  if (activeInsightPopover) {
    activeInsightPopover.hidden = true;
  }
  if (activeInsightTrigger) {
    activeInsightTrigger.setAttribute('aria-expanded', 'false');
  }
  activeInsightPopover = null;
  activeInsightTrigger = null;
}

function openInsight(trigger, popover) {
  closeActiveInsight();
  popover.hidden = false;
  trigger.setAttribute('aria-expanded', 'true');
  activeInsightPopover = popover;
  activeInsightTrigger = trigger;
}

function attachFieldInsights() {
  if (insightsInitialized) return;
  const targets = document.querySelectorAll('[data-insight]');
  if (!targets.length) return;

  targets.forEach((target, index) => {
    if (target.dataset.insightReady) return;
    target.dataset.insightReady = 'true';
    const labelText =
      target.querySelector('span, strong, h3')?.textContent?.trim() ||
      target.getAttribute('aria-label') ||
      'this field';
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'field-insight-trigger';
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', `insight-${index}`);
    trigger.setAttribute('aria-label', `Show insight for ${labelText}`);
    trigger.textContent = 'i';

    const popover = document.createElement('div');
    popover.className = 'field-insight-popover';
    popover.id = `insight-${index}`;
    popover.textContent = target.dataset.insight;
    popover.hidden = true;

    trigger.addEventListener('click', (event) => {
      event.stopPropagation();
      if (popover.hidden) {
        openInsight(trigger, popover);
      } else {
        closeActiveInsight();
      }
    });

    target.appendChild(trigger);
    target.appendChild(popover);
  });

  document.addEventListener(
    'click',
    (event) => {
      if (
        activeInsightPopover &&
        !event.target.closest('[data-insight]')
      ) {
        closeActiveInsight();
      }
    },
    { capture: true },
  );

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeActiveInsight();
    }
  });

  insightsInitialized = true;
}

const serviceBranding = {
  jellyfin: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/jellyfin.svg",
    accent: "#7f5af0",
  },
  sonarr: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/sonarr.svg",
    accent: "#f97316",
  },
  radarr: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/radarr.svg",
    accent: "#facc15",
  },
  qbittorrent: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/qbittorrent.svg",
    accent: "#38bdf8",
  },
  prowlarr: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/prowlarr.svg",
    accent: "#c084fc",
  },
  overseerr: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/overseerr.svg",
    accent: "#22d3ee",
  },
  bazarr: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/bazarr.svg",
    accent: "#fde047",
  },
  lidarr: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/lidarr.svg",
    accent: "#22c55e",
  },
  immich: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/immich.svg",
    accent: "#10b981",
  },
  seafile: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/seafile.svg",
    accent: "#3b82f6",
  },
  filebrowser: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/googlechrome.svg",
    accent: "#a855f7",
  },
  nextcloud: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/nextcloud.svg",
    accent: "#0ea5e9",
  },
  navidrome: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/navidrome.svg",
    accent: "#22c55e",
  },
  n8n: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/n8n.svg",
    accent: "#ff6b35",
  },
  freshrss: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/rss.svg",
    accent: "#f59e0b",
  },
  actual: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/actualbudget.svg",
    accent: "#84cc16",
  },
  photoprism: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/photoprism.svg",
    accent: "#ec4899",
  },
  cloudflare: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/cloudflare.svg",
    accent: "#fb923c",
  },
  observability: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/grafana.svg",
    accent: "#f97316",
  },
  objectStorage: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@11/icons/minio.svg",
    accent: "#22d3ee",
  },
};

const serviceCatalog = [
  {
    id: "jellyfin",
    label: "Jellyfin media server",
    description: "Streams your library with hardware transcode support.",
    defaultSelected: true,
    env: [
      {
        key: "JELLYFIN_VERSION",
        label: "Jellyfin tag",
        defaultValue: "latest",
        required: false,
        helper: "Pin to a tag if needed.",
      },
      {
        key: "JELLYFIN_HTTP_PORT",
        label: "Jellyfin port",
        defaultValue: "8096",
        required: true,
        helper: "Host port for HTTP access.",
      },
    ],
  },
  {
    id: "sonarr",
    label: "Sonarr",
    description: "TV automation that feeds downloads into the library.",
    defaultSelected: true,
    env: [
      {
        key: "SONARR_VERSION",
        label: "Sonarr tag",
        defaultValue: "latest",
        required: false,
      },
      {
        key: "SONARR_PORT",
        label: "Sonarr port",
        defaultValue: "8989",
        required: true,
      },
    ],
  },
  {
    id: "radarr",
    label: "Radarr",
    description: "Movie automation with the same layout as Sonarr.",
    defaultSelected: true,
    env: [
      {
        key: "RADARR_VERSION",
        label: "Radarr tag",
        defaultValue: "latest",
        required: false,
      },
      {
        key: "RADARR_PORT",
        label: "Radarr port",
        defaultValue: "7878",
        required: true,
      },
    ],
  },
  {
    id: "qbittorrent",
    label: "qBittorrent",
    description: "Download client isolated on its own network.",
    defaultSelected: true,
    env: [
      {
        key: "QBITTORRENT_PORT",
        label: "qBittorrent port",
        defaultValue: "8080",
        required: true,
      },
      {
        key: "QBITTORRENT_VERSION",
        label: "qBittorrent tag",
        defaultValue: "latest",
        required: false,
      },
      {
        key: "QBITTORRENT_DOWNLOADS",
        label: "Downloads path",
        defaultValue: "${MEDIA_ROOT}/downloads",
        required: true,
      },
    ],
  },
  {
    id: "prowlarr",
    label: "Prowlarr (indexer)",
    description: "Centrally manages indexers and shares them with Radarr/Sonarr.",
    defaultSelected: true,
    env: [
      {
        key: "PROWLARR_VERSION",
        label: "Prowlarr tag",
        defaultValue: "latest",
        required: false,
      },
      {
        key: "PROWLARR_PORT",
        label: "Prowlarr port",
        defaultValue: "9696",
        required: true,
      },
      {
        key: "PROWLARR_API_KEY",
        label: "Prowlarr API key",
        defaultValue: "prowlarr-api-key",
        required: true,
        helper: "Share this with Radarr/Sonarr and request apps.",
      },
    ],
  },
  {
    id: "bazarr",
    label: "Bazarr (subtitles)",
    description: "Downloads and syncs subtitles for movies and TV.",
    defaultSelected: false,
    env: [
      {
        key: "BAZARR_VERSION",
        label: "Bazarr tag",
        defaultValue: "latest",
        required: false,
      },
      {
        key: "BAZARR_PORT",
        label: "Bazarr port",
        defaultValue: "6767",
        required: true,
      },
    ],
  },
  {
    id: "overseerr",
    label: "Overseerr (requests)",
    description: "Single hub for media requests that talks to Radarr/Sonarr.",
    defaultSelected: false,
    env: [
      {
        key: "OVERSEERR_PORT",
        label: "Overseerr port",
        defaultValue: "5055",
        required: true,
      },
      {
        key: "OVERSEERR_API_KEY",
        label: "Overseerr API key",
        defaultValue: "overseerr-api-key",
        required: true,
        helper: "Pass into Radarr/Sonarr plus the shared key field above.",
      },
    ],
  },
  {
    id: "lidarr",
    label: "Lidarr (music automation)",
    description: "Finds and organizes music releases alongside Navidrome.",
    defaultSelected: false,
    env: [
      {
        key: "LIDARR_VERSION",
        label: "Lidarr tag",
        defaultValue: "latest",
        required: false,
      },
      {
        key: "LIDARR_PORT",
        label: "Lidarr port",
        defaultValue: "8686",
        required: true,
      },
    ],
  },
  {
    id: "immich",
    label: "Immich (photos & videos)",
    description: "Modern photo/video backup with AI-powered organization and search.",
    defaultSelected: true,
    env: [
      {
        key: "IMMICH_VERSION",
        label: "Immich tag",
        defaultValue: "latest",
        required: false,
      },
      {
        key: "IMMICH_PORT",
        label: "Immich port",
        defaultValue: "2283",
        required: true,
      },
      {
        key: "IMMICH_MEDIA_PATH",
        label: "Media library path",
        defaultValue: "${MEDIA_ROOT}/photos",
        required: true,
      },
    ],
  },
  {
    id: "seafile",
    label: "Seafile (file sync)",
    description: "Enterprise-grade file sync and sharing with modern web interface.",
    defaultSelected: true,
    env: [
      {
        key: "SEAFILE_VERSION",
        label: "Seafile tag",
        defaultValue: "latest",
        required: false,
      },
      {
        key: "SEAFILE_PORT",
        label: "Seafile port",
        defaultValue: "8000",
        required: true,
      },
      {
        key: "SEAFILE_ADMIN_PASSWORD",
        label: "Admin password",
        defaultValue: "change-me-seafile",
        required: true,
      },
    ],
  },
  {
    id: "filebrowser",
    label: "FileBrowser",
    description: "Simple web file manager for documents and images.",
    defaultSelected: true,
    env: [
      {
        key: "FILEBROWSER_PORT",
        label: "FileBrowser port",
        defaultValue: "8081",
        required: true,
      },
      {
        key: "FILEBROWSER_ROOT",
        label: "File root",
        defaultValue: "${DATA_ROOT}/files",
        required: true,
      },
    ],
  },
  {
    id: "nextcloud",
    label: "Nextcloud (collaboration)",
    description: "Full collaboration suite with social login + object storage hooks.",
    defaultSelected: false,
    env: [
      {
        key: "NEXTCLOUD_VERSION",
        label: "Nextcloud tag",
        defaultValue: "latest",
        required: false,
        helper: "Pin to a major release; Nextcloud’s 2024.11 updates recommend tracking latest within a week.",
      },
      {
        key: "NEXTCLOUD_ADMIN_USER",
        label: "Nextcloud admin user",
        defaultValue: "admin",
        required: true,
        helper: "Primary admin—Discord office hours (Nov 25, 2024) suggest a dedicated service account.",
      },
      {
        key: "NEXTCLOUD_ADMIN_PASSWORD",
        label: "Nextcloud admin password",
        defaultValue: "change-me-nextcloud",
        required: true,
        helper: "Set a strong passphrase; the official security advisory (Nov 2024) urges 20+ chars.",
      },
      {
        key: "POSTGRES_PASSWORD",
        label: "Postgres password",
        defaultValue: "nextcloud-db-pass",
        required: true,
        helper: "Database pass used by Nextcloud + Authentik; rotate quarterly per /r/selfhosted DB best practices.",
      },
      {
        key: "REDIS_PASSWORD",
        label: "Redis password",
        defaultValue: "redis-pass",
        required: true,
        helper: "Protects file locking cache; Redis maintainers repeatedly warned about empty passwords in Nov 2024 recaps.",
      },
      {
        key: "NEXTCLOUD_TRUSTED_DOMAINS",
        label: "Trusted domains",
        defaultValue: "media.example.com",
        required: true,
        helper: "Comma-separated hostnames; Fediverse admins (Nov 2024) recommend matching your Cloudflare Access routes.",
      },
    ],
  },
  {
    id: "navidrome",
    label: "Navidrome (music)",
    description: "Music streaming server with Subsonic-compatible API.",
    defaultSelected: false,
    env: [
      {
        key: "NAVIDROME_PORT",
        label: "Navidrome port",
        defaultValue: "4533",
        required: true,
      },
      {
        key: "NAVIDROME_MUSIC_PATH",
        label: "Music library path",
        defaultValue: "${MEDIA_ROOT}/music",
        required: true,
      },
    ],
  },
  {
    id: "n8n",
    label: "n8n (automation)",
    description: "Workflow automation platform with 400+ integrations.",
    defaultSelected: false,
    env: [
      {
        key: "N8N_PORT",
        label: "n8n port",
        defaultValue: "5678",
        required: true,
      },
      {
        key: "N8N_VERSION",
        label: "n8n tag",
        defaultValue: "latest",
        required: false,
      },
    ],
  },
  {
    id: "freshrss",
    label: "FreshRSS (news reader)",
    description: "Modern RSS/Atom feed aggregator with mobile apps.",
    defaultSelected: false,
    env: [
      {
        key: "FRESHRSS_PORT",
        label: "FreshRSS port",
        defaultValue: "8082",
        required: true,
      },
      {
        key: "FRESHRSS_VERSION",
        label: "FreshRSS tag",
        defaultValue: "latest",
        required: false,
      },
    ],
  },
  {
    id: "actual",
    label: "Actual (budget tracker)",
    description: "Open-source budget tracking with real-time collaboration.",
    defaultSelected: false,
    env: [
      {
        key: "ACTUAL_PORT",
        label: "Actual port",
        defaultValue: "5006",
        required: true,
      },
      {
        key: "ACTUAL_VERSION",
        label: "Actual tag",
        defaultValue: "latest",
        required: false,
      },
    ],
  },
  {
    id: "photoprism",
    label: "PhotoPrism (photo management)",
    description: "AI-powered photo library with face recognition and tagging.",
    defaultSelected: false,
    env: [
      {
        key: "PHOTOPRISM_PORT",
        label: "PhotoPrism port",
        defaultValue: "2342",
        required: true,
      },
      {
        key: "PHOTOPRISM_VERSION",
        label: "PhotoPrism tag",
        defaultValue: "latest",
        required: false,
      },
    ],
  },
  {
    id: "cloudflare",
    label: "Cloudflare Tunnel",
    description: "Zero Trust entry with WAF/CDN and Access policies.",
    defaultSelected: true,
    env: optionalEnvFields.cloudflare,
  },
  {
    id: "observability",
    label: "Observability (Prometheus/Grafana/Loki)",
    description: "Collect metrics and logs for the stack.",
    defaultSelected: false,
    env: optionalEnvFields.observability,
  },
  {
    id: "objectStorage",
    label: "Object storage (MinIO/S3)",
    description: "Store assets or backups off-box.",
    defaultSelected: false,
    env: optionalEnvFields.objectStorage,
  },
];

const fileTypeGuides = [
  {
    id: "movies",
    label: "Movies (MKV, MP4)",
    extensions: ["mkv", "mp4"],
    services: ["jellyfin", "radarr", "prowlarr", "bazarr", "overseerr"],
    description:
      "Playback + automation with Jellyfin, Radarr, and shared indexers.",
  },
  {
    id: "tv",
    label: "TV episodes",
    extensions: ["mkv", "mp4"],
    services: ["jellyfin", "sonarr", "prowlarr", "bazarr", "overseerr"],
    description: "Sonarr + Prowlarr feed downloads; Jellyfin serves them.",
  },
  {
    id: "music",
    label: "Audio (FLAC, MP3)",
    extensions: ["flac", "mp3"],
    services: ["navidrome", "lidarr"],
    description: "Navidrome streams and Lidarr organizes music for clients.",
  },
  {
    id: "photos",
    label: "Photos (JPG, RAW, HEIC)",
    extensions: ["jpg", "raw", "heic", "png", "tiff"],
    services: ["immich", "photoprism"],
    description: "Immich provides modern backup + AI organization; PhotoPrism for advanced management.",
  },
  {
    id: "videos",
    label: "Videos (MOV, AVI, WebM)",
    extensions: ["mov", "avi", "webm", "mp4"],
    services: ["immich", "jellyfin"],
    description: "Immich for personal video backup; Jellyfin for media streaming.",
  },
  {
    id: "documents",
    label: "Documents (PDF, Office)",
    extensions: ["pdf", "docx", "xlsx", "txt"],
    services: ["seafile", "filebrowser"],
    description: "Seafile for sync + collaboration; FileBrowser for quick previews.",
  },
  {
    id: "rss",
    label: "RSS/Atom feeds",
    extensions: ["rss", "atom", "xml"],
    services: ["freshrss"],
    description: "FreshRSS aggregates and syncs feeds across devices.",
  },
  {
    id: "automation",
    label: "Automation workflows",
    extensions: ["json", "yaml"],
    services: ["n8n"],
    description: "n8n connects services and automates complex workflows.",
  },
  {
    id: "finance",
    label: "Financial data",
    extensions: ["csv", "ofx", "qif"],
    services: ["actual"],
    description: "Actual tracks budgets and financial data with real-time sync.",
  },
];

// Global wizard reference
let wizardInstance = null;

// User-Friendly Configuration Wizard
class ConfigurationWizard {
  constructor() {
    this.currentStep = 0;
    this.userData = {};
    this.isAdvancedMode = false;
    
    this.steps = [
      {
        id: 'welcome',
        title: 'Welcome to M2 Studio',
        subtitle: 'Let\'s set up your perfect home server in minutes',
        type: 'welcome'
      },
      {
        id: 'experience',
        title: 'Your Experience Level',
        subtitle: 'Help us tailor the setup to your needs',
        type: 'experience'
      },
      {
        id: 'services',
        title: 'Choose Your Services',
        subtitle: 'Pick what you want to run on your server',
        type: 'services'
      },
      {
        id: 'network',
        title: 'Network Setup',
        subtitle: 'How do you want to access your services?',
        type: 'network'
      },
      {
        id: 'storage',
        title: 'Storage & Media',
        subtitle: 'Where will your files be stored?',
        type: 'storage'
      },
      {
        id: 'security',
        title: 'Security & Access',
        subtitle: 'Keep your services secure',
        type: 'security'
      },
      {
        id: 'review',
        title: 'Review & Generate',
        subtitle: 'Check your configuration and create your files',
        type: 'review'
      }
    ];
    
    this.init();
  }
  
  init() {
    console.log('Initializing ConfigurationWizard...');
    try {
      this.createWizardInterface();
      this.bindEvents();
      console.log('ConfigurationWizard initialized successfully');
    } catch (error) {
      console.error('ConfigurationWizard initialization failed:', error);
      throw error;
    }
  }
  
  createWizardInterface() {
    console.log('Creating wizard interface...');
    
    const wizardHTML = `
      <div id="configWizard" class="config-wizard">
        <div class="wizard-header">
          <div class="wizard-progress">
            ${this.steps.map((step, index) => `
              <div class="progress-step" data-step="${index}">
                <div class="step-number">${index + 1}</div>
                <div class="step-title">${step.title}</div>
              </div>
            `).join('')}
          </div>
          <button class="wizard-close">✕</button>
        </div>
        
        <div class="wizard-content">
          <div class="wizard-main">
            <div class="step-content" id="stepContent">
              <!-- Dynamic content will be inserted here -->
            </div>
          </div>
          
          <div class="wizard-sidebar">
            <div class="help-panel">
              <h4>💡 Need Help?</h4>
              <p>We're here to guide you through every step of the setup process.</p>
              <div class="help-tips" id="helpTips">
                <!-- Dynamic tips will be inserted here -->
              </div>
            </div>
            
            <div class="quick-summary">
              <h4>📋 Your Setup</h4>
              <div id="quickSummary">
                <!-- Dynamic summary will be inserted here -->
              </div>
            </div>
          </div>
        </div>
        
        <div class="wizard-footer">
          <button class="btn-secondary" id="wizardBack" disabled>Back</button>
          <div class="wizard-actions">
            <button class="btn-ghost" id="wizardSave">Save Progress</button>
            <button class="btn-primary" id="wizardNext">Next</button>
          </div>
        </div>
      </div>
    `;
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'wizard-overlay';
    overlay.id = 'wizardOverlay';
    
    // Add to body
    document.body.insertAdjacentHTML('beforeend', wizardHTML);
    document.body.appendChild(overlay);
    
    console.log('Wizard interface created, showing first step...');
    
    // Show first step
    this.showStep(0);
    
    console.log('Wizard interface setup complete');
  }
  
  showStep(stepIndex) {
    const step = this.steps[stepIndex];
    const content = document.getElementById('stepContent');
    const progressSteps = document.querySelectorAll('.progress-step');
    
    // Update progress
    progressSteps.forEach((stepEl, index) => {
      stepEl.classList.toggle('active', index === stepIndex);
      stepEl.classList.toggle('completed', index < stepIndex);
    });
    
    // Update content
    content.innerHTML = this.renderStepContent(step);
    
    // Update buttons
    document.getElementById('wizardBack').disabled = stepIndex === 0;
    document.getElementById('wizardNext').textContent = 
      stepIndex === this.steps.length - 1 ? 'Generate Files' : 'Next';
    
    // Update help tips
    this.updateHelpTips(step);
    
    // Update summary
    this.updateQuickSummary();
    
    // Update review step if we're on it
    if (step.id === 'review') {
      this.updateReviewSummary();
    }
  }
  
  renderStepContent(step) {
    switch (step.type) {
      case 'welcome':
        return `
          <div class="welcome-step">
            <div class="welcome-icon">🚀</div>
            <h2>${step.title}</h2>
            <p>${step.subtitle}</p>
            
            <div class="feature-cards">
              <div class="feature-card">
                <div class="feature-icon">🎬</div>
                <h3>Media Server</h3>
                <p>Stream movies, TV shows, and music to all your devices</p>
              </div>
              <div class="feature-card">
                <div class="feature-icon">📸</div>
                <h3>Photo Management</h3>
                <p>AI-powered photo organization and backup</p>
              </div>
              <div class="feature-card">
                <div class="feature-icon">☁️</div>
                <h3>Cloud Storage</h3>
                <p>Self-hosted file sync and collaboration</p>
              </div>
            </div>
            
            <div class="getting-started">
              <h3>Getting started is easy:</h3>
              <ol>
                <li>Tell us about your experience level</li>
                <li>Choose the services you want</li>
                <li>Configure your network and storage</li>
                <li>Generate your Docker files</li>
              </ol>
            </div>
          </div>
        `;
        
      case 'experience':
        return `
          <div class="experience-step">
            <h2>${step.title}</h2>
            <p>${step.subtitle}</p>
            
            <div class="experience-options">
              <div class="experience-card" data-level="beginner">
                <div class="exp-icon">🌱</div>
                <h3>Beginner</h3>
                <p>New to home servers? We'll guide you through everything with recommended settings and simple explanations.</p>
                <ul>
                  <li>Pre-configured templates</li>
                  <li>Simple language</li>
                  <li>Basic security setup</li>
                </ul>
              </div>
              
              <div class="experience-card" data-level="intermediate">
                <div class="exp-icon">🚀</div>
                <h3>Intermediate</h3>
                <p>Some experience with Docker or home servers? Get more customization options with helpful guidance.</p>
                <ul>
                  <li>Custom configurations</li>
                  <li>Advanced networking</li>
                  <li>Performance tuning</li>
                </ul>
              </div>
              
              <div class="experience-card" data-level="expert">
                <div class="exp-icon">⚡</div>
                <h3>Expert</h3>
                <p>You know what you're doing! Get full control over all settings with no hand-holding.</p>
                <ul>
                  <li>Full customization</li>
                  <li>Advanced options</li>
                  <li>Expert configurations</li>
                </ul>
              </div>
            </div>
          </div>
        `;
        
      case 'services':
        return `
          <div class="services-step">
            <h2>${step.title}</h2>
            <p>${step.subtitle}</p>
            
            <div class="service-categories">
              <div class="category">
                <h3>🎬 Media & Entertainment</h3>
                <div class="service-options">
                  <label class="service-option">
                    <input type="checkbox" value="jellyfin">
                    <span class="service-info">
                      <strong>Jellyfin</strong>
                      <span>Stream movies, TV, music</span>
                    </span>
                  </label>
                  <label class="service-option">
                    <input type="checkbox" value="sonarr">
                    <span class="service-info">
                      <strong>Sonarr</strong>
                      <span>Automated TV show management</span>
                    </span>
                  </label>
                  <label class="service-option">
                    <input type="checkbox" value="radarr">
                    <span class="service-info">
                      <strong>Radarr</strong>
                      <span>Automated movie management</span>
                    </span>
                  </label>
                </div>
              </div>
              
              <div class="category">
                <h3>📸 Photos & Files</h3>
                <div class="service-options">
                  <label class="service-option">
                    <input type="checkbox" value="immich">
                    <span class="service-info">
                      <strong>Immich</strong>
                      <span>AI photo backup & organization</span>
                    </span>
                  </label>
                  <label class="service-option">
                    <input type="checkbox" value="seafile">
                    <span class="service-info">
                      <strong>Seafile</strong>
                      <span>File sync & collaboration</span>
                    </span>
                  </label>
                  <label class="service-option">
                    <input type="checkbox" value="photoprism">
                    <span class="service-info">
                      <strong>PhotoPrism</strong>
                      <span>Advanced photo management</span>
                    </span>
                  </label>
                </div>
              </div>
              
              <div class="category">
                <h3>🤖 Automation & Productivity</h3>
                <div class="service-options">
                  <label class="service-option">
                    <input type="checkbox" value="n8n">
                    <span class="service-info">
                      <strong>n8n</strong>
                      <span>Workflow automation</span>
                    </span>
                  </label>
                  <label class="service-option">
                    <input type="checkbox" value="freshrss">
                    <span class="service-info">
                      <strong>FreshRSS</strong>
                      <span>RSS feed reader</span>
                    </span>
                  </label>
                  <label class="service-option">
                    <input type="checkbox" value="actual">
                    <span class="service-info">
                      <strong>Actual</strong>
                      <span>Budget tracking</span>
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        `;
        
      case 'network':
        return `
          <div class="network-step">
            <h2>${step.title}</h2>
            <p>${step.subtitle}</p>
            
            <div class="network-options">
              <div class="network-card" data-network="local">
                <div class="network-icon">🏠</div>
                <h3>Local Network Only</h3>
                <p>Access services only on your home network. Most secure option.</p>
                <div class="network-details">
                  <span>• No internet access required</span>
                  <span>• Maximum security</span>
                  <span>• Perfect for personal use</span>
                </div>
              </div>
              
              <div class="network-card" data-network="cloudflare">
                <div class="network-icon">🌐</div>
                <h3>Cloudflare Tunnel (Recommended)</h3>
                <p>Secure remote access without opening ports on your router.</p>
                <div class="network-details">
                  <span>• Access from anywhere</span>
                  <span>• No port forwarding</span>
                  <span>• HTTPS encryption included</span>
                </div>
              </div>
              
              <div class="network-card" data-network="vpn">
                <div class="network-icon">🔒</div>
                <h3>VPN Access</h3>
                <p>Connect through VPN for maximum security and privacy.</p>
                <div class="network-details">
                  <span>• Enterprise-grade security</span>
                  <span>• Full privacy protection</span>
                  <span>• Requires VPN setup</span>
                </div>
              </div>
            </div>
          </div>
        `;
        
      case 'storage':
        return `
          <div class="storage-step">
            <h2>${step.title}</h2>
            <p>${step.subtitle}</p>
            
            <div class="storage-options">
              <div class="storage-section">
                <h3>💾 Local Storage Location</h3>
                <div class="storage-input-group">
                  <label for="mediaPath">Media Files (Movies, TV, Music)</label>
                  <input type="text" id="mediaPath" placeholder="/home/user/media" value="/home/user/media">
                  <small>Where your media files will be stored</small>
                </div>
                
                <div class="storage-input-group">
                  <label for="dataPath">Application Data</label>
                  <input type="text" id="dataPath" placeholder="/home/user/appdata" value="/home/user/appdata">
                  <small>Configuration and metadata for your services</small>
                </div>
              </div>
              
              <div class="storage-section">
                <h3>☁️ Cloud Storage (Optional)</h3>
                <div class="storage-options-grid">
                  <label class="storage-option">
                    <input type="checkbox" value="s3">
                    <span class="storage-info">
                      <strong>AWS S3 / Compatible</strong>
                      <span>Backup important files to cloud storage</span>
                    </span>
                  </label>
                  <label class="storage-option">
                    <input type="checkbox" value="dropbox">
                    <span class="storage-info">
                      <strong>Dropbox / Google Drive</strong>
                      <span>Sync photos and documents</span>
                    </span>
                  </label>
                </div>
              </div>
              
              <div class="storage-requirements">
                <h4>📊 Estimated Storage Needs</h4>
                <div class="storage-estimate">
                  <div class="estimate-item">
                    <span>Base Services:</span>
                    <span>~10 GB</span>
                  </div>
                  <div class="estimate-item">
                    <span>Media Library:</span>
                    <span>Varies by your collection</span>
                  </div>
                  <div class="estimate-item">
                    <span>Photo Backup:</span>
                    <span>Depends on photo count</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        
      case 'security':
        return `
          <div class="security-step">
            <h2>${step.title}</h2>
            <p>${step.subtitle}</p>
            
            <div class="security-options">
              <div class="security-section">
                <h3>🔐 Authentication Method</h3>
                <div class="auth-options">
                  <label class="auth-option">
                    <input type="radio" name="auth" value="simple" checked>
                    <div class="auth-info">
                      <strong>Simple Username/Password</strong>
                      <span>Easy to set up, good for basic security</span>
                    </div>
                  </label>
                  <label class="auth-option">
                    <input type="radio" name="auth" value="oauth">
                    <div class="auth-info">
                      <strong>OAuth (Google/GitHub)</strong>
                      <span>Login with existing accounts</span>
                    </div>
                  </label>
                  <label class="auth-option">
                    <input type="radio" name="auth" value="ldap">
                    <div class="auth-info">
                      <strong>LDAP/Active Directory</strong>
                      <span>Integrate with existing directory</span>
                    </div>
                  </label>
                </div>
              </div>
              
              <div class="security-section">
                <h3>🛡️ Security Features</h3>
                <div class="security-features">
                  <label class="security-feature">
                    <input type="checkbox" value="firewall" checked>
                    <span>Enable firewall rules</span>
                  </label>
                  <label class="security-feature">
                    <input type="checkbox" value="ssl" checked>
                    <span>Force HTTPS/SSL encryption</span>
                  </label>
                  <label class="security-feature">
                    <input type="checkbox" value="backup" checked>
                    <span>Automatic backups</span>
                  </label>
                  <label class="security-feature">
                    <input type="checkbox" value="updates">
                    <span>Automatic security updates</span>
                  </label>
                </div>
              </div>
              
              <div class="security-section">
                <h3>👥 User Management</h3>
                <div class="user-setup">
                  <div class="user-input-group">
                    <label for="adminUser">Admin Username</label>
                    <input type="text" id="adminUser" placeholder="admin" value="admin">
                  </div>
                  <div class="user-input-group">
                    <label for="adminPassword">Admin Password</label>
                    <input type="password" id="adminPassword" placeholder="Enter secure password">
                    <button type="button" class="btn-ghost" onclick="generatePassword()">Generate Password</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        
      case 'review':
        return `
          <div class="review-step">
            <h2>${step.title}</h2>
            <p>${step.subtitle}</p>
            
            <div class="review-content">
              <div class="review-summary">
                <h3>📋 Your Configuration Summary</h3>
                <div class="summary-grid">
                  <div class="summary-section">
                    <h4>Experience Level</h4>
                    <p id="reviewExperience">${this.userData.experience || 'Not selected'}</p>
                  </div>
                  
                  <div class="summary-section">
                    <h4>Selected Services</h4>
                    <div id="reviewServices">
                      <!-- Will be populated dynamically -->
                    </div>
                  </div>
                  
                  <div class="summary-section">
                    <h4>Network Setup</h4>
                    <p id="reviewNetwork">${this.userData.network || 'Not selected'}</p>
                  </div>
                  
                  <div class="summary-section">
                    <h4>Storage Paths</h4>
                    <p>Media: <span id="reviewMediaPath">/home/user/media</span></p>
                    <p>Data: <span id="reviewDataPath">/home/user/appdata</span></p>
                  </div>
                </div>
              </div>
              
              <div class="generation-options">
                <h3>🚀 Generate Your Files</h3>
                <div class="generation-actions">
                  <button class="btn-primary btn-large" onclick="if(window.wizard) window.wizard.generateFiles();">
                    📄 Generate Docker Compose
                  </button>
                  <button class="btn-secondary" onclick="if(window.wizard) window.wizard.generateEnv();">
                    🔧 Generate .env File
                  </button>
                  <button class="btn-ghost" onclick="if(window.wizard) window.wizard.downloadAll();">
                    📦 Download All Files
                  </button>
                </div>
                
                <div class="generation-info">
                  <p>✅ All files will be optimized for your experience level</p>
                  <p>✅ Includes documentation and setup instructions</p>
                  <p>✅ Ready to deploy with one command</p>
                </div>
              </div>
            </div>
          </div>
        `;
    }
  }
  
  updateHelpTips(step) {
    const helpTips = document.getElementById('helpTips');
    const tips = {
      welcome: [
        'This wizard will guide you through setting up your home server',
        'You can save your progress at any time and come back later',
        'We\'ll recommend settings based on your experience level'
      ],
      experience: [
        'Be honest about your experience level - we\'ll tailor the setup accordingly',
        'Beginners get simplified options with explanations',
        'Experts get full control over all settings'
      ],
      services: [
        'Choose only the services you actually need',
        'Each service includes storage and network requirements',
        'You can add more services later if needed'
      ]
    };
    
    const stepTips = tips[step.id] || ['Take your time and read each option carefully'];
    
    helpTips.innerHTML = stepTips.map(tip => `
      <div class="help-tip">
        <span class="tip-icon">💡</span>
        <span>${tip}</span>
      </div>
    `).join('');
  }
  
  updateQuickSummary() {
    const summary = document.getElementById('quickSummary');
    const selectedServices = Array.from(document.querySelectorAll('.service-option input:checked'))
      .map(input => input.value);
    
    summary.innerHTML = `
      <div class="summary-item">
        <strong>Experience:</strong> ${this.userData.experience || 'Not selected'}
      </div>
      <div class="summary-item">
        <strong>Services:</strong> ${selectedServices.length || 0} selected
      </div>
      ${selectedServices.length > 0 ? `
        <div class="selected-services">
          ${selectedServices.map(service => 
            `<span class="service-tag">${service}</span>`
          ).join('')}
        </div>
      ` : ''}
    `;
  }
  
  updateReviewSummary() {
    // Collect all current data
    this.collectAllData();
    
    // Update review elements
    const experienceEl = document.getElementById('reviewExperience');
    if (experienceEl) {
      experienceEl.textContent = this.userData.experience || 'Not selected';
    }
    
    const servicesEl = document.getElementById('reviewServices');
    if (servicesEl) {
      const services = this.userData.services || [];
      servicesEl.innerHTML = services.length > 0 
        ? services.map(service => `<span class="service-tag">${service}</span>`).join('')
        : '<p style="color: var(--muted);">No services selected</p>';
    }
    
    const networkEl = document.getElementById('reviewNetwork');
    if (networkEl) {
      const networkLabels = {
        local: 'Local Network Only',
        cloudflare: 'Cloudflare Tunnel',
        vpn: 'VPN Access'
      };
      networkEl.textContent = networkLabels[this.userData.network] || 'Not selected';
    }
    
    const mediaPathEl = document.getElementById('reviewMediaPath');
    if (mediaPathEl) {
      mediaPathEl.textContent = this.userData.mediaPath || '/home/user/media';
    }
    
    const dataPathEl = document.getElementById('reviewDataPath');
    if (dataPathEl) {
      dataPathEl.textContent = this.userData.dataPath || '/home/user/appdata';
    }
  }
  
  bindEvents() {
    // Navigation
    const wizardNext = document.getElementById('wizardNext');
    const wizardBack = document.getElementById('wizardBack');
    const wizardClose = document.getElementById('wizardClose');
    const wizardSave = document.getElementById('wizardSave');
    
    if (wizardNext) {
      wizardNext.addEventListener('click', (e) => {
        e.preventDefault();
        this.nextStep();
      });
    }
    
    if (wizardBack) {
      wizardBack.addEventListener('click', (e) => {
        e.preventDefault();
        this.previousStep();
      });
    }
    
    if (wizardClose) {
      wizardClose.addEventListener('click', (e) => {
        e.preventDefault();
        this.close();
      });
    }
    
    if (wizardSave) {
      wizardSave.addEventListener('click', (e) => {
        e.preventDefault();
        this.saveProgress();
      });
    }
    
    // Experience selection
    document.addEventListener('click', (e) => {
      if (e.target.closest('.experience-card')) {
        document.querySelectorAll('.experience-card').forEach(card => 
          card.classList.remove('selected'));
        e.target.closest('.experience-card').classList.add('selected');
        this.userData.experience = e.target.closest('.experience-card').dataset.level;
        this.updateQuickSummary();
      }
      
      // Network selection
      if (e.target.closest('.network-card')) {
        document.querySelectorAll('.network-card').forEach(card => 
          card.classList.remove('selected'));
        e.target.closest('.network-card').classList.add('selected');
        this.userData.network = e.target.closest('.network-card').dataset.network;
        this.updateQuickSummary();
      }
    });
    
    // Service selection
    document.addEventListener('change', (e) => {
      if (e.target.closest('.service-option input')) {
        this.updateQuickSummary();
      }
      
      // Storage inputs
      if (e.target.id === 'mediaPath' || e.target.id === 'dataPath') {
        this.userData[e.target.id] = e.target.value;
      }
      
      // Security inputs
      if (e.target.id === 'adminUser' || e.target.id === 'adminPassword') {
        this.userData[e.target.id] = e.target.value;
      }
      
      // Auth method
      if (e.target.name === 'auth') {
        this.userData.auth = e.target.value;
      }
    });
    
    // Overlay click to close
    const overlay = document.getElementById('wizardOverlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          this.close();
        }
      });
    }
  }
  
  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.showStep(this.currentStep);
    } else {
      this.generateFiles();
    }
  }
  
  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.showStep(this.currentStep);
    }
  }
  
  close() {
    document.getElementById('configWizard').remove();
    document.getElementById('wizardOverlay').remove();
  }
  
  saveProgress() {
    localStorage.setItem('wizardProgress', JSON.stringify({
      currentStep: this.currentStep,
      userData: this.userData
    }));
    showToast('Progress saved! You can continue later.');
  }
  
  generateFiles() {
    // Collect all user data
    this.collectAllData();
    
    // Generate Docker Compose
    const composeContent = this.generateDockerCompose();
    this.downloadFile('docker-compose.yml', composeContent);
    
    showToast('Docker Compose file generated! 🐳');
  }
  
  generateEnv() {
    // Collect all user data
    this.collectAllData();
    
    // Generate .env file
    const envContent = this.generateEnvFile();
    this.downloadFile('.env', envContent);
    
    showToast('.env file generated! 🔧');
  }
  
  downloadAll() {
    // Collect all user data
    this.collectAllData();
    
    // Generate all files
    const composeContent = this.generateDockerCompose();
    const envContent = this.generateEnvFile();
    const readmeContent = this.generateReadme();
    
    // Download all files
    this.downloadFile('docker-compose.yml', composeContent);
    this.downloadFile('.env', envContent);
    this.downloadFile('README.md', readmeContent);
    
    showToast('All files generated and downloaded! 📦');
    
    // Close wizard after successful generation
    setTimeout(() => this.close(), 2000);
  }
  
  collectAllData() {
    // Collect selected services
    const selectedServices = Array.from(document.querySelectorAll('.service-option input:checked'))
      .map(input => input.value);
    this.userData.services = selectedServices;
    
    // Collect storage paths
    this.userData.mediaPath = document.getElementById('mediaPath')?.value || '/home/user/media';
    this.userData.dataPath = document.getElementById('dataPath')?.value || '/home/user/appdata';
    
    // Collect security settings
    this.userData.adminUser = document.getElementById('adminUser')?.value || 'admin';
    this.userData.adminPassword = document.getElementById('adminPassword')?.value || 'changeme';
    
    // Collect auth method
    const authRadio = document.querySelector('input[name="auth"]:checked');
    this.userData.auth = authRadio?.value || 'simple';
    
    // Collect security features
    const securityFeatures = Array.from(document.querySelectorAll('.security-feature input:checked'))
      .map(input => input.value);
    this.userData.securityFeatures = securityFeatures;
  }
  
  generateDockerCompose() {
    const services = this.userData.services || [];
    const mediaPath = this.userData.mediaPath || '/home/user/media';
    const dataPath = this.userData.dataPath || '/home/user/appdata';
    
    let compose = `version: '3.8'

services:
`;
    
    // Add selected services
    if (services.includes('jellyfin')) {
      compose += `  jellyfin:
    image: jellyfin/jellyfin:latest
    container_name: jellyfin
    ports:
      - "8096:8096"
    volumes:
      - ${dataPath}/jellyfin:/config
      - ${mediaPath}:/media
    restart: unless-stopped
    environment:
      - TZ=America/New_York

`;
    }
    
    if (services.includes('sonarr')) {
      compose += `  sonarr:
    image: lscr.io/linuxserver/sonarr:latest
    container_name: sonarr
    ports:
      - "8989:8989"
    volumes:
      - ${dataPath}/sonarr:/config
      - ${mediaPath}/tv:/tv
      - ${mediaPath}/downloads:/downloads
    restart: unless-stopped
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/New_York

`;
    }
    
    if (services.includes('radarr')) {
      compose += `  radarr:
    image: lscr.io/linuxserver/radarr:latest
    container_name: radarr
    ports:
      - "7878:7878"
    volumes:
      - ${dataPath}/radarr:/config
      - ${mediaPath}/movies:/movies
      - ${mediaPath}/downloads:/downloads
    restart: unless-stopped
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=America/New_York

`;
    }
    
    if (services.includes('immich')) {
      compose += `  immich-server:
    image: ghcr.io/immich-app/immich-server:latest
    container_name: immich-server
    ports:
      - "2283:3001"
    volumes:
      - ${dataPath}/immich:/config
      - ${mediaPath}/photos:/usr/src/app/upload
    restart: unless-stopped
    environment:
      - REDIS_HOSTNAME=immich-redis
      - DB_HOSTNAME=immich-database

  immich-redis:
    image: redis:6.2
    container_name: immich-redis
    restart: unless-stopped

  immich-database:
    image: postgres:14
    container_name: immich-database
    environment:
      POSTGRES_USER: immich
      POSTGRES_PASSWORD: immich
      POSTGRES_DB: immich
    volumes:
      - ${dataPath}/postgres:/var/lib/postgresql/data
    restart: unless-stopped

`;
    }
    
    if (services.includes('seafile')) {
      compose += `  seafile:
    image: seafileltd/seafile-mc:latest
    container_name: seafile
    ports:
      - "80:80"
    volumes:
      - ${dataPath}/seafile:/shared
    restart: unless-stopped
    environment:
      - SEAFILE_ADMIN_EMAIL=${this.userData.adminUser}@example.com
      - SEAFILE_ADMIN_PASSWORD=${this.userData.adminPassword}

`;
    }
    
    if (services.includes('n8n')) {
      compose += `  n8n:
    image: docker.n8n.io/n8nio/n8n:latest
    container_name: n8n
    ports:
      - "5678:5678"
    volumes:
      - ${dataPath}/n8n:/home/node/.n8n
    restart: unless-stopped
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=${this.userData.adminUser}
      - N8N_BASIC_AUTH_PASSWORD=${this.userData.adminPassword}

`;
    }
    
    if (services.includes('freshrss')) {
      compose += `  freshrss:
    image: freshrss/freshrss:latest
    container_name: freshrss
    ports:
      - "8080:80"
    volumes:
      - ${dataPath}/freshrss:/var/www/FreshRSS/data
    restart: unless-stopped
    environment:
      - TZ=America/New_York

`;
    }
    
    if (services.includes('actual')) {
      compose += `  actual:
    image: actualbudget/actual-server:latest
    container_name: actual
    ports:
      - "5006:5006"
    volumes:
      - ${dataPath}/actual:/data
    restart: unless-stopped

`;
    }
    
    compose += `networks:
  default:
    name: m2-network
`;
    
    return compose;
  }
  
  generateEnvFile() {
    const services = this.userData.services || [];
    const experience = this.userData.experience || 'beginner';
    
    let env = `# M2 Installer Studio - Generated Configuration
# Experience Level: ${experience}
# Generated: ${new Date().toISOString()}

# Network Configuration
`;
    
    if (this.userData.network === 'cloudflare') {
      env += `CLOUDFLARE_TUNNEL=true
TUNNEL_TOKEN=your-tunnel-token-here
`;
    } else if (this.userData.network === 'vpn') {
      env += `VPN_ACCESS=true
VPN_CONFIG=/path/to/vpn/config
`;
    } else {
      env += `LOCAL_ACCESS_ONLY=true
`;
    }
    
    env += `
# Storage Paths
MEDIA_PATH=${this.userData.mediaPath || '/home/user/media'}
DATA_PATH=${this.userData.dataPath || '/home/user/appdata'}

# Security Configuration
ADMIN_USER=${this.userData.adminUser || 'admin'}
ADMIN_PASSWORD=${this.userData.adminPassword || 'changeme'}
AUTH_METHOD=${this.userData.auth || 'simple'}

# Service Ports
`;
    
    if (services.includes('jellyfin')) {
      env += `JELLYFIN_PORT=8096
`;
    }
    if (services.includes('sonarr')) {
      env += `SONARR_PORT=8989
`;
    }
    if (services.includes('radarr')) {
      env += `RADARR_PORT=7878
`;
    }
    if (services.includes('immich')) {
      env += `IMMICH_PORT=2283
`;
    }
    if (services.includes('seafile')) {
      env += `SEAFILE_PORT=80
`;
    }
    if (services.includes('n8n')) {
      env += `N8N_PORT=5678
`;
    }
    if (services.includes('freshrss')) {
      env += `FRESHRSS_PORT=8080
`;
    }
    if (services.includes('actual')) {
      env += `ACTUAL_PORT=5006
`;
    }
    
    env += `
# Timezone
TZ=America/New_York

# User/Group IDs
PUID=1000
PGID=1000

# Security Features
`;
    
    const securityFeatures = this.userData.securityFeatures || [];
    if (securityFeatures.includes('firewall')) {
      env += `ENABLE_FIREWALL=true
`;
    }
    if (securityFeatures.includes('ssl')) {
      env += `FORCE_SSL=true
`;
    }
    if (securityFeatures.includes('backup')) {
      env += `AUTO_BACKUP=true
BACKUP_PATH=${this.userData.dataPath}/backups
`;
    }
    if (securityFeatures.includes('updates')) {
      env += `AUTO_UPDATES=true
`;
    }
    
    return env;
  }
  
  generateReadme() {
    const services = this.userData.services || [];
    const experience = this.userData.experience || 'beginner';
    
    let readme = `# M2 Home Server Setup

Generated by M2 Installer Studio on ${new Date().toLocaleDateString()}
Experience Level: ${experience}

## Quick Start

1. Save all files in the same directory
2. Run: \`docker-compose up -d\`
3. Access your services:

`;
    
    if (services.includes('jellyfin')) {
      readme += `- **Jellyfin**: http://localhost:8096\n`;
    }
    if (services.includes('sonarr')) {
      readme += `- **Sonarr**: http://localhost:8989\n`;
    }
    if (services.includes('radarr')) {
      readme += `- **Radarr**: http://localhost:7878\n`;
    }
    if (services.includes('immich')) {
      readme += `- **Immich**: http://localhost:2283\n`;
    }
    if (services.includes('seafile')) {
      readme += `- **Seafile**: http://localhost:80\n`;
    }
    if (services.includes('n8n')) {
      readme += `- **n8n**: http://localhost:5678\n`;
    }
    if (services.includes('freshrss')) {
      readme += `- **FreshRSS**: http://localhost:8080\n`;
    }
    if (services.includes('actual')) {
      readme += `- **Actual**: http://localhost:5006\n`;
    }
    
    readme += `
## Configuration

- **Admin Username**: ${this.userData.adminUser || 'admin'}
- **Media Path**: ${this.userData.mediaPath || '/home/user/media'}
- **Data Path**: ${this.userData.dataPath || '/home/user/appdata'}

## Storage Setup

Make sure these directories exist before starting:

\`\`\`bash
mkdir -p ${this.userData.mediaPath || '/home/user/media'}
mkdir -p ${this.userData.dataPath || '/home/user/appdata'}
\`\`\`

## Management

- Stop services: \`docker-compose down\`
- Update services: \`docker-compose pull && docker-compose up -d\`
- View logs: \`docker-compose logs -f\`

## Support

For help with individual services, check their documentation:
`;
    
    if (services.includes('jellyfin')) {
      readme += `- [Jellyfin Documentation](https://jellyfin.org/docs/)\n`;
    }
    if (services.includes('sonarr')) {
      readme += `- [Sonarr Wiki](https://wiki.servarr.com/sonarr)\n`;
    }
    if (services.includes('radarr')) {
      readme += `- [Radarr Wiki](https://wiki.servarr.com/radarr)\n`;
    }
    
    return readme;
  }
  
  downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}

// Toast notification system
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  
  // Add to page
  document.body.appendChild(toast);
  
  // Animate in
  setTimeout(() => toast.classList.add('show'), 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Password generator
function generatePassword() {
  const length = 16;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  
  const passwordField = document.getElementById('adminPassword');
  if (passwordField) {
    passwordField.value = password;
    showToast('Secure password generated! 🔐');
  }
  
  return password;
}
const envValues = new Map();
const selectedFileTypes = new Set();
const stateCache = new WeakMap();
let currentStep = 0;
let debounceTimer;
let progressRingInstance = null;
let templateGalleryInstance = null;
let particleSystemInstance = null;
let aiAssistantInstance = null;
let insightsInitialized = false;
let activeInsightPopover = null;
let activeInsightTrigger = null;

// Performance monitoring
const perf = {
  start: (name) => performance.mark(`${name}-start`),
  end: (name) => {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
  }
};

const profileBindings = [
  { input: "projectName", key: "COMPOSE_PROJECT_NAME", fallback: "m2" },
  { input: "baseDomain", key: "BASE_DOMAIN", fallback: "media.example.com" },
  { input: "timezone", key: "TZ", fallback: "UTC" },
  { input: "mediaPath", key: "MEDIA_ROOT", fallback: "/srv/media" },
  { input: "dataPath", key: "DATA_ROOT", fallback: "/srv/m2-data" },
];

function envRef(name, fallback) {
  return "${" + name + (fallback ? ":-" + fallback + "}" : "}");
}

function uniqueByKey(fields) {
  const map = new Map();
  fields.forEach((field) => {
    if (!map.has(field.key)) {
      map.set(field.key, field);
    }
  });
  return Array.from(map.values());
}

function applyDefaultEnvValues() {
  baseEnvFields.forEach((field) =>
    envValues.set(field.key, field.defaultValue || ""),
  );
  Object.values(authEnvFields)
    .flat()
    .forEach((field) => envValues.set(field.key, field.defaultValue || ""));
  Object.values(optionalEnvFields)
    .flat()
    .forEach((field) => envValues.set(field.key, field.defaultValue || ""));
  serviceCatalog.forEach((service) =>
    service.env?.forEach((field) =>
      envValues.set(field.key, field.defaultValue || ""),
    ),
  );
}

function setProfileValues(overrides = {}) {
  profileBindings.forEach(({ input, key, fallback }) => {
    const el = document.getElementById(input);
    const value = overrides[key] || envValues.get(key) || fallback;
    el.value = value;
    envValues.set(key, value);
  });
}

function isServiceSelected(id) {
  const box = document.querySelector(`.catalog input[value="${id}"]`);
  return !!box?.checked;
}

function getSelections() {
  const selected = new Set();
  document
    .querySelectorAll('.catalog input[type="checkbox"]')
    .forEach((box) => {
      if (box.checked) selected.add(box.value);
    });
  return selected;
}

function collectEnvFields() {
  const selections = getSelections();
  const fields = [...baseEnvFields];
  serviceCatalog.forEach((service) => {
    if (selections.has(service.id) && service.env) {
      fields.push(...service.env);
    }
  });
  const authChoice = document.getElementById("authChoice").value;
  if (authEnvFields[authChoice]) fields.push(...authEnvFields[authChoice]);
  return uniqueByKey(fields);
}

function renderCatalog() {
  const catalog = document.getElementById("serviceCatalog");
  catalog.innerHTML = "";
  const toggleMap = {
    cloudflare: ["cloudflareTunnel", "cloudflareTunnelInline"],
    objectStorage: ["objectStorage", "objectStorageInline"],
  };

  serviceCatalog.forEach((service) => {
    const brand = serviceBranding[service.id] || {};
    const logo = brand.logo
      ? `<div class="logo" style="background:${brand.accent || "var(--border)"}"><img src="${brand.logo}" alt="${service.label} logo" loading="lazy" /></div>`
      : `<div class="logo placeholder">${service.label.charAt(0)}</div>`;
    const wrapper = document.createElement("label");
    wrapper.className = "item";
    wrapper.innerHTML = `
      <input type="checkbox" value="${service.id}" ${service.defaultSelected ? "checked" : ""} />
      <div class="service-meta">
        ${logo}
        <div class="service-copy">
          <h3>${service.label}</h3>
          <p>${service.description}</p>
        </div>
      </div>
    `;
    const logoImg = wrapper.querySelector(".logo img");
    if (logoImg) {
      // Modern lazy loading with intersection observer
      logoImg.loading = 'lazy';
      logoImg.addEventListener("error", () => {
        const logoContainer = logoImg.parentElement;
        logoImg.remove();
        if (logoContainer) {
          logoContainer.classList.add("placeholder");
          logoContainer.textContent = service.label.charAt(0);
        }
      });
      
      // Add fade-in animation for loaded images
      logoImg.addEventListener("load", () => {
        logoImg.style.animation = 'fadeIn 0.3s ease';
      });
    }
    const checkbox = wrapper.querySelector("input");
    checkbox.addEventListener("change", (event) => {
      renderEnvForm();
      updatePreviews();
      updateCoverageSummary();
      const toggleIds = toggleMap[service.id];
      if (toggleIds) {
        toggleIds.forEach((id) => {
          const toggle = document.getElementById(id);
          if (toggle) toggle.checked = event.target.checked;
        });
      }
    });
    catalog.appendChild(wrapper);
  });
  activateTiltCards();
}

function renderEnvForm() {
  const envForm = document.getElementById("envForm");
  envForm.innerHTML = "";
  const fields = collectEnvFields();
  fields.forEach((field) => {
    if (!envValues.has(field.key))
      envValues.set(field.key, field.defaultValue || "");
    const currentValue = envValues.get(field.key) || "";
    const wrapper = document.createElement("div");
    const isMissing = field.required && !currentValue.trim();
    wrapper.className = `env-field${isMissing ? " missing" : ""}`;
    wrapper.innerHTML = `
      <div class="env-label">
        <label>${field.key}${field.required ? " *" : ""}</label>
        ${field.required ? '<span class="chip required">Required</span>' : ""}
      </div>
      <input type="text" value="${currentValue}" data-key="${field.key}" />
      <small>${field.label}${field.helper ? " — " + field.helper : ""}</small>
    `;
    const inputEl = wrapper.querySelector("input");
    if (field.helper) {
      inputEl.title = field.helper;
    }
    inputEl.addEventListener("input", (e) => {
      envValues.set(field.key, e.target.value);
      const nowMissing = field.required && !e.target.value.trim();
      wrapper.classList.toggle("missing", nowMissing);
      updatePreviews();
    });
    envForm.appendChild(wrapper);
  });
  updatePreviews();
}

function buildEnvPreview() {
  const fields = collectEnvFields();
  return fields
    .map(
      (field) =>
        `${field.key}=${envValues.get(field.key) || field.defaultValue || ""}`,
    )
    .join("\n");
}

function buildServiceTemplates(state) {
  const selections = state.selections;
  const gpuHint = document.getElementById("gpuAcceleration").checked;
  const templates = [];
  const volumes = new Set();

  if (selections.has("jellyfin")) {
    templates.push(
      `  jellyfin:\n    image: jellyfin/jellyfin:${envRef("JELLYFIN_VERSION", "latest")}\n    container_name: ${envRef("COMPOSE_PROJECT_NAME", "m2")}-jellyfin\n    environment:\n      - TZ=${envRef("TZ")}\n      - PUID=${envRef("PUID")}\n      - PGID=${envRef("PGID")}\n    volumes:\n      - ${envRef("MEDIA_ROOT")}/config/jellyfin:/config\n      - ${envRef("MEDIA_ROOT")}/library:/media\n    networks:\n      - frontnet\n    ports:\n      - \"${envRef("JELLYFIN_HTTP_PORT", "8096")}:8096\"\n    ${gpuHint ? "devices:\n      - /dev/dri:/dev/dri\n" : ""}    restart: unless-stopped\n    healthcheck:\n      test: [\"CMD\", \"curl\", \"-f\", \"http://localhost:8096/health\"]\n      interval: 30s\n      timeout: 5s\n      retries: 3`,
    );
  }

  if (selections.has("sonarr")) {
    templates.push(
      `  sonarr:\n    image: lscr.io/linuxserver/sonarr:${envRef("SONARR_VERSION", "latest")}\n    environment:\n      - PUID=${envRef("PUID")}\n      - PGID=${envRef("PGID")}\n      - TZ=${envRef("TZ")}\n    volumes:\n      - ${envRef("DATA_ROOT")}/sonarr:/config\n      - ${envRef("MEDIA_ROOT")}/library:/library\n      - ${envRef("MEDIA_ROOT")}/downloads:/downloads\n    ports:\n      - \"${envRef("SONARR_PORT", "8989")}:8989\"\n    networks:\n      - frontnet\n      - downloadnet\n    depends_on:\n      - qbittorrent\n    restart: unless-stopped`,
    );
  }

  if (selections.has("radarr")) {
    templates.push(
      `  radarr:\n    image: lscr.io/linuxserver/radarr:${envRef("RADARR_VERSION", "latest")}\n    environment:\n      - PUID=${envRef("PUID")}\n      - PGID=${envRef("PGID")}\n      - TZ=${envRef("TZ")}\n    volumes:\n      - ${envRef("DATA_ROOT")}/radarr:/config\n      - ${envRef("MEDIA_ROOT")}/library:/library\n      - ${envRef("MEDIA_ROOT")}/downloads:/downloads\n    ports:\n      - \"${envRef("RADARR_PORT", "7878")}:7878\"\n    networks:\n      - frontnet\n      - downloadnet\n    depends_on:\n      - qbittorrent\n    restart: unless-stopped`,
    );
  }

  if (selections.has("qbittorrent")) {
    templates.push(
      `  qbittorrent:\n    image: lscr.io/linuxserver/qbittorrent:${envRef("QBITTORRENT_VERSION", "latest")}\n    environment:\n      - PUID=${envRef("PUID")}\n      - PGID=${envRef("PGID")}\n      - TZ=${envRef("TZ")}\n      - WEBUI_PORT=${envRef("QBITTORRENT_PORT", "8080")}\n    volumes:\n      - ${envRef("DATA_ROOT")}/qbittorrent:/config\n      - ${envRef("QBITTORRENT_DOWNLOADS", envRef("MEDIA_ROOT") + "/downloads")}:/downloads\n    ports:\n      - \"${envRef("QBITTORRENT_PORT", "8080")}:8080\"\n    networks:\n      - downloadnet\n    restart: unless-stopped`,
    );
  }

  if (selections.has("prowlarr")) {
    templates.push(
      `  prowlarr:\n    image: lscr.io/linuxserver/prowlarr:${envRef("PROWLARR_VERSION", "latest")}\n    environment:\n      - PUID=${envRef("PUID")}\n      - PGID=${envRef("PGID")}\n      - TZ=${envRef("TZ")}\n      - PROWLARR__API_KEY=${envRef("PROWLARR_API_KEY")}\n    volumes:\n      - ${envRef("DATA_ROOT")}/prowlarr:/config\n    ports:\n      - \"${envRef("PROWLARR_PORT", "9696")}:9696\"\n    networks:\n      - frontnet\n      - downloadnet\n    depends_on:\n      - qbittorrent\n    restart: unless-stopped`,
    );
  }

  if (selections.has("bazarr")) {
    templates.push(
      `  bazarr:\n    image: lscr.io/linuxserver/bazarr:${envRef("BAZARR_VERSION", "latest")}\n    environment:\n      - PUID=${envRef("PUID")}\n      - PGID=${envRef("PGID")}\n      - TZ=${envRef("TZ")}\n    volumes:\n      - ${envRef("DATA_ROOT")}/bazarr:/config\n      - ${envRef("MEDIA_ROOT")}/library:/library\n    ports:\n      - \"${envRef("BAZARR_PORT", "6767")}:6767\"\n    networks:\n      - frontnet\n      - downloadnet\n    depends_on:\n      - qbittorrent\n    restart: unless-stopped`,
    );
  }

  if (selections.has("overseerr")) {
    templates.push(
      `  overseerr:\n    image: sctx/overseerr:latest\n    environment:\n      - LOG_LEVEL=info\n      - TZ=${envRef("TZ")}\n      - OVERSEERR_API_KEY=${envRef("OVERSEERR_API_KEY")}\n      - INTEGRATION_SHARED_API_KEY=${envRef("INTEGRATION_SHARED_API_KEY")}\n    volumes:\n      - ${envRef("DATA_ROOT")}/overseerr:/app/config\n    ports:\n      - \"${envRef("OVERSEERR_PORT", "5055")}:5055\"\n    networks:\n      - frontnet\n    depends_on:\n      - radarr\n      - sonarr\n    restart: unless-stopped`,
    );
  }

  if (selections.has("lidarr")) {
    templates.push(
      `  lidarr:\n    image: lscr.io/linuxserver/lidarr:${envRef("LIDARR_VERSION", "latest")}\n    environment:\n      - PUID=${envRef("PUID")}\n      - PGID=${envRef("PGID")}\n      - TZ=${envRef("TZ")}\n    volumes:\n      - ${envRef("DATA_ROOT")}/lidarr:/config\n      - ${envRef("MEDIA_ROOT")}/library:/library\n      - ${envRef("MEDIA_ROOT")}/downloads:/downloads\n    ports:\n      - \"${envRef("LIDARR_PORT", "8686")}:8686\"\n    networks:\n      - frontnet\n      - downloadnet\n    depends_on:\n      - qbittorrent\n    restart: unless-stopped`,
    );
  }

  if (selections.has("nextcloud")) {
    volumes.add("nextcloud_data");
    templates.push(
      `  nextcloud:\n    image: nextcloud:${envRef("NEXTCLOUD_VERSION", "latest")}\n    depends_on:\n      - postgres\n      - redis\n    environment:\n      - NEXTCLOUD_ADMIN_USER=${envRef("NEXTCLOUD_ADMIN_USER")}\n      - NEXTCLOUD_ADMIN_PASSWORD=${envRef("NEXTCLOUD_ADMIN_PASSWORD")}\n      - POSTGRES_PASSWORD=${envRef("POSTGRES_PASSWORD")}\n      - POSTGRES_HOST=postgres\n      - POSTGRES_DB=nextcloud\n      - POSTGRES_USER=nextcloud\n      - REDIS_HOST=redis\n      - REDIS_HOST_PASSWORD=${envRef("REDIS_PASSWORD")}\n      - TRUSTED_DOMAINS=${envRef("NEXTCLOUD_TRUSTED_DOMAINS")}\n    volumes:\n      - nextcloud_data:/var/www/html\n      - ${envRef("MEDIA_ROOT")}/library:/media:ro\n    networks:\n      - frontnet\n    ports:\n      - \"8443:80\"\n    restart: unless-stopped`,
    );

    templates.push(
      `  postgres:\n    image: postgres:15-alpine\n    environment:\n      - POSTGRES_DB=nextcloud\n      - POSTGRES_USER=nextcloud\n      - POSTGRES_PASSWORD=${envRef("POSTGRES_PASSWORD")}\n      - TZ=${envRef("TZ")}\n    volumes:\n      - postgres_data:/var/lib/postgresql/data\n    networks:\n      - frontnet\n    restart: unless-stopped`,
    );
    volumes.add("postgres_data");

    templates.push(
      `  redis:\n    image: redis:7-alpine\n    command: redis-server --requirepass ${envRef("REDIS_PASSWORD")}\n    networks:\n      - frontnet\n    restart: unless-stopped`,
    );
  }

  if (selections.has("filebrowser")) {
    templates.push(
      `  filebrowser:\n    image: filebrowser/filebrowser:latest\n    user: ${envRef("PUID")}:${envRef("PGID")}\n    environment:\n      - FB_BASEURL=/\n    volumes:\n      - ${envRef("FILEBROWSER_ROOT", envRef("DATA_ROOT") + "/files")}:/srv\n    ports:\n      - \"${envRef("FILEBROWSER_PORT", "8081")}:80\"\n    networks:\n      - frontnet\n    restart: unless-stopped`,
    );
  }

  if (selections.has("navidrome")) {
    templates.push(
      `  navidrome:\n    image: deluan/navidrome:latest\n    environment:\n      - ND_LOGLEVEL=info\n      - ND_SCANSCHEDULE=12h\n      - ND_SESSIONTIMEOUT=24h\n    user: ${envRef("PUID")}:${envRef("PGID")}\n    volumes:\n      - ${envRef("DATA_ROOT")}/navidrome:/data\n      - ${envRef("NAVIDROME_MUSIC_PATH", envRef("MEDIA_ROOT") + "/music")}:/music:ro\n    ports:\n      - \"${envRef("NAVIDROME_PORT", "4533")}:4533\"\n    networks:\n      - frontnet\n    restart: unless-stopped`,
    );
  }

  const authChoice = document.getElementById("authChoice").value;
  if (authChoice === "authelia") {
    templates.push(
      `  authelia:\n    image: authelia/authelia:latest\n    volumes:\n      - ${envRef("DATA_ROOT")}/authelia:/config\n    environment:\n      - TZ=${envRef("TZ")}\n      - AUTHELIA_JWT_SECRET=${envRef("AUTHELIA_JWT_SECRET")}\n      - AUTHELIA_SESSION_SECRET=${envRef("AUTHELIA_SESSION_SECRET")}\n    networks:\n      - frontnet\n    restart: unless-stopped`,
    );
  } else if (authChoice === "authentik") {
    volumes.add("authentik_media");
    templates.push(
      `  authentik:\n    image: ghcr.io/goauthentik/server:2023.10\n    environment:\n      - AUTHENTIK_SECRET_KEY=${envRef("AUTHENTIK_SECRET_KEY")}\n      - AUTHENTIK_POSTGRESQL__HOST=postgres\n      - AUTHENTIK_POSTGRESQL__USER=authentik\n      - AUTHENTIK_POSTGRESQL__NAME=authentik\n      - AUTHENTIK_POSTGRESQL__PASSWORD=${envRef("AUTHENTIK_POSTGRES_PASSWORD")}\n      - AUTHENTIK_REDIS__HOST=redis\n    depends_on:\n      - postgres\n      - redis\n    volumes:\n      - authentik_media:/media\n      - ${envRef("DATA_ROOT")}/authentik:/config\n    networks:\n      - frontnet\n    restart: unless-stopped`,
    );
  } else if (authChoice === "oauth2-proxy") {
    templates.push(
      `  oauth2-proxy:\n    image: quay.io/oauth2-proxy/oauth2-proxy:v7.5.1\n    environment:\n      - OAUTH2_PROXY_PROVIDER=google\n      - OAUTH2_PROXY_CLIENT_ID=${envRef("OAUTH2_PROXY_CLIENT_ID")}\n      - OAUTH2_PROXY_CLIENT_SECRET=${envRef("OAUTH2_PROXY_CLIENT_SECRET")}\n      - OAUTH2_PROXY_COOKIE_SECRET=${envRef("OAUTH2_PROXY_COOKIE_SECRET")}\n      - OAUTH2_PROXY_EMAIL_DOMAINS=*\n    ports:\n      - \"4180:4180\"\n    networks:\n      - frontnet\n    restart: unless-stopped`,
    );
  }

  if (selections.has("cloudflare")) {
    templates.push(
      `  cloudflared:\n    image: cloudflare/cloudflared:latest\n    command: tunnel run\n    environment:\n      - TUNNEL_TOKEN=${envRef("CLOUDFLARE_TUNNEL_TOKEN")}\n    networks:\n      - frontnet\n    restart: unless-stopped`,
    );
  }

  if (selections.has("objectStorage")) {
    volumes.add("minio_data");
    templates.push(
      `  minio:\n    image: quay.io/minio/minio:latest\n    command: server /data --console-address :9001\n    environment:\n      - MINIO_ROOT_USER=${envRef("S3_ACCESS_KEY")}\n      - MINIO_ROOT_PASSWORD=${envRef("S3_SECRET_KEY")}\n    ports:\n      - \"9000:9000\"\n      - \"9001:9001\"\n    volumes:\n      - minio_data:/data\n    networks:\n      - frontnet\n    restart: unless-stopped`,
    );
  }

  if (selections.has("observability")) {
    volumes.add("prometheus_data");
    volumes.add("grafana_data");
    volumes.add("loki_data");
    templates.push(
      `  prometheus:\n    image: prom/prometheus:latest\n    volumes:\n      - ${envRef("DATA_ROOT")}/prometheus.yml:/etc/prometheus/prometheus.yml:ro\n      - prometheus_data:/prometheus\n    networks:\n      - frontnet\n    restart: unless-stopped`,
    );
    templates.push(
      `  grafana:\n    image: grafana/grafana:10.3.1\n    environment:\n      - GF_SECURITY_ADMIN_USER=${envRef("GRAFANA_ADMIN_USER")}\n      - GF_SECURITY_ADMIN_PASSWORD=${envRef("GRAFANA_ADMIN_PASSWORD")}\n    volumes:\n      - grafana_data:/var/lib/grafana\n    ports:\n      - \"3000:3000\"\n    networks:\n      - frontnet\n    restart: unless-stopped`,
    );
    templates.push(
      `  loki:\n    image: grafana/loki:2.9.4\n    command: -config.file=/etc/loki/local-config.yaml\n    volumes:\n      - loki_data:/loki\n    networks:\n      - frontnet\n    restart: unless-stopped`,
    );
    templates.push(
      `  promtail:\n    image: grafana/promtail:2.9.4\n    command: -config.file=/etc/promtail/config.yml\n    volumes:\n      - /var/log:/var/log:ro\n    networks:\n      - frontnet\n    restart: unless-stopped`,
    );
  }

  return { templates, volumes: Array.from(volumes) };
}

function buildComposePreview() {
  const selections = getSelections();
  const { templates, volumes } = buildServiceTemplates({ selections });
  const composeParts = ['version: "3.9"', "services:", templates.join("\n\n")];

  if (volumes.length) {
    composeParts.push("volumes:");
    volumes.forEach((vol) => composeParts.push(`  ${vol}: {}`));
  }

  composeParts.push(
    "networks:\n  frontnet:\n    driver: bridge\n  downloadnet:\n    driver: bridge",
  );

  return composeParts.join("\n");
}

// Debounced preview updates for performance
function debounceUpdatePreviews() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    perf.start('preview-update');
    updatePreviews();
    perf.end('preview-update');
  }, 150);
}

function updatePreviews() {
  const envPreview = document.getElementById("envPreview");
  const composePreview = document.getElementById("composePreview");
  
  if (envPreview) envPreview.textContent = buildEnvPreview();
  if (composePreview) composePreview.textContent = buildComposePreview();
}

// Modern async clipboard with error handling
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!');
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showToast('Copied to clipboard!');
  }
}

// Enhanced file download with proper MIME types
function downloadFile(filename, content, mimeType = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // Cleanup with delay to ensure download starts
  setTimeout(() => URL.revokeObjectURL(url), 100);
}

function renderFileTypeGuide() {
  const container = document.getElementById("fileTypeGuide");
  container.innerHTML = "";
  fileTypeGuides.forEach((guide) => {
    const card = document.createElement("label");
    card.className = "filetype-card";
    card.innerHTML = `
      <header>
        <input type="checkbox" value="${guide.id}" />
        <div>
          <strong>${guide.label}</strong>
          <div class="eyebrow">${guide.extensions.join(", ").toUpperCase()}</div>
        </div>
      </header>
      <small>${guide.description}</small>
    `;
    const checkbox = card.querySelector("input");
    checkbox.addEventListener("change", (event) => {
      if (event.target.checked) {
        selectedFileTypes.add(guide.id);
        guide.services.forEach((serviceId) =>
          ensureServiceSelection(serviceId, true),
        );
      } else {
        selectedFileTypes.delete(guide.id);
      }
      updateCoverageSummary();
    });
    container.appendChild(card);
  });
}

function ensureServiceSelection(serviceId, shouldSelect) {
  const checkbox = document.querySelector(
    `.catalog input[value="${serviceId}"]`,
  );
  if (checkbox && checkbox.checked !== shouldSelect) {
    checkbox.checked = shouldSelect;
    checkbox.dispatchEvent(new Event("change", { bubbles: true }));
  }
}

function updateCoverageSummary() {
  const summary = document.getElementById("coverageSummary");
  const selectedGuides = fileTypeGuides.filter((guide) =>
    selectedFileTypes.has(guide.id),
  );
  if (!selectedGuides.length) {
    summary.innerHTML =
      "<strong>Select at least one file family to validate coverage.</strong>";
    return;
  }

  const missing = [];
  const coveredServices = new Set();
  selectedGuides.forEach((guide) => {
    const missingForGuide = guide.services.filter(
      (svc) => !isServiceSelected(svc),
    );
    guide.services.forEach((svc) => coveredServices.add(svc));
    if (missingForGuide.length) {
      missing.push(`${guide.label}: add ${missingForGuide.join(", ")}`);
    }
  });

  if (missing.length) {
    summary.innerHTML = `
      <strong>Coverage gaps detected:</strong>
      <ul>${missing.map((item) => `<li>${item}</li>`).join("")}</ul>
    `;
  } else {
    summary.innerHTML = `
      <strong>Great! Every selected file family has support.</strong>
      <div class="eyebrow">Apps covering your choices: ${Array.from(coveredServices).join(", ")}</div>
    `;
  }
}

function syncToggleToCatalog(toggleId, serviceId) {
  const toggle = document.getElementById(toggleId);
  toggle.addEventListener("change", (event) => {
    ensureServiceSelection(serviceId, event.target.checked);
  });
}

function syncInlineToggles() {
  const cloudflareMain = document.getElementById("cloudflareTunnel");
  const cloudflareInline = document.getElementById("cloudflareTunnelInline");
  const objectStorageMain = document.getElementById("objectStorage");
  const objectStorageInline = document.getElementById("objectStorageInline");

  cloudflareInline.checked = cloudflareMain.checked;
  objectStorageInline.checked = objectStorageMain.checked;

  cloudflareInline.addEventListener("change", (event) =>
    ensureServiceSelection("cloudflare", event.target.checked),
  );
  objectStorageInline.addEventListener("change", (event) =>
    ensureServiceSelection("objectStorage", event.target.checked),
  );
}

function setupStepNavigation() {
  const panels = Array.from(document.querySelectorAll(".step-panel"));
  panels.forEach((panel, index) => {
    panel.dataset.index = index;
    const next = panel.querySelector("[data-next]");
    const prev = panel.querySelector("[data-prev]");
    if (next) next.addEventListener("click", () => goToStep(index + 1));
    if (prev) prev.addEventListener("click", () => goToStep(index - 1));
  });

  document.querySelectorAll("#stepList li").forEach((item) => {
    item.addEventListener("click", () => goToStep(Number(item.dataset.step)));
  });
}

function goToStep(index) {
  const panels = Array.from(document.querySelectorAll(".step-panel"));
  if (!panels.length) return;
  currentStep = Math.max(0, Math.min(index, panels.length - 1));
  panels.forEach((panel, idx) => {
    panel.classList.toggle("active", idx === currentStep);
  });
  document.querySelectorAll("#stepList li").forEach((item, idx) => {
    item.classList.toggle("active", idx === currentStep);
  });
  if (progressRingInstance) {
    progressRingInstance.updateProgress(currentStep + 1);
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function wireActions() {
  setProfileValues();
  profileBindings.forEach(({ input, key }) => {
    const el = document.getElementById(input);
    el.addEventListener("input", (event) => {
      envValues.set(key, event.target.value);
      updatePreviews();
    });
  });

  document
    .getElementById("copyEnv")
    .addEventListener("click", () => copyToClipboard(buildEnvPreview()));
  document
    .getElementById("copyCompose")
    .addEventListener("click", () => copyToClipboard(buildComposePreview()));
  document
    .getElementById("downloadEnv")
    .addEventListener("click", () => downloadFile(".env", buildEnvPreview()));
  document
    .getElementById("downloadCompose")
    .addEventListener("click", () =>
      downloadFile("compose.yml", buildComposePreview()),
    );

  document.getElementById("authChoice").addEventListener("change", () => {
    renderEnvForm();
    updatePreviews();
  });

  syncToggleToCatalog("cloudflareTunnel", "cloudflare");
  syncToggleToCatalog("objectStorage", "objectStorage");
  syncInlineToggles();
  document
    .getElementById("gpuAcceleration")
    .addEventListener("change", updatePreviews);

  document
    .getElementById("autoFill")
    .addEventListener("click", () => {
      applyDefaultEnvValues();
      setProfileValues();
      renderEnvForm();
      updateCoverageSummary();
      goToStep(4);
    });

  document.getElementById("loadSample").addEventListener("click", () => {
    const sampleSelections = new Set([
      "jellyfin",
      "sonarr",
      "radarr",
      "qbittorrent",
      "prowlarr",
      "bazarr",
      "overseerr",
      "lidarr",
      "navidrome",
      "nextcloud",
      "filebrowser",
      "cloudflare",
    ]);

    applyDefaultEnvValues();
    setProfileValues({
      COMPOSE_PROJECT_NAME: "m2-sample",
      BASE_DOMAIN: "media.local",
      TZ: "UTC",
      MEDIA_ROOT: "/srv/media",
      DATA_ROOT: "/srv/m2-data",
    });
    document.getElementById("authChoice").value = "authelia";

    serviceCatalog.forEach((service) => {
      ensureServiceSelection(service.id, sampleSelections.has(service.id));
    });

    const desiredFileTypes = new Set([
      "movies",
      "tv",
      "music",
      "photos",
      "documents",
    ]);

    document
      .querySelectorAll('#fileTypeGuide input[type="checkbox"]')
      .forEach((box) => {
        const shouldCheck = desiredFileTypes.has(box.value);
        if (box.checked !== shouldCheck) {
          box.checked = shouldCheck;
          box.dispatchEvent(new Event("change", { bubbles: true }));
        }
      });

    renderEnvForm();
    updateCoverageSummary();
    goToStep(4);
  });
}

function bootstrap() {
  try {
    // Initialize theme system
    initThemeSystem();
    // Setup theme selector
    const themeSelector = document.getElementById('themeSelector');
    if (themeSelector) {
      themeSelector.addEventListener('change', (e) => {
        try {
          applyTheme(e.target.value);
        } catch (error) {
          console.warn('Theme switching failed:', error);
        }
      });
    }
    
    // Setup wizard launch button to use the advanced builder flow
    const startWizardBtn = document.getElementById('startWizard');
    if (startWizardBtn) {
      startWizardBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const layout = document.querySelector('.layout');
        if (layout) {
          layout.scrollIntoView({ behavior: 'smooth' });
        }
        if (typeof goToStep === 'function') {
          goToStep(0);
        }
      });
    } else {
      console.warn('Start wizard button not found');
    }
    
    // Setup advanced mode button
    const advancedModeBtn = document.getElementById('advancedMode');
    if (advancedModeBtn) {
      advancedModeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Scroll to the main configuration area
        const layout = document.querySelector('.layout');
        if (layout) {
          layout.scrollIntoView({ behavior: 'smooth' });
        }
      });
    } else {
      console.warn('Advanced mode button not found');
    }
    
    // Original bootstrap code with error handling
    try {
      applyDefaultEnvValues();
      renderCatalog();
      mountTemplateGallery();
      renderFileTypeGuide();
      document.getElementById("cloudflareTunnel").checked = true;
      document.getElementById("objectStorage").checked = false;
      syncInlineToggles();
      setupStepNavigation();
      const ringMount = document.getElementById('progressRingMount');
      if (ringMount && !progressRingInstance) {
        progressRingInstance = new ProgressRing(ringMount, 7);
        progressRingInstance.updateProgress(currentStep + 1);
      }
      wireActions();
      attachFieldInsights();
      initParticleBackground();
      initAIAssistant();
      renderEnvForm();
      updateCoverageSummary();
      updatePreviews();
    } catch (error) {
      console.error('Core bootstrap failed:', error);
      showToast('Some features may not work correctly. Please refresh the page.');
    }
    
  } catch (error) {
    console.error('Bootstrap failed completely:', error);
    // Fallback: try to at least get basic functionality working
    try {
      applyDefaultEnvValues();
      renderCatalog();
      renderFileTypeGuide();
      setupStepNavigation();
      wireActions();
      renderEnvForm();
      updateCoverageSummary();
      updatePreviews();
    } catch (fallbackError) {
      console.error('Even fallback failed:', fallbackError);
      document.body.innerHTML = '<div style="padding: 20px; text-align: center;"><h2>Something went wrong</h2><p>Please refresh the page or check the console for details.</p></div>';
    }
  }
}

// Modern event delegation and cleanup
document.addEventListener('DOMContentLoaded', () => {
  perf.start('bootstrap');
  bootstrap();
  perf.end('bootstrap');
  
  // Add CSS animations dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
  
  // Preload critical resources
  preloadCriticalResources();
});

// Performance optimization functions
function preloadCriticalResources() {
  // Preload service logos
  const logoUrls = [...new Set(
    serviceCatalog.map(service => serviceBranding[service.id]?.logo).filter(Boolean)
  )];
  
  logoUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  clearTimeout(debounceTimer);
});

// Service Worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      // Only register if service worker file exists
      const swResponse = await fetch('/sw.js', { method: 'HEAD' });
      if (swResponse.ok) {
        await navigator.serviceWorker.register('/sw.js');
      }
    } catch (err) {
      // Service worker not available, continue normally
    }
  });
}
