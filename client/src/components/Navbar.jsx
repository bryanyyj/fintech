// src/components/Navbar.jsx
import { NavLink, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'

export default function Navbar() {
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('currentUser')
    navigate('/login', { replace: true })
  }

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Helper for active link styling
  const navLinkClass = ({ isActive }) =>
    isActive
      ? `nav-link active px-2 py-1 text-sm font-semibold`
      : `nav-link px-2 py-1 text-sm font-semibold`

  return (
<nav className="navbar fixed top-0 left-0 w-full z-50 shadow border-b border-[#393e5c]">
  <div className="max-w-7xl mx-auto px-4">
    <div className="flex items-center justify-between h-16">
      {/* Left side links */}
      <ul className="flex space-x-6 text-sm font-semibold">
        <li><NavLink to="/home"     end        className={navLinkClass}>Homepage      </NavLink></li>
        <li><NavLink to="/analyzer"           className={navLinkClass}>Analyzer      </NavLink></li>
        <li><NavLink to="/Feedback"           className={navLinkClass}>Feedback      </NavLink></li>
        <li><NavLink to="/budget"             className={navLinkClass}>Budget Tracker</NavLink></li>
        <li><NavLink to="/history"            className={navLinkClass}>History       </NavLink></li>
      </ul>
      {/* Right side links */}
      <ul className="flex items-center space-x-4 text-sm font-semibold">
        <li className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((open) => !open)}
            className="flex items-center px-4 py-2 bg-[#232946] text-lg font-semibold rounded-md shadow focus:outline-none border border-[#393e5c] hover:bg-[#393e5c] transition"
          >
            <span className="mr-2">My Profile</span>
            <svg className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu absolute right-0 mt-2 w-40 py-2 z-50">
              <button
                className="block w-full text-left px-4 py-2 text-base font-medium transition hover:text-pink-400"
                onClick={() => { setDropdownOpen(false); navigate('/profile') }}
                style={{ borderRadius: 0, background: 'none' }}
              >
                Profile
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-base font-medium transition hover:text-pink-400"
                onClick={() => { setDropdownOpen(false); handleLogout() }}
                style={{ borderRadius: 0, background: 'none' }}
              >
                Logout
              </button>
            </div>
          )}
        </li>
      </ul>
    </div>
  </div>
</nav>
  )
}
