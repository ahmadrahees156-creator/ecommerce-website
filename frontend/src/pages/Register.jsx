
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

function Register() {
  const { darkMode } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setNotice('');
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setNotice('');

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();

    if (!name || !email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must contain at least 8 characters.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);

      // Requires a registration-specific backend endpoint.
      const response = await api.post('/auth/register/send-otp', {
        name,
        email,
        password: formData.password,
      });

      if (response.data?.success === false) {
        throw new Error(response.data.message || 'Could not send OTP.');
      }

      setOtpSent(true);
      setNotice('Verification code sent. Check your email.');
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Could not send OTP. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setNotice('');

    if (!/^\d{6}$/.test(otp.trim())) {
      setError('Enter the 6-digit verification code.');
      return;
    }

    try {
      setLoading(true);

      // Backend should verify OTP, create the new account,
      // and return { success: true, token, user }.
      const response = await api.post('/auth/register/verify-otp', {
        email: formData.email.trim().toLowerCase(),
        otp: otp.trim(),
      });

      const data = response.data;
      const token = data?.token ?? data?.data?.token;
      const user = data?.user ?? data?.data?.user;

      if (!data?.success || !token || !user) {
        throw new Error(
          data?.message || 'OTP verification response was incomplete.'
        );
      }

      login(token, user);
      navigate('/home', { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'OTP verification failed. Please try again.'
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

  const buttonStyle = darkMode
    ? 'bg-[#E5E2DC] text-[#171717] hover:bg-[#D6B887]'
    : 'bg-[#064E3B] text-white hover:bg-[#047857]';

  return (
    <main className={`min-h-screen ${pageBg} px-4 py-12 sm:py-16 transition-colors duration-300`}>
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-transparent shadow-xl lg:grid-cols-2">
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
            Shop<span className={darkMode ? 'text-[#D6B887]' : 'text-[#047857]'}>Kart</span>
          </Link>

          <div className="relative z-10 max-w-sm">
            <p className={`mb-4 text-xs font-semibold uppercase tracking-[0.25em] ${mutedText}`}>
              A better way to shop
            </p>

            <h1 className="font-serif text-5xl leading-tight">
              Your next
              <br />
              favourite thing
              <br />
              <span className={darkMode ? 'text-[#D6B887]' : 'text-[#047857]'}>
                starts here.
              </span>
            </h1>

            <p className={`mt-6 max-w-xs text-sm leading-7 ${mutedText}`}>
              Create your account to discover products, save your favourites and keep your shopping organised.
            </p>
          </div>

          <div className={`relative z-10 border-t pt-5 text-xs ${darkMode ? 'border-[#414141]' : 'border-[#CFD9CC'} ${mutedText}`}>
            Thoughtful finds. A simpler shopping experience.
          </div>
        </section>

        <section className={`border p-6 sm:p-10 lg:p-12 ${cardBg}`}>
          <Link to="/" className="mb-8 inline-block text-xl font-bold lg:hidden">
            Shop<span className={darkMode ? 'text-[#D6B887]' : 'text-[#047857]'}>Kart</span>
          </Link>

          <div className="mb-8">
            <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.2em] ${mutedText}`}>
              {otpSent ? 'Email verification' : 'Create your account'}
            </p>

            <h2 className="font-serif text-3xl sm:text-4xl">
              {otpSent ? 'Verify your email' : 'Join ShopKart'}
            </h2>

            <p className={`mt-3 text-sm ${mutedText}`}>
              {otpSent
                ? `Enter the 6-digit code sent to ${formData.email.trim().toLowerCase()}`
                : 'Already have an account? '}
              {!otpSent && (
                <Link
                  to="/login"
                  className={`font-semibold underline underline-offset-4 ${
                    darkMode ? 'text-[#D6B887]' : 'text-[#047857]'
                  }`}
                >
                  Sign in
                </Link>
              )}
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-500"
            >
              {error}
            </div>
          )}

          {notice && (
            <div
              role="status"
              className={`mb-5 rounded-xl border px-4 py-3 text-sm ${
                darkMode
                  ? 'border-[#D6B887]/30 bg-[#D6B887]/10 text-[#D6B887]'
                  : 'border-[#047857]/20 bg-[#047857]/10 text-[#047857]'
              }`}
            >
              {notice}
            </div>
          )}

          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full rounded-xl border px-4 py-3.5 text-sm outline-none transition ${inputStyle}`}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">
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
                <label htmlFor="password" className="mb-2 block text-sm font-medium">
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="At least 8 characters"
                    minLength={8}
                    className={`w-full rounded-xl border px-4 py-3.5 pr-20 text-sm outline-none transition ${inputStyle}`}
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold ${mutedText}`}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium">
                  Confirm password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Enter your password again"
                    className={`w-full rounded-xl border px-4 py-3.5 pr-20 text-sm outline-none transition ${inputStyle}`}
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold ${mutedText}`}
                  >
                    {showConfirmPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full rounded-xl px-5 py-4 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${buttonStyle}`}
              >
                {loading ? 'Sending verification code...' : 'Send verification code'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div>
                <label htmlFor="otp" className="mb-2 block text-sm font-medium">
                  6-digit verification code
                </label>

                <input
                  id="otp"
                  name="otp"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
                    setError('');
                  }}
                  placeholder="Enter OTP"
                  className={`w-full rounded-xl border px-4 py-3.5 text-center text-lg tracking-[0.4em] outline-none transition ${inputStyle}`}
                  required
                />

                <p className={`mt-2 text-xs ${mutedText}`}>
                  The backend should expire verification codes after 5 minutes.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full rounded-xl px-5 py-4 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${buttonStyle}`}
              >
                {loading ? 'Verifying...' : 'Verify email and create account'}
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  setOtpSent(false);
                  setOtp('');
                  setError('');
                  setNotice('');
                }}
                className={`w-full rounded-xl border px-5 py-3 text-sm font-semibold transition ${
                  darkMode
                    ? 'border-[#414141] hover:bg-[#242424]'
                    : 'border-[#DDE4D9] hover:bg-[#F8F5EC]'
                }`}
              >
                Back to registration
              </button>
            </form>
          )}

          <p className={`mt-6 text-center text-xs leading-6 ${mutedText}`}>
            © 2026 ShopKart. All rights reserved.
          </p>
        </section>
      </div>
    </main>
  );
}

export default Register;
