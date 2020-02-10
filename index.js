const config = require('config')
const redisConfig = config.get('redis')
const Arena = require('bull-arena')
const express = require('express')
const app = express()
const arenaGUI = require('./config/server/index.json')
// const Queue = require('bull')
const { initQueue, getQueue, add } = require('./bull/provider')

const main = async () => {
  await initQueue('App', redisConfig)
  await add('15')
  const q = getQueue()
  const result = await q.getJob('15')

  const arena = Arena({
    queues: arenaGUI.queues
  })

  app.use('/', arena)
  app.listen(8088)
}

main()
