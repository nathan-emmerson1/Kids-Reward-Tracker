export interface User {
  id: number
  authId: number
  email: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface UserData {
  authId: number
  email: string
  name: string
  createdAt: Date
  updatedAt: Date
}
