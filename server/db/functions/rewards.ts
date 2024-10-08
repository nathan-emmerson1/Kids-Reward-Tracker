import db from '../connection'
import { Reward, RewardData } from '../../../models/rewards'

export async function GetAllRewards() {
  const reward = await db('rewards').select(
    'id as id',
    'name as name',
    'description as description',
    'points_required as pointsRequired',
    'created_at as createdAt',
    'updated_at as updatedAt',
  )
  return reward as Reward[]
}

export async function GetRewardById(id: number) {
  const reward = await db('rewards').where({ id }).select().first()
  return reward as Reward
}

export async function addReward(data: RewardData) {
  const [id] = await db('rewards').insert(data)
  return id
}

export async function getRewardsByChildrenId(childrenId: number) {
  const reward = await db('rewards')
    .join('children', 'rewards.children_id', '=', 'children.id')
    .where('children_id', childrenId)
    .select(
      'rewards.id as id ',
      'rewards.children_id as childenId',
      'rewards.name as name',
      'rewards.description as description',
      'rewards.points_required as pointsRequired',
      'rewards.created_at as createdAt',
      'rewards.updated_at as updatedAt',
    )
  return reward
}

export async function deleteReward(id: number) {
  const removed = await db('rewards').where('rewards.children_id', id).delete()

  return removed
}
