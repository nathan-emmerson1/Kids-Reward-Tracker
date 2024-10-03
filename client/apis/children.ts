import request from 'superagent'
import { Children, ChildrenData } from '../../models/children'

const rootUrl = '/api/v1/children'

export async function fetchAllChildren(): Promise<Children[]> {
  const res = await request.get(rootUrl)

  return res.body
}

export async function fetchChildrenById(id: number): Promise<ChildrenData> {
  const res = await request.get(rootUrl + `/${id}`)

  return res.body
}

export async function deleteChildren(id: number) {
  const res = await request.delete(`${rootUrl}/${id}`)
  return res
}

export async function getAllChildrenByUserId(userId: number | undefined) {
  const res = await request.get(`${rootUrl}/userid/${userId}`)
  return res.body
}

export async function addChildren(children: ChildrenData) {
  const res = await request.post(rootUrl).send(children)

  return res.body
}

export async function fetchChildrenLogInInfo(
  userName: string,
  password: string,
) {
  const res = await request
    .post(`${rootUrl}/login`)
    .send({ userName, password })

  return res.body
}
