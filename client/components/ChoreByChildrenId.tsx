import { useQuery } from '@tanstack/react-query'
import { fetchChoreByChildrenId } from '../apis/chores'
import { Link, useParams } from 'react-router-dom'
import ChoreForm from './AnotherChoreForm'
import { Chore } from '../../models/chores'
import { useNavigate } from 'react-router-dom'

function ChoreByChildrenId() {
  const navigate = useNavigate()
  const { id } = useParams()

  const {
    data: chores,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['chores', id],
    queryFn: () => fetchChoreByChildrenId(Number(id)),
  })
  console.log(chores)

  if (isLoading) return <p>Loading...</p>

  if (isError) return <p>There was a error</p>

  return (
    <div>
      <div>
        <nav className="mb-6 rounded-lg bg-teal-600 py-4 shadow-lg">
          <div className="text-center text-white">
            <h1 className="text-3xl font-bold">Reward Dashboard</h1>
          </div>

          <div className="mt-4 flex justify-center space-x-4">
            <button
              className="rounded-md bg-white px-4 py-2 font-bold text-teal-600 shadow"
              onClick={() => navigate(`/parent-dashboard`)}
            >
              Parent Dashboard
            </button>
          </div>
        </nav>
        <div className="mb-5">
          <ChoreForm />
        </div>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {chores.map((chore: Chore) => (
            <div
              key={chore.id}
              className="transform overflow-hidden rounded-lg bg-white shadow-md transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="p-6">
                <h2 className="mb-2 text-xl font-semibold text-teal-600">
                  {chore.name}
                </h2>
                <p className="mb-4 text-gray-700">{chore.description}</p>
                <span
                  className={`font-semibold ${chore.completed ? 'text-teal-600' : 'text-red-600'}`}
                >
                  {chore.completed ? 'Completed' : 'Not Completed'}
                </span>
                <div className="mb-4 text-gray-600">
                  <span className="font-bold text-teal-500">Frequency: </span>
                  {chore.frequency}
                </div>
                <Link
                  to={`/reward/${chore.childrenId}/rewards`}
                  className="inline-block rounded-lg bg-teal-600 px-4 py-2 text-white shadow hover:bg-teal-700"
                >
                  Manage Rewards
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChoreByChildrenId
