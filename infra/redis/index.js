const asyncRedis = require('async-redis')
const redisConf = config.get('redis')

const client = asyncRedis.createClient({
  host: redisConf.host,
  port: redisConf.port,
  password: redisConf.password,
  db: redisConf.db,
  retry_strategy: function(options) {
    if (options.total_retry_time > 1000 * 30) {
      return new Error('Retry time exhausted')
    }
    return Math.max(options.attempt * 100, 3000)
  }
})

async function init() {
  return new Promise((resolve, reject) => {
    client.on('ready', () => {
      logger.info({ tag, msg: `Redis ready on: ${process.env.NODE_ENV}` })
      resolve()
    })

    client.on('connect', () => {
      logger.info({ tag, msg: `Redis connect on: ${process.env.NODE_ENV}` })
    })

    client.on('error', error => {
      logger.error({ tag, error: JSON.stringify(error, Object.getOwnPropertyNames(error)) })
      reject(error)
    })
  })
}

async function disconnect() {
  await client.quit()
}

module.exports = {
  client,
  init,
  disconnect
}
