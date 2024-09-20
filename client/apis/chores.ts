import request from 'superagent'
import { Chore, ChoreData } from '../../models/chores'

const baseUrl = '/api/v1/chores'

export async function fetchAllChores(): Promise<Chore[]> {
  const res = await request.get(baseUrl)
  console.log(res.body)
  return res.body
}

export async function fetchChoreById(id: number): Promise<ChoreData> {
  const res = await request.get(baseUrl + `/${id}`)
  console.log(res.body)
  return res.body
}

export async function deleteChore(id: number) {
  const res = await request.delete(`${baseUrl}/${id}`)
  return res
}

export async function AddChore(newChore: ChoreData) {
  const res = await request.post(baseUrl).send(newChore)
  return res.body
}
