export interface Children {
  id: number // Primary key, auto-incrementing
  userId: number // Foreign key referencing the 'users' table
  name: string // Name of the child, must not be null
  created_at: Date // Timestamp for when the record was created
  updated_at: Date // Timestamp for when the record was last updated
}

export interface ChildrenData {
  userId: number // Foreign key referencing the 'users' table
  name: string // Name of the child, must not be null
  createdAt: Date // Timestamp for when the record was created
  updatedAt: Date // Timestamp for when the record was last updated
}
