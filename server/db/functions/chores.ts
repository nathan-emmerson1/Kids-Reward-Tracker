import db from '../connection'
import { Chore, ChoreData } from '../../../models/chores'

export async function GetAllChores() {
  const chore = await db('chores').select(
    'name as name',
    'description as description',
    'frequenct as frequenct',
    'created_at as createdAt',
    'updated_at as updatedAt',
  )
  return chore as Chore[]
}

export async function GetChoreById(id: number) {
  const chore = await db('chores').select().first().where({ id })
  return chore as Chore
}

export async function AddChore(data: ChoreData) {
  const [id] = await db('chores').insert(data)
  return id
}

export async function deleteChore(id: number) {
  const chore = await db('chores').where({ id }).delete()
  return chore
}
