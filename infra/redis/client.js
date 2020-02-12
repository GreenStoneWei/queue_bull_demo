const { oldClient, newClient } = require('.')
const PREFIX = 'App'
const TTL_UNIT = 'EX'
const TTL = 10 * 60 // 10 mins

exports.set = async (id, data) => {
  try {
    await oldClient.set(`${PREFIX}:${id}`, JSON.stringify(data), TTL_UNIT, TTL)
    // when migration, add this line
    // await newClient.set(`${PREFIX}:${id}`, JSON.stringify(data), TTL_UNIT, TTL)
    return 'OK'
  } catch (error) {
    console.log(JSON.stringify(error, Object.getOwnPropertyNames(error)))
  }
}

exports.redisGet = async id => {
  try {
    let data
    data = await newClient.get(`${PREFIX}:${id}`)
    if (data === null) {
      data = await oldClient.get(`${PREFIX}:${id}`)
    }
    if (data === null) return
    return JSON.parse(data)
  } catch (error) {
    console.log(JSON.stringify(error, Object.getOwnPropertyNames(error)))
  }
}
