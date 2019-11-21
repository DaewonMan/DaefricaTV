const local = require('./localStrategy');
//const kakao = require('./kakaoStrategy');
const User = require('../schemas/user');

/* 사용자 정보 객체를 세션에 아이디로 저장 */
module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    //done(null, user.wst_id);
    done(null, user); // 여기의 user가 req.user가 됨
  });

  /* 세션에 저장한 아이디를 통해 사용자 정보 객체를 불러오는 것 */
  //passport.deserializeUser((wst_id, done) => {
    passport.deserializeUser((user, done) => {
      done(null, user); // 여기의 user가 req.user가 됨
    /*
    User.findOne({ where: { wst_id }})
      .then(user => done(null, user))
      .catch(err => done(err));
    */
    });
  /*
  passport.deserializeUser((id, done) => {
    User.findOne({
      where: { id },
      include: [{
        model: User,
        attributes: ['id', 'nick'],
        as: 'Followers',
      }, {
        model: User,
        attributes: ['id', 'nick'],
        as: 'Followings',
      }],
    })
      .then(user => done(null, user))
      .catch(err => done(err));
  });
  */
  local(passport);
  //kakao(passport);
};