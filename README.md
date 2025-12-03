# AI Chat Application

**Your Personal AI Assistant in a Web App** - Talk to OpenAI GPT, Anthropic Claude, or Google Gemini through a beautiful chat interface.

**Last Updated:** December 3, 2025

---

## 🎯 What Does This App Do?

This is a **chat application** that lets you have conversations with AI. Think of it like ChatGPT, but you own it and can choose which AI provider powers it.

### Main Features

**💬 Chat with AI**
- Type messages and get intelligent responses
- AI remembers your conversation (doesn't forget what you said earlier)
- Works with multiple AI providers: OpenAI, Claude, or Gemini

**💾 Automatic Save**
- Your conversations are automatically saved
- Close your browser and come back - your chat history is still there
- Never lose important conversations

**📋 Copy Messages**
- Hover over any message to see a copy button
- One click copies the message to your clipboard
- Great for saving AI responses you want to use elsewhere

**📥 Export Conversations**
- Download your entire chat history as a text file
- Perfect for keeping records or sharing conversations
- File includes timestamps for every message

**🗑️ Clear History**
- Start fresh with one click
- Removes all messages and starts a new conversation
- Can't be undone, so use carefully!

**🎨 Dark/Light Mode**
- Toggle between dark and light themes
- Your preference is remembered
- Works great in any lighting condition

**💡 Quick Start Prompts**
- When you first open the app, see suggested questions
- Click any prompt to auto-fill the input
- Great way to start a conversation

**⚙️ Provider Status**
- See which AI provider you're using (top of chat)
- Shows if you're in demo mode or connected to real AI
- Helps you understand what's happening

---

## 🚀 Quick Start (For Beginners)

### Step 1: Get the App Running

**What you need first:**
- A computer (Windows, Mac, or Linux)
- Internet connection
- [Node.js](https://nodejs.org/) installed (free download)

**Install Node.js:**
1. Go to [nodejs.org](https://nodejs.org/)
2. Download the "LTS" version (recommended for most users)
3. Run the installer and follow the instructions
4. Restart your computer

**Get the app:**
1. Download this project (green "Code" button → "Download ZIP")
2. Extract the ZIP file to a folder
3. Open Terminal (Mac) or Command Prompt (Windows)
4. Type: `cd ` and drag the folder into the window, then press Enter

**Install the app:**
```bash
npm install
```
Wait 2-3 minutes while it downloads everything needed.

**Start the app:**
```bash
npm run dev
```

**Open in browser:**
- You'll see a message with a link (like `http://localhost:5173/`)
- Hold Ctrl (or Cmd on Mac) and click the link
- OR open your browser and type the address manually

✅ **You should now see the chat interface!**

---

## 🤖 Using the App

### Demo Mode (No Setup Required)

The app works immediately in **demo mode** - no configuration needed!

- Type any message and you'll get a response
- The AI uses simple pattern matching (not real AI)
- Great for testing the interface
- No internet connection needed once the app is loaded
- Completely free

**What demo mode recognizes:**
- "hello" or "hi" → Greets you
- "help" → Explains features
- "AI" or "artificial intelligence" → Explains AI
- "React" → Talks about React
- "code" or "programming" → Offers coding help
- Anything else → Generic helpful response + reminder you're in demo mode

### Connecting Real AI (Optional)

Want actual intelligent AI responses? You'll need an API key from one of these providers:

#### Option 1: Google Gemini (RECOMMENDED - Free!)

**Why choose Gemini:**
- ✅ Completely FREE (no credit card required)
- ✅ 250 requests per day (plenty for personal use)
- ✅ Good quality responses
- ✅ Commercial use allowed (unlike many free tiers)

**How to set up:**

1. **Get your API key** (takes 5 minutes):
   - Visit [Google AI Studio](https://aistudio.google.com/)
   - Sign in with your Google account
   - Click "Get API Key" button
   - Copy the key (long string of letters and numbers)

2. **Configure the app**:
   - Find the file named `.env.example` in your app folder
   - Make a copy and rename it to `.env` (remove the `.example` part)
   - Open `.env` in any text editor (Notepad, TextEdit, etc.)
   - Find the line that says `# VITE_AI_PROVIDER=mock`
   - Change it to: `VITE_AI_PROVIDER=gemini`
   - Find the line `# VITE_GEMINI_API_KEY=...`
   - Change it to: `VITE_GEMINI_API_KEY=your-actual-key-here`
   - Save the file

3. **Restart the app**:
   - Press Ctrl+C in the terminal to stop the app
   - Type `npm run dev` again to restart
   - Refresh your browser

✅ **You're now chatting with real AI!**

**Free tier limits:**
- 10-15 requests per minute (very generous)
- 250,000 tokens per minute (one message = ~100-500 tokens)
- 100-1000 requests per day depending on model
- Resets every day at midnight Pacific Time

[Google Gemini Pricing & Limits](https://ai.google.dev/gemini-api/docs/pricing) | [Free Tier Guide](https://blog.laozhang.ai/api-guides/gemini-api-free-tier/)

---

#### Option 2: OpenAI GPT (Most Popular)

**Why choose OpenAI:**
- Industry standard (same as ChatGPT)
- High quality responses
- Most reliable and well-documented
- Wide language support

**Cost (Pay-as-you-go):**
- **GPT-4o Mini**: ~$0.15-$0.60 per 1,000 messages (most economical)
- **GPT-4o**: ~$2.50 per 1,000 messages (highest quality)
- **GPT-5** series also available (newest, various prices)
- Typical casual use: $1-5 per month

**Pricing details (December 2025):**

| Model | Input (per 1M tokens) | Output (per 1M tokens) | Best For |
|-------|----------------------|----------------------|----------|
| GPT-5 | $1.25 | $10.00 | Coding, complex tasks |
| GPT-5 Mini | $0.25 | $2.00 | Balanced use |
| GPT-5 Nano | $0.05 | $0.40 | High volume, simple tasks |
| GPT-4o | $2.50 | $10.00 | General purpose |

💡 **What's a token?** Roughly one word = 1.3 tokens. A typical chat message is 100-500 tokens.

**How to set up:**

1. **Create OpenAI account**:
   - Go to [platform.openai.com](https://platform.openai.com/)
   - Sign up with email or Google
   - Verify your email

2. **Add payment method** (required):
   - Go to Settings → Billing
   - Add credit card
   - Set spending limits (start with $10 to be safe)

3. **Get API key**:
   - Go to API Keys section
   - Click "Create new secret key"
   - Name it (e.g., "My Chat App")
   - **Copy the key immediately** (you can't see it again!)

4. **Configure the app**:
   - Copy `.env.example` to `.env`
   - Change `VITE_AI_PROVIDER=openai`
   - Change `VITE_OPENAI_API_KEY=sk-proj-your-key-here`
   - Save the file

5. **Restart the app** (Ctrl+C, then `npm run dev`)

✅ **You're now using OpenAI GPT!**

[OpenAI Pricing](https://openai.com/api/pricing/) | [OpenAI Documentation](https://platform.openai.com/docs/)

---

#### Option 3: Anthropic Claude (Best for Long Conversations)

**Why choose Claude:**
- Excellent at following instructions precisely
- Great for coding and analysis
- Larger context window (remembers more of your conversation)
- Strong reasoning capabilities

**Cost (Pay-as-you-go):**
- **Haiku 4.5**: $1 input / $5 output per 1M tokens (fastest, cheapest)
- **Sonnet 4.5**: $3 input / $15 output per 1M tokens (balanced)
- **Opus 4.5**: $5 input / $25 output per 1M tokens (most capable)
- Typical casual use: $2-10 per month

**How to set up:**

1. **Create Anthropic account**:
   - Visit [console.anthropic.com](https://console.anthropic.com/)
   - Sign up with email
   - Complete identity verification

2. **Add credits** (required):
   - Go to Settings → Billing
   - Purchase credits ($5 minimum)
   - Credits never expire

3. **Get API key**:
   - Settings → API Keys
   - Click "Create Key"
   - Name it and copy the key: `sk-ant-...`

4. **Configure the app**:
   - Copy `.env.example` to `.env`
   - Change `VITE_AI_PROVIDER=anthropic`
   - Change `VITE_ANTHROPIC_API_KEY=sk-ant-your-key-here`
   - Save the file

5. **Restart the app**

✅ **You're now using Claude!**

[Anthropic Pricing](https://www.anthropic.com/pricing) | [Claude API Docs](https://docs.anthropic.com/)

---

## 📖 How to Use the Chat Interface

### Sending Messages

1. **Type your message** in the text box at the bottom
2. **Press Enter** or click the "Send" button
3. **Wait for response** - you'll see a typing indicator (three dots)
4. **AI responds** - the message appears in the chat

**Tips for better responses:**
- Be specific in your questions
- Provide context if needed
- Ask follow-up questions - the AI remembers your conversation
- Break complex questions into smaller parts

### Managing Your Conversations

**Copy a Message:**
- Hover your mouse over any message
- Click the copy icon that appears
- Message is copied to clipboard
- Checkmark confirms it worked

**Export Full History:**
- Click the download icon (top right of chat)
- A text file downloads automatically
- Named with current date: `chat-history-2025-12-03.txt`
- Includes all messages with timestamps

**Clear Everything:**
- Click the trash icon (top right of chat)
- All messages are deleted immediately
- Starts fresh with welcome message
- **Cannot be undone!**

**Switch Themes:**
- Click sun/moon icon (top right of page)
- Toggles between dark and light mode
- Preference is saved automatically
- Works immediately, no reload needed

### Understanding the Interface

**Provider Status** (shown in chat header):
- "⚙️ Demo Mode" = Using mock AI (no internet needed)
- "✓ OPENAI" = Connected to OpenAI GPT
- "✓ ANTHROPIC" = Connected to Claude
- "✓ GEMINI" = Connected to Google Gemini

**Message Colors:**
- Purple/blue background = AI message
- Green/teal background = Your message
- Gray timestamps = When message was sent

**Example Prompts:**
- Only shown when chat is empty
- Click any prompt to use it
- Disappears after you send first message
- Reappears after clearing chat

---

## 💡 Usage Tips & Best Practices

### Getting the Best AI Responses

**1. Be Clear and Specific**
- ❌ Bad: "Tell me about that"
- ✅ Good: "Explain how photosynthesis works in simple terms"

**2. Provide Context**
- ❌ Bad: "Fix this"
- ✅ Good: "I have a Python script that's not working. It should print numbers 1-10 but stops at 5. Here's the code: [paste code]"

**3. Use Follow-up Questions**
- The AI remembers your conversation
- You can say "explain more about that" or "give me an example"
- Build on previous answers

**4. Set Constraints**
- Ask for specific formats: "Explain in 3 bullet points"
- Set length: "Keep it under 100 words"
- Define tone: "Explain like I'm 10 years old"

### Saving Money (Paid Plans)

**1. Use the Right Model**
- Simple questions → Use smaller models (Nano, Haiku)
- Complex tasks → Use larger models (GPT-5, Opus)
- This app defaults to mid-tier models (good balance)

**2. Be Concise**
- Shorter prompts = lower costs
- Get to the point quickly
- You pay for both input (your messages) and output (AI responses)

**3. Clear Old Conversations**
- The app sends full conversation history with each message
- Long chat histories cost more
- Clear chat when starting a new topic

**4. Use Demo Mode for Testing**
- Test the interface without using API credits
- Practice using features
- Switch to real AI only when you need intelligent responses

### Privacy & Security

**Your Data:**
- Conversations stored only on YOUR computer (in browser)
- Not sent to any server except the AI provider you choose
- Clearing browser data deletes all saved chats
- Export important conversations as backup

**API Keys:**
- Never share your API keys
- Don't commit `.env` file to public repositories
- Keys give full access to your AI account
- Rotate keys regularly (generate new ones)

**Best Practices:**
- Don't share sensitive personal information in chats
- Remember: Your conversations are sent to the AI provider
- Review each provider's privacy policy
- Use separate API keys for different projects

---

## 🐛 Troubleshooting

### App Won't Start

**Error: `npm: command not found`**
- Node.js isn't installed
- Download from [nodejs.org](https://nodejs.org/)
- Restart computer after installing
- Try running `node --version` to confirm

**Error: `Port 5173 already in use`**
- Another app is using that port
- Close other dev servers
- Or the app will try port 5174, 5175, etc.
- Check the terminal for the actual port number

**Error during `npm install`**
- Delete `node_modules` folder
- Delete `package-lock.json` file
- Run `npm install` again
- Make sure you have internet connection

### AI Not Responding

**"API key not configured" message:**
- Check your `.env` file exists (not `.env.example`)
- Verify the API key is correct (no extra spaces)
- Make sure you uncommented the lines (removed `#`)
- Provider name must match: `openai`, `anthropic`, `gemini`, or `mock`

**"401 Unauthorized" error:**
- API key is incorrect
- Key might have been deleted or expired
- Generate a new key from provider dashboard
- Update `.env` file with new key

**"429 Too Many Requests" error:**
- You hit the rate limit
- Gemini free tier: Wait 60 seconds and try again
- Paid plans: You might need to upgrade your tier
- Check provider dashboard for limit details

**AI response is slow:**
- Some models are slower than others
- Large context (long conversations) takes more time
- Check your internet connection
- Try a faster model (Haiku, Nano, Flash)

### Browser Issues

**Changes not showing:**
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Or close and reopen browser tab
- Check that dev server is running in terminal

**Chat history disappeared:**
- Browser data might have been cleared
- Use Export feature regularly as backup
- Storage might be disabled in browser settings
- Try a different browser

**Copy button not working:**
- Some browsers block clipboard access
- Check browser permissions/settings
- Try clicking the lock icon in address bar
- Allow clipboard access for this site

### Getting More Help

1. **Check the terminal** - Error messages often explain the problem
2. **Browser console** - Press F12 → Console tab → look for red errors
3. **Provider status page** - Check if OpenAI/Anthropic/Google have outages
4. **Search the error** - Copy exact error message into Google
5. **GitHub Issues** - [Report bugs here](https://github.com/Morlock52/M2/issues)

---

## 📊 Understanding Costs

### Real-World Usage Examples

**Light User** (Personal learning, occasional questions):
- ~50-100 messages per month
- Recommended: Gemini (FREE) or GPT-4o Mini ($0.50-1/month)

**Regular User** (Daily use, work help, code assistance):
- ~500-1000 messages per month
- Recommended: GPT-5 Mini ($3-8/month) or Claude Sonnet ($5-12/month)

**Heavy User** (Frequent conversations, long context):
- 2000+ messages per month
- Recommended: Mix of models or unlimited plans
- Cost: $20-50/month

### Token Calculator

Estimate your costs:
- Average question: 50-200 tokens
- Average response: 200-800 tokens
- Full conversation (10 exchanges): ~5,000-10,000 tokens

**Example calculation (GPT-5 Mini):**
- 100 messages/month × 1000 tokens/message = 100,000 tokens
- 100,000 ÷ 1,000,000 × $0.25 (input) = $0.025
- Add output tokens (usually 3-4x input): ~$0.10-0.15/month

💡 Most users spend **under $5/month** with casual use.

[OpenAI Pricing Calculator](https://aiparabellum.com/openai-pricing-calculator/) | [LLM Pricing Comparison](https://intuitionlabs.ai/articles/llm-api-pricing-comparison-2025)

---

## 🎓 Learning Resources

### For Complete Beginners

**Never used a terminal before?**
- [Terminal Basics for Mac](https://support.apple.com/guide/terminal/welcome/mac)
- [Command Prompt Basics for Windows](https://www.lifewire.com/command-prompt-2625840)

**What is Node.js?**
- [Node.js Explained Simply](https://www.freecodecamp.org/news/what-is-node-js/)

**Understanding API Keys:**
- [What is an API?](https://www.mulesoft.com/resources/api/what-is-an-api)
- [API Keys Explained](https://blog.hubspot.com/website/api-key)

### AI Provider Documentation

**OpenAI:**
- [Getting Started Guide](https://platform.openai.com/docs/quickstart)
- [API Reference](https://platform.openai.com/docs/api-reference)
- [Best Practices](https://platform.openai.com/docs/guides/production-best-practices)

**Anthropic Claude:**
- [Getting Started](https://docs.anthropic.com/en/docs/getting-started)
- [Prompt Engineering](https://docs.anthropic.com/en/docs/prompt-engineering)

**Google Gemini:**
- [Quickstart Guide](https://ai.google.dev/gemini-api/docs/quickstart)
- [Model Information](https://ai.google.dev/gemini-api/docs/models)

### Prompt Engineering (Getting Better Responses)

- [OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [Anthropic Prompt Library](https://docs.anthropic.com/en/prompt-library/library)
- [Learn Prompting](https://learnprompting.org/)

---

## 🔒 Privacy & Terms

### Your Data

**What's stored locally:**
- Chat message history (in browser storage)
- Theme preference (dark/light)
- All data stays on your computer until you export or clear it

**What's sent to AI providers:**
- Your messages
- Full conversation history (for context)
- No personal identifiers unless you include them in messages

**What's NOT collected:**
- We don't have a backend server
- No analytics or tracking
- No account creation required
- No data sold to third parties

### Provider Privacy Policies

- [OpenAI Privacy Policy](https://openai.com/policies/privacy-policy)
- [Anthropic Privacy Policy](https://www.anthropic.com/legal/privacy)
- [Google Privacy Policy](https://policies.google.com/privacy)

### Responsible Use

**Do:**
- Use for learning, productivity, and creativity
- Respect provider terms of service
- Keep API keys secure

**Don't:**
- Share sensitive personal information
- Use for illegal activities
- Share API keys with others
- Abuse rate limits or attempt to circumvent pricing

---

## 📞 Support & Contact

**Questions about using the app?**
- [GitHub Discussions](https://github.com/Morlock52/M2/discussions)

**Found a bug?**
- [Report on GitHub Issues](https://github.com/Morlock52/M2/issues)

**Need AI provider help?**
- [OpenAI Support](https://help.openai.com/)
- [Anthropic Support](https://support.anthropic.com/)
- [Google AI Support](https://support.google.com/)

---

## 🗺️ Future Features

**Coming soon:**
- Voice input/output
- Multiple conversation threads
- Message search
- Rich text formatting (bold, italics, code blocks)
- Conversation templates
- Image upload support

**Under consideration:**
- Mobile app version
- Cloud sync across devices
- Conversation sharing
- Custom AI personalities

---

## 📝 Changelog

**December 3, 2025** - Updated documentation with latest pricing and limits

**Previous updates:**
- Real AI integration (OpenAI, Claude, Gemini)
- Dark/light theme toggle
- Export chat history
- Copy message functionality
- Auto-save conversations
- Example prompt suggestions

---

## 📄 License

This project is licensed under the ISC License.

---

**Built with ❤️ for anyone who wants their own AI chat interface**

*Have questions? Check the [Troubleshooting](#-troubleshooting) section or ask in [GitHub Discussions](https://github.com/Morlock52/M2/discussions)*

---

## Sources & References

- [OpenAI API Pricing (Dec 2025)](https://openai.com/api/pricing/)
- [LLM API Pricing Comparison 2025](https://intuitionlabs.ai/articles/llm-api-pricing-comparison-2025)
- [Anthropic Claude Pricing Guide](https://www.anthropic.com/pricing)
- [Google Gemini Free Tier Guide](https://blog.laozhang.ai/api-guides/gemini-api-free-tier/)
- [Gemini API Pricing & Limits](https://ai.google.dev/gemini-api/docs/pricing)
