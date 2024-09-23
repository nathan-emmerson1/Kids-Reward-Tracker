import { Router } from 'express'
import checkJwt from '../auth0'
import * as db from '../db/functions/rewards'
import { StatusCodes } from 'http-status-codes'
import { RewardData } from '../../models/rewards'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const rewards = await db.GetAllRewards()
    res.json(rewards)
  } catch (error) {
    console.log(error)
    res.status(500).json({ messege: 'error getting rewards' })
  }
})

router.get('/id', async (req, res) => {
  try {
    const id = Number(req.params)
    const rewards = await db.GetRewardById(id)
    res.json(rewards)
  } catch (error) {
    console.log(error)
    res.status(500).json({ messege: 'error getting rewards by id' })
  }
})

function convertCamelToSnake(rewardData: RewardData) {
  return {
    name: rewardData.name,
    description: rewardData.description,
    points_required: rewardData.pointsRequired,
    created_at: rewardData.createdAt,
    updated_at: rewardData.updatedAt,
  }
}

router.post('/', async (req, res) => {
  try {
    const { name, description, pointsRequired, createdAt, updatedAt } = req.body

    const rewardData = convertCamelToSnake({
      name,
      description,
      pointsRequired,
      createdAt,
      updatedAt,
    })
    const id = await db.addReward(rewardData)
    res
      .setHeader('addreward', `${req.baseUrl}/${id}`)
      .sendStatus(StatusCodes.CREATED)
  } catch (err) {
    console.log(err)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const reward = await db.deleteReward(id)
    if (reward) {
      res.sendStatus(StatusCodes.NO_CONTENT)
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ messege: 'error removing reward' })
  }
})

export default router
