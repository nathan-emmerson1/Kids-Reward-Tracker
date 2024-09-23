import { useQueryClient } from '@tanstack/react-query'
import { useQuery, useMutation } from '@tanstack/react-query'
import { deleteChore, fetchAllChores } from '../apis/chores'

function ChoreList() {
  const queryClient = useQueryClient()
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteChore(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['chores'] }),
  })
  const {
    data: chores,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['chores'],
    queryFn: () => fetchAllChores(),
  })
  if (isLoading) return <p>Looading...</p>
  if (isError) return <p>There was a error getting chores</p>

  function handleDeleteChore(id: number) {
    deleteMutation.mutate(id)
  }

  return (
    <div>
      <h1>Chore List</h1>
      <ul>
        {chores?.map((chore) => (
          <li key={chore.id}>
            {chore.name}
            {chore.description}
            {chore.frequency}
            <button onClick={() => handleDeleteChore(chore.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ChoreList
