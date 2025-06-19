// src/components/Navbar.jsx
import { NavLink, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('currentUser')
    navigate('/login', { replace: true })
  }

  // common link classes
  const linkClasses = `
    relative px-2 py-1
    text-white font-bold
    before:content-[''] before:absolute before:left-0 before:bottom-0
    before:h-0.5 before:w-0 before:bg-white
    before:transition-[width] before:duration-300
    hover:before:w-full
    hover:text-pink-300
  `

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-pink-500 via-purple-400 to-blue-400 shadow-md">
      <ul className="max-w-4xl mx-auto flex items-center justify-around py-4">
        <li><NavLink to="/"         end        className={linkClasses}>Homepage      </NavLink></li>
        <li><NavLink to="/analyzer"           className={linkClasses}>Analyzer      </NavLink></li>
        <li><NavLink to="/feedback"           className={linkClasses}>Feedback      </NavLink></li>
        <li><NavLink to="/budget"             className={linkClasses}>Budget Tracker</NavLink></li>
        <li><NavLink to="/history"            className={linkClasses}>History       </NavLink></li>
        <li><NavLink to="/profile"            className={linkClasses}>My Profile    </NavLink></li>
        <li>
          <button
            onClick={handleLogout}
            className={`relative px-2 py-1 text-white font-bold
                        before:content-[''] before:absolute before:left-0 before:bottom-0
                        before:h-0.5 before:w-0 before:bg-white
                        before:transition-[width] before:duration-300
                        hover:before:w-full
                        hover:text-pink-300 focus:outline-none`}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}
