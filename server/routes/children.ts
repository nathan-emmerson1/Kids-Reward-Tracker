import { Router } from 'express'
import checkJwt from '../auth0'
import * as db from '../db/functions/children'
import { StatusCodes } from 'http-status-codes'
import { ChildrenData } from '../../models/children'
import Chore from '../../client/components/Chore'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const children = await db.GetAllChildren()
    res.json(children)
  } catch (error) {
    console.log(error)
    res.status(500).json({ messege: 'error getting Children' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const children = await db.getChildrenById(id)
    res.json(children)

    console.log(children)
  } catch (error) {
    console.log(error)
    res.status(500).json({ messege: 'error geting kids by id' })
  }
})

function convertCamelToSnake(childrenData: ChildrenData) {
  return {
    user_id: childrenData.userId,
    name: childrenData.name,

    created_at: childrenData.createdAt, // Mapping to snake_case
    updated_at: childrenData.updatedAt, // Mapping to snake_case
  }
}

router.post('/', async (req, res) => {
  try {
    const { userId, name, createdAt, updatedAt } = req.body
    const childrenData = convertCamelToSnake({
      userId,
      name,
      createdAt,
      updatedAt,
    })
    const id = await db.addChildren(childrenData)
    res
      .setHeader('addChild', `${req.baseUrl}/${id}`)
      .sendStatus(StatusCodes.CREATED)
  } catch (err) {
    console.log(err)
  }
})

export default router
