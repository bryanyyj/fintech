import React, { useState, useEffect } from 'react';
import { Plus, Search, Upload, Calendar, Filter, X } from 'lucide-react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: '2024-06-23', amount: 25.50, category: 'Food', description: 'Lunch at cafe' },
    { id: 2, date: '2024-06-22', amount: 45.00, category: 'Transport', description: 'Grab' },
    { id: 3, date: '2024-06-21', amount: 120.00, category: 'Shopping', description: 'New shoes' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [filterPeriod, setFilterPeriod] = useState('This Month');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);

  const [newTransaction, setNewTransaction] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    receipt: null
  });

  const categories = ['All', 'Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Health', 'Other'];
  const periods = ['This Month', 'Last 3 Months', 'All Time'];

  // Calculate summary data
  const totalThisMonth = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  const remainingBudget = 3500 - totalThisMonth; // Assuming 3500 budget
  const categoryTotals = filteredTransactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});
  const topCategory = Object.keys(categoryTotals).reduce((a, b) => 
    categoryTotals[a] > categoryTotals[b] ? a : b, 'Food'
  );
  const topCategoryPercentage = Math.round((categoryTotals[topCategory] / totalThisMonth) * 100) || 0;

  // Filter transactions based on search and filters
  useEffect(() => {
    let filtered = transactions;
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(t => t.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredTransactions(filtered);
  }, [transactions, selectedCategory, searchTerm]);

  const handleAddTransaction = () => {
    if (newTransaction.amount && newTransaction.category) {
      const transaction = {
        id: Date.now(),
        ...newTransaction,
        amount: parseFloat(newTransaction.amount),
        date: newTransaction.date
      };
      
      setTransactions([transaction, ...transactions]);
      setNewTransaction({
        amount: '',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        receipt: null
      });
      setShowModal(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewTransaction({...newTransaction, receipt: file});
    }
  };

  // Prepare data for Pie Chart (Spending by Category)
  const pieData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          '#6366f1', '#f59e42', '#10b981', '#f43f5e', '#a78bfa', '#fbbf24', '#14b8a6', '#eab308',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for Bar Chart (Spending by Date)
  const spendingByDate = filteredTransactions.reduce((acc, t) => {
    acc[t.date] = (acc[t.date] || 0) + t.amount;
    return acc;
  }, {});
  const barData = {
    labels: Object.keys(spendingByDate).sort(),
    datasets: [
      {
        label: 'Spending',
        data: Object.keys(spendingByDate).sort().map(date => spendingByDate[date]),
        backgroundColor: '#6366f1',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Transactions Page</h1>
        </div>

        {/* Top Section */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <button 
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Add New Transaction
            </button>
            
            <div className="flex flex-wrap items-center gap-4">
              {/* Time Filter */}
              <select 
                value={filterPeriod}
                onChange={(e) => setFilterPeriod(e.target.value)}
                className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
              >
                {periods.map(period => (
                  <option key={period} value={period}>{period}</option>
                ))}
              </select>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedCategory === category 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Charts Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-center h-64 w-full md:w-1/2">
            <h3 className="text-lg font-semibold mb-2 text-center">Spending by Category</h3>
            <div className="w-full h-full flex items-center justify-center">
              <Pie 
                data={pieData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false, 
                  plugins: { 
                    legend: { 
                      position: 'top', 
                      labels: { font: { size: 12 } } 
                    } 
                  } 
                }} 
              />
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-center h-64 w-full md:w-1/2">
            <h3 className="text-lg font-semibold mb-2 text-center">Spending Over Time</h3>
            <div className="w-full h-full flex items-center justify-center">
              <Bar 
                data={barData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false, 
                  plugins: { 
                    legend: { 
                      display: false, 
                      labels: { font: { size: 12 } } 
                    } 
                  },
                  scales: {
                    x: { ticks: { font: { size: 11 } } },
                    y: { ticks: { font: { size: 11 } } }
                  }
                }} 
              />
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-gray-400 text-sm mb-1">Total This Month</h3>
            <p className="text-2xl font-bold text-green-400">${totalThisMonth.toFixed(2)}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-gray-400 text-sm mb-1">Remaining Budget</h3>
            <p className="text-2xl font-bold text-blue-400">${remainingBudget.toFixed(2)}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-gray-400 text-sm mb-1">Top Category</h3>
            <p className="text-2xl font-bold text-purple-400">{topCategory} ({topCategoryPercentage}%)</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-gray-400 text-sm mb-1">Days Left</h3>
            <p className="text-2xl font-bold text-orange-400">8 days</p>
          </div>
        </div>

        {/* Transaction List */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="text-left p-4 font-semibold">Date</th>
                  <th className="text-left p-4 font-semibold">Amount</th>
                  <th className="text-left p-4 font-semibold">Category</th>
                  <th className="text-left p-4 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction, index) => (
                  <tr key={transaction.id} className={`border-t border-gray-700 ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'}`}>
                    <td className="p-4 text-gray-300">{new Date(transaction.date).toLocaleDateString()}</td>
                    <td className="p-4 font-semibold text-red-400">${transaction.amount.toFixed(2)}</td>
                    <td className="p-4">
                      <span className="bg-gray-600 px-2 py-1 rounded text-sm">{transaction.category}</span>
                    </td>
                    <td className="p-4 text-gray-300">{transaction.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Transaction Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Add New Transaction</h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Amount ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newTransaction.amount}
                    onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <select
                    value={newTransaction.category}
                    onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select category</option>
                    {categories.slice(1).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <input
                    type="text"
                    value={newTransaction.description}
                    onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="Enter description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <input
                    type="date"
                    value={newTransaction.date}
                    onChange={(e) => setNewTransaction({...newTransaction, date: e.target.value})}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Receipt (optional)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="receipt-upload"
                    />
                    <label
                      htmlFor="receipt-upload"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
                    >
                      <Upload size={16} />
                      Upload Receipt
                    </label>
                    {newTransaction.receipt && (
                      <span className="text-sm text-green-400">{newTransaction.receipt.name}</span>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleAddTransaction}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Save Transaction
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-600 hover:bg-gray-500 px-4 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsPage;