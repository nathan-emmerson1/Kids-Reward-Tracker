import { fetchChoreByChildrenId, updateChoreByChildrenId } from '../apis/chores'
import { fetchRewardByChildrenId } from '../apis/rewards'

import { useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Chore } from '../../models/chores'
import { Reward } from '../../models/rewards'

interface UpdateChore {
  id: number
  status: boolean
}

function KidsDashBoard() {
  const { id } = useParams()

  const queryClient = useQueryClient()
  const updateMutation = useMutation({
    mutationFn: ({ id, status }: UpdateChore) =>
      updateChoreByChildrenId(Number(id), status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['chores'] }),
  })

  const {
    data: chore,
    isLoading: isLoadingChore,
    isError: isErrorChore,
  } = useQuery({
    queryKey: ['chores', id],
    queryFn: () => fetchChoreByChildrenId(Number(id)),
  })

  const {
    data: reward,
    isLoading: isLoadingReward,
    isError: isErrorReward,
  } = useQuery({
    queryKey: ['rewards', id],
    queryFn: () => fetchRewardByChildrenId(Number(id)),
  })

  const isLoading = isLoadingChore || isLoadingReward
  const isError = isErrorChore || isErrorReward

  const handleStatusChange = (id: number, currentCompletedStatus: boolean) => {
    updateMutation.mutate({
      id: id,
      status: !currentCompletedStatus,
    })
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>There was a error</p>
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="mb-4 text-3xl font-bold text-gray-800">Kids Dashboard</h1>

      <div className="chores-section mb-4 w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">Chores</h2>
        {chore.length > 0 ? (
          <ul className="space-y-4">
            {chore.map((c: Chore) => (
              <li
                key={c.id}
                className="flex transform cursor-pointer items-center justify-between rounded-lg bg-gray-100 p-4 shadow transition-transform hover:scale-105"
              >
                <span className="text-lg">{c.name}</span>

                <span
                  className={`font-semibold ${c.completed ? 'text-green-600' : 'text-red-600'}`}
                  onClick={() => handleStatusChange(c.id, c.completed)}
                >
                  {c.completed ? 'Completed' : 'Not Completed'}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No chores assigned.</p>
        )}
      </div>

      <div className="rewards-section w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">Rewards</h2>
        {reward.length > 0 ? (
          <ul className="space-y-4">
            {reward.map((r: Reward) => (
              <li
                key={r.id}
                className="flex transform items-center justify-between rounded-lg bg-gray-100 p-4 shadow transition-transform hover:scale-105"
              >
                <span className="text-lg">{r.name}</span>
                <span className="font-semibold text-blue-600">
                  {r.pointsRequired} points
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No rewards available.</p>
        )}
      </div>
    </div>
  )
}
export default KidsDashBoard
