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
      <div>
        {chores.map((chore: Chore) => (
          <li key={chore.id}>
            <div>Name:{chore.name}</div>
            <div>Description:{chore.description}</div>
            <div>Frequency:{chore.frequency}</div>
            <div>
              {' '}
              <Link to={`/reward/${chore.childrenId}/rewards`}>
                Manage Rewards
              </Link>{' '}
            </div>
          </li>
        ))}
      </div>

      <ChoreForm />
    </div>
  )
}

export default ChoreByChildrenId
