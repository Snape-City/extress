const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const util = require('./util');

const PORT = 4050;
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public/')));

const generateRequests = (config) => {
  const { url, tests } = config;
  const promiseArr = [];
  tests.forEach(test => {
    for (let i = 0; i < test.numRequests; i++) {
      util.promPush(promiseArr, url, test, i);
    }
  });
  axios
    .all(promiseArr)
    .then(() => console.log('all requests have been processed!'))
    .catch(error => console.error('Error 8===>', error));
}

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('disconnect', () => console.log('User disconnected'));

  socket.on('testData', testData => {
    generateRequests(testData)
  });
});

app.post('/finished', (req, res) => {
  io.emit('data', req.body);
  res.sendStatus(200);
});

app.post('/tree', (req, res) => {
  io.emit('tree', req.body);
  res.sendStatus(200);
})

http.listen(PORT, () => console.log(`listening on port ${PORT}`));