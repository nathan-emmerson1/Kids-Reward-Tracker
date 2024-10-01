import homeImg from '../assets/images/family-children-education-with-kids-learning-home-with-their-mother-father-growth-development-study-learn-school-with-girl-her-sister-parents-their-house-together_590464-87635.avif'

import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect, useState } from 'react'
import { addUser } from '../apis/users'
import { Link, useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

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
      console.log(userId)

      const newUser = {
        authId: userId,

        email: user.email,
        name: user.nickname,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      try {
        await addUser(newUser)
        navigate(`/parent-dashboard`)
      } catch (error) {
        console.error('Error adding user:', error)
      }
    }
  }

  useEffect(() => {
    if (user) {
      // User is logged in, redirect to dashboard
      console.log(user)
      navigate(`/parent-dashboard`)
    }
  }, [user, navigate])

  React.useEffect(() => {
    if (user) {
      handleUserCreation()
    }
  }, [user])

  return (
    <div>
      <header className="bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6 py-16">
          <div className="items-center lg:flex">
            <div className="w-full lg:w-1/2">
              <div className="lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-gray-800 lg:text-4xl dark:text-white">
                  Kiddo Quest <br />
                </h1>

                <p className="mt-3 text-gray-600 dark:text-gray-400">
                  At Kiddo Quest, we believe that chores and rewards can be an
                  exciting adventure! Our platform transforms everyday tasks
                  into a fun quest, where kids can earn points, badges, and
                  exciting rewards for completing their chores.
                </p>

                <button
                  onClick={handleSignIn}
                  className="ml-5 mt-5 w-full transform rounded-lg bg-green-600 px-5 py-2 text-sm uppercase tracking-wider text-white transition-colors duration-300 hover:bg-green-500 focus:bg-green-500 focus:outline-none lg:w-auto"
                >
                  Log in
                </button>
                <button
                  onClick={handleSignIn}
                  className="ml-5 mt-5 w-full transform rounded-lg bg-green-600 px-5 py-2 text-sm uppercase tracking-wider text-white transition-colors duration-300 hover:bg-green-500 focus:bg-green-500 focus:outline-none lg:w-auto"
                >
                  Sign up
                </button>
                <Link to={'/kidslogin'}>
                  {' '}
                  <button className="ml-5 mt-5 w-full transform rounded-lg bg-green-600 px-5 py-2 text-sm uppercase tracking-wider text-white transition-colors duration-300 hover:bg-green-500 focus:bg-green-500 focus:outline-none lg:w-auto">
                    Kiddo Log in
                  </button>
                </Link>
              </div>
            </div>

            <div className="mt-6 flex w-full items-center justify-center lg:mt-0 lg:w-1/2">
              <img
                className="h-full w-full rounded-lg border-gray-400 lg:max-w-2xl"
                src={homeImg}
                alt="Catalogue illustration"
              />
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Home
