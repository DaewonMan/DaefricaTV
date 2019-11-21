const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');

const User = require('../schemas/user');

module.exports = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'wst_id',
    passwordField: 'wst_password',
    session: true, // 세션에 저장 여부
    passReqToCallback: false,
  }, async (wst_id, wst_password, done) => {
    try {
      console.log('================USER ID : ' + wst_id);
      const exUser = await User.findOne({ wst_id: wst_id });
      if (exUser) {
        console.log('================YES USER!!');
        const result = await bcrypt.compare(wst_password, exUser.wst_password);
        if (result) {
          done(null, exUser);
        } else {
          done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
        }
      } else {
        console.log('================NO USER!!');
        done(null, false, { message: '가입되지 않은 회원입니다.' });
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};