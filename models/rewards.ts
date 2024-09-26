export interface Reward {
  id: number
  name: string
  description: string
  pointsRequired: number
  createdAt: Date
  updatedAt: Date
}

export interface RewardData {
  name: string
  childrenId: number
  description: string
  pointsRequired: number
  createdAt: Date
  updatedAt: Date
}
