import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

function Register() {
  const { darkMode } = useTheme()
  const { login } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError('Please fill all fields')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const response = await api.post('/auth/register', {
        name: name.trim(),
        email: email.trim(),
        password,
      })

      const { token, user } = response.data

      if (!token || !user) {
        throw new Error(
          'The server returned an unexpected registration response.'
        )
      }

      login(token, user)
      navigate('/')
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Registration failed. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  const inputClass = `w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-4 ${
    darkMode
      ? 'border-[#262626] bg-[#050505] text-[#F5F5F5] placeholder:text-[#737373] focus:border-[#22C55E] focus:ring-[#22C55E]/20'
      : 'border-[#E5E7EB] bg-white text-[#171717] placeholder:text-[#737373] focus:border-[#15803D] focus:ring-[#15803D]/20'
  }`

  const labelClass = 'mb-2 block text-sm font-semibold'

  return (
    <main
      className={`flex min-h-screen items-center justify-center px-4 py-10 transition-colors ${
        darkMode
          ? 'bg-[#050505] text-[#F5F5F5]'
          : 'bg-[#F7F8F6] text-[#171717]'
      }`}
    >
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link
            to="/"
            className={`text-3xl font-extrabold tracking-tight ${
              darkMode ? 'text-[#F5F5F5]' : 'text-[#171717]'
            }`}
          >
            Shop
            <span
              className={
                darkMode ? 'text-[#22C55E]' : 'text-[#15803D]'
              }
            >
              Kart
            </span>
          </Link>

          <h1 className="mt-5 text-2xl font-bold">
            Create your account
          </h1>

          <p
            className={`mt-2 ${
              darkMode ? 'text-[#A3A3A3]' : 'text-[#525252]'
            }`}
          >
            Join ShopKart and start shopping
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`rounded-2xl border p-6 shadow-xl transition-colors sm:p-8 ${
            darkMode
              ? 'border-[#262626] bg-[#111111] shadow-black/30'
              : 'border-[#E5E7EB] bg-white shadow-black/5'
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

          <div className="mb-5">
            <label htmlFor="name" className={labelClass}>
              Full Name
            </label>

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
            <label htmlFor="email" className={labelClass}>
              Email Address
            </label>

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
            <label htmlFor="password" className={labelClass}>
              Password
            </label>

            <input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
              className={inputClass}
            />

            <p
              className={`mt-2 text-xs ${
                darkMode ? 'text-[#737373]' : 'text-[#737373]'
              }`}
            >
              Use at least 8 characters.
            </p>
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className={labelClass}
            >
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
            disabled={loading}
            className={`w-full rounded-xl py-3 font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
              darkMode
                ? 'bg-[#22C55E] text-[#050505] hover:bg-[#16A34A]'
                : 'bg-[#15803D] text-white hover:bg-[#166534]'
            }`}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          <p
            className={`mt-6 text-center text-sm ${
              darkMode ? 'text-[#A3A3A3]' : 'text-[#525252]'
            }`}
          >
            Already have an account?{' '}
            <Link
              to="/login"
              className={`font-semibold ${
                darkMode
                  ? 'text-[#22C55E] hover:text-[#4ADE80]'
                  : 'text-[#15803D] hover:text-[#166534]'
              }`}
            >
              Login
            </Link>
          </p>
        </form>

        <p
          className={`mt-6 text-center text-xs ${
            darkMode ? 'text-[#737373]' : 'text-[#737373]'
          }`}
        >
          © 2026 ShopKart. All rights reserved.
        </p>
      </div>
    </main>
  )
}

export default Register