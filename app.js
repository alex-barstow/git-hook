const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const exec = require('child_process').exec;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const execCallback = (error, stdout, stderr) => {
  if (error) {
    console.log(error);
    return;
  };

  console.log(stdout);
};

// Setup routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  console.log('GET /');
});

app.get('/payload', (req, res) => {
  res.sendStatus(200);
  console.log('GET /payload');
});

app.post('/payload', (req, res) => {
  res.sendStatus(200);

  // test 'git pull' command
  exec('git -C /home/pi/node/git-hook pull', execCallback);

  console.log(res);
});

app.listen(5000, () => {
  console.log('listening on port 5000...');
});
