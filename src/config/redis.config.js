const ioredis = require('ioredis');

const redis = new ioredis()

redis.connect(() => console.log('redis connected'))

module.exports = redis