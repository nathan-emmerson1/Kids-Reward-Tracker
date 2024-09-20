import react, {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { deleteReward, fetchAllRewards } from '../apis/rewards'
import { fetchAllChores } from '../apis/chores'

function RewardList() {
  const queryClient = useQueryClient()
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteReward(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['chore'] }),
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
            {reward.name}
            <button onClick={() => handleDelete(reward.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RewardList
