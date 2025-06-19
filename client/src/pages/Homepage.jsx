// src/pages/Homepage.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Homepage() {
  const [amount, setAmount]     = useState('')
  const [timeframe, setTimeframe] = useState('')
  const nav = useNavigate()

  function submitGoal(e) {
    e.preventDefault()
    if (!amount || !timeframe) {
      alert('Please enter an amount and select a time frame.')
      return
    }
    const user     = localStorage.getItem('currentUser')
    const fullGoal = `Save $${amount} ${timeframe}`
    localStorage.setItem(`goal_${user}`, fullGoal)
    nav('/analyzer')
  }

  const fieldClass =
    'w-full px-4 py-2 bg-white text-gray-900 placeholder-gray-500 ' +
    'border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400'

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
          🎯 What’s your saving goal?
        </h2>
        <form className="space-y-4" onSubmit={submitGoal}>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className={fieldClass}
            required
          />
          <select
            value={timeframe}
            onChange={e => setTimeframe(e.target.value)}
            className={fieldClass}
            required
          >
            <option value="">Select a time frame</option>
            <option value="this week">By end of this week</option>
            <option value="this month">By end of this month</option>
            <option value="this year">By end of this year</option>
          </select>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Set Goal & Continue →
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
