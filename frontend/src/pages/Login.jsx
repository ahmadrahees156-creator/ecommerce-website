import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

function Login() {
  const { darkMode } = useTheme()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!email || !password) {
      setError('Please fill all fields')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setSuccess('Login form is valid')
  }

  return (
    <main
      className={`min-h-screen px-4 py-12 flex items-center justify-center transition-colors duration-300 ${
        darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            to="/"
            className="text-3xl font-extrabold tracking-tight text-blue-600"
          >
            ShopKart<span className={darkMode ? 'text-white' : 'text-slate-900'}>.</span>
          </Link>

          <h1 className="text-2xl font-bold mt-5">
            Welcome back!
          </h1>

          <p className={`mt-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Sign in to continue shopping
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`border rounded-2xl p-6 sm:p-8 shadow-xl transition-colors duration-300 ${
            darkMode
              ? 'bg-slate-900 border-slate-800 shadow-black/20'
              : 'bg-white border-slate-200 shadow-slate-200/50'
          }`}
        >
          {error && (
            <p
              role="alert"
              className="bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg p-3 mb-5 text-sm"
            >
              {error}
            </p>
          )}

          {success && (
            <p
              role="status"
              className="bg-green-500/10 text-green-500 border border-green-500/20 rounded-lg p-3 mb-5 text-sm"
            >
              {success}
            </p>
          )}

          <div className="mb-5">
            <label
              htmlFor="email"
              className={`block text-sm font-semibold mb-2 ${
                darkMode ? 'text-slate-200' : 'text-slate-700'
              }`}
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
              className={`w-full border rounded-lg px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 ${
                darkMode
                  ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500'
                  : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400'
              }`}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className={`block text-sm font-semibold mb-2 ${
                darkMode ? 'text-slate-200' : 'text-slate-700'
              }`}
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
              className={`w-full border rounded-lg px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 ${
                darkMode
                  ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-500'
                  : 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400'
              }`}
            />

            <p className={`text-xs mt-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Password must be at least 6 characters.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md shadow-blue-600/20"
          >
            Login
          </button>

          <p className={`text-center text-sm mt-6 ${
            darkMode ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-blue-500 font-semibold hover:text-blue-400"
            >
              Create account
            </Link>
          </p>
        </form>

        <p className={`text-center text-xs mt-6 ${
          darkMode ? 'text-slate-500' : 'text-slate-400'
        }`}>
          © 2026 ShopKart. All rights reserved.
        </p>
      </div>
    </main>
  )
}

export default Login
