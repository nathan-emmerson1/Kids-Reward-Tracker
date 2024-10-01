import { useState } from 'react'
import { fetchChildrenLogInInfo } from '../apis/children'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

function KidsLogIn() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  interface LoginCredentials {
    userName: string
    password: string
  }

  const logInMutation = useMutation({
    mutationFn: ({ userName, password }: LoginCredentials) =>
      fetchChildrenLogInInfo(userName, password),
    onSuccess: (data) => {
      console.log('login successful', data)

      navigate(`/kidsdashboard/${data.userId}`)
    },
    onError: (error) => {
      setError(error?.response?.data?.message || 'Log in failed')
    },
    onSettled: () => {
      setLoading(false) // Reset loading state
    },
  })

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    setError(null)

    logInMutation.mutate({ userName, password })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Kiddo Log In
        </h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="text"
            className="w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className={`w-full rounded p-3 text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
          {error && <p className="text-center text-red-500">{error}</p>}{' '}
          {/* Show error message */}
        </form>
      </div>
    </div>
  )
}
export default KidsLogIn
