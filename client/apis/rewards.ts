import request from 'superagent'
import { Reward, RewardData } from '../../models/rewards'

const baseUrl = '/api/v1/rewards'

export function fetchAllRewards(): Promise<Reward[]> {
  return request.get(baseUrl).then((res) => {
    console.log(res.body)
    return res.body
  })
}

export function fetchRewardById(id: number): Promise<RewardData> {
  return request.get(baseUrl + `/${id}`).then((res) => {
    console.log(res.body)
    return res.body
  })
}

export async function deleteReward(id: number) {
  const res = await request.delete(`${baseUrl}.${id}`)
  return res
}
