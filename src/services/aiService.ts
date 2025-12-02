// AI Service - Supports multiple AI providers
// Set your API key and provider in .env file

export type AIProvider = 'openai' | 'anthropic' | 'gemini' | 'mock';

interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Mock AI for demonstration (no API key needed)
const getMockResponse = (input: string): string => {
  const lower = input.toLowerCase();

  if (lower.includes('hello') || lower.includes('hi')) {
    return 'Hello! I\'m your AI assistant. How can I help you today?';
  } else if (lower.includes('help')) {
    return 'I can assist you with questions about technology, AI, programming, and more. Just ask me anything!';
  } else if (lower.includes('ai') || lower.includes('artificial intelligence')) {
    return 'AI is transforming the world through machine learning, natural language processing, computer vision, and more. What aspect of AI interests you?';
  } else if (lower.includes('react')) {
    return 'React is a powerful JavaScript library for building user interfaces. This website is built with React 19, featuring modern hooks and patterns!';
  } else if (lower.includes('code') || lower.includes('programming')) {
    return 'I can help with coding questions! Whether it\'s JavaScript, TypeScript, Python, or other languages - what would you like to know?';
  } else if (lower.includes('explain') || lower.includes('what is')) {
    return 'I\'d be happy to explain! However, I\'m running in mock mode. To get real AI responses, please configure an API key in your .env file. Check the README for instructions!';
  } else {
    return 'That\'s interesting! Note: I\'m currently in demo mode with simulated responses. For real AI conversations, configure an API key in your .env file (see README for details).';
  }
};

// OpenAI Integration
const getOpenAIResponse = async (input: string, conversationHistory: AIMessage[]): Promise<string> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    return 'OpenAI API key not configured. Please add VITE_OPENAI_API_KEY to your .env file.';
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful AI assistant integrated into a modern React website. Be concise, friendly, and informative.',
          },
          ...conversationHistory,
          { role: 'user', content: input },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'OpenAI API request failed');
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'Sorry, I couldn\'t generate a response.';
  } catch (error) {
    console.error('OpenAI Error:', error);
    return `Error: ${error instanceof Error ? error.message : 'Failed to get AI response'}`;
  }
};

// Anthropic Claude Integration
const getAnthropicResponse = async (input: string, conversationHistory: AIMessage[]): Promise<string> => {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

  if (!apiKey) {
    return 'Anthropic API key not configured. Please add VITE_ANTHROPIC_API_KEY to your .env file.';
  }

  try {
    // Convert conversation history to Anthropic format
    const messages = [
      ...conversationHistory.filter(m => m.role !== 'system'),
      { role: 'user', content: input },
    ];

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 500,
        messages: messages,
        system: 'You are a helpful AI assistant integrated into a modern React website. Be concise, friendly, and informative.',
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Anthropic API request failed');
    }

    const data = await response.json();
    return data.content[0]?.text || 'Sorry, I couldn\'t generate a response.';
  } catch (error) {
    console.error('Anthropic Error:', error);
    return `Error: ${error instanceof Error ? error.message : 'Failed to get AI response'}`;
  }
};

// Google Gemini Integration
const getGeminiResponse = async (input: string): Promise<string> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    return 'Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.';
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: input,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Gemini API request failed');
    }

    const data = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text || 'Sorry, I couldn\'t generate a response.';
  } catch (error) {
    console.error('Gemini Error:', error);
    return `Error: ${error instanceof Error ? error.message : 'Failed to get AI response'}`;
  }
};

// Main AI Service
export const getAIResponse = async (
  input: string,
  conversationHistory: AIMessage[] = []
): Promise<string> => {
  // Determine which provider to use (defaults to mock)
  const provider = (import.meta.env.VITE_AI_PROVIDER as AIProvider) || 'mock';

  switch (provider) {
    case 'openai':
      return await getOpenAIResponse(input, conversationHistory);

    case 'anthropic':
      return await getAnthropicResponse(input, conversationHistory);

    case 'gemini':
      return await getGeminiResponse(input);

    case 'mock':
    default:
      return getMockResponse(input);
  }
};

// Helper to get provider status
export const getProviderStatus = (): { provider: AIProvider; configured: boolean; message: string } => {
  const provider = (import.meta.env.VITE_AI_PROVIDER as AIProvider) || 'mock';

  let configured = false;
  let message = '';

  switch (provider) {
    case 'openai':
      configured = !!import.meta.env.VITE_OPENAI_API_KEY;
      message = configured ? 'Connected to OpenAI GPT-3.5' : 'OpenAI API key not configured';
      break;

    case 'anthropic':
      configured = !!import.meta.env.VITE_ANTHROPIC_API_KEY;
      message = configured ? 'Connected to Anthropic Claude' : 'Anthropic API key not configured';
      break;

    case 'gemini':
      configured = !!import.meta.env.VITE_GEMINI_API_KEY;
      message = configured ? 'Connected to Google Gemini' : 'Gemini API key not configured';
      break;

    case 'mock':
    default:
      configured = true;
      message = 'Using mock AI (demo mode)';
      break;
  }

  return { provider, configured, message };
};
