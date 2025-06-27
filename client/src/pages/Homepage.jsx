import { useNavigate } from 'react-router-dom'

export default function Homepage() {
  const navigate = useNavigate()

  const features = [
    {
      title: '💡 Smart Analyzer',
      desc: 'Get AI-powered advice on your financial decisions with instant Smart Scores.',
      route: '/analyzer',
      gradient: 'from-blue-500 to-cyan-500',
      icon: '🧠'
    },
    {
      title: '📊 Budget Tracker',
      desc: 'Track your monthly income, expenses and savings with beautiful visualizations.',
      route: '/budget',
      gradient: 'from-green-500 to-emerald-500',
      icon: '📈'
    },
    {
      title: '📝 AI Feedback',
      desc: 'Receive personalized recommendations based on your spending patterns.',
      route: '/feedback',
      gradient: 'from-purple-500 to-pink-500',
      icon: '✨'
    },
    {
      title: '📜 Smart History',
      desc: 'Review past decisions and track your financial improvement over time.',
      route: '/history',
      gradient: 'from-orange-500 to-red-500',
      icon: '📊'
    },
    {
      title: '👤 Profile',
      desc: 'View and update your personal information and preferences.',
      route: '/profile',
      gradient: 'from-indigo-500 to-purple-500',
      icon: '👤'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm mb-6">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
              Welcome back to SmartSpend
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                What would you like
              </span>
              <br />
              <span className="text-white">to do today?</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Choose from our AI-powered tools to take control of your finances
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(({ title, desc, route, gradient, icon }, index) => (
              <div
                key={title}
                onClick={() => navigate(route)}
                className="group cursor-pointer relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Glow effect */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000`}></div>
                
                {/* Card content */}
                <div className="relative bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-slate-500 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:-translate-y-2">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {icon}
                  </div>
                  
                  {/* Content */}
                  <h2 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-300 transition-colors duration-300">
                    {title}
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {desc}
                  </p>
                  
                  {/* Arrow indicator */}
                  <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                    <span className="text-sm font-medium">Get Started</span>
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats Section */}
          <div className="mt-20">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Your Financial Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-slate-700/50 rounded-xl border border-slate-600">
                  <div className="text-3xl font-bold text-green-400 mb-2">$2,450</div>
                  <div className="text-gray-400">Monthly Savings</div>
                </div>
                <div className="text-center p-6 bg-slate-700/50 rounded-xl border border-slate-600">
                  <div className="text-3xl font-bold text-blue-400 mb-2">8.5/10</div>
                  <div className="text-gray-400">Average Smart Score</div>
                </div>
                <div className="text-center p-6 bg-slate-700/50 rounded-xl border border-slate-600">
                  <div className="text-3xl font-bold text-purple-400 mb-2">15</div>
                  <div className="text-gray-400">Days Streak</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-4">
              <button 
                onClick={() => navigate('/analyzer')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all duration-300 flex items-center"
              >
                <span className="mr-2">🚀</span>
                Quick Analysis
              </button>
              <button 
                onClick={() => navigate('/budget')}
                className="border border-slate-600 text-white font-medium px-8 py-3 rounded-full hover:border-blue-500 hover:text-blue-400 transition-all duration-300"
              >
                Add Transaction
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
