import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { RewardData } from '../../models/rewards'
import { addReward } from '../apis/rewards'
import { useParams } from 'react-router-dom'

function RewardForm() {
  const { id } = useParams()
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
      childrenId: Number(id),
      description: newDescription,
      pointsRequired: newPoints,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

  return (
    <div className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow-lg">
      <form onSubmit={handleRewardAdd} className="space-y-6">
        {/* Reward Name Input */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-lg font-medium text-gray-700"
          >
            Reward Name:
          </label>
          <input
            type="text"
            id="name"
            value={newName}
            onChange={handleNameAdd}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter reward name"
          />
        </div>

        {/* Description Input */}
        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-lg font-medium text-gray-700"
          >
            Description:
          </label>
          <input
            type="text"
            id="description"
            value={newDescription}
            onChange={handleDescriptionAdd}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter reward description"
          />
        </div>

        {/* Points Input */}
        <div>
          <label
            htmlFor="points"
            className="mb-2 block text-lg font-medium text-gray-700"
          >
            Points Required:
          </label>
          <input
            type="number"
            id="points"
            value={newPoints}
            onChange={handleAddPoints}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter points required"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full rounded-lg bg-teal-600 py-3 font-bold text-white shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Add Reward
          </button>
        </div>
      </form>
    </div>
  )
}

export default RewardForm
