import React from 'react';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAI = message.sender === 'ai';
  
  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-4 animate-fade-in`}>
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-3 ${
          isAI
            ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30'
            : 'bg-gradient-to-r from-blue-600 to-purple-600'
        }`}
      >
        <div className="flex items-start gap-2">
          {isAI && (
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          )}
          <p className="text-white leading-relaxed">{message.text}</p>
        </div>
        <span className="text-xs text-gray-400 mt-1 block">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
