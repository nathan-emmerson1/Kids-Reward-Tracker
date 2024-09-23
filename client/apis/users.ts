import request from 'superagent'
import { User } from '../../models/users'

const baseUrl = '/api/v1/users'

export async function getAllUser() {
  const res = await request.get(baseUrl)
  return res.body
}

export async function getUserById(id: number) {
  const res = await request.get(`${baseUrl}/${id}`)
  return res.body
}

export async function addUser(data: User) {
  const res = await request.post(baseUrl).send(data)
  return res.body
}
