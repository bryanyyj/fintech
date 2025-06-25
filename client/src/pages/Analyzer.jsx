import { useState } from 'react'

export default function Analyzer() {
  const [decisionText, setDecisionText] = useState('')
  const [result, setResult] = useState(null)

  const handleAnalyze = (e) => {
    e.preventDefault()

    // Mocked result for now, integrate actual API later
    const mockResult = {
      score: 5,
      reason: "Buying a new iPhone using a credit card can lead to high interest charges...",
      tip: "Consider saving up and buying the iPhone outright to avoid paying interest..."
    }
    setResult(mockResult)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-pink-50 to-white p-6">
      <div className="max-w-3xl mx-auto mt-20 bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">🧠 Spending Analyzer</h2>

        <form onSubmit={handleAnalyze} className="space-y-4">
          <textarea
            rows="4"
            placeholder="Describe a financial decision you're considering..."
            value={decisionText}
            onChange={(e) => setDecisionText(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          ></textarea>

          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Analyze Decision
            </button>
          </div>
        </form>

        {result && (
          <div className="mt-8 bg-indigo-50 border border-indigo-200 p-6 rounded-lg shadow-inner">
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">💡 Result</h3>
            <p className="mb-2"><strong>Score:</strong> <span className="text-indigo-600">{result.score} / 10</span></p>
            <p className="mb-2"><strong>Reason:</strong> {result.reason}</p>
            <p><strong>Tip:</strong> {result.tip}</p>
          </div>
        )}
      </div>
    </div>
  )
}
