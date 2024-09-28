import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { addChildren } from '../apis/children'
import { ChildrenData } from '../../models/children'
import { useAuth0 } from '@auth0/auth0-react'
import { getUserWithAuthId } from '../apis/users'

function ChildrenForm() {
  const [newName, setNewName] = useState('')
  const queryClient = useQueryClient()
  const { user, isAuthenticated } = useAuth0()
  const addMutation = useMutation({
    mutationFn: (newChildren: ChildrenData) => addChildren(newChildren),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['children'] })
      setNewName('')
    },
  })

  const handleNameAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value)
  }

  const handleChildrenAdd = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isAuthenticated && user) {
      const auth0Sub = user.sub
      const authId = parseInt(auth0Sub.split('|')[1])
      const userId = await getUserWithAuthId(authId)

      addMutation.mutate({
        userId: userId.id,
        name: newName,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    } else {
      console.error('User is not authenticated')
    }
  }

  return (
    <form
      onSubmit={handleChildrenAdd}
      className="mx-auto max-w-md rounded-lg bg-white p-4 shadow-md"
    >
      <h2 className="mb-4 text-center text-xl font-bold">Add a New Kiddo</h2>
      <div className="mb-4">
        <label className="mb-1 block text-gray-700" htmlFor="childName">
          Kiddo's Name:
        </label>
        <input
          id="childName"
          type="text"
          value={newName}
          onChange={handleNameAdd}
          className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Enter child's name"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-teal-600 py-2 text-white transition duration-300 hover:bg-teal-500"
      >
        Add Child
      </button>
    </form>
  )
}
export default ChildrenForm
