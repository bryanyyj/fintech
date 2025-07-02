import { Link, useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">

      {/* ─── Animated Background Elements ───────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* ─── Navbar ─────────────────────────────────────────────────────────── */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            SmartSpend
          </h1>
        </div>
        <nav className="space-x-6">
          <button
            onClick={() => navigate('/login')}
            className="hover:text-blue-300 transition-colors duration-300 bg-transparent border-none cursor-pointer text-white"
            style={{ background: 'none' }}
          >
            Log In
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium px-6 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 transform border-none cursor-pointer"
          >
            Sign Up
          </button>
        </nav>
      </header>

      {/* ─── Hero ───────────────────────────────────────────────────────────── */}
      <main className="relative z-10 flex-1 flex flex-col-reverse md:flex-row items-center px-8 md:px-16 mt-12">
        {/* Text */}
        <div className="md:w-1/2 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
              AI-Powered Financial Intelligence
            </div>
            <h2 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Master Your Money
              </span>
              <br />
              <span className="text-white">Like Never Before</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
              Transform your spending habits with AI-powered insights, smart scoring, and personalized financial coaching. 
              <span className="text-blue-400 font-semibold"> Save more, spend smarter.</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/register"
              className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold px-8 py-4 rounded-full shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
            >
              Start Your Journey
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <div className="flex items-center space-x-4 text-gray-400">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full border-2 border-slate-900"></div>
                ))}
              </div>
              <span className="text-sm">Be among the first to join</span>
            </div>
          </div>
        </div>

        {/* Interactive Demo Card */}
        <div className="md:w-1/2 flex justify-center mb-12 md:mb-0">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
            <div className="relative bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 shadow-2xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">SmartSpend Dashboard</span>
                  </div>
                  <div className="text-xs text-gray-400">Live</div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Coffee Shop</span>
                      <span className="text-red-400 text-sm">-$4.50</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-red-500/30 rounded-full">
                        <div className="w-8 h-2 bg-red-500 rounded-full"></div>
                      </div>
                      <span className="text-xs text-red-400">Smart Score: 3/10</span>
                    </div>
                  </div>
                  
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Grocery Store</span>
                      <span className="text-green-400 text-sm">-$32.80</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-green-500/30 rounded-full">
                        <div className="w-14 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-xs text-green-400">Smart Score: 9/10</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg p-3">
                  <div className="text-xs text-blue-300 mb-1">AI Insight</div>
                  <div className="text-sm">"Great job on groceries! Consider meal planning to save even more."</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ─── Features ───────────────────────────────────────────────────────── */}
      <section className="relative z-10 bg-slate-800/50 backdrop-blur-sm py-20 px-8">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Why SmartSpend?
            </h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the future of personal finance with cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3 mt-16">
            {[
              {
                icon: "🧠",
                title: "AI Smart Scoring",
                desc: "Get instant AI-powered scores for every purchase with detailed context and personalized recommendations.",
                gradient: "from-pink-500 to-red-500",
                delay: "0"
              },
              {
                icon: "🎯",
                title: "Goal Tracking",
                desc: "Set ambitious savings goals and watch your progress with beautiful visualizations and streak tracking.",
                gradient: "from-green-500 to-emerald-500",
                delay: "200"
              },
              {
                icon: "⚡",
                title: "Auto Categorization",
                desc: "Upload statements or connect your bank for automatic transaction tagging and spending pattern analysis.",
                gradient: "from-blue-500 to-purple-500",
                delay: "400"
              }
            ].map(({ icon, title, desc, gradient, delay }, index) => (
              <div
                key={index}
                className="group p-8 bg-slate-700/50 backdrop-blur-sm border border-slate-600 rounded-2xl hover:border-slate-500 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 transform hover:-translate-y-2"
                style={{ animationDelay: `${delay}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center text-2xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  {icon}
                </div>
                <h4 className="text-2xl font-bold mb-4 text-white">{title}</h4>
                <p className="text-gray-300 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Social Proof ──────────────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h3 className="text-4xl font-bold text-white">Trusted by Smart Spenders</h3>
            <p className="text-xl text-gray-300">See what our community has to say</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote: "SmartSpend's AI insights completely changed how I think about money. I've saved $2,400 this year!",
                author: "Sarah Chen",
                role: "Software Engineer",
                avatar: "👩‍💻"
              },
              {
                quote: "The goal tracking feature is addictive! I finally hit my travel fund target in just 6 months.",
                author: "Michael Rodriguez",
                role: "Marketing Manager",
                avatar: "👨‍💼"
              },
              {
                quote: "Love the dark mode interface and how it automatically categorizes all my spending. Game changer!",
                author: "Emma Thompson",
                role: "Designer",
                avatar: "👩‍🎨"
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="group p-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl hover:border-blue-500/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.author}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
                <blockquote className="text-gray-300 italic leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex text-yellow-400 mt-4">
                  {[1,2,3,4,5].map(star => (
                    <span key={star}>⭐</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ───────────────────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-6">
            <h3 className="text-5xl font-bold">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Ready to Transform
              </span>
              <br />
              <span className="text-white">Your Finances?</span>
            </h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join thousands of smart spenders who are already saving more and spending smarter with AI-powered insights.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold px-10 py-4 rounded-full shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
            >
              Start Free Trial
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/login"
              className="border border-slate-600 text-white font-medium px-10 py-4 rounded-full hover:border-blue-500 hover:text-blue-400 transition-all duration-300"
            >
              Already have an account?
            </Link>
          </div>
          
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>Free forever plan</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="relative z-10 bg-slate-900/50 backdrop-blur-sm border-t border-slate-800 py-8 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">S</span>
          </div>
          <span className="text-white font-semibold">SmartSpend</span>
        </div>
        <div className="text-gray-400 text-sm">
          © {new Date().getFullYear()} SmartSpend. All rights reserved.
        </div>
      </footer>

      {/* ─── Custom CSS for animations ─────────────────────────────────────── */}
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
