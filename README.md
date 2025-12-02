# M2

Media stack and Nextcloud with auth and Cloudflare Tunnel, refreshed with community guidance current through **November 25, 2024**.

## Installer website (updated Nov 25, 2024)

<<<<<<< Updated upstream
The `web/` directory contains **M2 Installer Studio**, a single-page app that now includes:

- **Quick-start templates** powered by Reddit/Discord-popular stacks (media, photo AI, productivity, etc.) so you can load a community-vetted baseline with one click.
- **Full Nextcloud catalog entry** with the env variables the Compose generator already knew how to render, ensuring collaboration services show up alongside the media stack.
- **Field insights + popover tips** for every profile/toggle input, summarizing what the social/self-hosted crowd was recommending on 11/25/2024.
- **Progress ring + background particles** to keep you oriented through the seven-step wizard without reloading the page.
- **AI Configuration Assistant** anchored to the bottom-right of the screen for quick reminders sourced from popular homelab discussions.
- **User variable storage** so you can save API tokens/hostnames once, drop them into the `.env` via a quick-select dropdown, and optionally expose them under `x-user-vars` in the generated compose file.
- **Per-service variable runbook** that lets you jot notes per container and download a Markdown runbook capturing your current `.env` values and decisions.
=======
- 🤖 **AI Chat Interface** - Interactive chat with intelligent responses
- 💾 **Message Persistence** - Chat history automatically saved to localStorage
- 📋 **Copy Messages** - Hover over any message to copy its content
- 📥 **Export Chat** - Download complete chat history as text file
- 🗑️ **Clear History** - Reset conversation with one click
- 💡 **Smart Suggestions** - Example prompts to get started quickly
- 🎨 **Modern Design** - Beautiful gradients and animations using Tailwind CSS
- 🌓 **Dark/Light Theme** - Toggle between themes with persistent preference
- ⚡ **Lightning Fast** - Built with Vite for optimal performance
- 📱 **Responsive** - Works seamlessly on all devices
- 🎯 **TypeScript** - Full type safety and better developer experience
- 🚀 **Next-Gen Tech Stack** - React 19, Vite 7, Tailwind CSS

## Quick Start Guide
>>>>>>> Stashed changes

Use the **Load sample stack** button in Step 1 to preload a representative plan
with Jellyfin, Radarr/Sonarr/qBittorrent, Prowlarr, subtitle and request
helpers, plus Nextcloud and FileBrowser for documents. The previews will update
instantly so you can copy a working example or tweak it for your environment.

<<<<<<< Updated upstream
Open `web/index.html` in your browser to start designing your deployment. No backend is required; everything runs client-side.
=======
- **Node.js 18+** and **npm** installed on your machine
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A code editor (VS Code recommended)
>>>>>>> Stashed changes

## Automated smoke tests

Run the browser smoke in CI or before deploying to ensure the template gallery and AI assistant stay functional:

<<<<<<< Updated upstream
=======
1. **Clone the repository:**
```bash
git clone <repository-url>
cd M2
```

2. **Install dependencies:**
>>>>>>> Stashed changes
```bash
npm install
npx playwright install
npm run test:e2e
```

<<<<<<< Updated upstream
The Playwright suite boots a local `python3 -m http.server` from `web/`, navigates through the wizard to confirm the template gallery renders cards, and toggles the AI assistant window open/closed.

GitHub Actions (`.github/workflows/e2e.yml`) runs the very same command on every push and pull request so regressions block merges automatically.

## Memory log

See `IMPROVEMENTS.md` for a point-in-time log of the ten fixes/improvements implemented during this review. It references where each decision came from (blog posts, social feeds, etc.) so future reviewers know why a change was made.
=======
This will install all required packages including React 19, TypeScript, Vite, and Tailwind CSS.

### Development

**Start the development server:**
```bash
npm run dev
```

You'll see output like:
```
VITE v7.2.2  ready in 770 ms
➜  Local:   http://localhost:5173/
```

**Open your browser** and navigate to `http://localhost:5173` (or the port shown in your terminal)

**What you'll see:**
- Animated hero section with "Next-Gen AI React Website" title
- Three feature cards showcasing AI, Design, and Performance
- Interactive AI chat interface ready to use
- Beautiful gradient backgrounds and smooth animations

### First Steps

1. **Scroll down** to the "Try the AI Assistant" section
2. **Click in the chat input** at the bottom of the chat box
3. **Type "Hello"** and press Enter or click the Send button
4. **Watch the typing indicator** appear with animated dots
5. **See the AI response** fade in smoothly
6. **Try different messages** to see context-aware responses

### Build for Production

Create an optimized production build:
```bash
npm run build
```

This creates a `dist/` folder with optimized, minified files ready for deployment.

### Preview Production Build

Test the production build locally:
```bash
npm run preview
```

This serves the production build on a local server for testing before deployment.

## Tech Stack

- **React 19** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Next-generation build tool
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code quality and consistency

## Project Structure

```
├── src/
│   ├── components/       # React components
│   │   ├── AIChat.tsx   # Main chat interface
│   │   └── ChatMessage.tsx # Individual message component
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles with Tailwind
├── public/              # Static assets
└── index.html          # HTML template
```

## What Can You Do With This App?

### 🎯 Interactive AI Chat Experience

**Chat with the AI Assistant:**
1. **Start a Conversation** - Type any message in the chat input at the bottom
2. **Get Instant Responses** - The AI responds with contextual answers based on your input
3. **Watch the Typing Indicator** - See animated dots while the AI is "thinking"
4. **Auto-Scroll Messages** - Messages automatically scroll to the latest as you chat

**Try These Topics:**
- Say **"Hello"** or **"Hi"** - Get a friendly greeting
- Ask for **"Help"** - Learn what the AI can assist with
- Mention **"AI"** or **"Artificial Intelligence"** - Discuss AI capabilities
- Ask about **"React"** - Learn about React and this website's technology
- Type **anything else** - Get general conversational responses

### 🎨 Explore the Modern UI

**Visual Features to Experience:**
- **Gradient Hero Section** - Eye-catching animated title with floating effect
- **Feature Cards** - Three beautiful cards showcasing app capabilities
  - AI-Powered: Lightning bolt icon with blue-to-purple gradient
  - Modern Design: Paint brush icon with purple-to-pink gradient
  - Lightning Fast: Bolt icon with pink-to-red gradient
- **Hover Effects** - Interactive cards that respond to mouse movement
- **Smooth Animations** - Messages fade in, buttons scale on hover
- **Gradient Borders** - Animated border effects on chat interface

### 💬 Chat Interface Features

**Message Management:**
- **User Messages** - Appear on the right with blue-to-purple gradient background
- **AI Messages** - Appear on the left with icon and semi-transparent background
- **Timestamps** - Every message shows time sent in 12-hour format
- **Responsive Layout** - Messages adapt to screen size (max 70% width)
- **Copy to Clipboard** - Hover over any message to see a copy button (appears on hover)
- **Message Persistence** - All conversations automatically saved to browser localStorage

**Interactive Elements:**
- **Input Field** - Type your messages with focus effects
- **Send Button** - Disabled when input is empty, hover to see scale animation
- **Real-time Updates** - New messages appear instantly with smooth animations
- **Scrollable History** - Chat keeps full conversation history
- **Example Prompts** - Quick-start suggestions appear when starting a new chat
- **Export Chat** - Download icon in header to save conversation as text file
- **Clear History** - Trash icon in header to reset the conversation

### 🌓 Theme Customization

**Dark & Light Modes:**
- **Theme Toggle** - Sun/moon icon button in top-right corner
- **Persistent Preference** - Your theme choice is saved to localStorage
- **Smooth Transitions** - Theme changes apply instantly across the entire app
- **Optimized Colors** - Both themes feature carefully designed color schemes:
  - **Dark Mode**: Deep slate and purple gradients with bright accents
  - **Light Mode**: Soft blue and purple pastels with vibrant text

**What Changes with Themes:**
- Background gradients
- Text colors and contrast
- Chat bubble styling
- Border colors
- Button hover states

### 📱 Responsive Design Testing

**Try Different Screen Sizes:**
- **Desktop** - Full 3-column feature card layout
- **Tablet** - Responsive grid adapts to medium screens
- **Mobile** - Single column layout with optimized chat interface
- **All Devices** - Touch and click interactions work seamlessly

### 🛠️ Developer Features

**For Developers & Learners:**
- **Inspect the Code** - Clean, well-structured TypeScript components
- **Study Modern React** - Uses React 19 hooks (useState, useRef, useEffect)
- **Learn Tailwind CSS** - See utility-first CSS in action
- **TypeScript Examples** - Full type safety with interfaces
- **Component Architecture** - Reusable, modular component design

**Customization Ideas:**
- Add more AI response patterns in `getAIResponse()` function
- Customize colors and gradients in Tailwind classes
- Add new feature cards to the hero section
- Integrate a real AI API (OpenAI, Anthropic, etc.)
- Add message persistence with local storage
- Implement dark/light theme toggle
- Add emoji picker or file upload
- Create user authentication system

### 🚀 Performance Features

**Built for Speed:**
- **Fast Hot Module Replacement** - See changes instantly during development
- **Optimized Production Builds** - Vite creates minimal, optimized bundles
- **Code Splitting** - Efficient loading of JavaScript modules
- **Tree Shaking** - Only includes code you actually use

### 🎓 Learning Opportunities

**What You Can Learn:**
- Modern React patterns with functional components
- TypeScript for type-safe JavaScript
- Tailwind CSS utility-first approach
- State management with React hooks
- Form handling and validation
- Animation and transition effects
- Responsive design principles
- Component composition patterns

## Features Showcase

### AI Chat Assistant
Engage with an intelligent AI assistant that can answer questions about technology, AI, React, and more. The chat features:
- Real-time message updates
- Typing indicators
- Smooth animations
- Context-aware responses

### Modern UI/UX
- Gradient backgrounds and borders
- Smooth animations and transitions
- Responsive design for all screen sizes
- Interactive hover effects
- Custom color themes

## Advanced Usage

### Running Different Environments

**Development Mode** (with hot reload):
```bash
npm run dev
```

**Production Build** (optimized):
```bash
npm run build
```

**Preview Production** (test build locally):
```bash
npm run preview
```

**Lint Code** (check for errors):
```bash
npm run lint
```

### Customizing the App

**Change AI Responses:**
Edit [src/components/AIChat.tsx](src/components/AIChat.tsx) - modify the `getAIResponse()` function (lines 58-71) to add your own response patterns.

**Update Styling:**
Edit [src/index.css](src/index.css) for global styles or modify Tailwind classes directly in component files.

**Add New Components:**
Create new files in `src/components/` and import them in `App.tsx`.

**Modify Chat Behavior:**
Adjust message timing, typing delays, or auto-scroll behavior in [AIChat.tsx](src/components/AIChat.tsx).

## Example Conversations to Try

### Getting Started Conversations

**Example 1: First Interaction**
```
You: Hello
AI: Hello! It's great to chat with you. What would you like to know?
You: What can you help me with?
AI: I'm here to assist you! You can ask me about technology, AI, or just have a conversation. What interests you?
```

**Example 2: Learning About AI**
```
You: Tell me about AI
AI: AI is transforming the world! From machine learning to natural language processing, AI is making amazing things possible. What aspect of AI interests you most?
You: How does this website use AI?
AI: That's interesting! I'm constantly learning and evolving. Feel free to ask me anything or explore more about AI and modern web technologies.
```

**Example 3: Technical Questions**
```
You: What is React?
AI: React is a powerful JavaScript library for building user interfaces. This website is built with React and features modern design patterns!
You: Thanks for the info
AI: That's interesting! I'm constantly learning and evolving. Feel free to ask me anything or explore more about AI and modern web technologies.
```

## Deployment Options

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**
2. **Visit [vercel.com](https://vercel.com)** and sign in
3. **Click "New Project"**
4. **Import your repository**
5. **Vercel auto-detects Vite** - no configuration needed
6. **Click Deploy**

Your app will be live in seconds with automatic HTTPS and global CDN!

### Deploy to Netlify

1. **Build the project:**
```bash
npm run build
```

2. **Drag and drop** the `dist/` folder to [netlify.com/drop](https://app.netlify.com/drop)

Or use Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Deploy to GitHub Pages

1. **Install gh-pages:**
```bash
npm install --save-dev gh-pages
```

2. **Add to package.json scripts:**
```json
"deploy": "npm run build && gh-pages -d dist"
```

3. **Update vite.config.ts** base path:
```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ... rest of config
})
```

4. **Deploy:**
```bash
npm run deploy
```

### Self-Hosting

1. **Build the project:**
```bash
npm run build
```

2. **Upload the `dist/` folder** to your web server
3. **Configure your server** to serve the `index.html` for all routes
4. **Enable HTTPS** for security

## 🤖 AI Integration - Make It Actually Intelligent!

The app comes with **built-in support** for multiple AI providers. Choose the one that works best for you!

### Quick Setup (Choose Your AI Provider)

#### Option 1: OpenAI (GPT-3.5/GPT-4) - Recommended

1. **Get API Key:**
   - Visit [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
   - Create an account and generate an API key

2. **Configure:**
```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_AI_PROVIDER=openai
VITE_OPENAI_API_KEY=sk-proj-your-key-here
```

3. **Restart dev server:**
```bash
npm run dev
```

**Cost:** ~$0.002 per chat (very affordable for testing)

#### Option 2: Anthropic Claude - Best Quality

1. **Get API Key:**
   - Visit [console.anthropic.com](https://console.anthropic.com/)
   - Sign up and get your API key

2. **Configure `.env`:**
```env
VITE_AI_PROVIDER=anthropic
VITE_ANTHROPIC_API_KEY=sk-ant-your-key-here
```

**Cost:** Claude Sonnet costs about $0.003 per chat

#### Option 3: Google Gemini - Free Tier Available

1. **Get API Key:**
   - Visit [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
   - Create a project and generate API key

2. **Configure `.env`:**
```env
VITE_AI_PROVIDER=gemini
VITE_GEMINI_API_KEY=your-gemini-key-here
```

**Cost:** Generous free tier available!

#### Option 4: Demo Mode (No API Key Needed)

The app works out-of-the-box with simulated responses:

```env
VITE_AI_PROVIDER=mock
```

Perfect for testing the UI without API costs!

### Features

✅ **Conversation Memory** - AI remembers previous messages
✅ **Multiple Providers** - Switch between OpenAI, Claude, Gemini
✅ **Error Handling** - Graceful error messages
✅ **Status Indicator** - Shows active AI provider in chat header
✅ **TypeScript** - Fully typed AI service

### Advanced Configuration

**Switch Providers Anytime:**

Just update your `.env` file:
```env
# Try OpenAI
VITE_AI_PROVIDER=openai
VITE_OPENAI_API_KEY=sk-proj-...

# Or switch to Claude
VITE_AI_PROVIDER=anthropic
VITE_ANTHROPIC_API_KEY=sk-ant-...

# Or use Gemini
VITE_AI_PROVIDER=gemini
VITE_GEMINI_API_KEY=...
```

**Customize AI Behavior:**

Edit [src/services/aiService.ts](src/services/aiService.ts) to:
- Adjust temperature (creativity)
- Change max tokens (response length)
- Modify system prompts
- Add custom pre/post-processing

## Extending the Application

### Adding Message Persistence

**Use LocalStorage to save chat history:**

```typescript
// In AIChat.tsx
useEffect(() => {
  // Load messages on mount
  const savedMessages = localStorage.getItem('chatMessages');
  if (savedMessages) {
    setMessages(JSON.parse(savedMessages));
  }
}, []);

useEffect(() => {
  // Save messages on change
  localStorage.setItem('chatMessages', JSON.stringify(messages));
}, [messages]);
```

### Adding Dark/Light Theme Toggle

**Create theme context and toggle:**

1. **Create ThemeContext.tsx:**
```typescript
import { createContext, useState, useContext } from 'react';

const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} });

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
```

2. **Update index.css with light theme classes**
3. **Add toggle button in App.tsx**

### Adding User Authentication

**Example with Firebase Auth:**

1. **Install Firebase:**
```bash
npm install firebase
```

2. **Initialize Firebase in your app**
3. **Create login/signup components**
4. **Protect chat routes with auth checks**

## Performance Optimization Tips

### Image Optimization
- Use WebP format for images
- Implement lazy loading with `loading="lazy"`
- Use responsive images with `srcset`

### Code Splitting
- Dynamic imports for large components
- Route-based splitting if adding routing
- Lazy load chat history

### Bundle Size Reduction
- Use `vite-plugin-compression` for gzip
- Analyze bundle with `rollup-plugin-visualizer`
- Remove unused dependencies

### Caching Strategies
- Service workers for offline support
- Cache API responses
- Implement optimistic UI updates

## Common Use Cases

### 1. Portfolio Project
Showcase your React and TypeScript skills to potential employers. Demonstrate modern web development practices.

### 2. Learning Platform
Use as a teaching tool for:
- React hooks and state management
- TypeScript type safety
- Tailwind CSS utility classes
- Modern build tools (Vite)

### 3. Chatbot Prototype
Quick prototype for:
- Customer support chat
- FAQ assistant
- Product recommendation bot
- Educational tutor

### 4. Design System Demo
Showcase your UI/UX skills:
- Gradient design patterns
- Animation techniques
- Responsive layouts
- Component architecture

### 5. Integration Testing
Test bed for:
- API integrations
- State management libraries
- Testing frameworks
- CI/CD pipelines

## Troubleshooting

### Port Already in Use
If port 5173 is in use, Vite automatically tries the next available port (5174, 5175, etc.).

**Manually specify a port:**
```bash
npm run dev -- --port 3000
```

### Dependency Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
npm run build
```
Check the output for specific type errors.

### Hot Module Replacement Not Working
1. Check if files are saved properly
2. Restart the dev server
3. Clear browser cache
4. Check for syntax errors in code

### Chat Messages Not Appearing
1. Open browser console (F12)
2. Check for JavaScript errors
3. Verify React DevTools shows component state
4. Check network tab for any blocked requests

### Styling Issues
1. Verify Tailwind is configured correctly
2. Check `index.css` imports Tailwind directives
3. Restart dev server after config changes
4. Use browser inspector to check applied classes

## FAQ

### Can I use this for commercial projects?
Yes! This project is MIT licensed, so you can use it freely for personal or commercial projects.

### How do I add more AI response patterns?
Edit the `getAIResponse()` function in [src/components/AIChat.tsx](src/components/AIChat.tsx) and add more `if` conditions with keyword matching.

### Can I integrate a real AI API?
Absolutely! See the "Adding Real AI Integration" section above for OpenAI example. You can also use Anthropic Claude, Google Gemini, or any other AI API.

### How do I change the color scheme?
Modify the gradient classes in the components. For example, change `from-purple-500 to-blue-500` to your preferred colors.

### Is this production-ready?
The app is production-ready for UI/UX demonstration. For real production use, consider:
- Adding proper error handling
- Implementing rate limiting
- Using a backend API for AI calls
- Adding user authentication if needed
- Implementing proper security headers

### How do I add more pages?
Install React Router:
```bash
npm install react-router-dom
```
Then create routes and navigation components.

### Can I use this with a backend?
Yes! The chat component can easily be modified to call a backend API instead of using simulated responses.

## Resources

### Official Documentation
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Useful Tools
- [React DevTools](https://react.dev/learn/react-developer-tools) - Debug React components
- [VS Code Extensions](https://code.visualstudio.com/) - ES7+ React snippets, Tailwind IntelliSense
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/) - Browser debugging

### Learning Resources
- [React Tutorial](https://react.dev/learn) - Official React tutorial
- [TypeScript Playground](https://www.typescriptlang.org/play) - Practice TypeScript
- [Tailwind Play](https://play.tailwindcss.com/) - Experiment with Tailwind

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## License

This project is open source and available under the MIT License.
>>>>>>> Stashed changes
