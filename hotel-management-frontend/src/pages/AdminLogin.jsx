import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  function submit(event) {
    event.preventDefault()
    if (username.trim() === 'admin' && password === 'admin123') {
      localStorage.setItem('stayfinder-role', 'admin')
      onLogin()
      navigate('/admin/dashboard')
    } else setError('Incorrect username or password. Please try again.')
  }
  return <>
    <Helmet><title>Admin Login | StayFinder</title></Helmet>
    <section className="login-wrap">
      <div className="login-card">
        <p className="eyebrow">STAYFINDER MANAGEMENT</p>
        <h1>Admin login</h1>
        <p className="intro-copy">Sign in to manage hotel listings.</p>
        <form onSubmit={submit} className="login-form">
          <label>Username<input value={username} onChange={e => setUsername(e.target.value)} required autoComplete="username" placeholder="Enter admin username" /></label>
          <label>Password<input type="password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" placeholder="Enter password" /></label>
          {error && <p className="error-text" role="alert">{error}</p>}
          <button className="button button-primary full-button" type="submit">Login to dashboard</button>
        </form>
        <p className="login-hint">Demo credentials: <strong>admin</strong> / <strong>admin123</strong></p>
        <Link to="/" className="text-link">← Continue as user</Link>
      </div>
    </section>
  </>
}
