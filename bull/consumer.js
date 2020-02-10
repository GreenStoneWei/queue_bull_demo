const config = require('config')
const redisConfig = config.get('redis')
const Queue = require('bull')

exports.consume = async (queueName, redis, doSomething) => {
  const queue = new Queue(queueName, { redis })
  queue.process(async job => {
    console.log(job.data.id)
  })
  return
}
