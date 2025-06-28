// src/pages/Profile.jsx
import { useState } from "react";
import { Bell, Settings, ChevronDown, Plus, MessageCircle, Target } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  // Dummy data for illustration
  const [score] = useState(78);
  const [transactions] = useState([
    { id: 1, desc: "Coffee Shop", amount: -4.5, date: "2024-06-28" },
    { id: 2, desc: "Grocery Store", amount: -32.8, date: "2024-06-27" },
    { id: 3, desc: "Salary", amount: 2500, date: "2024-06-25" },
  ]);
  const [chat, setChat] = useState([
    { from: "ai", text: "How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [redirectMsg, setRedirectMsg] = useState("");
  const navigate = useNavigate();

  const userAvatar = "https://ui-avatars.com/api/?name=User&background=6d28d9&color=fff&size=128";

  // Handle chat input
  const sendChat = () => {
    setRedirectMsg("Redirecting you to the full AI Chatbot...");
    setTimeout(() => navigate("/ai"), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-10 py-6 border-b border-slate-700 bg-slate-900/70">
        <div className="flex items-center space-x-4">
          <img src={userAvatar} alt="User" className="w-12 h-12 rounded-full border-2 border-purple-500 shadow-lg" />
          <div>
            <div className="font-bold text-lg">Welcome back, [Your Name]</div>
            <div className="text-sm text-purple-300">Financial Wellness Dashboard</div>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <button className="relative hover:text-blue-400">
            <Bell size={22} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
          </button>
          <button className="hover:text-blue-400">
            <Settings size={22} />
          </button>
          <button className="flex items-center space-x-2 hover:text-blue-400">
            <span>Profile</span>
            <ChevronDown size={18} />
          </button>
        </div>
      </header>
      {/* Main Grid */}
      <main className="flex-1 p-10 grid grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Financial Wellness Score */}
          <div className="bg-slate-800/80 rounded-2xl p-8 flex flex-col items-center shadow-lg">
            <div className="text-lg font-semibold mb-2">Financial Wellness Score</div>
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="absolute" width="128" height="128">
                <circle cx="64" cy="64" r="56" stroke="#6366f1" strokeWidth="12" fill="none" opacity="0.2" />
                <circle
                  cx="64" cy="64" r="56"
                  stroke="#a78bfa"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={2 * Math.PI * 56}
                  strokeDashoffset={2 * Math.PI * 56 * (1 - score / 100)}
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-4xl font-bold">{score}/100</span>
            </div>
            <div className="text-purple-300 mt-2">Great job! Keep improving your score.</div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-slate-800/80 rounded-2xl p-6 shadow-lg">
            <div className="text-lg font-semibold mb-4">Recent Transactions</div>
            <ul className="divide-y divide-slate-700">
              {transactions.map(tx => (
                <li key={tx.id} className="py-2 flex justify-between">
                  <span>{tx.desc}</span>
                  <span className={tx.amount < 0 ? "text-red-400" : "text-green-400"}>
                    {tx.amount < 0 ? "-" : "+"}${Math.abs(tx.amount).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 flex justify-around items-center shadow-lg">
            <button className="flex items-center gap-2 bg-slate-900/80 px-4 py-2 rounded-lg hover:bg-slate-800 transition">
              <Plus size={18} /> Add Expense
            </button>
            <button className="flex items-center gap-2 bg-slate-900/80 px-4 py-2 rounded-lg hover:bg-slate-800 transition">
              <MessageCircle size={18} /> Ask AI
            </button>
            <button className="flex items-center gap-2 bg-slate-900/80 px-4 py-2 rounded-lg hover:bg-slate-800 transition">
              <Target size={18} /> View Goal
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Monthly Spending Overview */}
          <div className="bg-slate-800/80 rounded-2xl p-8 shadow-lg">
            <div className="text-lg font-semibold mb-2">Monthly Spending Overview</div>
            {/* Replace with your Pie Chart component */}
            <div className="w-full h-48 flex items-center justify-center text-purple-300">
              [Pie Chart Placeholder]
            </div>
          </div>

          {/* AI Assistant Quick Chat */}
          <div className="bg-slate-800/80 rounded-2xl p-6 shadow-lg flex flex-col h-72">
            <div className="text-lg font-semibold mb-2">AI Assistant</div>
            <div className="flex-1 overflow-y-auto space-y-2 mb-2">
              {redirectMsg ? (
                <div className="flex justify-center items-center h-full text-blue-300">{redirectMsg}</div>
              ) : (
                chat.map((msg, i) => (
                  <div key={i} className={`flex ${msg.from === 'ai' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`px-4 py-2 rounded-lg ${msg.from === 'ai' ? 'bg-blue-700/60' : 'bg-purple-700/60'} max-w-xs`}>
                      {msg.text}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="flex gap-2">
              <input
                className="flex-1 rounded-lg bg-slate-900/80 px-3 py-2 text-white focus:outline-none"
                placeholder="Type your question..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendChat()}
                disabled={!!redirectMsg}
              />
              <button
                className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                onClick={sendChat}
                disabled={!!redirectMsg}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
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