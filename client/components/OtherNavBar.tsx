import { useState } from 'react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated.tsx'
import { useAuth0 } from '@auth0/auth0-react'
import { NavButton } from './Styled.tsx'
import { Link } from 'react-router-dom'

function NavBar() {
  const { user, logout, loginWithRedirect } = useAuth0()
  const [isOpen, setIsOpen] = useState(false)

  console.log(user)

  const handleSignOut = () => {
    return logout()
  }
  return (
    <nav className="relative bg-white shadow dark:bg-gray-800">
      <div className="container mx-auto px-6 py-4 md:flex md:items-center md:justify-between">
        <div className="flex items-center justify-between">
          <a href="#">
            <img
              className="h-6 w-auto sm:h-7"
              src="https://merakiui.com/images/full-logo.svg"
              alt=""
            />
          </a>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-500 hover:text-gray-600 focus:text-gray-600 focus:outline-none dark:text-gray-200 dark:hover:text-gray-400 dark:focus:text-gray-400"
              aria-label="toggle menu"
            >
              {!isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu open: "block", Menu closed: "hidden" */}
        <div
          className={`absolute inset-x-0 z-20 w-full bg-white px-6 py-4 transition-all duration-300 ease-in-out dark:bg-gray-800 ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} md:relative md:top-0 md:mt-0 md:flex md:w-auto md:translate-x-0 md:items-center md:bg-transparent md:p-0 md:opacity-100`}
        >
          <div className="flex flex-col md:mx-6 md:flex-row">
            <Link
              to={'/home'}
              className="my-2 transform text-gray-700 transition-colors duration-300 hover:text-blue-500 md:mx-4 md:my-0 dark:text-gray-200 dark:hover:text-blue-400"
            >
              Home
            </Link>

            <a
              className="my-2 transform text-gray-700 transition-colors duration-300 hover:text-blue-500 md:mx-4 md:my-0 dark:text-gray-200 dark:hover:text-blue-400"
              href="#"
            >
              Contact
            </a>
            <a
              className="my-2 transform text-gray-700 transition-colors duration-300 hover:text-blue-500 md:mx-4 md:my-0 dark:text-gray-200 dark:hover:text-blue-400"
              href="#"
            >
              About
            </a>

            <IfAuthenticated>
              <NavButton onClick={handleSignOut}>Sign out</NavButton>
              {user && <p>Signed in as: {user?.nickname}</p>}
            </IfAuthenticated>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
