import request from 'superagent'
import { Children, ChildrenData } from '../../models/children'

const rootUrl = '/api/v1/children'

export function getAllChildren(): Promise<Children[]> {
  return request.get(rootUrl).then((res) => {
    console.log(res.body)
    return res.body
  })
}

export function getChildrenById(id: number): Promise<ChildrenData> {
  return request.get(rootUrl + `/${id}`).then((res) => {
    console.log(res.body)
    return res.body
  })
}
