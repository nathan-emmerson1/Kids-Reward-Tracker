import { useQuery } from '@tanstack/react-query'

import { deleteChildren, fetchAllChildren } from '../apis/children'
import { useMutation, useQueryClient } from '@tanstack/react-query'

function ChildrenList() {
  const queryClient = useQueryClient()
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteChildren(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['children'] }),
  })
  const {
    data: children,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['children'],
    queryFn: () => fetchAllChildren(),
  })
  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>There was a error</p>

  function handleDelete(id: number) {
    deleteMutation.mutate(id)
  }

  return (
    <div>
      <h1>Children List</h1>
      <ul>
        {children?.map((child) => (
          <li key={child.id}>
            {child.name}
            {/* Add edit and delete buttons */}
            <button onClick={() => handleDelete(child.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ChildrenList
