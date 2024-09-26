import request from 'superagent'
import { Reward, RewardData } from '../../models/rewards'

const baseUrl = '/api/v1/rewards'

export async function fetchAllRewards(): Promise<Reward[]> {
  const res = await request.get(baseUrl)

  return res.body
}

export async function fetchRewardById(id: number): Promise<RewardData> {
  const res = await request.get(baseUrl + `/${id}`)

  return res.body
}

export async function addReward(reward: RewardData) {
  const res = await request.post(baseUrl).send(reward)
  return res.body
}

export async function deleteReward(id: number) {
  const res = await request.delete(`${baseUrl}/${id}`)
  return res
}
