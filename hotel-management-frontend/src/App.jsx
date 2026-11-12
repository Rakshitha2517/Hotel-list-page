import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import HotelList from './pages/HotelList'
import HotelFormPage from './pages/HotelFormPage'
import HotelDetails from './pages/HotelDetails'
import AdminLogin from './pages/AdminLogin'

function AdminRoute({ children }) {
  return localStorage.getItem('stayfinder-role') === 'admin' ? children : <Navigate to="/admin/login" replace />
}

export default function App() {
  const [role, setRole] = useState(() => localStorage.getItem('stayfinder-role') || 'user')
  function handleLogout() {
    localStorage.removeItem('stayfinder-role')
    setRole('user')
  }
  function handleLogin() { setRole('admin') }

  return (
    <div className="app-shell">
      <Navbar role={role} onLogout={handleLogout} />
      <main className="main-container">
        <Routes>
          <Route path="/" element={<HotelList view="user" />} />
          <Route path="/admin/login" element={<AdminLogin onLogin={handleLogin} />} />
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<AdminRoute><HotelList view="admin" /></AdminRoute>} />
          <Route path="/admin/hotels/new" element={<AdminRoute><HotelFormPage mode="add" /></AdminRoute>} />
          <Route path="/admin/hotels/:id/edit" element={<AdminRoute><HotelFormPage mode="edit" /></AdminRoute>} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="footer">StayFinder · Hotel directory demo</footer>
    </div>
  )
}
