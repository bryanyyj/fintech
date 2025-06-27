// src/pages/Profile.jsx
import { useEffect, useState } from 'react'
import { useNavigate }          from 'react-router-dom'

export default function Profile() {
  const navigate = useNavigate()
  const userId = localStorage.getItem('userId')
  const [data, setData] = useState(null)

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login'); // or some fallback
      return;
    }

    fetch(`http://localhost:3000/api/profile?userId=${userId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch profile');
        return res.json();
      })
      .then(profileData => {
        setData(profileData);
      })
      .catch(err => {
        console.error('Error fetching profile:', err);
        setData(null); // or some error state
      });
  }, []);

  const handleEdit = () => {
    // allow them to re-fill the questionnaire
    localStorage.setItem(`questionnaireDone_${userId}`, 'false')
    // send them to the questionnaire route
    navigate('/questionnaire', { replace: true })
  }

  function calculateMonthlySpending(data) {
    let total = 0;
    for (const key in data) {
      if (key.startsWith('spend_')) {
        total += parseFloat(data[key]) || 0; // safely add number
      }
    }
    return total;
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
          <div className="space-y-4 text-sm text-black">
            {/* Demographics */}
            <div><strong>Age Range:</strong> {data[0].age_group}</div>
            <div><strong>Employment:</strong> {data[0].occupation}</div>
            <div><strong>Household Size:</strong> {data[0].num_dependents}</div>
            <hr />

            {/* Expenses */}
            <div><strong>Monthly Income:</strong> ${data[0].monthly_income}</div>
            <div><strong>Monthly Spending:</strong> ${calculateMonthlySpending(data[0])}</div>
            <div>
              <strong>Breakdown:</strong>
              <ul className="list-disc list-inside">
                <li>Food: ${data[0].spend_food}</li>
                <li>Transport: ${data[0].spend_transport}</li>
                <li>Entertainment: ${data[0].spend_entertainment}</li>
                <li>Shopping: ${data[0].spend_shopping}</li>
                <li>Travel: ${data[0].spend_travel}</li>
                <li>Health: ${data[0].spend_health}</li>
                <li>Education: ${data[0].spend_education}</li>
              </ul>
            </div>
            <hr />

            {/* Savings */}
            <div><strong>Goals:</strong> {data[0].goal_type}</div>
            <div><strong>Target Savings:</strong> ${data[0].target_amount}</div>
            <div><strong>Current Savings:</strong> ${data[0].current_savings}</div>
            <div><strong>Timeframe:</strong> {data[0].timeline_months} Months</div>
            <hr />

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


            // {/* Behavior */}
            // <div><strong>Budget Discipline:</strong> {data.behavior.discipline}/5</div>
            // <div><strong>Spending Style:</strong> {data.behavior.spendingStyle}</div>
            // <div><strong>Review Frequency:</strong> {data.behavior.reviewFreq}</div>
            // <hr />

            // {/* Debt */}
            // {data.debt.hasDebt === 'yes' ? (
            //   <>
            //     <div>
            //       <strong>Debt Types:</strong>{' '}
            //       {Object.entries(data.debt)
            //         .filter(([k, v]) => k !== 'totalDebt' && v)
            //         .map(([k]) => k.replace(/([A-Z])/g, ' $1'))
            //         .join(', ')}
            //     </div>
            //     <div><strong>Total Debt:</strong> ${data.debt.totalDebt}</div>
            //   </>
            // ) : (
            //   <div><strong>Debt:</strong> None</div>
            // )}