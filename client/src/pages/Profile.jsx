// src/pages/Profile.jsx
import { useState, useEffect } from "react";
import { Bell, Settings, ChevronDown, Plus, MessageCircle, Target, X, PiggyBank, DollarSign, ShoppingCart, TrendingUp, ShieldCheck, BarChart2, Bot, CalendarDays, Info } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AddTransactionModal from '../components/AddTransactionModal';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from "axios";
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export default function Profile() {
  // Dummy data for illustration
  const [score] = useState(78);
  const [transactions, setTransactions] = useState([]);
  const [chat, setChat] = useState([
    { from: "ai", text: "How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [redirectMsg, setRedirectMsg] = useState("");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    receipt: null
  });
  const categories = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Health', 'Other'];
  const userId = localStorage.getItem('userId');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    picture: ''
  });
  const [profilePicPreview, setProfilePicPreview] = useState(profile.picture || 'https://ui-avatars.com/api/?name=John+Doe&background=6d28d9&color=fff&size=128');
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [showEditGoal, setShowEditGoal] = useState(false);
  const [goal, setGoal] = useState({
    goal: '',
    targetAmount: '',
    targetMonths: '',
    risk: '',
    savings: ''
  });
  const goalOptions = [
    'Build Emergency Fund', 'Save for Vacation', 'Buy a House', 'Invest for Future', 'Pay Off Debt'
  ];
  const riskLevels = ['Conservative', 'Moderate', 'Aggressive'];
  const [aiScore, setAiScore] = useState(null);
  const [aiFeedback, setAiFeedback] = useState("");
  const [loadingScore, setLoadingScore] = useState(false);

  const userAvatar = "https://ui-avatars.com/api/?name=User&background=6d28d9&color=fff&size=128";

  // Always get userId from localStorage and parse as number
  function getUserId() {
    const userId = localStorage.getItem('userId');
    const numericUserId = Number(userId);
    if (!userId || isNaN(numericUserId)) return null;
    return numericUserId;
  }

  useEffect(() => {
    const numericUserId = getUserId();
    if (!numericUserId) return;
    // Fetch recent transactions
    fetch(`http://localhost:3000/api/transactions?userId=${numericUserId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setTransactions(data);
      });
    // Fetch financial wellness score
    fetch(`http://localhost:3000/api/financial-wellness/${numericUserId}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.score !== undefined) {
          setAiScore(data.score);
          setAiFeedback(data.feedback);
        }
      });
  }, []);

  // Handle chat input
  const sendChat = () => {
    setRedirectMsg("Redirecting you to the full AI Chatbot...");
    setTimeout(() => navigate("/ai"), 1000);
  };

  // Add Transaction handler (dummy for now)
  const handleAddTransaction = () => {
    // Validate all required fields
    if (!newTransaction.amount || !newTransaction.category || !newTransaction.date) {
      alert('Please fill in all required fields.');
      return;
    }
    // Here you would send the transaction to the backend
    alert('Transaction added! (Demo)');
    setShowModal(false);
    setNewTransaction({
      amount: '',
      category: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      receipt: null
    });
  };

  const handleProfilePicChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setProfilePicPreview(ev.target.result);
      reader.readAsDataURL(file);
      setProfile(p => ({...p, picture: file}));
    }
  };

  const memberSince = 'Jan 2023';
  const scoreTrend = [70, 72, 74, 75, 77, 78];
  const summary = {
    assets: 12000,
    income: 3500,
    avgSpending: 2200,
    savingsRate: 37,
    emergencyFund: 'On Track',
  };
  const recentAI = [
    { text: 'You saved $30 on groceries last week!', date: '2024-06-25' },
    { text: 'Try reducing entertainment spending.', date: '2024-06-20' },
  ];
  const goalUpdates = [
    { goal: 'Emergency Fund', progress: 60 },
    { goal: 'Vacation', progress: 27 },
  ];
  const badges = [
    { label: 'First $1,000 Saved', icon: '💰' },
    { label: '3-Month Streak', icon: '🔥' },
  ];
  const quickStats = {
    totalTx: 128,
    aiSaved: 420,
    goalsAchieved: 3,
    daysUsing: 180,
  };

  // Add a function to fetch and score on button click
  const fetchAndScore = async () => {
    setLoadingScore(true);
    setAiScore(null);
    setAiFeedback("");
    try {
      const numericUserId = getUserId();
      if (!numericUserId) {
        setAiFeedback("User ID not found or invalid. Please log in again.");
        setLoadingScore(false);
        return;
      }
      // Use fetch with full URL for consistency
      const txRes = await fetch(`http://localhost:3000/api/transactions?userId=${numericUserId}`);
      const transactions = await txRes.json();
      if (!Array.isArray(transactions)) {
        setAiFeedback("No transaction array found.");
        setLoadingScore(false);
        return;
      }
      // Call AI backend with full URL
      const aiRes = await fetch("http://localhost:8000/api/ai/financial-wellness", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactions })
      });
      const aiData = await aiRes.json();
      setAiScore(aiData.score);
      setAiFeedback(aiData.feedback);
      // Save score to backend
      await fetch('http://localhost:3000/api/financial-wellness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: numericUserId, score: aiData.score, feedback: aiData.feedback })
      });
    } catch (err) {
      setAiFeedback("Could not calculate score. Please try again later.");
    }
    setLoadingScore(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col ml-20">
      {/* Profile Header */}
      <header className="flex flex-col md:flex-row items-center justify-between px-10 py-8 border-b border-slate-700 bg-gray-900/70 gap-6">
        <div className="flex items-center gap-6">
          <img src={profilePicPreview} alt="User" className="w-20 h-20 rounded-full border-4 border-purple-500 shadow-lg" />
          <div>
            <div className="font-bold text-2xl">{profile.name}</div>
            <div className="text-slate-300">{profile.email} • Member since {memberSince}</div>
            <div className="text-purple-300 text-sm mt-1">Financial Wellness Score Trend</div>
            <div className="w-40 h-10">
              <Line
                data={{
                  labels: scoreTrend.map((_, i) => `M${i+1}`),
                  datasets: [{
                    data: scoreTrend,
                    borderColor: '#a78bfa',
                    backgroundColor: 'rgba(167,139,250,0.2)',
                    tension: 0.4,
                    pointRadius: 0,
                    fill: true,
                  }],
                }}
                options={{
                  plugins: { legend: { display: false } },
                  scales: { x: { display: false }, y: { display: false } },
                  elements: { line: { borderWidth: 3 } },
                  responsive: true,
                  maintainAspectRatio: false,
                }}
                height={40}
                width={160}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative hover:text-blue-400">
            <Bell size={22} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
          </button>
          <button className="hover:text-blue-400" onClick={() => navigate('/settings')}>
            <Settings size={22} />
          </button>
          <div className="relative">
            <button className="flex items-center space-x-2 hover:text-blue-400" onClick={() => setShowProfileDropdown(v => !v)}>
              <span>Profile</span>
              <ChevronDown size={18} />
            </button>
            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-slate-700 rounded-lg shadow-lg z-50">
                <button className="w-full text-left px-4 py-2 hover:bg-gray-700" onClick={() => { setShowProfileDropdown(false); setShowEditProfile(true); }}>
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      {/* Financial Overview */}
      <div className="max-w-6xl mx-auto w-full mb-8">
        <div className="relative bg-white/10 backdrop-blur-md border border-slate-700 rounded-2xl p-8 shadow-2xl overflow-hidden">
          {/* Animated gradient accent */}
          <div className="absolute -top-10 -left-10 w-60 h-60 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-2xl z-0 animate-pulse"></div>
          <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20 rounded-full blur-2xl z-0 animate-pulse"></div>
          <h2 className="relative z-10 text-xl font-bold mb-2 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Financial Overview</h2>
          <div className="relative z-10 mx-auto w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mb-6"></div>
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {/* Stat Tile: Total Assets */}
            <div className="group flex flex-col items-center bg-white/10 backdrop-blur rounded-xl shadow hover:scale-105 hover:shadow-lg transition p-4 relative">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 mb-2">
                <PiggyBank className="text-blue-500 w-6 h-6" />
              </div>
              <span className="text-blue-400 text-xl font-bold">${summary.assets}</span>
              <span className="text-xs text-gray-400 mt-1">Total Assets</span>
              <div className="absolute top-2 right-2">
                <Info className="w-4 h-4 text-slate-400 group-hover:text-blue-400 cursor-pointer" />
                <span className="opacity-0 group-hover:opacity-100 transition bg-slate-900 text-xs text-white rounded px-2 py-1 absolute left-6 top-0 z-20 whitespace-nowrap shadow-lg">All your assets combined</span>
              </div>
            </div>
            {/* Stat Tile: Monthly Income */}
            <div className="group flex flex-col items-center bg-white/10 backdrop-blur rounded-xl shadow hover:scale-105 hover:shadow-lg transition p-4 relative">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 mb-2">
                <DollarSign className="text-green-500 w-6 h-6" />
              </div>
              <span className="text-green-400 text-xl font-bold">${summary.income}</span>
              <span className="text-xs text-gray-400 mt-1">Monthly Income</span>
              <div className="absolute top-2 right-2">
                <Info className="w-4 h-4 text-slate-400 group-hover:text-green-400 cursor-pointer" />
                <span className="opacity-0 group-hover:opacity-100 transition bg-slate-900 text-xs text-white rounded px-2 py-1 absolute left-6 top-0 z-20 whitespace-nowrap shadow-lg">Your average monthly income</span>
              </div>
            </div>
            {/* Stat Tile: Avg. Spending */}
            <div className="group flex flex-col items-center bg-white/10 backdrop-blur rounded-xl shadow hover:scale-105 hover:shadow-lg transition p-4 relative">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 mb-2">
                <ShoppingCart className="text-purple-500 w-6 h-6" />
              </div>
              <span className="text-purple-400 text-xl font-bold">${summary.avgSpending}</span>
              <span className="text-xs text-gray-400 mt-1">Avg. Spending</span>
              <div className="absolute top-2 right-2">
                <Info className="w-4 h-4 text-slate-400 group-hover:text-purple-400 cursor-pointer" />
                <span className="opacity-0 group-hover:opacity-100 transition bg-slate-900 text-xs text-white rounded px-2 py-1 absolute left-6 top-0 z-20 whitespace-nowrap shadow-lg">Your average monthly spending</span>
              </div>
            </div>
            {/* Stat Tile: Savings Rate */}
            <div className="group flex flex-col items-center bg-white/10 backdrop-blur rounded-xl shadow hover:scale-105 hover:shadow-lg transition p-4 relative">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-100 mb-2">
                <TrendingUp className="text-pink-500 w-6 h-6" />
              </div>
              <span className="text-pink-400 text-xl font-bold">{summary.savingsRate}%</span>
              <span className="text-xs text-gray-400 mt-1">Savings Rate</span>
              <div className="absolute top-2 right-2">
                <Info className="w-4 h-4 text-slate-400 group-hover:text-pink-400 cursor-pointer" />
                <span className="opacity-0 group-hover:opacity-100 transition bg-slate-900 text-xs text-white rounded px-2 py-1 absolute left-6 top-0 z-20 whitespace-nowrap shadow-lg">% of income you save</span>
              </div>
            </div>
            {/* Stat Tile: Emergency Fund */}
            <div className="group flex flex-col items-center bg-white/10 backdrop-blur rounded-xl shadow hover:scale-105 hover:shadow-lg transition p-4 relative">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-100 mb-2">
                <ShieldCheck className="text-orange-500 w-6 h-6" />
              </div>
              <span className="text-orange-400 text-xl font-bold">{summary.emergencyFund}</span>
              <span className="text-xs text-gray-400 mt-1">Emergency Fund</span>
              <div className="absolute top-2 right-2">
                <Info className="w-4 h-4 text-slate-400 group-hover:text-orange-400 cursor-pointer" />
                <span className="opacity-0 group-hover:opacity-100 transition bg-slate-900 text-xs text-white rounded px-2 py-1 absolute left-6 top-0 z-20 whitespace-nowrap shadow-lg">Status of your emergency fund</span>
              </div>
            </div>
            {/* Stat Tile: Total Tx */}
            <div className="group flex flex-col items-center bg-white/10 backdrop-blur rounded-xl shadow hover:scale-105 hover:shadow-lg transition p-4 relative">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 mb-2">
                <BarChart2 className="text-blue-500 w-6 h-6" />
              </div>
              <span className="text-blue-400 text-xl font-bold">{quickStats.totalTx}</span>
              <span className="text-xs text-gray-400 mt-1">Total Tx</span>
              <div className="absolute top-2 right-2">
                <Info className="w-4 h-4 text-slate-400 group-hover:text-blue-400 cursor-pointer" />
                <span className="opacity-0 group-hover:opacity-100 transition bg-slate-900 text-xs text-white rounded px-2 py-1 absolute left-6 top-0 z-20 whitespace-nowrap shadow-lg">Total transactions recorded</span>
              </div>
            </div>
            {/* Stat Tile: AI Saved */}
            <div className="group flex flex-col items-center bg-white/10 backdrop-blur rounded-xl shadow hover:scale-105 hover:shadow-lg transition p-4 relative">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 mb-2">
                <Bot className="text-green-500 w-6 h-6" />
              </div>
              <span className="text-green-400 text-xl font-bold">${quickStats.aiSaved}</span>
              <span className="text-xs text-gray-400 mt-1">AI Saved</span>
              <div className="absolute top-2 right-2">
                <Info className="w-4 h-4 text-slate-400 group-hover:text-green-400 cursor-pointer" />
                <span className="opacity-0 group-hover:opacity-100 transition bg-slate-900 text-xs text-white rounded px-2 py-1 absolute left-6 top-0 z-20 whitespace-nowrap shadow-lg">Money saved via AI advice</span>
              </div>
            </div>
            {/* Stat Tile: Goals */}
            <div className="group flex flex-col items-center bg-white/10 backdrop-blur rounded-xl shadow hover:scale-105 hover:shadow-lg transition p-4 relative">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 mb-2">
                <Target className="text-purple-500 w-6 h-6" />
              </div>
              <span className="text-purple-400 text-xl font-bold">{quickStats.goalsAchieved}</span>
              <span className="text-xs text-gray-400 mt-1">Goals</span>
              <div className="absolute top-2 right-2">
                <Info className="w-4 h-4 text-slate-400 group-hover:text-purple-400 cursor-pointer" />
                <span className="opacity-0 group-hover:opacity-100 transition bg-slate-900 text-xs text-white rounded px-2 py-1 absolute left-6 top-0 z-20 whitespace-nowrap shadow-lg">Goals achieved</span>
              </div>
            </div>
            {/* Stat Tile: Days */}
            <div className="group flex flex-col items-center bg-white/10 backdrop-blur rounded-xl shadow hover:scale-105 hover:shadow-lg transition p-4 relative">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-100 mb-2">
                <CalendarDays className="text-orange-500 w-6 h-6" />
              </div>
              <span className="text-orange-400 text-xl font-bold">{quickStats.daysUsing}</span>
              <span className="text-xs text-gray-400 mt-1">Days</span>
              <div className="absolute top-2 right-2">
                <Info className="w-4 h-4 text-slate-400 group-hover:text-orange-400 cursor-pointer" />
                <span className="opacity-0 group-hover:opacity-100 transition bg-slate-900 text-xs text-white rounded px-2 py-1 absolute left-6 top-0 z-20 whitespace-nowrap shadow-lg">Days using the app</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Grid */}
      <main className="max-w-6xl mx-auto grid grid-cols-2 gap-8">
        {/* Left Column (Financial Wellness Score always first) */}
        <div className="space-y-8">
          {/* Financial Wellness Score (always first) */}
          <div className="bg-gray-800 border border-slate-700 rounded-2xl p-8 flex flex-col items-center shadow-lg">
            <div className="text-lg font-semibold mb-2">Financial Wellness Score</div>
            <button
              className="mb-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg shadow hover:shadow-blue-500/25 transition"
              onClick={fetchAndScore}
              disabled={loadingScore}
            >
              {loadingScore ? "Calculating..." : "Generate Score"}
            </button>
            {loadingScore ? null : aiScore !== null ? (
              <>
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <svg className="absolute" width="128" height="128">
                    <circle cx="64" cy="64" r="56" stroke="#6366f1" strokeWidth="12" fill="none" opacity="0.2" />
                    <circle
                      cx="64" cy="64" r="56"
                      stroke="#a78bfa"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={2 * Math.PI * 56}
                      strokeDashoffset={2 * Math.PI * 56 * (1 - aiScore / 100)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="text-4xl font-bold">{aiScore}</span>
                </div>
                <div className="text-purple-300 mt-2">{aiFeedback}</div>
              </>
            ) : (
              <div className="text-purple-300">No score available.</div>
            )}
          </div>
          {/* Goals Box */}
          <div className="bg-gray-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center mb-2">
              <div className="text-lg font-semibold">Your Goals</div>
              <button className="ml-4 px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-blue-500/25 text-sm" title="Add Goal" onClick={() => { setGoal({ goal: '', targetAmount: '', targetMonths: '', risk: '', savings: '' }); setShowAddGoal(true); }}>
                + Add
              </button>
              <button className="ml-2 px-2 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-full shadow-lg hover:shadow-purple-500/25 text-sm" title="Edit Goal" onClick={() => setShowEditGoal(true)}>
                ✎ Edit
              </button>
            </div>
            <div className="text-purple-300">You haven't set any goals yet. Start by adding a new goal!</div>
          </div>
          {/* Last 5 Transactions */}
          <div className="bg-gray-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
            <div className="text-lg font-semibold mb-4">Recent Transactions</div>
            <ul className="divide-y divide-slate-700">
              {transactions.slice(0,5).map(tx => (
                <li key={tx.transaction_id || tx.id} className="py-2 flex justify-between">
                  <span>{tx.description}</span>
                  <span className="text-red-400">
                    -${Math.abs(tx.amount).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {/* Recent AI Interactions */}
          <div className="bg-gray-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
            <div className="text-lg font-semibold mb-4">Recent AI Interactions</div>
            <ul className="space-y-2">
              {recentAI.map((ai, i) => (
                <li key={i} className="flex justify-between text-slate-200">
                  <span>{ai.text}</span>
                  <span className="text-xs text-slate-400">{ai.date}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Goal Progress Updates */}
          <div className="bg-gray-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
            <div className="text-lg font-semibold mb-4">Goal Progress Updates</div>
            <ul className="space-y-2">
              {goalUpdates.map((g, i) => (
                <li key={i} className="flex items-center gap-4">
                  <span className="w-32 inline-block">{g.goal}</span>
                  <div className="flex-1 h-3 bg-slate-700 rounded-full">
                    <div className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" style={{width: `${g.progress}%`}}></div>
                  </div>
                  <span className="ml-2 text-blue-400 font-bold">{g.progress}%</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Achievement Badges */}
          <div className="bg-gray-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
            <div className="text-lg font-semibold mb-4">Achievement Badges</div>
            <div className="flex gap-4 flex-wrap">
              {badges.map((b, i) => (
                <div key={i} className="flex flex-col items-center bg-gray-900 border border-slate-700 rounded-xl px-4 py-2 shadow">
                  <span className="text-3xl mb-1">{b.icon}</span>
                  <span className="text-xs text-slate-300 text-center">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Right Column (Monthly Spending Overview always first) */}
        <div className="space-y-8">
          {/* Monthly Spending Overview (always first in right column) */}
          <div className="bg-gray-800 border border-slate-700 rounded-2xl p-8 shadow-lg">
            <div className="text-lg font-semibold mb-2">Monthly Spending Overview</div>
            {/* Replace with your Pie Chart component */}
            <div className="w-full h-48 flex items-center justify-center text-purple-300">
              [Pie Chart Placeholder]
            </div>
          </div>
          {/* AI Assistant Quick Chat */}
          <div className="bg-gray-800 border border-slate-700 rounded-2xl p-6 shadow-lg flex flex-col h-full">
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
                className="flex-1 rounded-lg bg-gray-900/80 px-3 py-2 text-white focus:outline-none"
                placeholder="Type your question..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendChat()}
                disabled={!!redirectMsg}
              />
              <button
                className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg text-white font-bold shadow-lg hover:shadow-blue-500/25 transition"
                onClick={sendChat}
                disabled={!!redirectMsg}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </main>
      {/* Add Transaction Modal */}
      <AddTransactionModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onAdd={newTx => {
          setTransactions([newTx, ...transactions]);
          setShowModal(false);
        }}
        userId={userId}
      />
      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-slate-700 rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Profile</h2>
              <button onClick={() => setShowEditProfile(false)} className="text-gray-400 hover:text-white"><X size={24} /></button>
            </div>
            <div className="flex flex-col items-center mb-6">
              <img src={profilePicPreview} alt="Preview" className="w-24 h-24 rounded-full object-cover border-4 border-blue-400 shadow-lg" />
              <label className="mt-2 text-blue-400 cursor-pointer hover:underline">
                Change Picture
                <input type="file" accept="image/*" onChange={handleProfilePicChange} className="hidden" />
              </label>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input className="w-full p-2 rounded bg-gray-700 border border-slate-600" value={profile.name} onChange={e => setProfile(p => ({...p, name: e.target.value}))} placeholder="Name" />
              </div>
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input className="w-full p-2 rounded bg-gray-700 border border-slate-600" value={profile.email} onChange={e => setProfile(p => ({...p, email: e.target.value}))} placeholder="Email" />
              </div>
              <div>
                <label className="block mb-1 font-medium">Phone</label>
                <input className="w-full p-2 rounded bg-gray-700 border border-slate-600" value={profile.phone} onChange={e => setProfile(p => ({...p, phone: e.target.value}))} placeholder="Phone" />
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <button onClick={() => setShowEditProfile(false)} className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-2 rounded-lg text-white font-bold shadow-lg hover:shadow-blue-500/25 transition-colors">Save</button>
            </div>
          </div>
        </div>
      )}
      {/* Add Goal Modal */}
      {showAddGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-slate-700 rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Goal</h2>
              <button onClick={() => setShowAddGoal(false)} className="text-gray-400 hover:text-white"><X size={24} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Primary Financial Goal</label>
                <select className="w-full p-2 rounded bg-gray-700 border border-slate-600" value={goal.goal} onChange={e => setGoal(g => ({...g, goal: e.target.value}))}>
                  <option value="">Select your primary goal</option>
                  {goalOptions.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Target Amount ($)</label>
                <input className="w-full p-2 rounded bg-gray-700 border border-slate-600" type="number" value={goal.targetAmount} onChange={e => setGoal(g => ({...g, targetAmount: e.target.value}))} placeholder="Target Amount" />
              </div>
              <div>
                <label className="block mb-1 font-medium">Target Timeline (months)</label>
                <input className="w-full p-2 rounded bg-gray-700 border border-slate-600" type="number" value={goal.targetMonths} onChange={e => setGoal(g => ({...g, targetMonths: e.target.value}))} placeholder="Timeline in months" />
              </div>
              <div>
                <label className="block mb-1 font-medium">Risk Tolerance</label>
                <select className="w-full p-2 rounded bg-gray-700 border border-slate-600" value={goal.risk} onChange={e => setGoal(g => ({...g, risk: e.target.value}))}>
                  <option value="">Select risk tolerance</option>
                  {riskLevels.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Current Savings Amount ($)</label>
                <input className="w-full p-2 rounded bg-gray-700 border border-slate-600" type="number" value={goal.savings} onChange={e => setGoal(g => ({...g, savings: e.target.value}))} placeholder="Current Savings" />
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <button onClick={() => setShowAddGoal(false)} className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-2 rounded-lg text-white font-bold shadow-lg hover:shadow-blue-500/25 transition-colors">Save</button>
            </div>
          </div>
        </div>
      )}
      {/* Edit Goal Modal */}
      {showEditGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-slate-700 rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Goal</h2>
              <button onClick={() => setShowEditGoal(false)} className="text-gray-400 hover:text-white"><X size={24} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Primary Financial Goal</label>
                <select className="w-full p-2 rounded bg-gray-700 border border-slate-600" value={goal.goal} onChange={e => setGoal(g => ({...g, goal: e.target.value}))}>
                  <option value="">Select your primary goal</option>
                  {goalOptions.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Target Amount ($)</label>
                <input className="w-full p-2 rounded bg-gray-700 border border-slate-600" type="number" value={goal.targetAmount} onChange={e => setGoal(g => ({...g, targetAmount: e.target.value}))} placeholder="Target Amount" />
              </div>
              <div>
                <label className="block mb-1 font-medium">Target Timeline (months)</label>
                <input className="w-full p-2 rounded bg-gray-700 border border-slate-600" type="number" value={goal.targetMonths} onChange={e => setGoal(g => ({...g, targetMonths: e.target.value}))} placeholder="Timeline in months" />
              </div>
              <div>
                <label className="block mb-1 font-medium">Risk Tolerance</label>
                <select className="w-full p-2 rounded bg-gray-700 border border-slate-600" value={goal.risk} onChange={e => setGoal(g => ({...g, risk: e.target.value}))}>
                  <option value="">Select risk tolerance</option>
                  {riskLevels.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Current Savings Amount ($)</label>
                <input className="w-full p-2 rounded bg-gray-700 border border-slate-600" type="number" value={goal.savings} onChange={e => setGoal(g => ({...g, savings: e.target.value}))} placeholder="Current Savings" />
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <button onClick={() => setShowEditGoal(false)} className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-2 rounded-lg text-white font-bold shadow-lg hover:shadow-blue-500/25 transition-colors">Save</button>
            </div>
          </div>
        </div>
      )}
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

            <style>{`
              @keyframes pop-in {
                0% { transform: scale(0.7); opacity: 0; }
                70% { transform: scale(1.1); opacity: 1; }
                100% { transform: scale(1); opacity: 1; }
              }
              .animate-pop-in {
                animation: pop-in 0.7s cubic-bezier(0.23, 1.2, 0.32, 1) 1;
              }
            `}</style>