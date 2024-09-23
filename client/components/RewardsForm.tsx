import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { RewardData } from '../../models/rewards'
import { addReward } from '../apis/rewards'

function RewardForm() {
  const [newName, setNewName] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newPoints, setNewPoints] = useState(0)
  const queryClient = useQueryClient()
  const addMutation = useMutation({
    mutationFn: (newReward: RewardData) => addReward(newReward),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rewards'] })
      setNewName('')
      setNewDescription('')
      setNewPoints(0)
    },
  })
  const handleNameAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value)
  }

  const handleDescriptionAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDescription(e.target.value)
  }

  const handleAddPoints = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPoints(parseInt(e.target.value))
  }

  const handleRewardAdd = (e: React.FormEvent) => {
    e.preventDefault()

    addMutation.mutate({
      name: newName,
      description: newDescription,
      pointsRequired: newPoints,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  return (
    <div>
      <form onSubmit={handleRewardAdd}>
        <div>
          <label htmlFor="name">Reward Name:</label>
          <input
            type="text"
            id="name"
            value={newName}
            onChange={handleNameAdd}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={newDescription}
            onChange={handleDescriptionAdd}
            required
          />
        </div>
        <div>
          <label htmlFor="points">Points Required:</label>
          <input
            type="number"
            id="points"
            value={newPoints}
            onChange={handleAddPoints}
            required
          />
        </div>
        <button type="submit">Add Reward</button>
      </form>
    </div>
  )
}

export default RewardForm
