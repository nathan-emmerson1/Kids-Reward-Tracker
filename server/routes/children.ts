import { Router } from 'express'
import checkJwt from '../auth0'
import * as db from '../db/functions/children'

const router = Router()

router.use(checkJwt)

router.get('/', checkJwt, async (req, res) => {
  try {
    const children = await db.GetAllChildren()
    res.json(children)
  } catch (error) {
    console.log(error)
    res.status(500).json({ messege: 'error getting Children' })
  }
})

router.get('/:id', checkJwt, async (req, res) => {
  try {
    const id = Number(req.params)
    const children = await db.GetChildrenById(id)
    res.json(children)
  } catch (error) {
    console.log(error)
    res.status(500).json({ messege: 'error geting kids by id' })
  }
})

export default router
