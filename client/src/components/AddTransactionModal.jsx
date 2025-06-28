import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';

const categories = ['All', 'Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Health', 'Other'];

export default function AddTransactionModal({ open, onClose, onAdd, userId }) {
  const [newTransaction, setNewTransaction] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    receipt: null
  });
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewTransaction({ ...newTransaction, receipt: file });
    }
  };

  const handleAddTransaction = () => {
    if (!newTransaction.amount || !newTransaction.category || !newTransaction.date) {
      alert('Please fill in all required fields.');
      return;
    }
    if (!userId) {
      alert('User ID is invalid. Please log in again.');
      return;
    }
    setLoading(true);
    let formattedDate = newTransaction.date;
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(newTransaction.date)) {
      const [day, month, year] = newTransaction.date.split('/');
      formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    } else if (/^\d{4}-\d{2}-\d{2}$/.test(newTransaction.date)) {
      formattedDate = newTransaction.date;
    }
    const payload = {
      user_id: parseInt(userId, 10),
      ...newTransaction,
      amount: parseFloat(newTransaction.amount),
      date: formattedDate
    };
    console.log('Sending payload:', payload); // Debug log
    fetch(`http://localhost:3000/api/transactions?userId=${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        console.log('Received response:', data); // Debug log
        setLoading(false);
        setNewTransaction({
          amount: '',
          category: '',
          description: '',
          date: new Date().toISOString().split('T')[0],
          receipt: null
        });
        onAdd && onAdd(data);
        onClose && onClose();
      })
      .catch(err => {
        setLoading(false);
        alert('Failed to add transaction.');
        console.error(err);
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Transaction</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
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
              onChange={e => setNewTransaction({ ...newTransaction, amount: e.target.value })}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              placeholder="0.00"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category *</label>
            <select
              value={newTransaction.category}
              onChange={e => setNewTransaction({ ...newTransaction, category: e.target.value })}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              disabled={loading}
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
              onChange={e => setNewTransaction({ ...newTransaction, description: e.target.value })}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              placeholder="Enter description"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <input
              type="date"
              value={newTransaction.date}
              onChange={e => setNewTransaction({ ...newTransaction, date: e.target.value })}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              disabled={loading}
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
              disabled={loading}
            >
              Save Transaction
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-500 px-4 py-3 rounded-lg font-semibold transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 