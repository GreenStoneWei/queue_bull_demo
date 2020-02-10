const config = require('config')
const redisConfig = config.get('redis')
const Queue = require('bull')

const queueOne = new Queue('Test', { redis: redisConfig })

const queueTwo = new Queue('Test', { redis: redisConfig })

// for (let i = 0; i < 3; i++) {
//   const job = queueOne.add({
//     foo: 'job' + i
//   })
// }

const job = queueOne.add({
  foo: 'bar'
})

queueTwo.process(async job => {
  console.log(job.data)
})

// queueOne.process(async job => {
//   console.log(job.data, await job.progress(118))
//   return console.log(job.data, await job.progress(118))
// })

// console.log(await queueOne.getWaiting())

// queueOne.process(async (job, done) => {
//   console.log(job.data)
//   done(null, 'yatta')
// })

// queueOne.on('completed', (job, result) => {
//   console.log(`Job completed with result ${result}`)
// })
