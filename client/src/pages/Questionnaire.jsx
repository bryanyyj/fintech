import { useState } from 'react'
import { ChevronLeft, ChevronRight, DollarSign, User, Home, TrendingUp, Target, CheckCircle } from 'lucide-react'

export default function Questionnaire() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    income: '',
    age: '',
    occupation: '',
    dependents: 0,
    location: '',
    rent: '',
    utilities: '',
    insurance: '',
    loan: '',
    otherFixed: '',
    food: 500,
    transport: 300,
    entertainment: 200,
    shopping: 150,
    travel: 100,
    health: 100,
    education: 50,
    goal: '',
    goalAmount: '',
    timeline: '',
    risk: '',
    savings: '',
  })

  const [spendingPriorities, setSpendingPriorities] = useState([
    'Food & Dining',
    'Transportation', 
    'Entertainment & Social',
    'Shopping & Fashion',
    'Travel & Experiences',
    'Health & Fitness',
    'Education & Development'
  ])

  const updateForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const next = () => setStep(s => s + 1)
  const prev = () => setStep(s => s - 1)

  const handleSubmit = e => {
    e.preventDefault()
    const profileData = {
      ...form,
      spendingPriorities,
      completedAt: new Date().toISOString()
    }
    // Note: In a real app, you'd send this to your backend
    console.log('Profile completed:', profileData)
    setStep(6) // Show completion screen
  }

  const getStepIcon = (stepNum) => {
    const icons = {
      1: User,
      2: User, 
      3: Home,
      4: TrendingUp,
      5: Target
    }
    return icons[stepNum] || User
  }

  const totalFixed = parseFloat(form.rent || 0) + parseFloat(form.utilities || 0) + 
                   parseFloat(form.insurance || 0) + parseFloat(form.loan || 0) + 
                   parseFloat(form.otherFixed || 0)

  const disposableIncome = parseFloat(form.income || 0) - totalFixed

  const dragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index)
  }

  const dragOver = (e) => {
    e.preventDefault()
  }

  const drop = (e, dropIndex) => {
    e.preventDefault()
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'))
    const newPriorities = [...spendingPriorities]
    const draggedItem = newPriorities[dragIndex]
    newPriorities.splice(dragIndex, 1)
    newPriorities.splice(dropIndex, 0, draggedItem)
    setSpendingPriorities(newPriorities)
  }

  if (step === 6) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-100 to-blue-100 p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Congratulations! 🎉
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Your financial profile has been created successfully.
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-6 text-left">
            <h3 className="font-semibold text-gray-800 mb-3">Profile Summary:</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Monthly Income:</span>
                <span className="font-medium ml-2">${form.income}</span>
              </div>
              <div>
                <span className="text-gray-600">Location:</span>
                <span className="font-medium ml-2">{form.location}</span>
              </div>
              <div>
                <span className="text-gray-600">Primary Goal:</span>
                <span className="font-medium ml-2">{form.goal}</span>
              </div>
              <div>
                <span className="text-gray-600">Risk Tolerance:</span>
                <span className="font-medium ml-2">{form.risk}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h4 className="font-semibold text-blue-800 mb-2">
              Your AI advisor is ready! 🤖
            </h4>
            <p className="text-blue-700 text-sm">
              Get personalized financial insights and recommendations tailored to your profile.
            </p>
          </div>

          <button 
            onClick={() => console.log('Navigate to dashboard')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Go to Dashboard
          </button>

          <div className="mt-6">
            <h4 className="font-medium text-gray-700 mb-2">Quick Tips for Getting Started:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Review your budget breakdown in the dashboard</li>
              <li>• Set up automatic savings transfers</li>
              <li>• Check your progress weekly</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-100 to-pink-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Financial Profile Setup</h1>
            <span className="text-sm text-gray-500">Step {step} of 5</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>

          {/* Step Icons */}
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map(num => {
              const Icon = getStepIcon(num)
              return (
                <div 
                  key={num}
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    num <= step ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              )
            })}
          </div>
        </div>

        <div className="space-y-4">
          {step === 1 && (
            <div className="text-center space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Welcome to Onboarding
                </h2>
                <p className="text-gray-600 mb-4">
                  Let's set up your financial profile to provide personalized advice and insights.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
                  <p><strong>Data Usage:</strong> Your information is encrypted and used only to provide personalized financial recommendations. We never share your data with third parties.</p>
                </div>
              </div>
              <button type="button" onClick={next} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Profile Setup</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Gross Income</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input 
                      placeholder="5000" 
                      type="number" 
                      value={form.income}
                      onChange={e => updateForm('income', e.target.value)} 
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <select 
                    value={form.age}
                    onChange={e => updateForm('age', e.target.value)} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                    required
                  >
                    <option value="">Select age range</option>
                    <option value="18-25">18-25</option>
                    <option value="26-35">26-35</option>
                    <option value="36-45">36-45</option>
                    <option value="46-55">46-55</option>
                    <option value="56-65">56-65</option>
                    <option value="65+">65+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                  <select 
                    value={form.occupation}
                    onChange={e => updateForm('occupation', e.target.value)} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                    required
                  >
                    <option value="">Select occupation</option>
                    <option value="Software Engineer">Software Engineer</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Healthcare Professional">Healthcare Professional</option>
                    <option value="Business Professional">Business Professional</option>
                    <option value="Freelancer">Freelancer</option>
                    <option value="Student">Student</option>
                    <option value="Retired">Retired</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Dependents</label>
                  <select 
                    value={form.dependents}
                    onChange={e => updateForm('dependents', e.target.value)} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                    required
                  >
                    {[0,1,2,3,4,5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location/City</label>
                <input 
                  placeholder="New York, NY" 
                  value={form.location}
                  onChange={e => updateForm('location', e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                  required 
                />
                <p className="text-xs text-gray-500 mt-1">Used for cost of living adjustments</p>
              </div>

              <div className="flex justify-between mt-6">
                <button type="button" onClick={prev} className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800">
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </button>
                <button type="button" onClick={next} className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg">
                  Next <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Fixed Expenses Setup</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rent/Mortgage</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input 
                      placeholder="1200" 
                      type="number" 
                      value={form.rent}
                      onChange={e => updateForm('rent', e.target.value)} 
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Utilities</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input 
                      placeholder="150" 
                      type="number" 
                      value={form.utilities}
                      onChange={e => updateForm('utilities', e.target.value)} 
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Insurance (Health, Car, etc.)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input 
                      placeholder="300" 
                      type="number" 
                      value={form.insurance}
                      onChange={e => updateForm('insurance', e.target.value)} 
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loan Payments</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input 
                      placeholder="250" 
                      type="number" 
                      value={form.loan}
                      onChange={e => updateForm('loan', e.target.value)} 
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                      required 
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Other Fixed Expenses</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input 
                      placeholder="100" 
                      type="number" 
                      value={form.otherFixed}
                      onChange={e => updateForm('otherFixed', e.target.value)} 
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                      required 
                    />
                  </div>
                </div>
              </div>

              {form.income && totalFixed > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">Auto-calculation:</h3>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Total Fixed Expenses:</span>
                      <span className="font-medium">${totalFixed.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Disposable Income:</span>
                      <span className="font-medium text-green-600">${disposableIncome.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-6">
                <button type="button" onClick={prev} className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800">
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </button>
                <button type="button" onClick={next} className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg">
                  Next <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Spending Priorities Survey</h2>
              
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-3">Drag & drop to rank your spending priorities:</h3>
                <div className="space-y-2">
                  {spendingPriorities.map((priority, index) => (
                    <div
                      key={priority}
                      draggable
                      onDragStart={(e) => dragStart(e, index)}
                      onDragOver={dragOver}
                      onDrop={(e) => drop(e, index)}
                      className="bg-white border-2 border-gray-200 rounded-lg p-3 cursor-move hover:border-indigo-300 transition-colors flex items-center"
                    >
                      <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                        {index + 1}
                      </span>
                      <span className="font-medium">{priority}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button type="button" onClick={prev} className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800">
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </button>
                <button type="button" onClick={next} className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg">
                  Next <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Financial Goals Setup</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Primary Financial Goal</label>
                  <select 
                    value={form.goal}
                    onChange={e => updateForm('goal', e.target.value)} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                    required
                  >
                    <option value="">Select your primary goal</option>
                    <option value="Build Emergency Fund">Build Emergency Fund</option>
                    <option value="Save for Vacation">Save for Vacation</option>
                    <option value="Buy a House">Buy a House</option>
                    <option value="Invest for Future">Invest for Future</option>
                    <option value="Pay Off Debt">Pay Off Debt</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Target Amount</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input 
                        placeholder="10000" 
                        type="number" 
                        value={form.goalAmount}
                        onChange={e => updateForm('goalAmount', e.target.value)} 
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                        required 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Target Timeline (months)</label>
                    <input 
                      placeholder="12" 
                      type="number" 
                      value={form.timeline}
                      onChange={e => updateForm('timeline', e.target.value)} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                      required 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Risk Tolerance</label>
                  <select 
                    value={form.risk}
                    onChange={e => updateForm('risk', e.target.value)} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                    required
                  >
                    <option value="">Select risk tolerance</option>
                    <option value="Conservative">Conservative - I prefer safer investments with lower returns</option>
                    <option value="Moderate">Moderate - I'm okay with some risk for better returns</option>
                    <option value="Aggressive">Aggressive - I'm comfortable with high risk for potentially high returns</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Savings Amount</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input 
                      placeholder="5000" 
                      type="number" 
                      value={form.savings}
                      onChange={e => updateForm('savings', e.target.value)} 
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                      required 
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button type="button" onClick={prev} className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800">
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </button>
                <button 
                  onClick={handleSubmit}
                  className="flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                >
                  Complete Setup <CheckCircle className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}