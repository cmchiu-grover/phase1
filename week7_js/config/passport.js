import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import Member from "../models/member_model.js";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const member = await Member.findByUsername(username);

      if (!member) {
        return done(null, false, { message: "Incorrect username." });
      }

      const isValidPassword = await bcrypt.compare(password, member.password);

      if (!isValidPassword) {
        return done(null, false, { message: "Incorrect password." });
      }

      return done(null, member);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((member, done) => {
  console.log("開始 serialize...");
  return done(null, member.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("開始 deserialize...");
  try {
    let member = await Member.findById(id);

    return done(null, member);
  } catch (error) {
    console.error("Error deserializing user:", error);
    return done(error);
  }
});
export default passport;
