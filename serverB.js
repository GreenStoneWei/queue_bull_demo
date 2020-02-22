const Queue = require('bull')

const sendQueue = new Queue('Server A')
const receiveQueue = new Queue('Server B')

receiveQueue.process(function(job, done) {
  console.log('Received message', job.data.msg)
  done()
})

sendQueue.add({ msg: 'World' })
