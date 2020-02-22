const { client } = require('.')
const PREFIX = 'App'
const TTL_UNIT = 'EX'
const TTL = 10 * 60 // 10 mins

exports.set = async (id, data) => {
  try {
    await client.set(`${PREFIX}:${id}`, JSON.stringify(data), TTL_UNIT, TTL)
    return 'OK'
  } catch (error) {
    console.log(JSON.stringify(error, Object.getOwnPropertyNames(error)))
  }
}

exports.redisGet = async id => {
  try {
    let data = await client.get(`${PREFIX}:${id}`)
    if (!data) return
    return JSON.parse(data)
  } catch (error) {
    console.log(JSON.stringify(error, Object.getOwnPropertyNames(error)))
  }
}
