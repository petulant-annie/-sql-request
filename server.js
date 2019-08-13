const mysql = require('mysql2/promise');
const bluebird = require('bluebird');
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/login', (req, res) => {
  userCheckFromDB(req, res);
});

app.post('/code', verifyToken, (req, res) => {
  jwt.verify(req.token, config.secret, async (err, authData) => {
    if (err) {
      console.log(err);
    } else {
      const refreshToken = await codeCheckFromDB(req, res);
      console.log(authData);
      res.json({ refreshToken });
    }
  });
});

app.post('/refreshtoken', verifyToken, (req, res) => {
  let date = Math.floor(Date.now()/1000) + (60 * 60);
  console.log(date + ' now')

  jwt.verify(req.token, config.refreshTokenSecret, async (err, authData) => {
    console.log(authData.exp +' exp')
    if (err) {
      console.log(err);
    } else if (authData.exp > date) {
      const token = await getAccessToken(authData.user);
      const refreshToken = await getRefreshToken(authData.user);
      console.log('token was refreshed');
      res.json({ token, refreshToken });
    }
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    console.log('ERR');
  }
}

const getAccessToken = (phone) => {
  return new Promise((res, rej) => {
    jwt.sign({ user: phone }, config.secret, { expiresIn: config.tokenLife }, (err, token) => {
      if (err) rej(err);
      else res(token);
    })
  })
}

const getRefreshToken = (phone) => {
  return new Promise((res, rej) => {
    jwt.sign(
      { user: phone },
      config.refreshTokenSecret,
      { expiresIn: config.refreshTokenLife },
      (err, refreshToken) => {
        if (err) rej(err);
        else res(refreshToken);
      });
  })
}

async function userCheckFromDB(req, res) {
  const selectUserRequest =
    `SELECT Phone, Password FROM usersdb WHERE Phone = '${req.body.phone}' AND Password = '${req.body.password}'`;

  const connection = await mysql.createConnection({
    host: '172.16.9.77',
    user: 'anna',
    database: 'test',
    password: '12345678',
    Promise: bluebird
  });

  const userCheck = await connection.execute(selectUserRequest, async (err, results) => {
    if (err) {
      console.log(err);
    } else if (results.length > 0) {
      console.log('hello user');
      const token = await getAccessToken(req.body.phone);
      res.json({ token });
    } else {
      console.log('No such user');
    };
  });
}

async function codeCheckFromDB(req, res) {
  const selectCodeRequest = `SELECT Code FROM codedb WHERE Code = '${req.body.checkingCode}'`;

  const connection = await mysql.createConnection({
    host: '172.16.9.77',
    user: 'anna',
    database: 'test',
    password: '12345678',
    Promise: bluebird
  });

  const codeCheck = await connection.execute(selectCodeRequest, async (err, results) => {
    if (err) {
      console.log(err);
    } else if (results.length > 0) {
      console.log('code valid');
      const refreshToken = await getRefreshToken(req.body.phone);
      res.json({ refreshToken });
    } else {
      console.log('No such code');
    };
  });
}

app.listen(config.port || process.env.port || 3000, () => console.log('Server started on port 5000'));