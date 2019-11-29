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

router.get('/join/check', async (req, res, next) => {
  try {
    const userEx = await User.findOne({wst_id: req.query.id});
    //const exitUser = await User.findOne({});
    //var userEx;
    /*
    if (exitUser) {
        userEx = await User.findOne({wst_id: res.body.id});
    } else {
        //userEx = await User.insertOne({id: res.body.id});
        userEx = false;
    }*/
    
    var userResult = "";
    if(userEx) {
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

//const upload = multer();
//router.get('/join/do', isNotLoggedIn, upload.none(), async (req, res, next) => {
router.get('/join/do', isNotLoggedIn, async (req, res, next) => {
  try {
       //const hash = await bcrypt.hash(req.body.pw, 12);
       const hash = await bcrypt.hash(req.query.pw, 12);
       const user = new User({
           wst_id: req.query.id,
           wst_password: hash,
         });
         const newUser = await User.create(user);

         var userResult = "";
       if(newUser) {
           userResult = "OK";
       } else {
           userResult = "NO";
       }
       return res.json(userResult);
   } catch (error) {
     console.error(error);
     next(error);
   }
});

  router.post('/login/do', (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
      if (authError) {
        console.error(authError);
        return next(authError);
      }
      console.log('================M ROUTER USER ID : ' + user.wst_id);
      if (!user) {
        console.log('There is no user!!');
        req.flash('loginError', info.message);
        //alert('fail...');
        console.log('NOT USER!!');
        return res.redirect('/');
      }
      return req.login(user, (loginError) => {
        if (loginError) {
          console.log('ERRRRRRRRRRRRRRRRRRRRRR');
          console.error(loginError);
          return next(loginError);
        }
        //alert('success...');
        console.log('Success!!');
        //HTTP/1.1 302
        //Location: http://localhost:8005/
        return res.redirect(301, '/');
        //res.send('/');
        //res.get('/');
        //location.href = "/index/";
      });
    })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
  });

  //router.get('/logout', isLoggedIn, (req, res) => {
  router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
  });
  
  /*
  router.get('/kakao', passport.authenticate('kakao'));
  
  router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/',
  }), (req, res) => {
    res.redirect('/');
  });
*/
module.exports = router;