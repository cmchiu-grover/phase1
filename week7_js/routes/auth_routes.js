import { Router } from "express";
import Member from "../models/member_model.js";
import bcrypt from "bcrypt";
import passport from "../config/passport.js";
const router = Router();

router.get("/signout", (req, res) => {
  req.logOut((err) => {
    if (err) return res.send(err);
    return res.redirect("/");
  });
});

router.post("/signup", async (req, res) => {
  let { name, username, password } = req.body;

  const checkUser = await Member.findByUsername({ username });

  if (checkUser) {
    return res.redirect("/error");
  }

  let hashedPassword = await bcrypt.hash(password, 12);

  const memberData = {
    name,
    username,
    password: hashedPassword,
  };

  try {
    const memberId = await Member.create(memberData);
    console.log("會員建立成功，ID:", memberId);

    res.status(201).json({ message: "會員建立成功", memberId });
  } catch (error) {
    console.error("建立會員時發生錯誤:", error);
    res.status(500).json({ message: "建立會員失敗" });
  }
});

router.post(
  "/signin",
  passport.authenticate("local", {
    failureRedirect: "/",
  }),
  (req, res) => {
    return res.redirect("/member");
  }
);

export default router;
