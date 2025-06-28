import React, { useState } from 'react';

const timePeriods = [
  { label: '1M', value: '1M' },
  { label: '3M', value: '3M' },
  { label: '6M', value: '6M' },
  { label: '1Y', value: '1Y' },
];

export default function ReportsAnalytics() {
  const [period, setPeriod] = useState('1M');
  const [category, setCategory] = useState('All');

  // Placeholder data for charts and insights
  const insights = [
    'You spent 23% more on food this month',
    'Your entertainment spending decreased by 15%',
    "You're on track to save $500 this month",
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 ml-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Reports & Analytics</h1>
        <p className="mb-8 text-slate-300">Detailed spending analysis and insights</p>

        {/* Time Period Selector */}
        <div className="flex gap-2 mb-6">
          {timePeriods.map(tp => (
            <button
              key={tp.value}
              className={`px-4 py-2 rounded-full font-bold shadow-lg transition-colors ${period === tp.value ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'bg-gray-800 border border-slate-700 text-slate-300 hover:bg-gray-700'}`}
              onClick={() => setPeriod(tp.value)}
            >
              {tp.label}
            </button>
          ))}
        </div>

        {/* Spending Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Monthly Spending Trends</h2>
            <div className="h-48 flex items-center justify-center text-slate-400">[Line Chart Placeholder]</div>
          </div>
          <div className="bg-gray-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Category Breakdown</h2>
            <div className="h-48 flex items-center justify-center text-slate-400">[Pie Chart Placeholder]</div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Year-over-Year Comparison</h2>
            <div className="h-48 flex items-center justify-center text-slate-400">[Bar Chart Placeholder]</div>
          </div>
          <div className="bg-gray-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Budget vs Actual Spending</h2>
            <div className="h-48 flex items-center justify-center text-slate-400">[Bar Chart Placeholder]</div>
          </div>
        </div>

        {/* Insights Panel */}
        <div className="bg-gray-800 border border-slate-700 rounded-2xl p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Insights</h2>
          <ul className="list-disc pl-6 space-y-2">
            {insights.map((insight, idx) => (
              <li key={idx} className="text-slate-200">{insight}</li>
            ))}
          </ul>
        </div>

        {/* Interactive Charts */}
        <div className="bg-gray-800 border border-slate-700 rounded-2xl p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Interactive Charts</h2>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Category Drill-down</label>
            <select className="w-full p-2 rounded bg-slate-700 border border-slate-600" value={category} onChange={e => setCategory(e.target.value)}>
              <option value="All">All</option>
              <option value="Food">Food</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Transport">Transport</option>
              <option value="Shopping">Shopping</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="h-48 flex items-center justify-center text-slate-400">[Interactive Chart Placeholder]</div>
          <div className="flex gap-4 mt-4">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-blue-500/25 px-6 py-2">Export PDF</button>
            <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-full shadow-lg hover:shadow-purple-500/25 px-6 py-2">Export CSV</button>
          </div>
        </div>

        {/* AI Insights Section */}
        <div className="bg-gray-800 border border-slate-700 rounded-2xl p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AI Insights</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li className="text-slate-200">Personalized spending patterns (coming soon)</li>
            <li className="text-slate-200">Recommendations for improvement (coming soon)</li>
            <li className="text-slate-200">Comparison with similar users (anonymous, coming soon)</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 