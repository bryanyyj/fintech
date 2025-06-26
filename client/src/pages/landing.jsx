import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">

      {/* ─── Navbar ─────────────────────────────────────────────────────────── */}
      <header className="flex items-center justify-between px-8 py-6">
        <h1 className="text-2xl md:text-3xl font-bold">SmartSpend</h1>
        <nav className="space-x-6">
          <Link to="/login" className="hover:text-white">
            Log In
          </Link>
          <Link
            to="/register"
            className="bg-blue-500 text-gray-900 font-medium px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
          >
            Sign Up
          </Link>
        </nav>
      </header>

      {/* ─── Hero ───────────────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col-reverse md:flex-row items-center px-8 md:px-16 mt-12">
        {/* Text */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-5xl font-semibold text-white">
            Your AI‐Powered Financial Coach
          </h2>
          <p className="text-lg text-gray-300 max-w-lg">
            Track spending, get instant Smart Scores, set ambitious savings goals,
            and receive personalized AI insights in a sleek, dark-mode interface.
          </p>
          <Link
            to="/register"
            className="inline-block bg-blue-500 text-gray-900 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transform hover:-translate-y-1 transition"
          >
            Get Started
          </Link>
        </div>

        {/* Image */}
        <div className="md:w-1/2 flex justify-center mb-12 md:mb-0">
         <img
   src="https://source.unsplash.com/600x400/?finance,planning"
   alt="Financial planning illustration"
   className="rounded-xl shadow-2xl w-full max-w-sm opacity-90"
 />
        </div>
      </main>

      {/* ─── Features ───────────────────────────────────────────────────────── */}
      <section className="bg-gray-800 py-16 px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h3 className="text-3xl font-bold">Key Features</h3>
          <div className="grid gap-8 md:grid-cols-3 mt-12">
            {[
              {
                num: '1',
                title: 'Smart Scoring',
                desc: 'Describe your spend in plain English and get an AI‐powered Smart Score with context (impulse, necessity, budget fit).',
                accent: 'text-pink-400'
              },
              {
                num: '2',
                title: 'Goal Tracking',
                desc: 'Set weekly, monthly, or yearly targets, visualize progress, and stay motivated with streaks and reminders.',
                accent: 'text-green-400'
              },
              {
                num: '3',
                title: 'Auto Categorization',
                desc: 'Upload statements or connect your bank. SmartSpend auto‐tags transactions and flags high‐risk spending.',
                accent: 'text-blue-400'
              }
            ].map(({ num, title, desc, accent }) => (
              <div
                key={num}
                className="p-6 bg-gray-700 border border-gray-600 rounded-lg hover:shadow-xl transition"
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 mb-4 mx-auto rounded-full bg-gray-600 ${accent}`}
                >
                  <span className="text-lg font-bold">{num}</span>
                </div>
                <h4 className="text-xl font-semibold mb-2">{title}</h4>
                <p className="text-gray-300">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ──────────────────────────────────────────────────── */}
      <section className="py-16 px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto space-y-8 text-center">
          <h3 className="text-3xl font-bold text-white">What Our Users Say</h3>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                quote:
                  '“SmartSpend’s dark-mode dashboard is a game-changer. The AI tips keep me honest!”',
                author: '— Sarah J.'
              },
              {
                quote:
                  '“I smashed my travel fund goal in record time thanks to the monthly breakdowns.”',
                author: '— Michael L.'
              }
            ].map((t, i) => (
              <blockquote
                key={i}
                className="p-6 bg-gray-800 border-l-4 border-blue-500 rounded-lg shadow"
              >
                <p className="text-gray-300 italic mb-4">{t.quote}</p>
                <cite className="text-gray-400">{t.author}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="bg-gray-900 text-gray-500 py-6 text-center">
        © {new Date().getFullYear()} SmartSpend. All rights reserved.
      </footer>
    </div>
  )
}
