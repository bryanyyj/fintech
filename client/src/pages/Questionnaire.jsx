// src/pages/Questionnaire.jsx
import { useState }    from 'react'
import { useNavigate } from 'react-router-dom'

export default function Questionnaire() {
  const navigate = useNavigate()
  const user     = localStorage.getItem('currentUser')

  // 1️⃣ Demographics
  const [ageRange,     setAgeRange]     = useState('')
  const [employment,   setEmployment]   = useState('')
  const [household,    setHousehold]    = useState('')

  // 2️⃣ Income & Expenses
  const [income,           setIncome]           = useState('')
  const [monthlySpending,  setMonthlySpending]  = useState('')
  const [housing,          setHousing]          = useState('')
  const [food,             setFood]             = useState('')
  const [transport,        setTransport]        = useState('')
  const [utilities,        setUtilities]        = useState('')
  const [entertainment,    setEntertainment]    = useState('')
  const [otherExpenses,    setOtherExpenses]    = useState('')

  // 3️⃣ Savings & Goals
  const [hasSavingsAcct,   setHasSavingsAcct]   = useState('')
  const presetGoals = [
    'Emergency fund',
    'Paying off debt',
    'Home purchase',
    'Vacation/travel',
    'Retirement'
  ]
  const [goals,            setGoals]            = useState([])
  const [otherGoalText,    setOtherGoalText]    = useState('')
  const [saveAmount,       setSaveAmount]       = useState('')
  const [saveTimeframe,    setSaveTimeframe]    = useState('')

  // 4️⃣ Behavior
  const [discipline,       setDiscipline]       = useState('')
  const [spendingStyle,    setSpendingStyle]    = useState('')
  const [reviewFreq,       setReviewFreq]       = useState('')

  // 5️⃣ Debt
  const [hasDebt,          setHasDebt]          = useState('') // 'yes' or 'no'
  const [debts,            setDebts]            = useState({
    student:    false,
    creditCard: false,
    auto:       false,
    mortgage:   false,
    personal:   false,
  })
  const [totalDebt,        setTotalDebt]        = useState('')

  // Helpers
  function toggleGoal(goal) {
    if (goals.includes(goal)) {
      setGoals(goals.filter(g => g !== goal))
    } else if (goals.length < 3) {
      setGoals([...goals, goal])
    }
  }
  function handleDebtChange(e) {
    const { name, checked } = e.target
    setDebts(prev => ({ ...prev, [name]: checked }))
  }

  // On submit
  function handleSubmit(e) {
    e.preventDefault()
    const finalGoals = goals.map(g => g === 'Other' ? otherGoalText : g)

    const data = {
      demographics: { ageRange, employment, household },
      expenses: {
        income,
        monthlySpending,
        breakdown: {
          housing,
          food,
          transport,
          utilities,
          entertainment,
          otherExpenses
        }
      },
      savings: {
        hasSavingsAcct,
        goals: finalGoals,
        saveAmount,
        saveTimeframe
      },
      behavior: { discipline, spendingStyle, reviewFreq },
      debt:
        hasDebt === 'yes'
          ? { ...debts, totalDebt }
          : { hasDebt: 'no' }
    }

    localStorage.setItem(`questionnaire_${user}`, JSON.stringify(data))
    localStorage.setItem(`questionnaireDone_${user}`, 'true')
    navigate('/', { replace: true })
  }

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 flex items-start justify-center pt-16 px-4">
      <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-xl space-y-6">
        <h2 className="text-3xl font-bold text-center text-indigo-700">
          📝 Tell Us About Yourself
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1️⃣ Demographics */}
          <div>
            <label className="block font-medium">Age range:</label>
            <select
              required value={ageRange}
              onChange={e => setAgeRange(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
            >
              <option value="">Select…</option>
              <option>Under 18</option>
              <option>18–24</option>
              <option>25–34</option>
              <option>35–44</option>
              <option>45–54</option>
              <option>55–64</option>
              <option>65+</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Employment status:</label>
            <select
              required value={employment}
              onChange={e => setEmployment(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
            >
              <option value="">Select…</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Self-employed</option>
              <option>Student</option>
              <option>Unemployed</option>
              <option>Retired</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">Household size:</label>
            <select
              required value={household}
              onChange={e => setHousehold(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
            >
              <option value="">Select…</option>
              <option>Just me</option>
              <option>Two people</option>
              <option>Three people</option>
              <option>Four people</option>
              <option>Five or more</option>
            </select>
          </div>

          {/* 2️⃣ Income & Expenses */}
          <div>
            <label className="block font-medium">Monthly income ($):</label>
            <input
              type="number" required
              value={income}
              onChange={e => setIncome(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
              placeholder="e.g. 3000"
            />
          </div>

          <div>
            <label className="block font-medium">Rough monthly spending ($):</label>
            <input
              type="number" required
              value={monthlySpending}
              onChange={e => setMonthlySpending(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
              placeholder="e.g. 2000"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              ['Housing', housing, setHousing],
              ['Food', food, setFood],
              ['Transport', transport, setTransport],
              ['Utilities', utilities, setUtilities],
              ['Entertainment', entertainment, setEntertainment],
              ['Other expenses', otherExpenses, setOtherExpenses],
            ].map(([label, val, setter]) => (
              <div key={label}>
                <label className="block font-medium">{label} ($):</label>
                <input
                  type="number"
                  value={val}
                  onChange={e => setter(e.target.value)}
                  className="w-full mt-1 p-2 border rounded"
                  placeholder="0"
                />
              </div>
            ))}
          </div>

          {/* 3️⃣ Savings & Goals */}
          <div>
            <label className="block font-medium">
              Do you keep a separate savings account?
            </label>
            <select
              required value={hasSavingsAcct}
              onChange={e => setHasSavingsAcct(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
            >
              <option value="">Select…</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">
              What are your top savings goals? (up to 3)
            </label>
            <div className="flex flex-wrap gap-3 mt-1">
              {presetGoals.map(goal => (
                <label key={goal} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="mr-1"
                    checked={goals.includes(goal)}
                    disabled={!goals.includes(goal) && goals.length >= 3}
                    onChange={() => toggleGoal(goal)}
                  />
                  {goal}
                </label>
              ))}
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="mr-1"
                  checked={goals.includes('Other')}
                  disabled={!goals.includes('Other') && goals.length >= 3}
                  onChange={() => toggleGoal('Other')}
                /> Other
              </label>
            </div>
            {goals.includes('Other') && (
              <input
                type="text" required
                value={otherGoalText}
                onChange={e => setOtherGoalText(e.target.value)}
                className="w-full mt-2 p-2 border rounded"
                placeholder="Please specify"
              />
            )}
          </div>

          <div>
            <label className="block font-medium">
              How much would you like to save? ($)
            </label>
            <input
              type="number" required
              value={saveAmount}
              onChange={e => setSaveAmount(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
              placeholder="e.g. 1000"
            />
          </div>

          <div>
            <label className="block font-medium">
              What’s your target timeframe?
            </label>
            <select
              required value={saveTimeframe}
              onChange={e => setSaveTimeframe(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
            >
              <option value="">Select…</option>
              <option>1–3 months</option>
              <option>6 months</option>
              <option>1 year</option>
              <option>2+ years</option>
            </select>
          </div>

          {/* 4️⃣ Behavior */}
          <div>
            <label className="block font-medium">
              On a scale of 1–5, how easy is it for you to stick to a budget?
            </label>
            <select
              required value={discipline}
              onChange={e => setDiscipline(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
            >
              <option value="">Select…</option>
              {[1,2,3,4,5].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium">
              Which best describes your spending style?
            </label>
            <select
              required value={spendingStyle}
              onChange={e => setSpendingStyle(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
            >
              <option value="">Select…</option>
              <option>Cautious (essentials only)</option>
              <option>Balanced (treat myself sometimes)</option>
              <option>Impulsive (often unplanned)</option>
            </select>
          </div>

          <div>
            <label className="block font-medium">
              How often do you review your statements?
            </label>
            <select
              required value={reviewFreq}
              onChange={e => setReviewFreq(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
            >
              <option value="">Select…</option>
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Rarely</option>
            </select>
          </div>

          {/* 5️⃣ Debt */}
          <div>
            <label className="block font-medium">
              Do you currently have any debt?
            </label>
            <div className="flex gap-6 mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio" name="hasDebt"
                  value="yes"
                  checked={hasDebt==='yes'}
                  onChange={()=>setHasDebt('yes')}
                  className="mr-1"
                /> Yes
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio" name="hasDebt"
                  value="no"
                  checked={hasDebt==='no'}
                  onChange={()=>setHasDebt('no')}
                  className="mr-1"
                /> No
              </label>
            </div>
          </div>

          {hasDebt === 'yes' && (
            <>
              <div>
                <label className="block font-medium">
                  Which types? (check all that apply)
                </label>
                <div className="flex flex-wrap gap-4 mt-1">
                  {Object.entries(debts).map(([key, val]) => (
                    <label key={key} className="inline-flex items-center">
                      <input
                        type="checkbox" name={key}
                        checked={val}
                        onChange={handleDebtChange}
                        className="mr-1"
                      /> {key.replace(/([A-Z])/g,' $1')}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-medium">
                  Total outstanding debt ($):
                </label>
                <input
                  type="number"
                  value={totalDebt}
                  onChange={e => setTotalDebt(e.target.value)}
                  className="w-full mt-1 p-2 border rounded"
                  placeholder="e.g. 15000"
                />
              </div>
            </>
          )}

          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Submit Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
