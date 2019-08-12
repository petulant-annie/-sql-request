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

app.post('/code', (req, res) => {
  codeCheckFromDB(req, res);
});

app.post('/token', verifyToken, (req, res) => {
  jwt.verify(req.token, config.secret, (err, authData) => {
    if (err) {
      console.log(err);
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
      console.log(authData);
    }
    console.log('hello token request');
  });
});

app.post('/refreshtoken', verifyToken, (req, res) => {
  let datenow = Date.now() / 1000;
  let date = Math.ceil(datenow);
  
  jwt.verify(req.token, config.refreshTokenSecret, async (err, authData) => {
    if (err) {
      console.log(err);
    } else if (authData.exp !== date) {
      const token = await getAccessToken(authData.user);
      const refreshToken = await getRefreshToken(authData.user);
      console.log(token);
      console.log(refreshToken);
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
    console.log(err);
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
      const refreshToken = await getRefreshToken(req.body.phone);
      res.json({ token, refreshToken });
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

  const codeCheck = await connection.execute(selectCodeRequest, (err, results) => {
    if (err) {
      console.log(err);
    } else if (results.length > 0) {
      console.log('hello code');
    } else {
      console.log('No such code')
    };
  });
}

app.listen(config.port || process.env.port || 3000, () => console.log('Server started on port 5000'));