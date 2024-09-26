import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteChildren, getChildrenByUserId } from "../apis/children";
import { useParams } from "react-router-dom";


function ChildrenListByUserId() {
  const {id} = useParams()
  const {data: children, isLoading, isError} = useQuery({
    queryKey:['children', id],
    queryFn: () => getChildrenByUserId(Number(id)),
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
        {children.map((child) => (
          <li key={child.id}>
            {child.name} (Created At:{' '}
            {new Date(child.created_at).toLocaleDateString()})
            <button onClick={() => handleDelete(child.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  )
}

export default ChildrenListByUserId