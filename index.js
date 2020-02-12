// config
const config = require('config')
const oldRedisConfig = config.get('redis.old')
const newRedisConfig = config.get('redis.new')
// Queue Arena
const Arena = require('bull-arena')
const express = require('express')
const app = express()
const arenaGUI = require('./config/server/index.json')
const { oldClient } = require('./infra/redis')
const { set, redisGet } = require('./infra/redis/client')
const { initQueue, add } = require('./bull/provider')
const { consume } = require('./bull/consumer')

const main = async () => {
  // when migration, change oldRedisConfig to newRedisConfig
  await initQueue('App', oldRedisConfig)
  // await initQueue('App', newRedisConfig)

  addJobs()
  consume('App', oldRedisConfig)
  // when migration, add new, keep old one
  // consume('App', newRedisConfig)

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
        await oldClient.incr('App:jobCount') // old -> new
      },
      i * 3000,
      i
    )
  }
}
