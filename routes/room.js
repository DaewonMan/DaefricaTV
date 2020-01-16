const express = require('express');
const passport = require('passport');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const ColorHash = require('color-hash');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const Room = require('../schemas/room');
const User = require('../schemas/user');

const router = express.Router();

router.get('/create', async (req, res, next) => {
  try {
    var passport = req.query.pw;
    var insertOk;
    var room;
    const colorHash = new ColorHash();
    var randNum = Math.floor(Math.random() * 100000); // random num gen

    if(passport != "") {
        room = new Room({dtv_title: req.query.title, dtv_createdId: req.user.wst_id, dtv_password: passport, dtv_roomColor: colorHash.hex(randNum)});
    } else {
        room = new Room({dtv_title: req.query.title, dtv_createdId: req.user.wst_id, dtv_roomColor: colorHash.hex(randNum)});
    }
    insertOk = await Room.create(room);
    console.log("++++++++++++++++++++++++");
    var userResult = "";
    if(insertOk) {
        userResult = "NO";
    } else {
        userResult = "OK";
    }
    return res.json(userResult);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/onAir/do', async (req, res, next) => {
    try {
        res.render('onAirMain', {
        title: 'daefricatv',
        twits: [],
        user: req.user,
        loginError: req.flash('loginError'),
        });
      } catch (error) {
        console.error(error);
        next(error);
      }
});
module.exports = router;