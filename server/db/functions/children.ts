import db from '../connection'
import { Children, ChildrenData } from '../../../models/children'

export async function GetAllChildren() {
  const children = await db('children').select(
    ' id as id',
    'user_id as userId',
    'name as name',
    'created_at as createdAt',
    'updated_at as updatedAt',
  )
  return children as Children[]
}

export async function GetChildrenById(id: number) {
  const children = await db('children').select().first().where({ id })
  return children as Children
}

export async function addChildren(data: ChildrenData) {
  const [id] = await db('children').insert(data)
  return id
}

export async function deleteChildren(id: number) {
  const children = await db('children').where({ id }).delete()
  return children
}
