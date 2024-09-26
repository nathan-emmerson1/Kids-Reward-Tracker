import { useQuery } from '@tanstack/react-query'
import { fetchChoreByChildrenId } from '../apis/chores'
import { useParams } from 'react-router-dom'
import ChoreForm from './AnotherChoreForm'

// interface ChorebyChildrenProps {
//   childrenId: number
// }

function ChoreByChildrenId() {
  const { id } = useParams()

  const {
    data: chore,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['children', id],
    queryFn: () => fetchChoreByChildrenId(Number(id)),
  })
  console.log(chore)

  if (isLoading) return <p>Loading...</p>

  if (isError) return <p>There was a error</p>

  return (
    <div>
      <div>{chore.name} </div>
      <ChoreForm />
    </div>
  )
}

export default ChoreByChildrenId
