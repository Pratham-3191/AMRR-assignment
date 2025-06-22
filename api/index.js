// api/index.js
const serverless = require('serverless-http');
const app = require('./server'); // server.js contains your express app

module.exports.handler = serverless(app);

