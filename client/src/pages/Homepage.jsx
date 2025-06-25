import { useNavigate } from 'react-router-dom'

export default function Homepage() {
  const navigate = useNavigate()

  const features = [
    {
      title: '💡 Analyzer',
      desc: 'Get advice on your financial decisions with AI.',
      route: '/analyzer'
    },
    {
      title: '📊 Budget Tracker',
      desc: 'Track your monthly income, expenses and savings.',
      route: '/budget'
    },
    {
      title: '📝 Feedback',
      desc: 'See recommendations based on your spending habits.',
      route: '/feedback'
    },
    {
      title: '📜 History',
      desc: 'Review past decisions and financial scores.',
      route: '/history'
    },
    {
      title: '👤 Profile',
      desc: 'View and update your personal information.',
      route: '/profile'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-4">
          Welcome Back 👋
        </h1>
        <p className="text-center text-gray-600 mb-10">
          What would you like to do today?
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ title, desc, route }) => (
            <div
              key={title}
              onClick={() => navigate(route)}
              className="cursor-pointer bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 border hover:border-indigo-300"
            >
              <h2 className="text-xl font-semibold text-indigo-600 mb-2">
                {title}
              </h2>
              <p className="text-gray-700">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
