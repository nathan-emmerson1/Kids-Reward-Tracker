import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { ChoreData } from '../../models/chores'
import { AddChore } from '../apis/chores'

function ChoreForm() {
  const [newName, setNewName] = useState('')
  const [newFrequency, setNewFrequency] = useState<
    'daily' | 'weekly' | 'monthly'
  >('daily')
  const [newDescripton, setNewDescription] = useState('')
  const queryClient = useQueryClient()
  const addMutation = useMutation({
    mutationFn: (newChore: ChoreData) => AddChore(newChore),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['chores'] }),
  })
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDescription(e.target.value)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value)
  }

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewFrequency(e.target.value as 'daily' | 'weekly' | 'monthly')
  }

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    addMutation.mutate({
      name: newName,
      description: newDescripton,
      frequency: newFrequency,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  return (
    <form onSubmit={handleAdd}>
      <div>
        <label>Name:</label>
        <input type="text" value={newName} onChange={handleNameChange} />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={newDescripton}
          onChange={handleDescriptionChange}
        />
      </div>
      <div>
        <label>Frequency:</label>
        <select value={newFrequency} onChange={handleFrequencyChange}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <button type="submit">Add Chore</button>
    </form>
  )
}

export default ChoreForm
