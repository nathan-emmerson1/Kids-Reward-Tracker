import { useFruits } from '../hooks/useFruits.ts'
import Nav from './Nav.tsx'

function App() {
  const { data } = useFruits()

  return (
    <>
      <div className="app">
        <Nav />
        <h1 className="text-3xl font-bold underline">Kids Rewards Tracker</h1>

        <ul>{data && data.map((fruit) => <li key={fruit}>{fruit}</li>)}</ul>
      </div>
    </>
  )
}

export default App
