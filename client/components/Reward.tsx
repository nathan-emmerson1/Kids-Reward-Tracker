import RewardForm from './RewardsForm'
import RewardList from './RewardList'

function Reward() {
  return (
    <div className="reward-container">
      <div className="reward-list">
        <RewardList />
      </div>
      <div className="reward-form">
        <RewardForm />
      </div>
    </div>
  )
}

export default Reward
