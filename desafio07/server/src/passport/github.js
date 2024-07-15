import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";
import UserDao from "../daos/mongodb/user.dao.js";
import 'dotenv/config';

const userDao = new UserDao();

const strategyConfig = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  const email = profile._json.email;
  const user = await userDao.getByEmail(email);
  if (user) return done(null, user);
  const newUser = await userDao.register({
    first_name: profile._json.name.split(' ')[0],
    last_name: profile._json.name.split(' ').length === 3 ? profile._json.name.split(' ')[1].concat(' ', profile._json.name.split(' ')[2]) : profile._json.name.split(' ')[1],
    email,
    image: profile._json.avatar_url,
    isGithub: true,
  });
  return done(null, newUser);
};

passport.use("github", new GithubStrategy(strategyConfig, registerOrLogin));

export default passport;
