const config = require('config')
const redisConfig = config.get('redis')
const Queue = require('bull')

const defaultJobOpts = {
  delay: 60 * 1000, // seconds
  attempts: 3,
  removeOnComplete: true,
  removeOnFail: false
}

// only one queue for now
let appQueue

exports.initQueue = async (queueName, redis) => {
  return new Promise(async (resolve, reject) => {
    try {
      const queue = new Queue(queueName, { redis, prefix: 'bull' })
      // console.log({ redisConfig, prefix: 'bull' })
      await queue.isReady()
      appQueue = queue
      resolve()
    } catch (error) {
      reject(error)
    }
  })
}

exports.getQueue = () => {
  if (!appQueue) throw new Error('appQueue is not initialized yet.')
  return appQueue
}

exports.add = async jobId => {
  if (!appQueue) {
    throw new Error('appQueue is not available')
  }
  let job = await appQueue.getJob(jobId)
  if (!job) {
    /** Add a new job to queue */
    job = await appQueue.add({ jobId }, { ...defaultJobOpts, jobId }) // Default delay for 65s, jobId could not be override
  } else {
    /** If the job is existed, retry */
    await job.retry().catch(error => console.log(error.message))
  }
  return job
}
