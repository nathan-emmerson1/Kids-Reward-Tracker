import express from 'express'
import * as Path from 'node:path'

import userRoutes from './routes/users.ts'
import childrenRoutes from './routes/children.ts'
import choreRoutes from './routes/chores.ts'
import rewardsRoutes from './routes/rewards.ts'

const server = express()

server.use(express.json())

server.use('/api/v1/users', userRoutes)
server.use('/api/v1/children', childrenRoutes)
server.use('/api/v1/chores', choreRoutes)
server.use('/api/v1/rewards', rewardsRoutes)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
