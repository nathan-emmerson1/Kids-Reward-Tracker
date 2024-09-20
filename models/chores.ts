export interface Chore {
  id: number
  name: string
  description: string
  frequency: 'daily' | 'weekly' | 'monthly'
  created_at: Date
  updated_at: Date
}

export interface ChoreData {
  name: string
  description: string
  frequency: 'daily' | 'weekly' | 'monthly'
  createdAt: Date
  updatedAt: Date
}
