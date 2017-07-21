'use strict';

const express = require('express');
const app = express();
const joi = require('joi');
const bodyParser = require('body-parser');

app.use(express.static('./public'));

app.use(bodyParser.json());

app.post('/users', (req,res,next)=>{
  const users = req.body.users;

  if(!users.firstName || users.firstName.trim()=== '') {
    const err = new Error('First Name must be filled out');
    err.status = 400;

    return next(err);
  }
  if(!users.lastName || users.lastName.trim()=== '') {
    const err = new Error('Last Name must be filled out');
    err.status = 400;

    return next(err);
  }
  if(!users.username || users.username.trim()=== '') {

    const err = new Error('Username must be filled out');
    err.status = 400;

    return next(err);
  }
  if(users.username.length <= 6) {
    const err = new Error('Username must be more than 6 characters');
    err.status = 400;

    return next(err);
  }
  if(users.username.match(/^[0-9]/)) {
    const err = new Error('Username\'s first character must be a letter');
    err.status = 400;

    return next(err);
  }
  if(users.username.match(/[.,\/#!$%\^&\*;:{}=\-_`~()]/)) {
    const err = new Error('Username must have no punctuation');
    err.status = 400;

    return next(err);
  }
  if(!users.email || users.email.trim()==='') {
    const err = new Error('Email must be filled out');
    err.status = 400;

    return next(err);
  }
  if(!users.email.includes('@')) {
    const err = new Error('Email must be valid');
    err.status = 400;

    return next(err);
  }
  if(!users.phone || users.phone.trim()==='') {
    const err = new Error('Phone Number must be filled out');
    err.status = 400;

    return next(err);
  }
  if(!users.phone || users.phone.trim()==='') {
    const err = new Error('Phone Number must be filled out');
    err.status = 400;

    return next(err);
  }if(!users.phone.match(/[0-9]/)) {
    const err = new Error('Phone Number must be valid');
    err.status = 400;

    return next(err);
  }
  if(users.phone.length === 10) {
    const err = new Error('Phone Number must be 10 digits');
    err.status = 400;

    return next(err);
  }
})

app.use((err, _req, res, _next) => {
  if (err.status) {
    res.status(err.status).set('Content-Type', 'text/plain').send(err.message);
  }

  console.error(err);
  return res.sendStatus(500);
});

const users = require('./routes/users');

app.use('/users', users);


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
