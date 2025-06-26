// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet
} from 'react-router-dom'

import Login          from './pages/Login.jsx'
import Register       from './pages/Register.jsx'
import Landing        from './pages/Landing.jsx'
import Questionnaire  from './pages/Questionnaire.jsx'

import Navbar         from './components/Navbar.jsx'
import Homepage       from './pages/Homepage.jsx'
import Analyzer       from './pages/Analyzer.jsx'
import Feedback       from './pages/Feedback.jsx'
import BudgetTracker  from './pages/BudgetTracker.jsx'
import Tracking       from './pages/Tracking.jsx'
import Profile        from './pages/Profile.jsx'

// Only show Navbar + outlet if logged in
function PrivateLayout() {
  const isAuth = localStorage.getItem('isLoggedIn') === 'true'
  if (!isAuth) return <Navigate to="/" replace />
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default function App() {
  const isAuth = localStorage.getItem('isLoggedIn') === 'true'

  return (
    <Router>
      <Routes>
        {/* Public: Landing / Login / Register */}
        <Route
          path="/"
          element={isAuth ? <Navigate to="/home" replace /> : <Landing />}
        />
        <Route
          path="/login"
          element={isAuth ? <Navigate to="/home" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuth ? <Navigate to="/home" replace /> : <Register />}
        />

        {/* Questionnaire (first‐login flow) */}
        <Route
          path="/questionnaire"
          element={isAuth ? <Questionnaire /> : <Navigate to="/" replace />}
        />

        {/* Protected: show Navbar + pages */}
        <Route element={<PrivateLayout />}>
          <Route path="/home"     element={<Homepage />} />
          <Route path="/analyzer" element={<Analyzer />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/budget"   element={<BudgetTracker />} />
          <Route path="/history"  element={<Tracking />} />
          <Route path="/profile"  element={<Profile />} />
        </Route>

        {/* Fallback */}
        <Route
          path="*"
          element={
            isAuth ? <Navigate to="/home" replace /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </Router>
  )
}