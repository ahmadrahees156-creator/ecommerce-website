
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

function Login() {
  const { darkMode } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: location.state?.email || '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email.trim() || !formData.password) {
      setError('Please enter your email and password.');
      return;
    }

    try {
      setLoading(true);

      const response = await api.post('/auth/login', {
        email: formData.email.trim(),
        password: formData.password,
      });

      const data = response.data;
      const token = data?.token ?? data?.data?.token;
      const user = data?.user ?? data?.data?.user;

      if (!token || !user) {
        setError('Login response was incomplete. Please try again.');
        return;
      }

      login(token, user);

      const destination = location.state?.from?.pathname || '/home';
      navigate(destination, { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          'Unable to sign in. Please check your credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  const pageBg = darkMode
    ? 'bg-[#101010] text-[#F5F5F5]'
    : 'bg-[#F8F5EC] text-[#173D30]';

  const cardBg = darkMode
    ? 'bg-[#1A1A1A] border-[#383838]'
    : 'bg-white border-[#E4E9DF]';

  const mutedText = darkMode ? 'text-[#B5B5B5]' : 'text-[#68786D]';

  const inputStyle = darkMode
    ? 'bg-[#242424] border-[#414141] text-white placeholder:text-[#858585] focus:border-[#D6B887]'
    : 'bg-[#FAFAF6] border-[#DDE4D9] text-[#173D30] placeholder:text-[#8A958C] focus:border-[#047857]';

  return (
    <main
      className={`min-h-screen ${pageBg} px-4 py-12 sm:py-16 transition-colors duration-300`}
    >
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-transparent shadow-xl lg:grid-cols-2">
        {/* Left promotional panel */}
        <section
          className={`relative hidden min-h-[650px] flex-col justify-between overflow-hidden p-10 lg:flex ${
            darkMode ? 'bg-[#202720]' : 'bg-[#E8EDE2]'
          }`}
        >
          <div
            className={`absolute -right-20 -top-16 h-72 w-72 rounded-full border ${
              darkMode ? 'border-[#D6B887]/20' : 'border-[#064E3B]/15'
            }`}
          />

          <div
            className={`absolute -bottom-20 -left-20 h-80 w-80 rounded-full border ${
              darkMode ? 'border-[#D6B887]/20' : 'border-[#064E3B]/15'
            }`}
          />

          <Link to="/" className="relative z-10 text-2xl font-bold tracking-tight">
            Shop
            <span className={darkMode ? 'text-[#D6B887]' : 'text-[#047857]'}>
              Kart
            </span>
          </Link>

          <div className="relative z-10 max-w-sm">
            <p
              className={`mb-4 text-xs font-semibold uppercase tracking-[0.25em] ${mutedText}`}
            >
              Welcome back
            </p>

            <h1 className="font-serif text-5xl leading-tight">
              Good to
              <br />
              see you
              <br />
              <span className={darkMode ? 'text-[#D6B887]' : 'text-[#047857]'}>
                again.
              </span>
            </h1>

            <p className={`mt-6 max-w-xs text-sm leading-7 ${mutedText}`}>
              Sign in to explore your favourite finds, manage your orders and
              continue where your shopping journey left off.
            </p>
          </div>

          <div
            className={`relative z-10 border-t pt-5 text-xs ${mutedText} ${
              darkMode ? 'border-[#414141]' : 'border-[#CFD9CC]'
            }`}
          >
            Thoughtful finds. A simpler shopping experience.
          </div>
        </section>

        {/* Login form */}
        <section className={`border p-6 sm:p-10 lg:p-12 ${cardBg}`}>
          <Link to="/" className="mb-8 inline-block text-xl font-bold lg:hidden">
            Shop
            <span className={darkMode ? 'text-[#D6B887]' : 'text-[#047857]'}>
              Kart
            </span>
          </Link>

          <div className="mb-8">
            <p
              className={`mb-3 text-xs font-semibold uppercase tracking-[0.2em] ${mutedText}`}
            >
              Sign in to your account
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl">
              Welcome back
            </h2>

            <p className={`mt-3 text-sm ${mutedText}`}>
              New to ShopKart?{' '}
              <Link
                to="/register"
                className={`font-semibold underline underline-offset-4 ${
                  darkMode ? 'text-[#D6B887]' : 'text-[#047857]'
                }`}
              >
                Create an account
              </Link>
            </p>
          </div>

          {location.state?.registered && (
            <div className="mb-5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600">
              Account registration submitted. Sign in if your account has been
              created successfully.
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium"
              >
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full rounded-xl border px-4 py-3.5 text-sm outline-none transition ${inputStyle}`}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full rounded-xl border px-4 py-3.5 pr-20 text-sm outline-none transition ${inputStyle}`}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold ${mutedText}`}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-xl px-5 py-4 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${
                darkMode
                  ? 'bg-[#E5E2DC] text-[#171717] hover:bg-[#D6B887]'
                  : 'bg-[#064E3B] text-white hover:bg-[#047857]'
              }`}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className={`mt-6 text-center text-xs leading-6 ${mutedText}`}>
            Your shopping journey, all in one place.
          </p>
        </section>
      </div>
    </main>
  );
}

export default Login;
