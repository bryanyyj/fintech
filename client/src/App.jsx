// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation
} from 'react-router-dom'

import Login          from './pages/login.jsx'
import Register       from './pages/register.jsx'
import Questionnaire  from './pages/Questionnaire.jsx'
import Navbar         from './components/Navbar.jsx'
import Homepage       from './pages/Homepage.jsx'
import Analyzer       from './pages/Analyzer.jsx'
import Feedback       from './pages/Feedback.jsx'
import Tracking       from './pages/Tracking.jsx'
import BudgetTracker  from './pages/BudgetTracker.jsx'
import Profile        from './pages/Profile.jsx'

function PrivateLayout() {
  const isAuth = localStorage.getItem('isLoggedIn') === 'true'
  const location = useLocation()

  if (!isAuth) {
    // Not logged in
    return <Navigate to="/login" replace />
  }

  const user  = localStorage.getItem('currentUser')
  const doneQ = localStorage.getItem(`questionnaireDone_${user}`) === 'true'

  // If they haven’t completed the questionnaire, always redirect them there
  if (!doneQ && location.pathname !== '/questionnaire') {
    return <Navigate to="/questionnaire" replace />
  }

  // Otherwise show the normal navbar + child route
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
        {/* Public */}
        <Route
          path="/login"
          element={isAuth ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuth ? <Navigate to="/" replace /> : <Register />}
        />

        {/* Protected */}
        <Route element={<PrivateLayout />}>
          {/* New explicit questionnaire route */}
          <Route path="/questionnaire" element={<Questionnaire />} />

          {/* Your real app pages */}
          <Route path="/"         element={<Homepage />} />
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
            isAuth
              ? <Navigate to="/" replace />
              : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </Router>
  )
}
