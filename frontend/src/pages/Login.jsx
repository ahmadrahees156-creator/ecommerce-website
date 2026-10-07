import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

function Login() {
  const { darkMode } = useTheme()
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password) {
      setError('Please fill all fields')
      return
    }

    setLoading(true)

    try {
      const response = await api.post('/auth/login', {
        email: email.trim(),
        password,
      })

      const { token, user } = response.data

      if (!token || !user) {
        throw new Error(
          'The server returned an unexpected login response.'
        )
      }

      login(token, user)
      navigate('/')
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Login failed. Please check your connection and try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  const input = darkMode
    ? 'border-[#262626] bg-[#050505] text-[#F5F5F5] placeholder:text-[#737373] focus:border-[#22C55E] focus:ring-[#22C55E]/20'
    : 'border-[#E5E7EB] bg-white text-[#171717] placeholder:text-[#737373] focus:border-[#15803D] focus:ring-[#15803D]/20'

  return (
    <main
      className={`flex min-h-screen items-center justify-center px-4 py-12 transition-colors ${
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
            Welcome back!
          </h1>

          <p
            className={`mt-2 ${
              darkMode ? 'text-[#A3A3A3]' : 'text-[#525252]'
            }`}
          >
            Sign in to continue shopping
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
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-4 ${input}`}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className={`w-full rounded-xl border px-4 py-3 outline-none transition focus:ring-4 ${input}`}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl px-4 py-3 font-semibold transition disabled:opacity-50 ${
              darkMode
                ? 'bg-[#22C55E] text-[#050505] hover:bg-[#16A34A]'
                : 'bg-[#15803D] text-white hover:bg-[#166534]'
            }`}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <p
            className={`mt-6 text-center text-sm ${
              darkMode ? 'text-[#A3A3A3]' : 'text-[#525252]'
            }`}
          >
            Don't have an account?{' '}
            <Link
              to="/register"
              className={`font-semibold ${
                darkMode
                  ? 'text-[#22C55E] hover:text-[#4ADE80]'
                  : 'text-[#15803D] hover:text-[#166534]'
              }`}
            >
              Create one
            </Link>
          </p>
        </form>
      </div>
    </main>
  )
}

export default Login