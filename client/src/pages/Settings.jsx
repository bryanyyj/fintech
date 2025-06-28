import React, { useState } from 'react';

export default function Settings() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [budgetAlerts, setBudgetAlerts] = useState(true);
  const [goalAlerts, setGoalAlerts] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);
  const [aiConsent, setAiConsent] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [currency, setCurrency] = useState('USD');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [language, setLanguage] = useState('English');
  const [theme, setTheme] = useState('dark');

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-3xl mx-auto space-y-10 pb-10">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Settings</h1>

        {/* Account Settings */}
        <section className="bg-gray-800 border border-slate-700 rounded-2xl p-6 shadow-lg mb-6">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Account Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Change Password</label>
              <input className="w-full p-2 rounded bg-slate-700 border border-slate-600 mb-2" type="password" placeholder="Current Password" />
              <input className="w-full p-2 rounded bg-slate-700 border border-slate-600 mb-2" type="password" placeholder="New Password" />
              <input className="w-full p-2 rounded bg-slate-700 border border-slate-600" type="password" placeholder="Confirm New Password" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Profile Picture</label>
              <input type="file" className="block w-full text-sm text-gray-400" />
            </div>
            <div>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded mt-2">Delete Account</button>
            </div>
          </div>
        </section>

        {/* Financial Profile */}
        <section className="bg-gray-800 border border-slate-700 rounded-2xl p-6 shadow-lg mb-6">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Financial Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Update Income</label>
              <input className="w-full p-2 rounded bg-slate-700 border border-slate-600" placeholder="Monthly Income" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Edit Fixed Expenses</label>
              <input className="w-full p-2 rounded bg-slate-700 border border-slate-600" placeholder="Fixed Expenses" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Modify Spending Categories</label>
              <input className="w-full p-2 rounded bg-slate-700 border border-slate-600" placeholder="Spending Categories (comma separated)" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Update Financial Goals</label>
              <input className="w-full p-2 rounded bg-slate-700 border border-slate-600" placeholder="Financial Goals" />
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-gray-800 border border-slate-700 rounded-2xl p-6 shadow-lg mb-6">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Email notifications</span>
              <input type="checkbox" checked={emailNotif} onChange={() => setEmailNotif(v => !v)} className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <span>Push notifications</span>
              <input type="checkbox" checked={pushNotif} onChange={() => setPushNotif(v => !v)} className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <span>Budget alerts</span>
              <input type="checkbox" checked={budgetAlerts} onChange={() => setBudgetAlerts(v => !v)} className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <span>Goal milestone alerts</span>
              <input type="checkbox" checked={goalAlerts} onChange={() => setGoalAlerts(v => !v)} className="w-5 h-5" />
            </div>
          </div>
        </section>

        {/* Privacy & Security */}
        <section className="bg-gray-800 border border-slate-700 rounded-2xl p-6 shadow-lg mb-6">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Privacy & Security</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Data sharing preferences</span>
              <input type="checkbox" checked={dataSharing} onChange={() => setDataSharing(v => !v)} className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <span>AI data usage consent</span>
              <input type="checkbox" checked={aiConsent} onChange={() => setAiConsent(v => !v)} className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between">
              <span>Two-factor authentication</span>
              <input type="checkbox" checked={twoFactor} onChange={() => setTwoFactor(v => !v)} className="w-5 h-5" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Connected Accounts (Bank Linking)</label>
              <input className="w-full p-2 rounded bg-slate-700 border border-slate-600" placeholder="Linked Banks" />
            </div>
          </div>
        </section>

        {/* App Preferences */}
        <section className="bg-gray-800 border border-slate-700 rounded-2xl p-6 shadow-lg mb-6">
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">App Preferences</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Currency</label>
              <select className="w-full p-2 rounded bg-slate-700 border border-slate-600" value={currency} onChange={e => setCurrency(e.target.value)}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="SGD">SGD</option>
                <option value="MYR">MYR</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Date Format</label>
              <select className="w-full p-2 rounded bg-slate-700 border border-slate-600" value={dateFormat} onChange={e => setDateFormat(e.target.value)}>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Language</label>
              <select className="w-full p-2 rounded bg-slate-700 border border-slate-600" value={language} onChange={e => setLanguage(e.target.value)}>
                <option value="English">English</option>
                <option value="Chinese">Chinese</option>
                <option value="Malay">Malay</option>
                <option value="Tamil">Tamil</option>
              </select>
            </div>
          </div>
        </section>
        <div className="flex justify-center mt-10">
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-blue-500/25 text-lg transition-all"
            style={{maxWidth: '400px'}}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
} 