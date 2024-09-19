import db from '../connection'
import { Children } from '../../../models/children'

export async function GetAllChildren() {
  const children = await db('children').select()
  return children as Children[]
}

export async function GetChildrenById(id: number) {
  const children = await db('children').select().first().where({ id })
  return children as Children
}
