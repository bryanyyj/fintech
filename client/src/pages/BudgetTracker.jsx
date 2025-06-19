import { useState, useEffect } from 'react'

export default function BudgetTracker() {
  const [showInput, setShowInput]     = useState(false)
  const [showOutput, setShowOutput]   = useState(false)
  const [amount, setAmount]           = useState('')
  const [category, setCategory]       = useState('')
  const [desc, setDesc]               = useState('')
  const [score, setScore]             = useState(null)
  const [advice, setAdvice]           = useState('')
  const [entries, setEntries]         = useState([])

  const user = localStorage.getItem('currentUser')
  const key  = `budget_${user}`

  useEffect(() => {
    setEntries(JSON.parse(localStorage.getItem(key) || '[]'))
  }, [])

  function handleAddClick() {
    setShowInput(true)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const s = Math.floor(Math.random() * 10) + 1
    setScore(s)
    const fb =
      s >= 8
        ? 'Great choice! That aligns well with your goals.'
        : s >= 5
        ? 'Not bad, but watch your budget.'
        : 'Risky spend—consider prioritizing essentials.'
    setAdvice(fb)

    const newEntry = {
      date: new Date().toLocaleDateString(),
      amount,
      category,
      desc,
      score: s,
      advice: fb
    }
    const updated = [newEntry, ...entries]
    setEntries(updated)
    localStorage.setItem(key, JSON.stringify(updated))
    setShowInput(false)
    setShowOutput(true)
  }

  function closeOutput() {
    setShowOutput(false)
    setAmount(''); setCategory(''); setDesc('')
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
          💰 Budget Tracker
        </h2>
        <button
          onClick={handleAddClick}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition mb-4"
        >
          + Add Recent Purchase
        </button>

        {/* INPUT MODAL */}
        {showInput && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-sm bg-white p-6 rounded-lg space-y-4"
            >
              <h3 className="text-xl font-semibold">New Purchase</h3>
              <input
                type="number"
                placeholder="Amount spent"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded"
              >
                <option value="">Select category</option>
                <option>Basic Needs</option>
                <option>Exercise</option>
                <option>Studies</option>
                <option>Electronics</option>
              </select>
              <textarea
                placeholder="Description (what & why)"
                value={desc}
                onChange={e => setDesc(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowInput(false)}
                  className="px-4 py-2 rounded border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}

        {/* OUTPUT MODAL */}
        {showOutput && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="w-full max-w-sm bg-white p-6 rounded-lg space-y-4">
              <h3 className="text-xl font-semibold">AI Feedback</h3>
              <p><strong>Score:</strong> {score}/10</p>
              <p>{advice}</p>
              <button
                onClick={closeOutput}
                className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Got it
              </button>
            </div>
          </div>
        )}

        {/* Display entries below (if you want them visible) */}
        {entries.length > 0 && (
          <div className="mt-6 space-y-4">
            {entries.map((e, i) => (
              <div key={i} className="p-4 bg-gray-100 rounded-lg border border-gray-300">
                <p className="font-semibold">📅 {e.date}</p>
                <p>💰 ${e.amount} ({e.category})</p>
                <p>💬 {e.desc}</p>
                <p>✅ Score: {e.score}/10</p>
                <p>💡 {e.advice}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
