import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Homepage from './pages/Homepage'
import Analyzer from './pages/Analyzer'
import BudgetTracker from './pages/BudgetTracker'
import Feedback from './pages/Feedback'
import History from './pages/Tracking'
import Profile from './pages/Profile'
import Login from './pages/login'
import Register from './pages/register'
import Questionnaire from './pages/Questionnaire'
import Navbar from './components/Navbar'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [needsOnboarding, setNeedsOnboarding] = useState(false)

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
    const onboardingDone = localStorage.getItem('hasCompletedOnboarding') === 'true'
    setIsLoggedIn(loggedIn)
    setNeedsOnboarding(loggedIn && !onboardingDone)
  }, [])

  const showNavbar = !['/login', '/register'].includes(window.location.pathname)

  return (
    <Router>
      {showNavbar && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Onboarding Redirect */}
        {needsOnboarding && <Route path="*" element={<Navigate to="Questionnaire" />} />}

        {/* Main App Routes */}
        <Route path="/Questionnaire" element={<Questionnaire />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/analyzer" element={<Analyzer />} />
        <Route path="/budget" element={<BudgetTracker />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />

        {/* Default fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}
