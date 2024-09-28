import { Outlet } from 'react-router-dom'
import NavBar from './OtherNavBar'

export default function Layout() {
  return (
    <>
      <nav>
        <NavBar />
      </nav>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  )
}
