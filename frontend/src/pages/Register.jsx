import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

function Register() {
  const { darkMode } = useTheme()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError('Please fill all fields')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setSuccess('Registration form is valid. Backend registration is not connected yet.')
  }

  const inputClass = `w-full rounded-xl border px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 ${
    darkMode
      ? 'border-slate-700 bg-slate-800 text-white placeholder:text-slate-500'
      : 'border-slate-300 bg-white text-slate-900 placeholder:text-slate-400'
  }`

  const labelClass = `mb-2 block text-sm font-semibold ${
    darkMode ? 'text-slate-200' : 'text-slate-700'
  }`

  return (
    <main
      className={`flex min-h-screen items-center justify-center px-4 py-10 transition-colors duration-300 ${
        darkMode
          ? 'bg-slate-950 text-white'
          : 'bg-slate-50 text-slate-900'
      }`}
    >
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="text-3xl font-extrabold tracking-tight text-blue-600">
            ShopKart<span className={darkMode ? 'text-white' : 'text-slate-900'}>.</span>
          </Link>

          <h1 className="mt-5 text-2xl font-bold">Create your account</h1>

          <p className={`mt-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Join ShopKart and start shopping
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`rounded-2xl border p-6 shadow-xl transition-colors duration-300 sm:p-8 ${
            darkMode
              ? 'border-slate-800 bg-slate-900 shadow-black/20'
              : 'border-slate-200 bg-white shadow-slate-200/50'
          }`}
        >
          {error && (
            <p
              role="alert"
              className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500"
            >
              {error}
            </p>
          )}

          {success && (
            <p
              role="status"
              className="mb-5 rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-500"
            >
              {success}
            </p>
          )}

          <div className="mb-5">
            <label htmlFor="name" className={labelClass}>Full Name</label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={inputClass}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className={labelClass}>Email Address</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClass}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="password" className={labelClass}>Password</label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
              className={inputClass}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className={labelClass}>
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-md shadow-blue-600/20 transition duration-200 hover:bg-blue-700 active:scale-[0.99]"
          >
            Create Account
          </button>

          <p className={`mt-6 text-center text-sm ${
            darkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-blue-500 hover:text-blue-400"
            >
              Login
            </Link>
          </p>
        </form>

        <p className={`mt-6 text-center text-xs ${
          darkMode ? 'text-slate-500' : 'text-slate-400'
        }`}>
          © 2026 ShopKart. All rights reserved.
        </p>
      </div>
    </main>
  )
}

export default Register

