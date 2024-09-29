import { fetchChoreByChildrenId } from '../apis/chores'
import { fetchRewardByChildrenId } from '../apis/rewards'

import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Chore } from '../../models/chores'
import { Reward } from '../../models/rewards'

function KidsDashBoard() {
  const { id } = useParams()

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
            {chore.map((c) => (
              <li
                key={c.id}
                className="flex transform items-center justify-between rounded-lg bg-gray-100 p-4 shadow transition-transform hover:scale-105"
              >
                <span className="text-lg">{c.name}</span>
                <span
                  className={`font-semibold ${c.status === 'Completed' ? 'text-green-600' : 'text-red-600'}`}
                >
                  {c.status}
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
            {reward.map((r) => (
              <li
                key={r.id}
                className="flex transform items-center justify-between rounded-lg bg-gray-100 p-4 shadow transition-transform hover:scale-105"
              >
                <span className="text-lg">{r.name}</span>
                <span className="font-semibold text-blue-600">
                  {r.points} points
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
