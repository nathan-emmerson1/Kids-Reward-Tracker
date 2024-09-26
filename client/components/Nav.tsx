import React from 'react'
import { addUser } from '../apis/users.ts'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated.tsx'
import { NavGroup, NavButton } from './Styled.tsx'
import { useAuth0 } from '@auth0/auth0-react'

function Nav() {
  // TODO: call the useAuth0 hook and destructure user, logout, and loginWithRedirect
  // TODO: replace placeholder user object with the one from auth0
  const { user, logout, loginWithRedirect } = useAuth0()
  user?.nickname

  const handleSignOut = () => {
    return logout()
  }

  const handleSignIn = () => {
    return loginWithRedirect()
  }

  const handleUserCreation = async () => {
    if (user) {
      const auth0Sub = user.sub
      const userId = parseInt(auth0Sub.split('|')[1])

      const newUser = {
        authId: userId,

        email: user.email,
        name: user.nickname, // or user.name based on your data structure
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      try {
        await addUser(newUser)
      } catch (error) {
        console.error('Error adding user:', error)
      }
    }
  }

  React.useEffect(() => {
    if (user) {
      handleUserCreation()
    }
  }, [user])

  return (
    <>
      <NavGroup>
        <IfAuthenticated>
          <NavButton onClick={handleSignOut}>Sign out</NavButton>
          {user && <p>Signed in as: {user?.nickname}</p>}
        </IfAuthenticated>
        <IfNotAuthenticated>
          <NavButton onClick={handleSignIn}>Sign in</NavButton>
        </IfNotAuthenticated>
      </NavGroup>
      <h1>Kids Chores and Rewards</h1>
    </>
  )
}

export default Nav
