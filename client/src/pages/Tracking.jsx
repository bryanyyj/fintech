// src/pages/Tracking.jsx
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Tracking() {
  const [history, setHistory] = useState([])
  const nav = useNavigate()

  useEffect(() => {
    const user       = localStorage.getItem('currentUser')
    const historyKey = `history_${user}`
    setHistory(JSON.parse(localStorage.getItem(historyKey) || '[]'))
  }, [])

  return (
    <div
      className="
        w-screen
        min-h-screen
        bg-gradient-to-br from-indigo-100 via-white to-pink-100
        flex items-center justify-center
        pt-16    /* leave space for navbar */
        px-4
      "
    >
      <div
        className="
          w-full
          max-w-md
          bg-white rounded-2xl shadow-xl
          p-8
        "
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
          🗂️ Your Smart Spend History
        </h2>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {history.length === 0 ? (
            <p className="text-center">No entries yet.</p>
          ) : (
            history.map((e, i) => (
              <div
                key={i}
                className="p-4 bg-gray-100 rounded-lg border border-gray-300"
              >
                <p className="font-semibold">📅 {e.date}</p>
                <p>🎯 Goal: {e.goal}</p>
                <p>💬 Decision: {e.decision}</p>
                <p>✅ Score: {e.score}/10</p>
                <p>💡 Feedback: {e.feedback}</p>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => nav('/')}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Start New Entry ➕
          </button>
        </div>
      </div>
    </div>
  )
}
