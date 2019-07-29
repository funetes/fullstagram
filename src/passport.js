import passport from 'passport';
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from '../generated/prisma-client';

const options = {
  jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey : process.env.JWT_SECRET
}

const verifyUser = async (payload,done) => {
  const user = await prisma.user({id: payload.id});
  try{
    if(user){
      return done(null,user);
    }else {
      return done(null,false);
    }
  }
  catch(error){
      return done(error);
  }
}

passport.use(new Strategy(options, verifyUser));

export const authenticateJwt = (req,res,next) => passport.authenticate('jwt',{session:false},(err,user)=>{
  if(user){
    req.user = user;
  }
  next();
})(req,res,next);

// function authenticateJwt(req,res,next){
//   return passport.authenticate('jwt',{session:false},function(err,user){
//     if(user){
//       req.user = user;
//     }
//     next();
//   })(req,res,next);
// }