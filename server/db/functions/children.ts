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

export async function getChildrenById(id: number) {
  const children = await db('children').where({ id }).select().first()
  return children
}

export async function addChildren(data: ChildrenData) {
  const [id] = await db('children').insert(data)
  return id
}

export async function getAllChildrenByUserId(userId: number) {
  const children = await db('children')
    .join('users', 'children.user_id', '=', 'users.id')
    .where('user_id', userId)
    .select(
      'children.id as id',
      'children.user_id as user_id',
      'children.name as name',
      'children.created_at as createdAt',
      'children.updated_at as updatedAt',
    )

  return children
}

export async function deleteChildren(id: number) {
  const children = await db('children').where({ id }).delete()
  return children
}

export async function getChildrenLogInInfo(userName: string) {
  const res = await db('children')
    .where('children.username', userName)
    .select(
      'children.id as id',
      'children.username as userName',
      'children.password as password',
      'children.user_id as userId',
    )
    .first()
  console.log(res)
  return res
}
