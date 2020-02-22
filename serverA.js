const Queue = require('bull')

const sendQueue = new Queue('Server B')
const receiveQueue = new Queue('Server A')

receiveQueue.process(function(job, done) {
  console.log('Received message', job.data.msg)
  done()
})

sendQueue.add({ msg: 'Hello' })
