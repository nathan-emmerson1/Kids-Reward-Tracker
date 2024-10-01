import request from 'superagent'
import { Chore, ChoreData } from '../../models/chores'

const baseUrl = '/api/v1/chores'

export async function fetchAllChores(): Promise<Chore[]> {
  const res = await request.get(baseUrl)

  return res.body
}

export async function fetchChoreById(id: number): Promise<ChoreData> {
  const res = await request.get(baseUrl + `/${id}`)

  return res.body
}

export async function deleteChore(id: number) {
  const res = await request.delete(`${baseUrl}/${id}`)
  return res.body
}

export async function fetchChoreByChildrenId(childrenId: number) {
  const res = await request.get(`${baseUrl}/childrenid/${childrenId}`)
  return res.body
}

export async function updateChoreByChildrenId(
  childrenId: number,
  status: boolean,
): Promise<Chore> {
  console.log('sedning status to api', { childrenId, status })
  const res = await request
    .patch(`${baseUrl}/updatechore/${childrenId}`)
    .send({ status })
  console.log(res.body)
  return res.body
}

export async function AddChore(newChore: ChoreData) {
  const res = await request.post(baseUrl).send(newChore)
  console.log(res)
  return res
}
