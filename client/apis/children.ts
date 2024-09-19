import request from 'superagent'
import { Children } from '../../models/children'

const rootUrl = '/api/v1/children'

export function getAllChildren(): Promise<Children[]> {
  return request.get(rootUrl).then((res) => {
    console.log(res.body)
    return res.body
  })
}
