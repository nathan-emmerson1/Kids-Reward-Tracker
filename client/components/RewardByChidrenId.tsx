import { useParams } from 'react-router-dom'
import { fetchRewardByChildrenId } from '../apis/rewards'
import { useQuery } from '@tanstack/react-query'
import { Reward } from '../../models/rewards'
import RewardForm from './RewardsForm'

function RewardByChildrenId() {
  const { id } = useParams()
  console.log('hitting this point')

  const {
    data: reward,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['rewards', id],
    queryFn: () => fetchRewardByChildrenId(Number(id)),
  })
  console.log(reward)

  if (isLoading) return <p>Loading...</p>

  if (isError) return <p>There was a erro getting reward by children id</p>

  return (
    <div>
      <div>
        {reward.map((rewards: Reward) => (
          <li key={rewards.id}>
            <div>Name:{rewards.name}</div>
            <div>Description:{rewards.description}</div>
            <div>Points Required: {rewards.pointsRequired}</div>
          </li>
        ))}
      </div>
      <div>
        <RewardForm />
      </div>
    </div>
  )
}

export default RewardByChildrenId
