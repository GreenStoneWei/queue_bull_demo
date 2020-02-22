const Queue = require('bull')
const fs = require('fs').promises

exports.consume = async (queueName, redis, doSomething) => {
  const queue = new Queue(queueName, { redis })
  queue.process(async (job, done) => {
    const fileName = job.data.jobId + '.txt'
    console.log('writing job = ', job.data)
    await fs.writeFile(__dirname + `/../logs/${fileName}`, JSON.stringify(job.data))
    done()
  })
  return
}
