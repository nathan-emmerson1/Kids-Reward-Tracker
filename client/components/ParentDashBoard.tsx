import { useEffect, useState } from 'react'
import ChildrenListByUserId from './ChildrenByUserId'
import { useAuth0 } from '@auth0/auth0-react'
import { getUserWithAuthId } from '../apis/users'
import ChildrenForm from './ChildrenForm'
import NavBar from './OtherNavBar'

function ParentDashBoard() {
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

  return (
    <div>
      <div className="mb-6 rounded-lg bg-teal-600 py-4 text-center text-white shadow-lg">
        <h1 className="text-3xl font-bold">Parent Dashboard</h1>
      </div>
      <ChildrenForm />
      <ChildrenListByUserId userId={userId} />
    </div>
  )
}

export default ParentDashBoard
