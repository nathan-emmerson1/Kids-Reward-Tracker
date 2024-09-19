import db from '../connection'
import { User } from '../../../models/users'

export async function getAllUser() {
  const user = await db('users').select()
  return user as User[]
}

export async function getUserById(id: number) {
  const user = await db('users').select().first().where({ id })
  return user as User
}
