import React, { useState } from 'react';
import { X } from 'lucide-react';

const categories = ['Emergency', 'Vacation', 'House', 'Car', 'Education', 'Other'];
const priorities = ['High', 'Medium', 'Low'];

const initialGoals = [
  {
    id: 1,
    name: 'Emergency Fund',
    targetAmount: 15000,
    saved: 3000,
    targetDate: '2024-12-31',
    category: 'Emergency',
    priority: 'High',
  },
  {
    id: 2,
    name: 'Vacation Fund',
    targetAmount: 3000,
    saved: 800,
    targetDate: '2024-08-15',
    category: 'Vacation',
    priority: 'Medium',
  },
];

function monthsLeft(targetDate) {
  const now = new Date();
  const target = new Date(targetDate);
  return Math.max(0, (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth()));
}

function percent(saved, target) {
  return Math.round((saved / target) * 100);
}

export default function GoalPlanning() {
  const [goals, setGoals] = useState(initialGoals);
  const [showModal, setShowModal] = useState(false);
  const [modalGoal, setModalGoal] = useState({
    name: '',
    targetAmount: '',
    targetDate: '',
    saved: '',
    category: '',
    priority: '',
  });
  const [editingId, setEditingId] = useState(null);

  const openAddModal = () => {
    setModalGoal({ name: '', targetAmount: '', targetDate: '', saved: '', category: '', priority: '' });
    setEditingId(null);
    setShowModal(true);
  };
  const openEditModal = goal => {
    setModalGoal(goal);
    setEditingId(goal.id);
    setShowModal(true);
  };
  const handleSave = () => {
    if (!modalGoal.name || !modalGoal.targetAmount || !modalGoal.targetDate || !modalGoal.saved || !modalGoal.category || !modalGoal.priority) {
      alert('Please fill in all fields.');
      return;
    }
    if (editingId) {
      setGoals(goals.map(g => g.id === editingId ? { ...modalGoal, id: editingId } : g));
    } else {
      setGoals([...goals, { ...modalGoal, id: Date.now() }]);
    }
    setShowModal(false);
  };
  const handleDelete = id => {
    if (window.confirm('Delete this goal?')) setGoals(goals.filter(g => g.id !== id));
  };

  // Analytics (dummy for now)
  const analytics = goals.length ? {
    likelihood: 'High',
    recommendation: 'Increase your monthly savings by $200 to reach your goals faster.',
    suggested: '$1,200',
  } : null;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 ml-20">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Goal & Planning</h1>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-blue-500/25 px-6 py-2" onClick={openAddModal}>+ Add New Goal</button>
        </div>
        {/* Analytics */}
        {analytics && (
          <div className="bg-gray-800 border border-slate-700 rounded-2xl p-6 shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Goal Analytics</h2>
            <div className="mb-2">Completion Likelihood: <span className="font-bold text-green-400">{analytics.likelihood}</span></div>
            <div className="mb-2">AI Recommendation: <span className="text-blue-300">{analytics.recommendation}</span></div>
            <div>Suggested Monthly Savings: <span className="font-bold text-purple-400">{analytics.suggested}</span></div>
          </div>
        )}
        {/* Goal Cards */}
        <div className="space-y-8">
          {goals.map(goal => {
            const months = monthsLeft(goal.targetDate);
            const pct = percent(goal.saved, goal.targetAmount);
            const monthlyNeeded = months > 0 ? Math.ceil((goal.targetAmount - goal.saved) / months) : goal.targetAmount - goal.saved;
            return (
              <div key={goal.id} className="bg-gray-800 border border-slate-700 rounded-2xl p-6 shadow-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-bold text-lg">{goal.name}</div>
                  <div className="text-sm text-gray-400">{goal.category} | Priority: {goal.priority}</div>
                </div>
                <div className="mb-2">Progress: <span className="font-bold text-blue-400">${goal.saved} / ${goal.targetAmount} ({pct}%)</span></div>
                <div className="w-full h-3 bg-slate-700 rounded-full mb-2">
                  <div className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" style={{width: `${pct}%`}}></div>
                </div>
                <div className="mb-2">Target: {new Date(goal.targetDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })} ({months} months left)</div>
                <div className="mb-2">Monthly needed: <span className="font-bold text-green-400">${monthlyNeeded}</span></div>
                <div className="flex gap-2 mt-2">
                  <button className="px-4 py-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-white text-sm font-bold shadow hover:shadow-purple-500/25" onClick={() => openEditModal(goal)}>Edit</button>
                  <button className="px-4 py-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-white text-sm font-bold shadow hover:shadow-red-500/25" onClick={() => handleDelete(goal.id)}>Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Add/Edit Goal Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-slate-700 rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{editingId ? 'Edit Goal' : 'Add New Goal'}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white"><X size={24} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Goal Name</label>
                <input className="w-full p-2 rounded bg-slate-700 border border-slate-600" value={modalGoal.name} onChange={e => setModalGoal(g => ({...g, name: e.target.value}))} placeholder="Goal Name" />
              </div>
              <div>
                <label className="block mb-1 font-medium">Target Amount ($)</label>
                <input className="w-full p-2 rounded bg-slate-700 border border-slate-600" type="number" value={modalGoal.targetAmount} onChange={e => setModalGoal(g => ({...g, targetAmount: e.target.value}))} placeholder="Target Amount" />
              </div>
              <div>
                <label className="block mb-1 font-medium">Target Date</label>
                <input className="w-full p-2 rounded bg-slate-700 border border-slate-600" type="date" value={modalGoal.targetDate} onChange={e => setModalGoal(g => ({...g, targetDate: e.target.value}))} />
              </div>
              <div>
                <label className="block mb-1 font-medium">Current Saved Amount ($)</label>
                <input className="w-full p-2 rounded bg-slate-700 border border-slate-600" type="number" value={modalGoal.saved} onChange={e => setModalGoal(g => ({...g, saved: e.target.value}))} placeholder="Current Saved" />
              </div>
              <div>
                <label className="block mb-1 font-medium">Goal Category</label>
                <select className="w-full p-2 rounded bg-slate-700 border border-slate-600" value={modalGoal.category} onChange={e => setModalGoal(g => ({...g, category: e.target.value}))}>
                  <option value="">Select category</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Priority Level</label>
                <select className="w-full p-2 rounded bg-slate-700 border border-slate-600" value={modalGoal.priority} onChange={e => setModalGoal(g => ({...g, priority: e.target.value}))}>
                  <option value="">Select priority</option>
                  {priorities.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <button onClick={handleSave} className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-2 rounded-full font-bold text-white shadow-lg hover:shadow-blue-500/25 transition-colors">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 