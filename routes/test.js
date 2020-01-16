const express = require('express');
const passport = require('passport');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

//onst Room = require('../schemas/room');
//const Chat = require('../schemas/chat');
const User = require('../schemas/user');

const router = express.Router();

router.get('/video/check', async (req, res, next) => {    
    res.render('testvideo');
  });

module.exports = router;