const { client } = require('./')
const PREFIX = 'App'
const TTL_UNIT = 'EX'
const TTL = 10 * 60 // 10 mins

exports.set = async (id, data) => {
  try {
    return await client.set(`${PREFIX}:${id}`, JSON.stringify(data), TTL_UNIT, TTL)
  } catch (error) {
    console.log(JSON.stringify(error, Object.getOwnPropertyNames(error)))
  }
}

exports.get = async id => {
  try {
    const data = await client.get(`${PREFIX}:${id}`)
    if (data === null) return
    return JSON.parse(data)
  } catch (error) {
    console.log(JSON.stringify(error, Object.getOwnPropertyNames(error)))
  }
}
