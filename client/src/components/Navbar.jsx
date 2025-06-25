// src/components/Navbar.jsx
import { NavLink, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('currentUser')
    navigate('/login', { replace: true })
  }

  const linkClasses = `
    relative px-2 py-1 text-sm text-white font-semibold
    before:content-[''] before:absolute before:left-0 before:bottom-0
    before:h-0.5 before:w-0 before:bg-white
    before:transition-[width] before:duration-300
    hover:before:w-full hover:text-pink-200
  `

  return (
<nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-pink-500 via-purple-400 to-blue-400 shadow">
  <div className="max-w-7xl mx-auto px-4">
    <div className="flex items-center justify-between h-16">
      
      {/* Left side links */}
      <ul className="flex space-x-6 text-sm font-semibold text-white">
        <li><NavLink to="/"         end        className={linkClasses}>Homepage      </NavLink></li>
        <li><NavLink to="/analyzer"           className={linkClasses}>Analyzer      </NavLink></li>
        <li><NavLink to="/feedback"           className={linkClasses}>Feedback      </NavLink></li>
        <li><NavLink to="/budget"             className={linkClasses}>Budget Tracker</NavLink></li>
        <li><NavLink to="/history"            className={linkClasses}>History       </NavLink></li>
      </ul>

      {/* Right side links */}
      <ul className="flex items-center space-x-4 text-sm font-semibold text-white">
        <li>
          <NavLink to="/profile" className={linkClasses}>My Profile</NavLink>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}
