// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet
} from 'react-router-dom'

import Login          from './pages/login.jsx'
import Register       from './pages/register.jsx'
import Landing        from './pages/landing.jsx'
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
        {/* Public: Landing page (always accessible) */}
        <Route path="/" element={<Landing />} />

        {/* Public: Login / Register (only if not logged in) */}
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