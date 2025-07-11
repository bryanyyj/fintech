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
import { Navigate, useNavigate, useLocation } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const TransactionsPage = () => {
  // const [transactions, setTransactions] = useState([
  //   { id: 1, date: '2024-06-23', amount: 25.50, category: 'Food', description: 'Lunch at cafe' },
  //   { id: 2, date: '2024-06-22', amount: 45.00, category: 'Transport', description: 'Grab' },
  //   { id: 3, date: '2024-06-21', amount: 120.00, category: 'Shopping', description: 'New shoes' },
  // ]);
  const [transactions, setTransactions] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [filterPeriod, setFilterPeriod] = useState('This Month');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
  const [viewMode, setViewMode] = useState('All'); // 'Expenses', 'Income', 'All'

  const [newTransaction, setNewTransaction] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    receipt: null,
    type: 'Expense'
  });

  const expenseCategories = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Health', 'Other'];
  const incomeCategories = ['Salary', 'Bonus', 'Investment', 'Gift', 'Other'];
  const allCategories = ['All', ...expenseCategories];
  const allIncomeCategories = ['All', ...incomeCategories];
  const periods = ['This Month', 'Last 3 Months', 'All Time'];

  const navigate = useNavigate();
  const location = useLocation();

  // Fetch from backend
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const numericUserId = parseInt(userId, 10);
    if (!userId || isNaN(numericUserId)) {
      alert("User ID not found or invalid. Please log in again.");
      navigate('/login');
      return;
    }

    fetch(`http://localhost:3000/api/transactions?userId=${numericUserId}`)
      .then(res => res.json())
      .then(data => {
        // If backend gave message instead of data, fallback to empty array
        if (!Array.isArray(data)) {
          console.warn("No transaction array found:", data);
          setTransactions([]);
          setFilteredTransactions([]);
          return;
        }

        setTransactions(data);
        setFilteredTransactions(data);
      })
      .catch(err => console.error('Fetch failed:', err));
  }, []);

  useEffect(() => {
    if (location.state && location.state.openAddModal) {
      setShowModal(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Separate transactions by type
  const expenseTransactions = filteredTransactions.filter(t => 
    !t.type || t.type.toLowerCase() === 'expense'
  );
  const incomeTransactions = filteredTransactions.filter(t => 
    t.type && t.type.toLowerCase() === 'income'
  );

  // Debug: Log transaction types to console
  useEffect(() => {
    if (transactions.length > 0) {
      console.log('All transactions:', transactions);
      console.log('Transaction types found:', [...new Set(transactions.map(t => t.type))]);
      console.log('Expense transactions:', expenseTransactions);
      console.log('Income transactions:', incomeTransactions);
    }
  }, [transactions, expenseTransactions, incomeTransactions]);

  // Calculate summary data based on view mode
  const getTotalAmount = (transactions) => {
    return transactions.reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
  };

  const totalExpenses = getTotalAmount(expenseTransactions);
  const totalIncome = getTotalAmount(incomeTransactions);
  const netAmount = totalIncome - totalExpenses;

  const getCategoryTotals = (transactions) => {
    return transactions.reduce((acc, t) => {
      const category = t.category;
      acc[category] = (acc[category] || 0) + parseFloat(t.amount || 0);
      return acc;
    }, {});
  };

  const expenseCategoryTotals = getCategoryTotals(expenseTransactions);
  const incomeCategoryTotals = getCategoryTotals(incomeTransactions);
  
  const remainingBudget = 3500 - totalExpenses; // Budget minus expenses only
  const topExpenseCategory = Object.keys(expenseCategoryTotals).reduce((a, b) => 
    expenseCategoryTotals[a] > expenseCategoryTotals[b] ? a : b, 'Food'
  );
  const topExpenseCategoryPercentage = Math.round((expenseCategoryTotals[topExpenseCategory] / totalExpenses) * 100) || 0;

  const topIncomeCategory = Object.keys(incomeCategoryTotals).reduce((a, b) => 
    incomeCategoryTotals[a] > incomeCategoryTotals[b] ? a : b, 'Salary'
  );
  const topIncomeCategoryPercentage = Math.round((incomeCategoryTotals[topIncomeCategory] / totalIncome) * 100) || 0;

  // Filter transactions based on search, filters, and view mode
  useEffect(() => {
    let filtered = transactions;
    
    // Filter by view mode
    if (viewMode === 'Expenses') {
      filtered = filtered.filter(t => !t.type || t.type.toLowerCase() === 'expense');
    } else if (viewMode === 'Income') {
      filtered = filtered.filter(t => t.type && t.type.toLowerCase() === 'income');
    }
    
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
  }, [transactions, selectedCategory, searchTerm, viewMode]);

  // Reset category filter when view mode changes
  useEffect(() => {
    setSelectedCategory('All');
  }, [viewMode]);

  const handleAddTransaction = () => {
    // Validate all required fields
    if (!newTransaction.amount || !newTransaction.category || !newTransaction.date || !newTransaction.type) {
      alert('Please fill in all required fields.');
      return;
    }
    const userId = localStorage.getItem('userId');
    const numericUserId = parseInt(userId, 10);
    if (isNaN(numericUserId)) {
      alert('User ID is invalid. Please log in again.');
      return;
    }

    // Format date to YYYY-MM-DD
    let formattedDate = newTransaction.date;
    // If date is in DD/MM/YYYY, convert it
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(newTransaction.date)) {
      const [day, month, year] = newTransaction.date.split('/');
      formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    // If date is in MM/DD/YYYY, convert it (just in case)
    else if (/^\d{4}-\d{2}-\d{2}$/.test(newTransaction.date)) {
      formattedDate = newTransaction.date;
    }

    const payload = {
      user_id: numericUserId,
      ...newTransaction,
      amount: parseFloat(newTransaction.amount),
      date: formattedDate, // use the formatted date
      type: newTransaction.type // Ensure type is included
    };

    console.log('Frontend sending payload:', payload);
    console.log('Transaction type being sent:', newTransaction.type);

    fetch(`http://localhost:3000/api/transactions?userId=${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        console.log('Backend response:', data);
        setTransactions([data, ...transactions]);
        setNewTransaction({
          amount: '',
          category: '',
          description: '',
          date: new Date().toISOString().split('T')[0],
          receipt: null,
          type: 'Expense' // Reset type to default
        });
        setShowModal(false);
      })
      .catch(err => console.error('Failed to add transaction:', err));
  };

  // Prepare data for Pie Chart based on view mode
  const getPieData = () => {
    let categoryTotals, title;
    
    if (viewMode === 'Expenses') {
      categoryTotals = expenseCategoryTotals;
      title = 'Spending by Category';
    } else if (viewMode === 'Income') {
      categoryTotals = incomeCategoryTotals;
      title = 'Income by Category';
    } else {
      // For 'All' view, show expenses only in pie chart for clarity
      categoryTotals = expenseCategoryTotals;
      title = 'Spending by Category';
    }

    return {
      title,
      data: {
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
      }
    };
  };

  // Prepare data for Bar Chart based on view mode
  const getBarData = () => {
    let transactions, title, label;
    
    if (viewMode === 'Expenses') {
      transactions = expenseTransactions;
      title = 'Spending Over Time';
      label = 'Spending';
    } else if (viewMode === 'Income') {
      transactions = incomeTransactions;
      title = 'Income Over Time';
      label = 'Income';
    } else {
      // For 'All' view, show expenses only in bar chart for clarity
      transactions = expenseTransactions;
      title = 'Spending Over Time';
      label = 'Spending';
    }

    const spendingByDate = transactions.reduce((acc, t) => {
      const dateKey = t.transaction_date || t.date;
      if (!dateKey) return acc;

      const amount = parseFloat(t.amount || 0);
      acc[dateKey] = (acc[dateKey] || 0) + amount;
      return acc;
    }, {});

    return {
      title,
      data: {
        labels: Object.keys(spendingByDate).sort(),
        datasets: [
          {
            label: label,
            data: Object.keys(spendingByDate).sort().map(date => spendingByDate[date]),
            backgroundColor: viewMode === 'Income' ? '#10b981' : '#6366f1',
          },
        ],
      }
    };
  };

  const pieChartData = getPieData();
  const barChartData = getBarData();

  // Get current category list based on view mode
  const getCurrentCategories = () => {
    if (viewMode === 'Income') {
      return allIncomeCategories;
    } else {
      return allCategories;
    }
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
              {/* View Mode Toggle */}
              <div className="flex bg-gray-700 rounded-lg p-1">
                {['Expenses', 'Income', 'All'].map(mode => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      viewMode === mode 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>

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
                {getCurrentCategories().map(category => (
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
            <h3 className="text-lg font-semibold mb-2 text-center">{pieChartData.title}</h3>
            <div className="w-full h-full flex items-center justify-center">
              <Pie 
                data={pieChartData.data} 
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
            <h3 className="text-lg font-semibold mb-2 text-center">{barChartData.title}</h3>
            <div className="w-full h-full flex items-center justify-center">
              <Bar 
                data={barChartData.data} 
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
            <h3 className="text-gray-400 text-sm mb-1">
              {viewMode === 'Income' ? 'Total Income' : viewMode === 'Expenses' ? 'Total Expenses' : 'Net Amount'}
            </h3>
            <p className={`text-2xl font-bold ${
              viewMode === 'Income' ? 'text-green-400' : 
              viewMode === 'Expenses' ? 'text-red-400' : 
              netAmount >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              ${viewMode === 'Income' ? totalIncome.toFixed(2) : 
                viewMode === 'Expenses' ? totalExpenses.toFixed(2) : 
                netAmount.toFixed(2)}
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-gray-400 text-sm mb-1">Remaining Budget</h3>
            <p className="text-2xl font-bold text-blue-400">${remainingBudget.toFixed(2)}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-gray-400 text-sm mb-1">
              {viewMode === 'Income' ? 'Top Income Category' : 'Top Expense Category'}
            </h3>
            <p className="text-2xl font-bold text-purple-400">
              {viewMode === 'Income' ? 
                `${topIncomeCategory} (${topIncomeCategoryPercentage}%)` : 
                `${topExpenseCategory} (${topExpenseCategoryPercentage}%)`}
            </p>
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
                  <th className="text-left p-4 font-semibold">Type</th>
                  <th className="text-left p-4 font-semibold">Amount</th>
                  <th className="text-left p-4 font-semibold">Category</th>
                  <th className="text-left p-4 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.filter(t => t && t.amount !== undefined && t.category && (t.transaction_date || t.date)).length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-400 py-8">
                      No transactions found.
                    </td>
                  </tr>
                ) : (
                  filteredTransactions
                    .filter(t => t && t.amount !== undefined && t.category && (t.transaction_date || t.date))
                    .map((transaction, index) => (
                      <tr key={transaction.id || index} className={`border-t border-gray-700 ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'}`}>
                        <td className="p-4 text-gray-300">{transaction.transaction_date || transaction.date ? new Date(transaction.transaction_date || transaction.date).toLocaleDateString() : ""}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-sm ${
                            transaction.type && transaction.type.toLowerCase() === 'income' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                          }`}>
                            {transaction.type || 'Unknown'}
                          </span>
                        </td>
                        <td className={`p-4 font-semibold ${
                          transaction.type && transaction.type.toLowerCase() === 'income' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          ${parseFloat(transaction.amount || 0).toFixed(2)}
                        </td>
                        <td className="p-4">
                          <span className="bg-gray-600 px-2 py-1 rounded text-sm">{transaction.category}</span>
                        </td>
                        <td className="p-4 text-gray-300">{transaction.description}</td>
                      </tr>
                    ))
                )}
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
                  <label className="block text-sm font-medium mb-2">Type *</label>
                  <select
                    value={newTransaction.type}
                    onChange={(e) => {
                      const newType = e.target.value;
                      setNewTransaction({
                        ...newTransaction,
                        type: newType,
                        category: '' // Reset category when type changes
                      });
                    }}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Expense">Expense</option>
                    <option value="Income">Income</option>
                  </select>
                </div>
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
                    {(newTransaction.type === 'Income' ? incomeCategories : expenseCategories).map(category => (
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