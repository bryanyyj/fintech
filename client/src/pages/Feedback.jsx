// src/pages/Feedback.jsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Feedback() {
  const [entry, setEntry] = useState(null)
  const nav = useNavigate()

  useEffect(() => {
    const user       = localStorage.getItem('currentUser')
    const historyKey = `history_${user}`
    const goal       = localStorage.getItem(`goal_${user}`)
    const decision   = localStorage.getItem(`decision_${user}`)

    const score = Math.floor(Math.random() * 6) + 5
    let feedback = ''
    if (score >= 8) {
      feedback = "Excellent choice! You're aligned with your goals."
    } else if (score >= 6) {
      feedback = 'Not bad—stay mindful of your spending.'
    } else {
      feedback = 'High risk of overspending! Adjust your habits 👀'
    }

    const newEntry = { date: new Date().toLocaleDateString(), goal, decision, score, feedback }

    const history = JSON.parse(localStorage.getItem(historyKey) || '[]')
    history.unshift(newEntry)
    localStorage.setItem(historyKey, JSON.stringify(history))

    setEntry(newEntry)
  }, [])

  if (!entry) return null

  return (
    <div className="w-screen min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-300">
          🤖 Smart Score Analysis
        </h2>
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2 text-green-400">
            Smart Score: {entry.score}/10
          </h3>
          <p className="text-gray-200">{entry.feedback}</p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => nav('/history')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            View Full Summary 🧾
          </button>
        </div>
      </div>
    </div>
  )
}
