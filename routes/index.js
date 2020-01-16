const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Room = require('../schemas/room');
//const Chat = require('../schemas/chat');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
      /*
      console.log('session info0 : ' + req.wst_id);
      console.log('session info0 : ' + req.user);
      console.log('session info : ' + req.session.id);
      console.log('session info2 : ' + req.session.cookie.user);
      */
      if(req.user) {
        var rooms = await Room.find();
        res.render('rooms', {
          title: 'daefricatv',
          twits: [],
          user: req.user,
          room: rooms,
          loginError: req.flash('loginError'),
        });
        req.flash('loginSuccess', '로그인 성공하였습니다.'); 
      } else {
        //const rooms = await Room.find({});
        res.render('login', { title: 'GIF 채팅방', error: req.flash('roomError') });
        //return res.redirect('/login');
      }
      
    } catch (error) {
      console.error(error);
      next(error);
    }
});

module.exports = router;