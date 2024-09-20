import request from 'superagent'
import { Chore, ChoreData } from '../../models/chores'

const baseUrl = '/api/v1/chores'

export function fetchAllChores(): Promise<Chore[]> {
  return request.get(baseUrl).then((res) => {
    console.log(res.body)
    return res.body
  })
}

export function fetchChoreById(id: number): Promise<ChoreData> {
  return request.get(baseUrl + `/${id}`).then((res) => {
    console.log(res.body)
    return res.body
  })
}

export async function deleteChore(id: number) {
  const res = await request.delete(`${baseUrl}/${id}`)
  return res
}
