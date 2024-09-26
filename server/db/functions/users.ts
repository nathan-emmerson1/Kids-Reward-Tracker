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

export async function addUser(data: User) {
  const [id] = await db('users').insert(data)
  return id
}

export async function getUserByAuthId(authId: number) {
  const res = await db('users').where('auth_id', authId).select().first()
  return res
}
