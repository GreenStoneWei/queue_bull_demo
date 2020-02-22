// config
const config = require('config')
const redisConfig = config.get('redis')
// Queue Arena
const Arena = require('bull-arena')
const express = require('express')
const app = express()
const arenaGUI = require('./config/server/index.json')
const { client } = require('./infra/redis')
const { set, redisGet } = require('./infra/redis/client')
const { initQueue, add } = require('./bull/provider')
const { consume } = require('./bull/consumer')

const main = async () => {
  await initQueue('App', redisConfig)

  addJobs()
  consume('App', redisConfig)

  const arena = Arena({
    queues: arenaGUI.queues
  })
  app.use('/', arena)
  app.listen(8088)
}

main()

// provider
const addJobs = async () => {
  let count = await redisGet('jobCount')
  console.log('count =', count)
  if (!count) {
    count = 0
    await set('jobCount', 0)
  }

  for (let i = count; i < 100; i++) {
    setTimeout(
      async () => {
        console.log('adding... i = ', i)
        await add(i)
        await client.incr('App:jobCount')
      },
      i * 3000,
      i
    )
  }
}
