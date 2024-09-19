import { Router } from 'express'
import checkJwt from '../auth0'
import * as db from '../db/functions/rewards'

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

export default router
