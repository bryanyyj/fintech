// src/pages/Profile.jsx
import { useEffect, useState } from 'react'
import { useNavigate }          from 'react-router-dom'

export default function Profile() {
  const navigate = useNavigate()
  const user     = localStorage.getItem('currentUser')
  const [data, setData] = useState(null)

  useEffect(() => {
    const raw = localStorage.getItem(`questionnaire_${user}`)
    if (raw) setData(JSON.parse(raw))
  }, [user])

  const handleEdit = () => {
    // allow them to re-fill the questionnaire
    localStorage.setItem(`questionnaireDone_${user}`, 'false')
    // send them to the questionnaire route
    navigate('/questionnaire', { replace: true })
  }

  return (
    <div
      className="
        w-screen min-h-screen
        bg-gradient-to-br from-indigo-100 via-white to-pink-100
        flex items-center justify-center
        pt-16 px-4
      "
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-indigo-700">
          🗒️ Your Profile
        </h2>

        {!data ? (
          <p className="text-center text-gray-500">No profile data found.</p>
        ) : (
          <div className="space-y-4 text-sm">
            {/* Demographics */}
            <div><strong>Age Range:</strong> {data.demographics.ageRange}</div>
            <div><strong>Employment:</strong> {data.demographics.employment}</div>
            <div><strong>Household Size:</strong> {data.demographics.household}</div>
            <hr />

            {/* Expenses */}
            <div><strong>Monthly Income:</strong> ${data.expenses.income}</div>
            <div><strong>Monthly Spending:</strong> ${data.expenses.monthlySpending}</div>
            <div>
              <strong>Breakdown:</strong>
              <ul className="list-disc list-inside">
                <li>Housing: ${data.expenses.breakdown.housing}</li>
                <li>Food: ${data.expenses.breakdown.food}</li>
                <li>Transport: ${data.expenses.breakdown.transport}</li>
                <li>Utilities: ${data.expenses.breakdown.utilities}</li>
                <li>Entertainment: ${data.expenses.breakdown.entertainment}</li>
                <li>Other: ${data.expenses.breakdown.otherExpenses}</li>
              </ul>
            </div>
            <hr />

            {/* Savings */}
            <div><strong>Separate Savings Account?</strong> {data.savings.hasSavingsAcct}</div>
            <div><strong>Goals:</strong> {data.savings.goals.join(', ')}</div>
            <div><strong>Save Amount:</strong> ${data.savings.saveAmount}</div>
            <div><strong>Timeframe:</strong> {data.savings.saveTimeframe}</div>
            <hr />

            {/* Behavior */}
            <div><strong>Budget Discipline:</strong> {data.behavior.discipline}/5</div>
            <div><strong>Spending Style:</strong> {data.behavior.spendingStyle}</div>
            <div><strong>Review Frequency:</strong> {data.behavior.reviewFreq}</div>
            <hr />

            {/* Debt */}
            {data.debt.hasDebt === 'yes' ? (
              <>
                <div>
                  <strong>Debt Types:</strong>{' '}
                  {Object.entries(data.debt)
                    .filter(([k, v]) => k !== 'totalDebt' && v)
                    .map(([k]) => k.replace(/([A-Z])/g, ' $1'))
                    .join(', ')}
                </div>
                <div><strong>Total Debt:</strong> ${data.debt.totalDebt}</div>
              </>
            ) : (
              <div><strong>Debt:</strong> None</div>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={handleEdit}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Edit Profile
          </button>
          <button
            onClick={() => navigate('/history')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Back to History
          </button>
        </div>
      </div>
    </div>
  )
}
