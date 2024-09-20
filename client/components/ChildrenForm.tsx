import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { addChildren } from '../apis/children'
import { ChildrenData } from '../../models/children'
import { useAuth0 } from '@auth0/auth0-react'

function ChildrenForm() {
  const [newName, setNewName] = useState('')
  const queryClient = useQueryClient()
  const { user, isAuthenticated } = useAuth0()
  const addMutation = useMutation({
    mutationFn: (newChildren: ChildrenData) => addChildren(newChildren),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['children'] }),
  })

  const handleNameAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value)
  }

  const auth0Sub = user?.sub
  const userId = parseInt(auth0Sub.split('|')[1])

  const handleChildrenAdd = (e: React.FormEvent) => {
    e.preventDefault()
    addMutation.mutate({
      userId: userId,
      name: newName,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  return (
    <form onSubmit={handleChildrenAdd}>
      <div>
        <label>Child's Name:</label>
        <input type="text" value={newName} onChange={handleNameAdd} />
      </div>
      <button type="submit">Add Child</button>
    </form>
  )
}
