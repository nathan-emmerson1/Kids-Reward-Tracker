import db from '../connection'
import { Chore } from '../../../models/chores'

export async function GetAllChores() {
  const chore = await db('chores').select()
  return chore as Chore[]
}

export async function GetChoreById(id: number) {
  const chore = await db('chores').select().first().where({ id })
  return chore as Chore
}
