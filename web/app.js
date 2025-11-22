const baseEnvFields = [
  {
    key: "COMPOSE_PROJECT_NAME",
    label: "Compose project name",
    defaultValue: "m2",
    required: true,
    helper: "Used as prefix for container names.",
  },
  {
    key: "BASE_DOMAIN",
    label: "Base domain",
    defaultValue: "media.example.com",
    required: true,
    helper: "Primary hostname for Cloudflare/Access rules.",
  },
  {
    key: "TZ",
    label: "Timezone",
    defaultValue: "UTC",
    required: true,
    helper: "Aligns cron and logs.",
  },
  {
    key: "MEDIA_ROOT",
    label: "Media root",
    defaultValue: "/srv/media",
    required: true,
    helper: "Path that holds library and downloads.",
  },
  {
    key: "DATA_ROOT",
    label: "Data root",
    defaultValue: "/srv/m2-data",
    required: true,
    helper: "Path for configs and app state.",
  },
  {
    key: "PUID",
    label: "User ID (PUID)",
    defaultValue: "1000",
    required: true,
    helper: "Match host user for file ownership.",
  },
  {
    key: "PGID",
    label: "Group ID (PGID)",
    defaultValue: "1000",
    required: true,
    helper: "Match host group for file ownership.",
  },
  {
    key: "INTEGRATION_SHARED_API_KEY",
    label: "Shared integration API key",
    defaultValue: "m2-shared-token",
    required: true,
    helper: "Reusable token for cross-app requests (Overseerr, Prowlarr).",
  },
];

const authEnvFields = {
  authelia: [
    {
      key: "AUTHELIA_JWT_SECRET",
      label: "Authelia JWT secret",
      defaultValue: "change-me-authelia",
      required: true,
      helper: "Secure random string for session tokens.",
    },
    {
      key: "AUTHELIA_SESSION_SECRET",
      label: "Authelia session secret",
      defaultValue: "change-me-session",
      required: true,
      helper: "Cryptographic secret for cookies.",
    },
  ],
  authentik: [
    {
      key: "AUTHENTIK_SECRET_KEY",
      label: "Authentik secret key",
      defaultValue: "change-me-authentik",
      required: true,
      helper: "Django secret key for Authentik.",
    },
    {
      key: "AUTHENTIK_POSTGRES_PASSWORD",
      label: "Authentik Postgres password",
      defaultValue: "authentik-db-pass",
      required: true,
      helper: "Password for Authentik database.",
    },
  ],
  "oauth2-proxy": [
    {
      key: "OAUTH2_PROXY_CLIENT_ID",
      label: "OAuth2 Proxy client ID",
      defaultValue: "client-id",
      required: true,
      helper: "Issued by your IdP.",
    },
    {
      key: "OAUTH2_PROXY_CLIENT_SECRET",
      label: "OAuth2 Proxy client secret",
      defaultValue: "client-secret",
      required: true,
      helper: "Issued by your IdP.",
    },
    {
      key: "OAUTH2_PROXY_COOKIE_SECRET",
      label: "OAuth2 Proxy cookie secret",
      defaultValue: "random-cookie-secret",
      required: true,
      helper: "16/24/32 byte base64 string.",
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
      helper: "Token from cloudflared tunnel create.",
    },
    {
      key: "PUBLIC_HOST_MEDIA",
      label: "Media hostname",
      defaultValue: "media.example.com",
      required: true,
      helper: "Routes traffic to Jellyfin/auth proxy.",
    },
    {
      key: "PUBLIC_HOST_NEXTCLOUD",
      label: "Nextcloud hostname",
      defaultValue: "files.example.com",
      required: false,
      helper: "Optional secondary hostname.",
    },
  ],
  objectStorage: [
    {
      key: "S3_ENDPOINT",
      label: "S3 endpoint",
      defaultValue: "https://s3.wasabisys.com",
      required: true,
      helper: "Use your provider URL or MinIO.",
    },
    {
      key: "S3_ACCESS_KEY",
      label: "S3 access key",
      defaultValue: "minioadmin",
      required: true,
      helper: "Access key for object storage.",
    },
    {
      key: "S3_SECRET_KEY",
      label: "S3 secret key",
      defaultValue: "minioadmin",
      required: true,
      helper: "Secret key for object storage.",
    },
    {
      key: "S3_BUCKET",
      label: "S3 bucket",
      defaultValue: "m2-media",
      required: true,
      helper: "Bucket for backups or assets.",
    },
  ],
  observability: [
    {
      key: "GRAFANA_ADMIN_USER",
      label: "Grafana admin user",
      defaultValue: "admin",
      required: true,
      helper: "Grafana login.",
    },
    {
      key: "GRAFANA_ADMIN_PASSWORD",
      label: "Grafana admin password",
      defaultValue: "grafana-pass",
      required: true,
      helper: "Strong password recommended.",
    },
  ],
};

const serviceBranding = {
  jellyfin: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@9/icons/jellyfin.svg",
    accent: "#7f5af0",
  },
  sonarr: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@9/icons/sonarr.svg",
    accent: "#f97316",
  },
  radarr: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@9/icons/radarr.svg",
    accent: "#facc15",
  },
  qbittorrent: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@9/icons/qbittorrent.svg",
    accent: "#38bdf8",
  },
  prowlarr: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@9/icons/prowlarr.svg",
    accent: "#c084fc",
  },
  overseerr: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@9/icons/overseerr.svg",
    accent: "#22d3ee",
  },
  bazarr: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@9/icons/bazarr.svg",
    accent: "#fde047",
  },
  lidarr: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@9/icons/lidarr.svg",
    accent: "#22c55e",
  },
  nextcloud: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@9/icons/nextcloud.svg",
    accent: "#38bdf8",
  },
  filebrowser: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@9/icons/googlechrome.svg",
    accent: "#a855f7",
  },
  navidrome: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@9/icons/musicbrainz.svg",
    accent: "#22c55e",
  },
  cloudflare: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@9/icons/cloudflare.svg",
    accent: "#fb923c",
  },
  observability: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@9/icons/grafana.svg",
    accent: "#f97316",
  },
  objectStorage: {
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@9/icons/minio.svg",
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
    id: "nextcloud",
    label: "Nextcloud",
    description: "Collaboration and sync with Postgres + Redis.",
    defaultSelected: true,
    env: [
      {
        key: "NEXTCLOUD_VERSION",
        label: "Nextcloud tag",
        defaultValue: "latest",
        required: false,
      },
      {
        key: "NEXTCLOUD_ADMIN_USER",
        label: "Admin user",
        defaultValue: "admin",
        required: true,
      },
      {
        key: "NEXTCLOUD_ADMIN_PASSWORD",
        label: "Admin password",
        defaultValue: "change-me",
        required: true,
      },
      {
        key: "NEXTCLOUD_TRUSTED_DOMAINS",
        label: "Trusted domains",
        defaultValue: "${BASE_DOMAIN}",
        required: true,
      },
      {
        key: "POSTGRES_PASSWORD",
        label: "Postgres password",
        defaultValue: "postgres-pass",
        required: true,
      },
      {
        key: "REDIS_PASSWORD",
        label: "Redis password",
        defaultValue: "redis-pass",
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
    services: ["navidrome"],
    description: "Navidrome streams and transcodes music for clients.",
  },
  {
    id: "photos",
    label: "Photos (JPG, RAW, HEIC)",
    extensions: ["jpg", "raw", "heic"],
    services: ["nextcloud"],
    description: "Nextcloud handles uploads, albums, and mobile sync.",
  },
  {
    id: "documents",
    label: "Documents (PDF, Office)",
    extensions: ["pdf", "docx", "xlsx"],
    services: ["nextcloud", "filebrowser"],
    description: "Nextcloud for sync + FileBrowser for quick previews.",
  },
];

const envValues = new Map();
const selectedFileTypes = new Set();
let currentStep = 0;

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
      logoImg.addEventListener("error", () => {
        const logoContainer = logoImg.parentElement;
        logoImg.remove();
        if (logoContainer) {
          logoContainer.classList.add("placeholder");
          logoContainer.textContent = service.label.charAt(0);
        }
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
    wrapper.querySelector("input").addEventListener("input", (e) => {
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

function updatePreviews() {
  document.getElementById("envPreview").textContent = buildEnvPreview();
  document.getElementById("composePreview").textContent = buildComposePreview();
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("Copied to clipboard");
  });
}

function downloadFile(filename, content) {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
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
  applyDefaultEnvValues();
  renderCatalog();
  renderFileTypeGuide();
  document.getElementById("cloudflareTunnel").checked = true;
  document.getElementById("objectStorage").checked = false;
  syncInlineToggles();
  setupStepNavigation();
  wireActions();
  renderEnvForm();
  updateCoverageSummary();
  updatePreviews();
}

document.addEventListener("DOMContentLoaded", bootstrap);
