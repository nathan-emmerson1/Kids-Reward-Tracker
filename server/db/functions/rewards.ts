import db from '../connection'
import { Reward, RewardData } from '../../../models/rewards'

export async function GetAllRewards() {
  const reward = await db('rewards').select()
  return reward as Reward[]
}

export async function GetRewardById(id: number) {
  const reward = await db('rewards').select().first().where({ id })
  return reward as Reward
}

export async function addReward(data: RewardData) {
  const [id] = await db('rewards').insert(data)
  return id
}
