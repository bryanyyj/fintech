import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const occupations = [
  'Student', 'Engineer', 'Teacher', 'Doctor', 'Nurse', 'Designer', 'Developer', 'Manager', 'Sales', 'Finance', 'Other'
];
const goals = [
  'Build Emergency Fund', 'Save for Vacation', 'Buy a House', 'Invest for Future', 'Pay Off Debt'
];
const riskLevels = ['Conservative', 'Moderate', 'Aggressive'];
const ageOptions = Array.from({length: 48}, (_, i) => i + 18).map(a => a > 65 ? '65+' : a.toString());
const dependents = ['0', '1', '2', '3', '4', '5+'];
const categories = [
  'Food & Dining', 'Transportation', 'Entertainment & Social', 'Shopping & Fashion',
  'Travel & Experiences', 'Health & Fitness', 'Education & Development'
];

function Progress({step, total}) {
  return (
    <div className="mb-6 text-center">
      <div className="text-sm text-purple-300 mb-1">Step {step} of {total}</div>
      <div className="w-full bg-slate-700 rounded-full h-2">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{width: `${(step/total)*100}%`}}></div>
      </div>
    </div>
  );
}

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    income: 3000,
    age: '',
    occupation: '',
    dependents: '',
    city: '',
    rent: '',
    utilities: '',
    insurance: '',
    loans: '',
    otherFixed: '',
    priorities: [...categories],
    spendFood: 0,
    spendTransport: 0,
    spendEntertainment: 0,
    spendShopping: 0,
    goal: '',
    targetAmount: '',
    targetMonths: '',
    risk: '',
    savings: '',
  });
  const [dragIdx, setDragIdx] = useState(null);
  const [error, setError] = useState('');

  // Calculations
  const totalFixed = [form.rent, form.utilities, form.insurance, form.loans, form.otherFixed]
    .map(Number).filter(Boolean).reduce((a,b)=>a+b,0);
  const disposable = form.income - totalFixed;

  // Handlers
  const handleChange = e => setForm(f => ({...f, [e.target.name]: e.target.value}));
  const handleSlider = (name, value) => setForm(f => ({...f, [name]: value}));
  const handleDragStart = idx => setDragIdx(idx);
  const handleDrop = idx => {
    if (dragIdx === null || dragIdx === idx) return;
    const newPriorities = [...form.priorities];
    const [removed] = newPriorities.splice(dragIdx, 1);
    newPriorities.splice(idx, 0, removed);
    setForm(f => ({...f, priorities: newPriorities}));
    setDragIdx(null);
  };

  // Step 2 validation
  const handleStep2Continue = () => {
    if (
      !form.income ||
      !form.age ||
      !form.occupation ||
      !form.dependents ||
      !form.city
    ) {
      setError('Please fill in all fields before continuing.');
      return;
    }
    setError('');
    setStep(3);
  };
  // Step 3 validation
  const handleStep3Continue = () => {
    if (
      !form.rent ||
      !form.utilities ||
      !form.insurance ||
      !form.loans ||
      !form.otherFixed
    ) {
      setError('Please fill in all fields before continuing.');
      return;
    }
    setError('');
    setStep(4);
  };
  // Step 4 validation
  const handleStep4Continue = () => {
    if (
      !form.priorities.length ||
      form.spendFood === '' ||
      form.spendTransport === '' ||
      form.spendEntertainment === '' ||
      form.spendShopping === ''
    ) {
      setError('Please fill in all fields before continuing.');
      return;
    }
    setError('');
    setStep(5);
  };
  // Step 5 validation
  const handleStep5Continue = () => {
    if (
      !form.goal ||
      !form.targetAmount ||
      !form.targetMonths ||
      !form.risk ||
      !form.savings
    ) {
      setError('Please fill in all fields before finishing.');
      return;
    }
    setError('');
    setStep(6);
  };

  // Steps
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-auto p-4">
      <div className="w-full max-w-2xl bg-slate-800/80 rounded-2xl p-8 shadow-2xl">
        {step === 1 && (
          <>
            <Progress step={1} total={5} />
            <h2 className="text-2xl font-bold mb-4">Let's set up your financial profile</h2>
            <p className="mb-6 text-gray-300">We use your info to personalize your experience. Your data is secure and only used to help you reach your goals.</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold mt-6" onClick={()=>setStep(2)}>Continue</button>
          </>
        )}
        {step === 2 && (
          <>
            <Progress step={2} total={5} />
            <h2 className="text-xl font-bold mb-4">Basic Profile Setup</h2>
            {error && <div className="text-red-400 mb-2">{error}</div>}
            <div className="mb-4">
              <label className="block mb-1">Monthly Gross Income: <span className="font-bold text-blue-400">{form.income >= 20000 ? '20000 and above' : `$${form.income}`}</span></label>
              <input type="range" min={0} max={20000} step={100} value={form.income > 20000 ? 20000 : form.income} onChange={e=>handleSlider('income', Math.min(Number(e.target.value), 20000))} className="w-full" />
              <input type="number" min={0} max={20000} step={100} value={form.income > 20000 ? 20000 : form.income} onChange={e=>handleSlider('income', Math.min(Number(e.target.value), 20000))} className="w-full mt-2 p-2 rounded bg-slate-700 border border-slate-600" />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Age</label>
              <input
                name="age"
                type="number"
                value={form.age}
                onChange={handleChange}
                className="w-full p-2 rounded bg-slate-700 border border-slate-600"
                placeholder="Enter your age"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Occupation</label>
              <select name="occupation" value={form.occupation} onChange={handleChange} className="w-full p-2 rounded bg-slate-700 border border-slate-600">
                <option value="">Select occupation</option>
                {occupations.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Number of Dependents</label>
              <select name="dependents" value={form.dependents} onChange={handleChange} className="w-full p-2 rounded bg-slate-700 border border-slate-600">
                <option value="">Select</option>
                {dependents.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Location/City</label>
              <input name="city" value={form.city} onChange={handleChange} className="w-full p-2 rounded bg-slate-700 border border-slate-600" placeholder="Enter your city" />
            </div>
            <div className="flex justify-between mt-8">
              <button className="text-gray-400" onClick={()=>setStep(1)}>Back</button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold" onClick={handleStep2Continue}>Continue</button>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <Progress step={3} total={5} />
            <h2 className="text-xl font-bold mb-4">Fixed Expenses Setup</h2>
            {error && <div className="text-red-400 mb-2">{error}</div>}
            <div className="mb-4"><label>Rent/Mortgage ($)</label><input name="rent" value={form.rent} onChange={handleChange} type="number" className="w-full p-2 rounded bg-slate-700 border border-slate-600" /></div>
            <div className="mb-4"><label>Utilities ($)</label><input name="utilities" value={form.utilities} onChange={handleChange} type="number" className="w-full p-2 rounded bg-slate-700 border border-slate-600" /></div>
            <div className="mb-4"><label>Insurance (Health, Car, etc.) ($)</label><input name="insurance" value={form.insurance} onChange={handleChange} type="number" className="w-full p-2 rounded bg-slate-700 border border-slate-600" /></div>
            <div className="mb-4"><label>Loan Payments ($)</label><input name="loans" value={form.loans} onChange={handleChange} type="number" className="w-full p-2 rounded bg-slate-700 border border-slate-600" /></div>
            <div className="mb-4"><label>Other Fixed Expenses ($)</label><input name="otherFixed" value={form.otherFixed} onChange={handleChange} type="number" className="w-full p-2 rounded bg-slate-700 border border-slate-600" /></div>
            <div className="mb-4 text-blue-300">Total Fixed Expenses: <span className="font-bold">${totalFixed}</span></div>
            <div className="mb-4 text-green-300">Disposable Income: <span className="font-bold">${disposable}</span></div>
            <div className="flex justify-between mt-8">
              <button className="text-gray-400" onClick={()=>setStep(2)}>Back</button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold" onClick={handleStep3Continue}>Continue</button>
            </div>
          </>
        )}
        {step === 4 && (
          <>
            <Progress step={4} total={5} />
            <h2 className="text-xl font-bold mb-4">Spending Priorities Survey</h2>
            {error && <div className="text-red-400 mb-2">{error}</div>}
            <div className="mb-6">
              <label className="block mb-2">Rank your spending priorities (drag to reorder):</label>
              <ul>
                {form.priorities.map((cat, idx) => (
                  <li
                    key={cat}
                    draggable
                    onDragStart={()=>handleDragStart(idx)}
                    onDragOver={e=>e.preventDefault()}
                    onDrop={()=>handleDrop(idx)}
                    className="mb-2 p-2 bg-slate-700 rounded cursor-move border border-slate-600"
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <label>How much do you typically spend monthly on:</label>
              <div className="mt-2">Food: <input type="range" min={0} max={2000} step={10} value={form.spendFood} onChange={e=>handleSlider('spendFood', Number(e.target.value))} /> <span className="text-blue-400 font-bold">${form.spendFood}</span></div>
              <div className="mt-2">Transport: <input type="range" min={0} max={1000} step={10} value={form.spendTransport} onChange={e=>handleSlider('spendTransport', Number(e.target.value))} /> <span className="text-blue-400 font-bold">${form.spendTransport}</span></div>
              <div className="mt-2">Entertainment: <input type="range" min={0} max={1500} step={10} value={form.spendEntertainment} onChange={e=>handleSlider('spendEntertainment', Number(e.target.value))} /> <span className="text-blue-400 font-bold">${form.spendEntertainment}</span></div>
              <div className="mt-2">Shopping: <input type="range" min={0} max={1000} step={10} value={form.spendShopping} onChange={e=>handleSlider('spendShopping', Number(e.target.value))} /> <span className="text-blue-400 font-bold">${form.spendShopping}</span></div>
            </div>
            <div className="flex justify-between mt-8">
              <button className="text-gray-400" onClick={()=>setStep(3)}>Back</button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold" onClick={handleStep4Continue}>Continue</button>
            </div>
          </>
        )}
        {step === 5 && (
          <>
            <Progress step={5} total={5} />
            <h2 className="text-xl font-bold mb-4">Financial Goals Setup</h2>
            {error && <div className="text-red-400 mb-2">{error}</div>}
            <div className="mb-4">
              <label>Primary Financial Goal</label>
              <select name="goal" value={form.goal} onChange={handleChange} className="w-full p-2 rounded bg-slate-700 border border-slate-600">
                <option value="">Select your primary goal</option>
                {goals.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="mb-4"><label>Target Amount ($)</label><input name="targetAmount" value={form.targetAmount} onChange={handleChange} type="number" className="w-full p-2 rounded bg-slate-700 border border-slate-600" /></div>
            <div className="mb-4"><label>Target Timeline (months)</label><input name="targetMonths" value={form.targetMonths} onChange={handleChange} type="number" className="w-full p-2 rounded bg-slate-700 border border-slate-600" /></div>
            <div className="mb-4">
              <label>Risk Tolerance</label>
              <select name="risk" value={form.risk} onChange={handleChange} className="w-full p-2 rounded bg-slate-700 border border-slate-600">
                <option value="">Select risk tolerance</option>
                {riskLevels.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="mb-4"><label>Current Savings Amount ($)</label><input name="savings" value={form.savings} onChange={handleChange} type="number" className="w-full p-2 rounded bg-slate-700 border border-slate-600" /></div>
            <div className="flex justify-between mt-8">
              <button className="text-gray-400" onClick={()=>setStep(4)}>Back</button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold" onClick={async ()=>{
                handleStep5Continue();
                if (
                  form.goal &&
                  form.targetAmount &&
                  form.targetMonths &&
                  form.risk &&
                  form.savings
                ) {
                  // POST profile
                  const userId = localStorage.getItem('userId');
                  if (!userId) {
                    setError('User ID not found. Please log in again.');
                    return;
                  }
                  // Calculate total_fixed and disposable_income
                  const total_fixed = [form.rent, form.utilities, form.insurance, form.loans, form.otherFixed]
                    .map(Number).filter(Boolean).reduce((a,b)=>a+b,0);
                  const disposable_income = Number(form.income) - total_fixed;
                  // Map priorities to rank fields
                  const rankFields = {
                    rank_food: null,
                    rank_transport: null,
                    rank_entertainment: null,
                    rank_shopping: null,
                    rank_travel: null,
                    rank_health: null,
                    rank_education: null
                  };
                  (form.priorities || []).forEach((item, idx) => {
                    const rank = idx + 1;
                    if (item.includes('Food')) rankFields.rank_food = rank;
                    else if (item.includes('Transport')) rankFields.rank_transport = rank;
                    else if (item.includes('Entertainment')) rankFields.rank_entertainment = rank;
                    else if (item.includes('Shopping')) rankFields.rank_shopping = rank;
                    else if (item.includes('Travel')) rankFields.rank_travel = rank;
                    else if (item.includes('Health')) rankFields.rank_health = rank;
                    else if (item.includes('Education')) rankFields.rank_education = rank;
                  });
                  const profileData = {
                    user_id: userId,
                    monthly_income: form.income,
                    age_group: form.age,
                    occupation: form.occupation,
                    num_dependents: form.dependents,
                    city: form.city,
                    rent_mortgage: form.rent,
                    utilities: form.utilities,
                    insurance: form.insurance,
                    loan_payments: form.loans,
                    other_fixed: form.otherFixed,
                    total_fixed,
                    disposable_income,
                    spend_food: form.spendFood,
                    spend_transport: form.spendTransport,
                    spend_entertainment: form.spendEntertainment,
                    spend_shopping: form.spendShopping,
                    spend_travel: 0,
                    spend_health: 0,
                    spend_education: 0,
                    ...rankFields,
                    goal_type: form.goal,
                    target_amount: form.targetAmount,
                    timeline_months: form.targetMonths,
                    risk_tolerance: form.risk,
                    current_savings: form.savings
                  };
                  try {
                    const res = await fetch('http://localhost:3000/api/profile', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      credentials: 'include',
                      body: JSON.stringify(profileData)
                    });
                    if (!res.ok) throw new Error('Failed to submit profile');
                    setStep(6);
                  } catch (err) {
                    setError('There was a problem saving your profile.');
                  }
                }
              }}>Finish</button>
            </div>
          </>
        )}
        {step === 6 && (
          <>
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4 text-green-400">Congratulations!</h2>
              <div className="mb-4">Your onboarding is complete. Your AI advisor is ready!</div>
              <div className="mb-6 text-left bg-slate-700/60 rounded-xl p-4">
                <div className="font-semibold mb-2 text-purple-300">Profile Summary:</div>
                <div>Income: <span className="text-blue-400 font-bold">${form.income}</span></div>
                <div>Age: {form.age}</div>
                <div>Occupation: {form.occupation}</div>
                <div>Dependents: {form.dependents}</div>
                <div>City: {form.city}</div>
                <div>Total Fixed Expenses: <span className="text-blue-400 font-bold">${totalFixed}</span></div>
                <div>Disposable Income: <span className="text-green-400 font-bold">${disposable}</span></div>
                <div>Spending Priorities: {form.priorities.join(', ')}</div>
                <div>Food: ${form.spendFood}, Transport: ${form.spendTransport}, Entertainment: ${form.spendEntertainment}, Shopping: ${form.spendShopping}</div>
                <div>Goal: {form.goal}, Target: ${form.targetAmount} in {form.targetMonths} months, Risk: {form.risk}, Savings: ${form.savings}</div>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold mt-4" onClick={()=>navigate('/home', { replace: true })}>Go to Dashboard</button>
              <div className="mt-6 text-gray-400">Tip: You can update your profile and goals anytime in Settings.</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 