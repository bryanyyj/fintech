// src/pages/Profile.jsx
import { useState, useEffect } from "react";
import { Bell, Settings, ChevronDown, Plus, MessageCircle, Target, X, PiggyBank, DollarSign, ShoppingCart, TrendingUp, ShieldCheck, BarChart2, Bot, CalendarDays, Info, RefreshCw } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AddTransactionModal from '../components/AddTransactionModal';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  Title,
} from 'chart.js';
import axios from "axios";
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, BarElement, ArcElement, Title);

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

  const [aiScore, setAiScore] = useState(null);
  const [aiFeedback, setAiFeedback] = useState("");
  const [loadingScore, setLoadingScore] = useState(false);
  const [financialInsights, setFinancialInsights] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    netSavings: 0,
    topSpendingCategory: '',
    highestExpense: 0,
    highestExpenseDesc: '',
    spendingByCategory: {},
    monthlyTrend: [],
  });

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
        if (Array.isArray(data)) {
          setTransactions(data);
          setFinancialInsights(calculateFinancialInsights(data));
        }
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

  const quickStats = {
    totalTx: 128,
    aiSaved: 420,
    goalsAchieved: 3,
    daysUsing: 180,
  };

  // Calculate financial insights from transactions
  const calculateFinancialInsights = (transactions) => {
    if (!Array.isArray(transactions) || transactions.length === 0) {
      return {
        totalIncome: 0,
        totalExpenses: 0,
        netSavings: 0,
        topSpendingCategory: '',
        highestExpense: 0,
        highestExpenseDesc: '',
        spendingByCategory: {},
        monthlyTrend: [],
      };
    }
    const now = new Date();
    const last30 = transactions.filter(t => {
      const d = new Date(t.transaction_date || t.date);
      return (now - d) / (1000 * 60 * 60 * 24) <= 30;
    });
    // Use type if available, else sign of amount
    const isExpense = t => (t.type ? t.type === 'Expense' : parseFloat(t.amount) < 0);
    const isIncome = t => (t.type ? t.type === 'Income' : parseFloat(t.amount) > 0);
    const expenses = last30.filter(isExpense);
    const income = last30.filter(isIncome);
    const totalExpenses = Math.abs(expenses.reduce((sum, t) => sum + Math.abs(parseFloat(t.amount || 0)), 0));
    const totalIncome = income.reduce((sum, t) => sum + Math.abs(parseFloat(t.amount || 0)), 0);
    const netSavings = totalIncome - totalExpenses;
    // Spending by category
    const spendingByCategory = expenses.reduce((acc, t) => {
      const category = t.category || 'Other';
      acc[category] = (acc[category] || 0) + Math.abs(parseFloat(t.amount || 0));
      return acc;
    }, {});
    const topSpendingCategory = Object.keys(spendingByCategory).reduce((a, b) => spendingByCategory[a] > spendingByCategory[b] ? a : b, 'Other');
    // Highest single expense
    let highestExpense = 0, highestExpenseDesc = '';
    expenses.forEach(t => {
      const amt = Math.abs(parseFloat(t.amount || 0));
      if (amt > highestExpense) {
        highestExpense = amt;
        highestExpenseDesc = t.description || '';
      }
    });
    // Monthly trend (last 6 months)
    const monthlyData = {};
    transactions.forEach(t => {
      if (!isExpense(t)) return;
      const date = new Date(t.transaction_date || t.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthlyData[monthKey] = (monthlyData[monthKey] || 0) + Math.abs(parseFloat(t.amount || 0));
    });
    const monthlyTrend = Object.entries(monthlyData)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, amount]) => ({ month, amount }));
    return {
      totalIncome,
      totalExpenses,
      netSavings,
      topSpendingCategory,
      highestExpense,
      highestExpenseDesc,
      spendingByCategory,
      monthlyTrend,
    };
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
      // Update financial insights with latest transaction data
      setFinancialInsights(calculateFinancialInsights(transactions));
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Profile Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-sm border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5"></div>
        <div className="relative px-8 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img src={profilePicPreview} alt="User" className="w-20 h-20 rounded-full border-4 border-purple-500 shadow-2xl ring-4 ring-purple-500/20" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900"></div>
              </div>
              <div>
                <div className="font-bold text-3xl bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">{profile.name}</div>
                <div className="text-slate-300 text-lg">{profile.email}</div>
                <div className="text-purple-300 text-sm mt-1">Member since {memberSince}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-pulse"></span>
              </button>
              <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors" onClick={() => navigate('/settings')}>
                <Settings size={20} />
              </button>
              <div className="relative">
                <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors" onClick={() => setShowProfileDropdown(v => !v)}>
                  <span>Profile</span>
                  <ChevronDown size={16} />
                </button>
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800/90 backdrop-blur-sm border border-white/10 rounded-xl shadow-2xl z-50">
                    <button className="w-full text-left px-4 py-3 hover:bg-white/5 rounded-lg transition-colors" onClick={() => { setShowProfileDropdown(false); setShowEditProfile(true); }}>
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* Financial Wellness Score Card */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Score Display */}
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Financial Wellness Score
                </h2>
                {loadingScore ? (
                  <div className="flex items-center justify-center lg:justify-start gap-3 py-8">
                    <RefreshCw size={24} className="animate-spin text-purple-400" />
                    <div className="text-purple-300 text-lg">Calculating your score...</div>
                  </div>
                ) : aiScore !== null ? (
                  <div className="flex flex-col lg:flex-row items-center gap-6">
                    <div className="relative w-32 h-32">
                      <svg className="absolute" width="128" height="128">
                        <circle cx="64" cy="64" r="56" stroke="#6366f1" strokeWidth="8" fill="none" opacity="0.2" />
                        <circle
                          cx="64" cy="64" r="56"
                          stroke="url(#gradient)"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={2 * Math.PI * 56}
                          strokeDashoffset={2 * Math.PI * 56 * (1 - aiScore / 100)}
                          strokeLinecap="round"
                          transform="rotate(-90 64 64)"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#a78bfa" />
                            <stop offset="100%" stopColor="#6366f1" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-white">{aiScore}</span>
                        <span className="text-sm text-gray-400">/ 100</span>
                      </div>
                    </div>
                    <div className="text-center lg:text-left">
                      <div className="text-purple-300 text-lg font-medium mb-2">{aiFeedback}</div>
                      <div className="text-gray-400 text-sm">Based on your recent financial activity</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center lg:text-left py-8">
                    <div className="text-purple-300 text-lg mb-2">No financial wellness score available</div>
                    <div className="text-gray-400 text-sm">Generate your score to see personalized insights</div>
                  </div>
                )}
              </div>
              
              {/* Generate Score Button */}
              <div className="flex-shrink-0">
                <button
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                  onClick={fetchAndScore}
                  disabled={loadingScore}
                >
                  {loadingScore ? (
                    <div className="flex items-center gap-2">
                      <RefreshCw size={18} className="animate-spin" />
                      Calculating...
                    </div>
                  ) : (
                    "Generate New Score"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Insights Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-300 text-sm font-medium">Total Income</p>
                <p className="text-2xl font-bold text-white">${financialInsights.totalIncome.toFixed(2)}</p>
                <p className="text-green-400 text-xs">Last 30 days</p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-lg">
                <DollarSign size={24} className="text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-900/30 to-pink-900/30 backdrop-blur-sm border border-red-500/20 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-300 text-sm font-medium">Total Expenses</p>
                <p className="text-2xl font-bold text-white">${financialInsights.totalExpenses.toFixed(2)}</p>
                <p className="text-red-400 text-xs">Last 30 days</p>
              </div>
              <div className="p-3 bg-red-500/20 rounded-lg">
                <ShoppingCart size={24} className="text-red-400" />
              </div>
            </div>
          </div>

          <div className={`bg-gradient-to-br ${financialInsights.netSavings >= 0 ? 'from-emerald-900/30 to-green-900/30' : 'from-red-900/30 to-pink-900/30'} backdrop-blur-sm border ${financialInsights.netSavings >= 0 ? 'border-emerald-500/20' : 'border-red-500/20'} rounded-xl p-6 shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${financialInsights.netSavings >= 0 ? 'text-emerald-300' : 'text-red-300'}`}>Net Savings</p>
                <p className="text-2xl font-bold text-white">${financialInsights.netSavings.toFixed(2)}</p>
                <p className={`text-xs ${financialInsights.netSavings >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>Last 30 days</p>
              </div>
              <div className={`p-3 rounded-lg ${financialInsights.netSavings >= 0 ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
                <TrendingUp size={24} className={financialInsights.netSavings >= 0 ? 'text-emerald-400' : 'text-red-400'} />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm font-medium">Top Category</p>
                <p className="text-xl font-bold text-white">{financialInsights.topSpendingCategory || 'N/A'}</p>
                <p className="text-purple-400 text-xs">Highest spending</p>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <BarChart2 size={24} className="text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Trends Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Placeholder for Spending by Category Chart */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-lg flex items-center justify-center h-72">
            <span className="text-gray-400 text-xl font-semibold">Graph Placeholder</span>
          </div>

          {/* Placeholder for Monthly Spending Trend Chart */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-lg flex items-center justify-center h-72">
            <span className="text-gray-400 text-xl font-semibold">Graph Placeholder</span>
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Edit Profile</h2>
              <button onClick={() => setShowEditProfile(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col items-center mb-6">
              <img src={profilePicPreview} alt="Preview" className="w-24 h-24 rounded-full object-cover border-4 border-purple-500 shadow-lg" />
              <label className="mt-3 text-purple-400 cursor-pointer hover:text-purple-300 transition-colors text-sm">
                Change Picture
                <input type="file" accept="image/*" onChange={handleProfilePicChange} className="hidden" />
              </label>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-medium text-gray-300">Name</label>
                <input 
                  className="w-full p-3 rounded-lg bg-gray-700/50 border border-white/10 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors" 
                  value={profile.name} 
                  onChange={e => setProfile(p => ({...p, name: e.target.value}))} 
                  placeholder="Name" 
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-300">Email</label>
                <input 
                  className="w-full p-3 rounded-lg bg-gray-700/50 border border-white/10 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors" 
                  value={profile.email} 
                  onChange={e => setProfile(p => ({...p, email: e.target.value}))} 
                  placeholder="Email" 
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-300">Phone</label>
                <input 
                  className="w-full p-3 rounded-lg bg-gray-700/50 border border-white/10 text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none transition-colors" 
                  value={profile.phone} 
                  onChange={e => setProfile(p => ({...p, phone: e.target.value}))} 
                  placeholder="Phone" 
                />
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <button 
                onClick={() => setShowEditProfile(false)} 
                className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 rounded-lg text-white font-bold shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

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
    </div>
  );
}