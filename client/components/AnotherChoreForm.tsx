import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { ChoreData } from '../../models/chores'
import { AddChore } from '../apis/chores'

import { useAuth0 } from '@auth0/auth0-react'

import { useParams } from 'react-router-dom'

function ChoreForm() {
  const { id } = useParams()
  const [newName, setNewName] = useState('')
  const [newFrequency, setNewFrequency] = useState<
    'daily' | 'weekly' | 'monthly'
  >('daily')
  const [newDescription, setNewDescription] = useState('')

  const { user, isAuthenticated } = useAuth0()
  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: (newChore: ChoreData) => AddChore(newChore),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chores'] })
      setNewName('')
      setNewDescription('')
      setNewFrequency('daily')
    },
  })

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isAuthenticated && user) {
      addMutation.mutate({
        name: newName,
        childrenId: Number(id),
        description: newDescription,
        frequency: newFrequency,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
  }

  // if (isLoading) return <p>Loading children...</p>
  // if (isError) return <p>Error loading children</p>

  return (
    <form
      onSubmit={handleAdd}
      className="mx-auto max-w-lg rounded-lg bg-white p-8 shadow-lg"
    >
      <div className="mb-6">
        <label className="mb-2 block font-semibold text-teal-600">Name:</label>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
          placeholder="Enter chore name"
        />
      </div>

      <div className="mb-6">
        <label className="mb-2 block font-semibold text-teal-600">
          Description:
        </label>
        <input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
          placeholder="Enter chore description"
        />
      </div>

      <div className="mb-6">
        <label className="mb-2 block font-semibold text-teal-600">
          Frequency:
        </label>
        <select
          value={newFrequency}
          onChange={(e) =>
            setNewFrequency(e.target.value as 'daily' | 'weekly' | 'monthly')
          }
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-teal-600 px-4 py-2 text-white shadow transition duration-300 hover:bg-teal-700"
      >
        Add Chore
      </button>
    </form>
  )
}

export default ChoreForm
