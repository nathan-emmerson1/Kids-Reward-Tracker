import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteReward, fetchAllRewards } from '../apis/rewards'

function RewardList() {
  const queryClient = useQueryClient()
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteReward(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['rewards'] }),
  })

  const {
    data: rewards,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['rewards'],
    queryFn: () => fetchAllRewards(),
  })
  if (isError) return <p>Error getting chores</p>
  if (isLoading) return <p>Loading...</p>

  function handleDelete(id: number) {
    deleteMutation.mutate(id)
  }

  return (
    <div>
      <h1>Reward List</h1>
      <ul>
        {rewards?.map((reward) => (
          <li key={reward.id}>
            <div>Name:{reward.name} </div>
            <div>Description:{reward.description} </div>
            <div>Ponts Required{reward.pointsRequired} </div>
            <button onClick={() => handleDelete(reward.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RewardList
