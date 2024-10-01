import { useEffect, useState } from 'react'
import ChildrenListByUserId from './ChildrenByUserId'
import { useAuth0 } from '@auth0/auth0-react'
import { getUserWithAuthId } from '../apis/users'
import ChildrenForm from './ChildrenForm'
import { useNavigate } from 'react-router-dom'

function ParentDashBoard() {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth0()
  const [userId, setUserId] = useState<number | undefined>(undefined)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUserId() {
      if (isAuthenticated && user) {
        try {
          const auth0Sub = user.sub
          const authId = parseInt(auth0Sub.split('|')[1])

          const response = await getUserWithAuthId(authId)
          setUserId(response.id)
        } catch (err) {
          console.error('Error fetching user ID:', err)
          setError('Failed to fetch user data')
        }
      }
    }

    fetchUserId()
  }, [isAuthenticated, user])

  if (!isAuthenticated || !user) {
    return <p>Please log in</p>
  }
  console.log(user.sub)

  return (
    <div>
      <nav className="mb-6 rounded-lg bg-teal-600 py-4 shadow-lg">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold">Parent Dashboard</h1>
        </div>

        <div className="mt-4 flex justify-center space-x-4">
          <button
            className="rounded-md bg-white px-4 py-2 font-bold text-teal-600 shadow"
            onClick={() => navigate(`/parent-dashboard/${user.name}`)}
          >
            Parent Dashboard
          </button>
        </div>
      </nav>
      <ChildrenForm />
      <ChildrenListByUserId userId={userId} />
    </div>
  )
}

export default ParentDashBoard
