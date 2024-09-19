import db from '../connection'
import { Reward } from '../../../models/rewards'

export async function GetAllRewards() {
  const reward = await db('rewards').select()
  return reward as Reward[]
}

export async function GetRewardById(id: number) {
  const reward = await db('rewards').select().first().where({ id })
  return reward as Reward
}
