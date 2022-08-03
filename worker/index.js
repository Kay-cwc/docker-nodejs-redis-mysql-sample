require('dotenv').config();
const express = require('express');
const { Worker } = require('bullmq');

const redisConfig = require('./config/redis.config');

const app = express();
const port = process.env.APP_PORT || 8001;

const queue1 = new Worker('defaultQueue', async ({name, data}) => {
  console.log(name);
  console.log(`recevied count ${data.count}`)
}, { connection: redisConfig } )

app.listen(port, () => {
  console.log(`worker listening on port ${port}`);
});
