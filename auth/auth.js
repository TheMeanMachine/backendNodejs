const passport = require('koa-passport');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var cfg = require("../config.js");
var opts = {};
var jwt = require("jwt-simple");
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = cfg.jwt.jwtSecret;
var User = require('../models/user')
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    const user = await User.getJWT(jwt_payload.ID).catch((e) => {
        done({message: 'Unauthorised'}, null)
    })
    if(!user)done({message: 'Unauthorised'}, null)
    if(jwt.encode(jwt_payload, cfg.jwt.jwtSecret) !== user.jwt) done({message: 'Unauthorised'},null)
    done(null, jwt_payload);
  })
);


