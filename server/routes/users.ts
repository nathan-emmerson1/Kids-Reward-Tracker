import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0'
import { StatusCodes } from 'http-status-codes'
import * as db from '../db/functions/users'
import * as children from '../db/functions/children'
import { AddChore, deleteChore } from '../db/functions/chores'
import { addReward, deleteReward } from '../db/functions/rewards'

const router = Router()

router.use(checkJwt)

router.get('/', checkJwt, async (req, res) => {
  try {
    const user = await db.getAllUser()
    res.json(user)
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ messege: 'something went wrong with  getting users' })
  }
})

router.get('/:id', checkJwt, async (req, res) => {
  try {
    const id = Number(req.params)
    const user = await db.getUserById(id)
    res.json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({ messege: 'Error getting user By id' })
  }
})

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  try {
    const { userId, name, createdAt, updatedAt } = req.body
    const id = await children.addChildren({
      userId,
      name,
      createdAt,
      updatedAt,
    })
    res
      .setHeader('addChild', `${req.baseUrl}/${id}`)
      .sendStatus(StatusCodes.CREATED)
  } catch (err) {
    console.log(err)
  }
})

router.post('/addchore', checkJwt, async (req: JwtRequest, res) => {
  try {
    const { name, description, frequency, createdAt, updatedAt } = req.body
    const id = await AddChore({
      name,
      description,
      frequency,
      createdAt,
      updatedAt,
    })
    res
      .setHeader('addchore', `${req.baseUrl}/${id}`)
      .sendStatus(StatusCodes.CREATED)
  } catch (err) {
    console.log(err)
  }
})

router.post('/addreward', checkJwt, async (req: JwtRequest, res) => {
  try {
    const { name, description, pointsRequired, createdAt, updatedAt } = req.body
    const id = await addReward({
      name,
      description,
      pointsRequired,
      createdAt,
      updatedAt,
    })
    res
      .setHeader('Add Reward', `${req.baseUrl}/${id}`)
      .sendStatus(StatusCodes.CREATED)
  } catch (err) {
    console.log(err)
  }
})

router.delete('/removereward/:id', checkJwt, async (req, res) => {
  try {
    const id = Number(req.params)
    const reward = await deleteReward(id)
    res.json(reward)
  } catch (err) {
    console.log(err)
  }
})

router.delete('/removechore/:id', checkJwt, async (req, res) => {
  try {
    const id = Number(req.params.id)
    const removed = await deleteChore(id)
    if (removed) {
      res.sendStatus(StatusCodes.NO_CONTENT)
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ messege: 'error removing chore' })
  }
})
export default router
