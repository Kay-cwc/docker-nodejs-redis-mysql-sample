const express = require('express');
const redis = require('redis');
const { Queue } = require('bullmq');
const cors = require('cors');

const redisConfig = require('./config/redis.config');

const app = express();

const redisClient = redis.createClient({
  socket: redisConfig,
});

redisClient.connect();

const queue = new Queue('defaultQueue',  { connection: redisConfig });

app.use(cors());

app.get('/', async (req, res) => {
  const count = await redisClient.get('count') ?? 0;
  const newCount = parseInt(count) + 1;
  res.json({count});
  await redisClient.set('count', newCount);
  await queue.add('COUNT_UPDATE', { count });
});

module.exports = app;