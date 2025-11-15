import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import type { Message } from './ChatMessage';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI assistant. How can I help you today?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // eslint-disable-next-line react-hooks/purity
    const now = Date.now();
    const userMessage: Message = {
      id: now.toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    // eslint-disable-next-line react-hooks/purity
    const randomDelay = 1000 + Math.random() * 1000;
    setTimeout(() => {
      const aiMessage: Message = {
        id: (now + 1).toString(),
        text: getAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, randomDelay);
  };

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    if (input.includes('hello') || input.includes('hi')) {
      return 'Hello! It\'s great to chat with you. What would you like to know?';
    } else if (input.includes('help')) {
      return 'I\'m here to assist you! You can ask me about technology, AI, or just have a conversation. What interests you?';
    } else if (input.includes('ai') || input.includes('artificial intelligence')) {
      return 'AI is transforming the world! From machine learning to natural language processing, AI is making amazing things possible. What aspect of AI interests you most?';
    } else if (input.includes('react')) {
      return 'React is a powerful JavaScript library for building user interfaces. This website is built with React and features modern design patterns!';
    } else {
      return 'That\'s interesting! I\'m constantly learning and evolving. Feel free to ask me anything or explore more about AI and modern web technologies.';
    }
  };

  return (
    <div className="gradient-border w-full max-w-4xl mx-auto">
      <div className="gradient-border-content">
        <div className="flex flex-col h-[600px]">
          {/* Header */}
          <div className="flex items-center gap-3 pb-4 border-b border-purple-500/30">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center animate-pulse-slow">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gradient">AI Assistant</h2>
              <p className="text-sm text-gray-400">Always here to help</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto py-4 space-y-2">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="pt-4 border-t border-purple-500/30">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-slate-800/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!inputValue.trim()}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
