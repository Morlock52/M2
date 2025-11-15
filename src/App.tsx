import AIChat from './components/AIChat'

function App() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-6 animate-float">
            <span className="text-gradient">Next-Gen AI</span>
            <br />
            <span className="text-white">React Website</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Experience the future of web development with cutting-edge AI integration,
            modern design patterns, and blazing-fast performance.
          </p>
          
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="gradient-border">
              <div className="gradient-border-content">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">AI-Powered</h3>
                  <p className="text-gray-400">Intelligent chat interface with contextual responses</p>
                </div>
              </div>
            </div>
            
            <div className="gradient-border">
              <div className="gradient-border-content">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Modern Design</h3>
                  <p className="text-gray-400">Beautiful gradients and smooth animations</p>
                </div>
              </div>
            </div>
            
            <div className="gradient-border">
              <div className="gradient-border-content">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Lightning Fast</h3>
                  <p className="text-gray-400">Built with Vite for optimal performance</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Chat Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="text-gradient">Try the AI Assistant</span>
          </h2>
          <AIChat />
        </div>

        {/* Footer */}
        <div className="text-center text-gray-400 mt-16">
          <p>Built with React, TypeScript, Vite, and Tailwind CSS</p>
          <p className="mt-2">Powered by next-generation web technologies</p>
        </div>
      </div>
    </div>
  )
}

export default App
