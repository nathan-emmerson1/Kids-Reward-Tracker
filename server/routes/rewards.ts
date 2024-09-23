import { Router } from 'express'
import checkJwt from '../auth0'
import * as db from '../db/functions/rewards'
import { StatusCodes } from 'http-status-codes'

const router = Router()

router.use(checkJwt)

router.get('/', checkJwt, async (req, res) => {
  try {
    const rewards = await db.GetAllRewards()
    res.json(rewards)
  } catch (error) {
    console.log(error)
    res.status(500).json({ messege: 'error getting rewards' })
  }
})

router.get('/id', checkJwt, async (req, res) => {
  try {
    const id = Number(req.params)
    const rewards = await db.GetRewardById(id)
    res.json(rewards)
  } catch (error) {
    console.log(error)
    res.status(500).json({ messege: 'error getting rewards by id' })
  }
})

router.post('/addreward', checkJwt, async (req: JwtRequest, res) => {
  try {
    const { name, description, pointsRequired, createdAt, updatedAt } = req.body
    const id = await db.addReward({
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

router.delete('/:id', checkJwt, async (req, res) => {
  try {
    const id = Number(req.params.id)
    const reward = await db.deleteReward(id)
    res.json(reward)
  } catch (err) {
    console.log(err)
  }
})

export default router
