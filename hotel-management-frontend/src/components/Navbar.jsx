import { NavLink, Link, useNavigate } from 'react-router-dom'

export default function Navbar({ role, onLogout }) {
  const navigate = useNavigate()
  function logout() { onLogout(); navigate('/') }
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link to="/" className="brand"><span className="brand-mark">S</span> StayFinder</Link>
        <nav>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>User</NavLink>
          {role === 'admin' ? <>
            <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Admin dashboard</NavLink>
            <button className="button button-light nav-button" onClick={logout}>Logout</button>
          </> : <Link to="/admin/login" className="button button-primary nav-button">Admin login</Link>}
        </nav>
      </div>
    </header>
  )
}
