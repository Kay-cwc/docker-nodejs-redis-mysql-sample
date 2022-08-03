require('dotenv').config();

const app = require('./server');

const PORT = process.env.NODE_DOCKER_PORT || 8080;

app.listen(PORT, () => {
  console.log(`Express running on port ${PORT}`);
});
