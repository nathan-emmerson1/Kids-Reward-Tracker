import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteChildren, getChildrenByUserId } from '../apis/children'
import { Children, ChildrenData } from '../../models/children'

interface ChildrenListProps {
  userId: number | undefined
}

function ChildrenListByUserId({ userId }: ChildrenListProps) {
  const {
    data: children,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['children', userId],
    queryFn: () => getChildrenByUserId(userId),
  })
  const queryClient = useQueryClient()
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteChildren(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['children'] }),
  })

  if (isLoading) return <p>Loading...</p>

  if (isError) return <p>Error getting children by user id</p>

  function handleDelete(id: number) {
    deleteMutation.mutate(id)
  }

  return (
    <div>
      <h1>Children List</h1>
      <ul>
        {children.map((child: Children) => (
          <li key={child.id}>
            <p>Child Name:{child.name}</p>

            <button onClick={() => handleDelete(child.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ChildrenListByUserId
