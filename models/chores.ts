export interface Chore {
  id: number
  childrenId: number
  completed: boolean
  name: string
  description: string
  frequency: 'daily' | 'weekly' | 'monthly'
  created_at: Date
  updated_at: Date
}

export interface ChoreData {
  name: string
  childrenId: number
  description: string
  completed: boolean
  points: number
  frequency: 'daily' | 'weekly' | 'monthly'
  createdAt: Date
  updatedAt: Date
}
