export interface Children {
  id: number // Primary key, auto-incrementing
  user_id: number // Foreign key referencing the 'users' table
  name: string // Name of the child, must not be null
  created_at: Date // Timestamp for when the record was created
  updated_at: Date // Timestamp for when the record was last updated
}
