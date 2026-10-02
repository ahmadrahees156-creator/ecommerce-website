import { useState } from 'react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log({
      email,
      password,
    })
  }

  return (
    <main className="min-h-screen p-6">
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="border rounded-lg p-6"
        >
          <div className="mb-4">
            <label className="block mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-md px-4 py-2"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-md px-4 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  )
}

export default Login