// src/pages/Analyzer.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Analyzer() {
  const [file, setFile] = useState(null)
  const [text, setText] = useState('')
  const nav = useNavigate()

  function processDecision(e) {
    e.preventDefault()
    if (!file && !text.trim()) {
      alert('Please upload a file or describe your spending.')
      return
    }
    const user         = localStorage.getItem('currentUser')
    const decisionText = text || '(file uploaded)'
    localStorage.setItem(`decision_${user}`, decisionText)
    nav('/feedback')
  }

  const fieldClass =
    'w-full px-4 py-2 bg-white text-gray-900 placeholder-gray-500 ' +
    'border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400'

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
          📂 Decision Panel
        </h2>
        <form className="space-y-4" onSubmit={processDecision}>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.csv"
            onChange={e => setFile(e.target.files[0])}
            className="w-full text-gray-900"
          />
          <textarea
            rows={4}
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="What did you spend on & why?"
            className={fieldClass}
            required={!file}
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Analyze My Decision 🧠
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
