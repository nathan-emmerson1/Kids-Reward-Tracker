export interface Chore {
  id: number // Primary key, auto-incrementing
  name: string // Name of the task, must not be null
  description: string // Description of the task, must not be null
  frequency: 'daily' | 'weekly' | 'monthly' // Frequency of the task, must not be null
  created_at: Date // Timestamp for when the record was created
  updated_at: Date // Timestamp for when the record was last updated
}
