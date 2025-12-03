# M2 Next-Gen AI React Chat Application

[![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react)](https://react.dev/) [![Vite](https://img.shields.io/badge/Vite-7.2-646cff?logo=vite)](https://vite.dev/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8?logo=tailwindcss)](https://tailwindcss.com/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?logo=typescript)](https://typescriptlang.org/)

A modern, feature-rich AI chat interface built with cutting-edge web technologies. Experience intelligent conversations with support for multiple AI providers including OpenAI GPT-5, Anthropic Claude Opus 4.5, and Google Gemini—all wrapped in a beautiful, responsive UI with dark/light themes.

**Last Updated:** December 3, 2025

---

## ✨ Features

### Core Chat Capabilities
- 🤖 **Real AI Integration** - Connect to OpenAI, Anthropic Claude, Google Gemini, or use demo mode
- 💬 **Conversation Context** - Full conversation history sent to AI for intelligent, contextual responses
- ⚡ **Real-time Responses** - Stream AI responses with typing indicators
- 💾 **Auto-save Conversations** - Messages persist across browser sessions using localStorage
- 🎯 **Smart Prompts** - Quick-start suggestions appear when chat is empty

### User Experience
- 🎨 **Dark/Light Themes** - Seamless theme switching with preferences saved
- 📋 **Copy to Clipboard** - One-click copy for any message with hover-based UI
- 📥 **Export Chat History** - Download full conversation as formatted text file
- 🗑️ **Clear History** - Reset conversation with a single click
- 📱 **Fully Responsive** - Works beautifully on desktop, tablet, and mobile
- ⚙️ **Provider Status** - Visual indicator showing which AI provider is active

### Developer Features
- ⚛️ **React 19.2** - Latest React with Actions API, new hooks, and React Compiler
- 🏃 **Vite 7.2** - Lightning-fast builds with Rolldown bundler (100x memory reduction)
- 🎨 **Tailwind CSS 4.1** - Modern utility-first CSS with 5x faster builds
- 📘 **TypeScript 5.7** - Full type safety with strict mode enabled
- 🔐 **Environment Variables** - Secure API key management via Vite's env system

---

## 🎯 Quick Start for Beginners

### What You'll Need

Before you begin, make sure you have:
- **Node.js 20.19+ or 22.12+** ([Download here](https://nodejs.org/)) - This includes npm (package manager)
- **A modern web browser** - Chrome, Firefox, Safari, or Edge
- **A code editor** (optional but recommended) - [VS Code](https://code.visualstudio.com/) is great for beginners
- **An AI API key** (optional) - App works in demo mode without one

> 💡 **New to this?** Don't worry! Node.js is a tool that lets you run JavaScript outside the browser. npm is like an app store for code libraries.

### Installation Steps (First Time Setup)

#### Step 1: Download the Project

**Option A: Using Git (Recommended)**
```bash
# Open your terminal/command prompt and run:
git clone https://github.com/Morlock52/M2.git
cd M2
```

**Option B: Download ZIP**
1. Click the green "Code" button on GitHub
2. Select "Download ZIP"
3. Extract the ZIP file to a folder
4. Open terminal/command prompt in that folder

#### Step 2: Install Dependencies

This downloads all the libraries the app needs:

```bash
npm install
```

⏱️ This might take 2-3 minutes. You'll see a progress bar.

#### Step 3: Configure AI Provider (Optional)

**For Demo Mode (No API Key Needed):**
You're all set! The app works in demo mode by default with simulated AI responses.

**For Real AI (Requires API Key):**

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Open `.env` in your text editor and follow instructions in the [AI Setup Guide](#-ai-provider-setup-detailed) below.

#### Step 4: Start the Development Server

```bash
npm run dev
```

You'll see output like:
```
  VITE v7.2.6  ready in 523 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

#### Step 5: Open in Browser

1. Hold **Ctrl** (or **Cmd** on Mac) and click the `http://localhost:5173/` link
2. Or manually open your browser and go to `http://localhost:5173/`

🎉 **You're done!** The chat interface should now be running.

### Using the Chat

1. **Type a message** in the input box at the bottom
2. **Press Enter** or click the send button
3. **Watch the AI respond** with a typing indicator
4. **Try the theme toggle** (sun/moon icon) in the top-right
5. **Hover over messages** to reveal the copy button
6. **Click example prompts** to quick-fill the input

### Common Beginner Issues

| Problem | Solution |
|---------|----------|
| `command not found: npm` | Install Node.js from [nodejs.org](https://nodejs.org/) |
| Port 5173 already in use | Another app is using that port. Close it or the dev server will try 5174, 5175, etc. |
| Changes not showing up | Hard refresh: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac) |
| AI not responding | Check that your API key is correctly set in `.env` file |

---

## 🚀 Advanced Setup for Experts

### Prerequisites

- Node.js 20.19+ or 22.12+ (required for Vite 7's ESM-first approach)
- npm 10+ or pnpm 9+ or yarn 4+
- Git for version control

### Project Architecture

```
M2/
├── src/
│   ├── components/
│   │   ├── AIChat.tsx          # Main chat interface
│   │   └── ChatMessage.tsx     # Individual message component
│   ├── contexts/
│   │   └── ThemeContext.tsx    # Theme state management
│   ├── services/
│   │   └── aiService.ts        # AI provider abstraction layer
│   ├── App.tsx                 # Root component
│   ├── main.tsx                # Application entry point
│   └── index.css               # Global styles + Tailwind
├── .env.example                # Environment variable template
├── .env                        # Your local config (gitignored)
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

### Technology Stack Details

#### React 19.2 (Released October 2025)

**Key Features Used:**
- **Actions API** - Simplified async form submissions with automatic pending states
- **`use()` Hook** - Read promises and suspend rendering until resolved
- **`useActionState`** - Order actions inside transitions with state access
- **React Compiler** - Automatic optimization without manual useMemo/useCallback
- **Concurrent Rendering** - Non-blocking UI updates for smoother experience

**Performance Gains:**
- 32% reduction in render cycles during heavy updates
- Automatic batching in promises, setTimeout, and native event handlers
- Faster hydration and reduced bundle sizes vs React 18

[Read more: React 19.2 Release](https://react.dev/blog/2025/10/01/react-19-2)

#### Vite 7.2 (Released December 2025)

**Why Vite 7:**
- **Rolldown Bundler** - Rust-based bundler with up to 100x less peak memory consumption
- **5x Faster Full Builds** - Compared to Vite 6
- **100x Faster Incremental Builds** - Measured in microseconds
- **ESM-First** - Leverages Node.js native ESM support
- **Baseline Browser Target** - Modern browser features available for 30+ months

**Migration Notes:**
- Requires Node.js 20.19+, 22.12+
- Default target changed from 'modules' to 'baseline-widely-available'
- Dropped Node.js 18 support (EOL April 2025)

[Read more: Vite 7.0 Announcement](https://vite.dev/blog/announcing-vite7)

#### Tailwind CSS 4.1 (Released April 2025)

**What's New in v4:**
- **5x Faster Builds** - Complete rewrite for performance
- **100x Faster Incremental Builds** - Microsecond-level changes
- **Modern CSS Features** - Cascade layers, @property, color-mix()
- **Simplified Setup** - Zero config, single line in CSS file
- **New Utilities** - Container queries, 3D transforms, not-* variants

**Browser Support:**
- Safari 16.4+
- Chrome 111+
- Firefox 128+

[Read more: Tailwind CSS v4.0](https://tailwindcss.com/blog/tailwindcss-v4)

### Development Commands

```bash
# Start dev server with HMR
npm run dev

# Type-check without building
npm run type-check

# Lint with ESLint
npm run lint

# Format with Prettier
npm run format

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run all checks before commit
npm run check-all
```

### Environment Variables

Create a `.env` file in the project root:

```env
# AI Provider Selection
# Options: 'openai' | 'anthropic' | 'gemini' | 'mock'
VITE_AI_PROVIDER=openai

# OpenAI Configuration
VITE_OPENAI_API_KEY=sk-proj-...

# Anthropic Claude Configuration
VITE_ANTHROPIC_API_KEY=sk-ant-...

# Google Gemini Configuration
VITE_GEMINI_API_KEY=...
```

**Security Notes:**
- Never commit `.env` to version control (already in `.gitignore`)
- Use `VITE_` prefix for variables accessible in browser code
- Rotate API keys regularly
- Use separate keys for development and production
- Consider using environment-specific `.env.local`, `.env.production` files

### Advanced Configuration

#### Custom Vite Config

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          // Add Babel plugins for advanced transformations
        ]
      }
    })
  ],
  server: {
    port: 3000, // Custom dev server port
    proxy: {
      // Proxy API requests to avoid CORS
      '/api': 'http://localhost:8080'
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Code splitting strategy
          'react-vendor': ['react', 'react-dom'],
        }
      }
    }
  }
})
```

#### Tailwind Customization

```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#6366f1',
          secondary: '#8b5cf6',
        }
      },
      animation: {
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        }
      }
    }
  }
}
```

---

## 🤖 AI Provider Setup (Detailed)

### OpenAI GPT (Recommended for Production)

**Latest Models (December 2025):**
- **GPT-5** (Flagship) - Best for coding and agentic tasks
- **GPT-5 Mini** - Balanced performance and cost
- **GPT-5 Nano** - Most affordable option
- **GPT-4o** - Still supported, mature model

**Pricing (December 2025):**

| Model | Input (per 1M tokens) | Cached Input | Output (per 1M tokens) |
|-------|----------------------|--------------|----------------------|
| GPT-5 | $1.25 | $0.125 | $10.00 |
| GPT-5 Mini | $0.25 | $0.025 | $2.00 |
| GPT-5 Nano | $0.05 | $0.005 | $0.40 |
| GPT-4o | $2.50 | - | $10.00 |

**Batch API:** Save 50% with asynchronous processing (24-hour turnaround)

**Setup Steps:**

1. **Create OpenAI Account**
   - Visit [platform.openai.com](https://platform.openai.com/)
   - Sign up with email or Google/Microsoft account
   - Verify your email address

2. **Add Payment Method**
   - Go to Settings → Billing
   - Add credit card (required for API access)
   - Set usage limits to avoid unexpected charges

3. **Generate API Key**
   - Navigate to API Keys section
   - Click "Create new secret key"
   - Name it (e.g., "M2-Chat-App-Dev")
   - Copy the key immediately (you won't see it again!)

4. **Configure App**
   ```env
   VITE_AI_PROVIDER=openai
   VITE_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx
   ```

5. **Choose Model** (Edit `src/services/aiService.ts` line ~25):
   ```typescript
   model: 'gpt-5-mini',  // or 'gpt-5', 'gpt-5-nano', 'gpt-4o'
   ```

**Cost Estimation:**
- Typical chat message: ~100-500 tokens
- 1000 messages with GPT-5 Mini: ~$0.10-$0.50
- Caching reduces costs by 90% for repeated context

[OpenAI API Pricing](https://openai.com/api/pricing/) | [OpenAI Documentation](https://platform.openai.com/docs/)

---

### Anthropic Claude (Best for Long Context)

**Latest Models (November 2025):**
- **Claude Opus 4.5** - Most intelligent, best for coding and agents
- **Claude Sonnet 4.5** - Balanced intelligence and speed
- **Claude Haiku 4.5** - Fast and cost-effective

**Special Features:**
- **Effort Parameter** - Control time/cost vs. capability trade-off
- **Tool Calling** - Programmatic function execution
- **Computer Use** - Industry-leading for agentic workflows
- **1M Token Context** - Analyze entire codebases

**Pricing (December 2025):**

| Model | Input (per 1M tokens) | Output (per 1M tokens) |
|-------|----------------------|----------------------|
| Opus 4.5 | $15.00 | $75.00 |
| Sonnet 4.5 | $3.00 | $15.00 |
| Haiku 4.5 | $1.00 | $5.00 |

**Setup Steps:**

1. **Create Anthropic Account**
   - Visit [console.anthropic.com](https://console.anthropic.com/)
   - Sign up with email
   - Verify identity (required for API access)

2. **Add Credits**
   - Navigate to Settings → Billing
   - Purchase credits ($5 minimum)
   - Credits never expire

3. **Generate API Key**
   - Go to Settings → API Keys
   - Click "Create Key"
   - Name it and set permissions
   - Copy the key: `sk-ant-...`

4. **Configure App**
   ```env
   VITE_AI_PROVIDER=anthropic
   VITE_ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxx
   ```

5. **Select Model** (Edit `src/services/aiService.ts` line ~55):
   ```typescript
   model: 'claude-sonnet-4.5',  // or 'claude-opus-4.5', 'claude-haiku-4.5'
   ```

**Why Choose Claude:**
- Superior for code generation and analysis
- Longer context windows (1M tokens vs OpenAI's 128K)
- More nuanced understanding of complex instructions
- Better at following system prompts precisely

[Anthropic API Docs](https://docs.anthropic.com/) | [Claude Models Overview](https://docs.anthropic.com/en/docs/about-claude/models/overview)

---

### Google Gemini (Best Free Option)

**Latest Models (December 2025):**
- **Gemini 2.5 Pro** - Most capable, multimodal
- **Gemini Flash** - Fast responses, good balance
- **Gemini Nano** - On-device inference

**Free Tier Benefits:**
- ✅ **Completely Free** - No credit card required
- ✅ **Commercial Use Allowed** - Unlike many free tiers
- ✅ **15 Requests/Minute** - Sufficient for personal projects
- ✅ **1M Token Context** - Same as paid tier
- ✅ **Multimodal Support** - Text, image, video input

**Free Tier Limits:**
- 15 requests per minute (RPM)
- 1 million tokens per minute (TPM)
- Daily quota resets at midnight PT
- Rate limit returns 429 status when exceeded

**Paid Tier Benefits:**
- Higher rate limits as usage grows
- Priority support
- SLA guarantees

**Setup Steps:**

1. **Create Google AI Studio Account**
   - Visit [aistudio.google.com](https://aistudio.google.com/)
   - Sign in with Google account
   - Accept terms of service

2. **Generate API Key** (Takes <5 minutes)
   - Click "Get API Key" button
   - Select or create a project
   - Copy the API key

3. **Configure App**
   ```env
   VITE_AI_PROVIDER=gemini
   VITE_GEMINI_API_KEY=xxxxxxxxxxxxxxxxxxxxx
   ```

4. **Select Model** (Edit `src/services/aiService.ts` line ~90):
   ```typescript
   // Uses gemini-1.5-flash by default (fastest free option)
   ```

**Performance Notes:**
- Flash model: ~2-3 second response time
- Pro model: ~5-10 second response time
- Free tier perfect for development and personal use
- Upgrade to paid when ready to scale

**Rate Limit Handling:**
The app automatically handles 429 errors and will inform users when rate limits are hit.

[Gemini API Pricing](https://ai.google.dev/gemini-api/docs/pricing) | [Gemini Free Tier Guide](https://blog.laozhang.ai/api-guides/gemini-api-free-tier/)

---

### Demo Mode (No Setup Required)

**When to Use:**
- Learning React and building UIs
- Demonstrating the interface without AI costs
- Development when API is temporarily unavailable
- Testing UI features (themes, copy, export, etc.)

**How It Works:**
- Uses pattern matching for responses
- Simulates typing delay (realistic UX)
- No internet connection required
- Zero cost

**Configure:**
```env
VITE_AI_PROVIDER=mock
# No API key needed
```

**Demo Responses:**
The mock service recognizes patterns like:
- "hello" → Greeting response
- "help" → Feature explanation
- "what can you do" → Capability list
- Default → Generic helpful response

**Customizing Demo Responses:**
Edit `getMockResponse()` function in `src/services/aiService.ts` (line ~120) to add custom patterns.

---

## 🎨 Customization Guide

### Changing Themes

#### Quick Theme Tweaks

Edit `src/index.css` to modify colors:

```css
/* Dark theme gradient */
body {
  @apply bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900;
}

/* Light theme gradient */
.light body {
  @apply bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50;
}

/* Text gradients */
.text-gradient {
  @apply bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400;
}
```

#### Adding New Themes

1. **Extend ThemeContext** (`src/contexts/ThemeContext.tsx`):
```typescript
type Theme = 'dark' | 'light' | 'cyberpunk' | 'forest';
```

2. **Add CSS Classes** (`src/index.css`):
```css
.cyberpunk body {
  @apply bg-black;
  background-image:
    repeating-linear-gradient(90deg, #00ff00 0px, transparent 2px);
}

.forest body {
  @apply bg-gradient-to-br from-green-900 via-emerald-800 to-green-900;
}
```

3. **Update Theme Toggle** (`src/App.tsx`):
```typescript
const themes: Theme[] = ['dark', 'light', 'cyberpunk', 'forest'];
const [currentIndex, setCurrentIndex] = useState(0);

const cycleTheme = () => {
  setCurrentIndex((prev) => (prev + 1) % themes.length);
  setTheme(themes[currentIndex]);
};
```

### Modifying AI Behavior

#### Adjusting Temperature (Creativity)

In `src/services/aiService.ts`, change the `temperature` parameter:

```typescript
// More creative/random (0.0 - 2.0)
temperature: 0.9,  // Default: 0.7

// Examples:
// 0.3 = Very focused, deterministic
// 0.7 = Balanced
// 1.2 = More creative
```

#### Changing Max Response Length

```typescript
max_tokens: 500,  // Default

// Longer responses
max_tokens: 1000,

// Shorter responses (faster, cheaper)
max_tokens: 150,
```

#### Custom System Prompts

```typescript
{
  role: 'system',
  content: 'You are a helpful AI assistant specialized in [YOUR DOMAIN]. ' +
           'Always respond in [YOUR STYLE]. ' +
           'Keep responses under 3 paragraphs.',
}
```

### Adding New Features

#### Example: Voice Input

1. **Install Speech Recognition Library**:
```bash
npm install react-speech-recognition
```

2. **Add Voice Button** (in `AIChat.tsx`):
```typescript
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const { transcript, listening, resetTranscript } = useSpeechRecognition();

const startListening = () => {
  SpeechRecognition.startListening({ continuous: false });
};

// In JSX:
<button onClick={startListening}>
  🎤 {listening ? 'Listening...' : 'Voice Input'}
</button>
```

#### Example: Message Reactions

1. **Update Message Interface**:
```typescript
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  reactions?: string[];  // New field
}
```

2. **Add Reaction Buttons**:
```typescript
const addReaction = (messageId: string, emoji: string) => {
  setMessages(prev => prev.map(msg =>
    msg.id === messageId
      ? { ...msg, reactions: [...(msg.reactions || []), emoji] }
      : msg
  ));
};
```

---

## 📦 Building for Production

### Optimized Production Build

```bash
# Create production build
npm run build

# Output will be in `dist/` folder
# Files are minified, optimized, and ready to deploy
```

**Build Optimizations:**
- Automatic code splitting
- Tree-shaking (removes unused code)
- Minification and compression
- Asset optimization (images, fonts)
- Source maps for debugging

### Deployment Options

#### Vercel (Recommended - Free Tier Available)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (first time)
vercel

# Deploy to production
vercel --prod
```

**Setup:**
1. Create account at [vercel.com](https://vercel.com/)
2. Connect GitHub repository
3. Add environment variables in dashboard
4. Auto-deploys on git push

[Vercel Documentation](https://vercel.com/docs)

#### Netlify (Free Tier Available)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

**Setup:**
1. Create account at [netlify.com](https://netlify.com/)
2. Drag & drop `dist/` folder, or connect Git
3. Configure build: `npm run build` → `dist/`
4. Add environment variables in settings

[Netlify Documentation](https://docs.netlify.com/)

#### GitHub Pages (Free)

```bash
# Install gh-pages package
npm install -D gh-pages

# Add to package.json scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

**Setup:**
1. Enable GitHub Pages in repo settings
2. Select gh-pages branch
3. Your site: `https://username.github.io/repo-name/`

[GitHub Pages Guide](https://pages.github.com/)

#### Cloudflare Pages (Free)

1. Push code to GitHub/GitLab
2. Visit [pages.cloudflare.com](https://pages.cloudflare.com/)
3. Connect repository
4. Configure:
   - Build command: `npm run build`
   - Output directory: `dist`
5. Add environment variables
6. Deploy automatically on push

**Benefits:**
- Global CDN (fast worldwide)
- Unlimited bandwidth
- Automatic HTTPS
- Preview deployments for PRs

[Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)

#### Docker Container

Create `Dockerfile`:

```dockerfile
# Build stage
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:

```nginx
server {
  listen 80;
  server_name _;
  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  # Cache static assets
  location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

Build and run:

```bash
docker build -t m2-ai-chat .
docker run -p 8080:80 m2-ai-chat
```

### Environment Variables in Production

**Security Best Practices:**

1. **Never commit** `.env` to Git
2. **Use platform environment variables**:
   - Vercel: Dashboard → Settings → Environment Variables
   - Netlify: Site settings → Environment
   - Cloudflare: Pages → Settings → Environment Variables
3. **Separate keys** for dev/staging/production
4. **Rotate keys** regularly
5. **Use key restrictions** when available (IP, referrer)

**Example Vercel Setup:**

```bash
# Set production variables
vercel env add VITE_AI_PROVIDER production
vercel env add VITE_OPENAI_API_KEY production

# Set preview variables (for PR deployments)
vercel env add VITE_AI_PROVIDER preview
vercel env add VITE_GEMINI_API_KEY preview
```

---

## 🐛 Troubleshooting

### Common Development Issues

#### Build Errors

**Error:** `Cannot find module 'react'`
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Error:** `The requested module does not provide an export named 'default'`
```bash
# Solution: Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

#### TypeScript Errors

**Error:** `Property 'X' does not exist on type 'Y'`
```typescript
// Solution: Add proper typing
interface MyComponent {
  X: string;  // Add missing property
}
```

**Error:** `Type 'undefined' is not assignable to type 'string'`
```typescript
// Solution: Add optional chaining or null check
const value = data?.property ?? 'default';
```

#### API Issues

**Error:** `401 Unauthorized`
- Check API key is correct in `.env`
- Verify key hasn't expired
- Ensure `VITE_` prefix is present

**Error:** `429 Too Many Requests`
- You've hit rate limits
- Wait 60 seconds and try again
- Upgrade to paid tier for higher limits

**Error:** `Network Error / CORS`
- API requests must come from same domain in production
- Use environment variables, not hardcoded keys
- Check firewall/antivirus isn't blocking requests

### Browser Compatibility

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| Chrome | 111+ | Full support |
| Firefox | 128+ | Full support |
| Safari | 16.4+ | Full support |
| Edge | 111+ | Full support |

**Unsupported Browser Warning:**
Add to `index.html`:

```html
<noscript>
  <div style="text-align: center; padding: 50px;">
    This application requires JavaScript and a modern browser.<br>
    Please update to Chrome 111+, Firefox 128+, or Safari 16.4+.
  </div>
</noscript>
```

### Performance Issues

**Slow Initial Load:**
1. Check bundle size: `npm run build -- --analyze`
2. Enable compression on server (gzip/brotli)
3. Use CDN for static assets
4. Implement code splitting

**Slow AI Responses:**
1. Check network tab for API latency
2. Reduce `max_tokens` to decrease response time
3. Use faster models (GPT-5 Nano, Claude Haiku)
4. Consider caching common responses

**Memory Leaks:**
1. Limit conversation history length
2. Clear old messages periodically
3. Use React DevTools Profiler to identify issues

### Getting Help

1. **Check Console**: Open browser DevTools (F12) → Console tab
2. **Read Error Messages**: They usually tell you what's wrong
3. **Search GitHub Issues**: [github.com/Morlock52/M2/issues](https://github.com/Morlock52/M2/issues)
4. **Ask for Help**:
   - Include error messages
   - Describe what you tried
   - Share relevant code snippets
   - Mention your OS, Node version, browser

---

## 📚 Learning Resources

### For Beginners

**Web Development Basics:**
- [MDN Web Docs](https://developer.mozilla.org/) - Comprehensive web technology docs
- [JavaScript.info](https://javascript.info/) - Modern JavaScript tutorial
- [freeCodeCamp](https://www.freecodecamp.org/) - Free interactive coding lessons

**React Learning:**
- [React Official Tutorial](https://react.dev/learn) - Start here if new to React
- [React 19 Documentation](https://react.dev/) - Official React docs
- [Egghead.io React Courses](https://egghead.io/q/react) - Video tutorials

**TypeScript:**
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

### For Experts

**Advanced React:**
- [React 19 Release Notes](https://react.dev/blog/2024/12/05/react-19)
- [React Compiler Documentation](https://react.dev/learn/react-compiler)
- [Patterns.dev](https://www.patterns.dev/) - React design patterns

**Vite & Build Tools:**
- [Vite 7.0 Release](https://vite.dev/blog/announcing-vite7)
- [Rolldown Documentation](https://rolldown.rs/)
- [Vite Plugin Development](https://vite.dev/guide/api-plugin.html)

**Tailwind CSS:**
- [Tailwind CSS v4 Migration](https://tailwindcss.com/docs/upgrade-guide)
- [Tailwind UI Components](https://tailwindui.com/)

**AI API Documentation:**
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [Anthropic Claude API Docs](https://docs.anthropic.com/)
- [Google Gemini API Guide](https://ai.google.dev/gemini-api/docs)

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Setting Up Development Environment

```bash
# Fork and clone the repository
git clone https://github.com/YOUR-USERNAME/M2.git
cd M2

# Create a new branch
git checkout -b feature/your-feature-name

# Install dependencies
npm install

# Start development server
npm run dev
```

### Code Style Guidelines

- **TypeScript**: Strict mode enabled, all code must be typed
- **Formatting**: Use Prettier (runs automatically on save if configured)
- **Linting**: ESLint checks run before commit
- **Components**: Functional components with TypeScript interfaces
- **State**: Use hooks (useState, useContext, useEffect)
- **Styling**: Tailwind utility classes, avoid inline styles

### Pull Request Process

1. **Ensure tests pass**: `npm test`
2. **Update documentation**: If you changed functionality
3. **Add examples**: Show how to use new features
4. **Write clear commit messages**: `feat: add voice input support`
5. **Keep PRs focused**: One feature per PR

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(ai): add support for GPT-5 model
fix(chat): resolve message duplication on rapid sends
docs(readme): update installation steps for Windows
```

---

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

### Technology Stack
- [React Team](https://react.dev/) - For React 19 and incredible documentation
- [Vite Team](https://vite.dev/) - For blazing-fast build tools
- [Tailwind Labs](https://tailwindcss.com/) - For beautiful utility-first CSS
- [TypeScript Team](https://www.typescriptlang.org/) - For type safety

### AI Providers
- [OpenAI](https://openai.com/) - GPT models
- [Anthropic](https://www.anthropic.com/) - Claude models
- [Google](https://ai.google/) - Gemini models

### Community
- All contributors who submit issues and pull requests
- Stack Overflow community for endless solutions
- React and Vite Discord communities for support

---

## 📊 Project Stats

- **Lines of Code**: ~1,500
- **Components**: 3 (AIChat, ChatMessage, ThemeContext)
- **Dependencies**: 12 direct, 200+ total
- **Bundle Size**: ~180 KB (gzipped)
- **Browser Support**: Modern browsers (2023+)
- **TypeScript Coverage**: 100%

---

## 🗺️ Roadmap

### Planned Features (2025)

- [ ] **Message Search** - Full-text search through conversation history
- [ ] **Conversation Branching** - Edit past messages and create alternate timelines
- [ ] **Voice Input/Output** - Speech-to-text and text-to-speech
- [ ] **Markdown Rendering** - Rich formatting for AI responses
- [ ] **Code Syntax Highlighting** - For code blocks in responses
- [ ] **Multiple Conversations** - Switch between different chat sessions
- [ ] **Cloud Sync** - Save conversations across devices
- [ ] **Custom AI Personalities** - Predefined system prompts
- [ ] **Image Generation** - Integration with DALL-E, Midjourney
- [ ] **Plugin System** - Extend functionality with third-party plugins

### Future Considerations

- **Mobile App** - React Native version
- **Desktop App** - Electron wrapper
- **Browser Extension** - AI assistant in any webpage
- **Self-hosted Option** - Run your own AI backend
- **Team Features** - Shared conversations, collaboration
- **Analytics Dashboard** - Usage stats, cost tracking

---

## 📞 Contact & Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/Morlock52/M2/issues)
- **GitHub Discussions**: [Ask questions or share ideas](https://github.com/Morlock52/M2/discussions)
- **Email**: morlock52@example.com *(replace with actual contact)*

---

## 🔗 Useful Links

### Documentation
- [React 19 Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

### AI Provider Docs
- [OpenAI API Pricing](https://openai.com/api/pricing/)
- [Anthropic Claude API](https://docs.anthropic.com/)
- [Google Gemini API](https://ai.google.dev/gemini-api/docs)

### Related Blog Posts
- [React 19 All New Features (2025)](https://dev.to/vishwark/react-19-the-complete-practical-guide-2025-2l73)
- [What's New in Vite 7](https://blog.openreplay.com/whats-new-vite-7-rust-baseline-beyond/)
- [Tailwind CSS v4 Explained](https://villpress.com/vite-7-0-explained-a-friendly-guide/)
- [LLM API Pricing Comparison 2025](https://intuitionlabs.ai/articles/llm-api-pricing-comparison-2025)

---

**Built with ❤️ using React 19, Vite 7, and Tailwind CSS 4**

*Last updated: December 3, 2025*
