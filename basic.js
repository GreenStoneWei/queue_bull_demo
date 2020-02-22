const config = require('config')
const redisConfig = config.get('redis')
const Queue = require('bull')

const queue = new Queue('Test', { redis: redisConfig })

// 1. provide jobs, execute the scripts then command 'redis-cli keys *' to see the queue status
for (let i = 1; i < 4; i++) {
  queue.add({
    foo: 'bar' + i
  })
}
//

// 2. consume jobs, execute the scripts then command 'redis-cli keys *' to see the queue status
// queue.process(async job => {
//   // do something here
//   console.log('jobId = ', job.id, ' data = ', job.data)
// })

// 3. event emitter
// queue.process(async (job, done) => {
//   console.log('jobId = ', job.id, ' data = ', job.data)
//   done(null, 'yatta')
// })

// queue.on('completed', (job, result) => {
//   console.log(`Job ${job.id} completed with result ${result}`)
// })
