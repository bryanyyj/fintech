// src/components/Navbar.jsx
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react';

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }) => {
    const baseClass = 'py-2 px-4 rounded-lg block';
    if (isActive && expanded) {
      return baseClass + ' bg-blue-600/80 font-semibold';
    } else if (isActive && !expanded) {
      return baseClass + ' hover:bg-slate-700';
    } else {
      return baseClass + ' hover:bg-slate-700';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/', { replace: true });
  };

  // List of nav items for easier mapping
  const navItems = [
    { to: '/home', label: 'Dashboard' },
    { to: '/budget', label: 'Transactions' },
    { to: '/analyzer', label: 'AI Advisor' },
    { to: '/goal-planning', label: 'Goal & Planning' },
    { to: '/reports', label: 'Reports & Analytics' },
    { to: '/profile', label: 'Profile' },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen z-40 border-r border-slate-700 flex flex-col py-8 px-2 transition-all duration-300 ease-in-out ${expanded ? 'w-64 px-4 bg-slate-800/60 backdrop-blur-lg' : 'w-20 px-2 bg-slate-800/90'}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      style={{ minWidth: expanded ? '16rem' : '5rem' }}
    >
      <div className={`mb-10 flex flex-col items-center w-full`}>
        <div
          className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 cursor-pointer"
          onClick={() => setExpanded(e => !e)}
        >
          <span className="text-white font-bold text-lg">S</span>
        </div>
        <span
          className={`mt-3 text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent transition-all duration-300 ease-in-out
            ${expanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}
          `}
          style={{
            transitionProperty: 'opacity, transform',
            transitionDuration: '300ms',
            transitionTimingFunction: 'ease-in-out',
            display: 'inline-block',
            whiteSpace: 'nowrap',
          }}
        >
          SmartSpend
        </span>
      </div>
      <nav className={`flex flex-col gap-2 ${expanded ? '' : 'items-center'}`}>
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              navLinkClass({ isActive }) +
              ` flex items-center transition-all duration-300 ease-in-out relative overflow-hidden`
            }
            title={item.label}
          >
            <span
              className={`transition-all duration-300 ease-in-out
                ${expanded ? 'opacity-100 translate-x-0 ml-0' : 'opacity-0 -translate-x-4 ml-[-1rem] pointer-events-none'}
              `}
              style={{
                transitionProperty: 'opacity, transform, margin',
                transitionDuration: '300ms',
                transitionTimingFunction: 'ease-in-out',
                display: 'inline-block',
                whiteSpace: 'nowrap',
              }}
            >
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>
      <div className="flex-1" />
      <button
        onClick={handleLogout}
        className={`w-full flex items-center gap-2 py-2 px-4 rounded-lg bg-pink-600/80 hover:bg-pink-700 text-white font-semibold transition mt-4 ${expanded ? 'justify-start' : 'justify-center'}`}
        title="Logout"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" /></svg>
        <span
          className={`transition-all duration-300 ease-in-out
            ${expanded ? 'opacity-100 translate-x-0 ml-0' : 'opacity-0 -translate-x-4 ml-[-1rem] pointer-events-none'}
          `}
          style={{
            transitionProperty: 'opacity, transform, margin',
            transitionDuration: '300ms',
            transitionTimingFunction: 'ease-in-out',
            display: 'inline-block',
            whiteSpace: 'nowrap',
          }}
        >
          Logout
        </span>
      </button>
    </aside>
  );
}
