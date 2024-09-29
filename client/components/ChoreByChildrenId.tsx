import { useQuery } from '@tanstack/react-query'
import { fetchChoreByChildrenId } from '../apis/chores'
import { Link, useParams } from 'react-router-dom'
import ChoreForm from './AnotherChoreForm'
import { Chore, ChoreData } from '../../models/chores'

// interface ChorebyChildrenProps {
//   childrenId: number
// }

function ChoreByChildrenId() {
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
      <div className="mb-8 rounded-lg bg-teal-600 py-6 text-center text-white shadow-lg">
        <h1 className="text-4xl font-bold tracking-wide">Chore List</h1>
      </div>
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
  )
}

export default ChoreByChildrenId
