import { useParams } from 'react-router-dom'
import { deleteReward, fetchRewardByChildrenId } from '../apis/rewards'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Reward } from '../../models/rewards'
import RewardForm from './RewardsForm'
import ChoreForm from './AnotherChoreForm'

function RewardByChildrenId() {
  const { id } = useParams()

  const {
    data: reward,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['rewards', id],
    queryFn: () => fetchRewardByChildrenId(Number(id)),
  })
  console.log(reward)
  const queryClient = useQueryClient()
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteReward(Number(id)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['rewards'] }),
  })

  if (isLoading) return <p>Loading...</p>

  if (isError) return <p>There was a erro getting reward by children id</p>

  function handleDelete(id: number) {
    deleteMutation.mutate(id)
  }
  return (
    <div>
      <div className="mb-8 rounded-lg bg-teal-600 py-6 text-center text-white shadow-lg">
        <h1 className="text-4xl font-bold tracking-wide">Reward Dash Board</h1>
      </div>
      <div className="mb-5">
        <RewardForm />
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {reward.map((rewards: Reward) => (
          <div
            key={rewards.id}
            className="transform overflow-hidden rounded-lg bg-white shadow-md transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="p-6">
              <h2 className="mb-2 text-xl font-semibold text-teal-600">
                {rewards.name}
              </h2>
              <p className="mb-4 text-gray-700">{rewards.description}</p>
              <div className="flex items-center justify-between">
                <div className="font-bold text-teal-500">
                  Points Required: {rewards.pointsRequired}
                </div>
                <button className="rounded-lg bg-teal-600 px-4 py-2 text-white shadow hover:bg-teal-700">
                  Redeem
                </button>
                <button
                  onClick={() => handleDelete(rewards.id)}
                  className="hover:text-deep-purple-accent-400 text-gray-600 transition-colors duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RewardByChildrenId
