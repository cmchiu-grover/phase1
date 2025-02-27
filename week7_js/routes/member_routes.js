import { Router } from "express";
import Message from "../models/message_model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const content = req.query.content || "";
    const messages = await Message.findAll();
    return res.render("member", {
      member: req.user,
      content: content,
      messages: messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/createMessage", async (req, res) => {
  let { content } = req.body;

  try {
    await Message.create({
      content: content,
      member_id: req.user.id,
    });

    res.redirect("/member");
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/deleteMessage", async (req, res) => {
  const { message_id } = req.body;

  if (!message_id) {
    return res.redirect("/member");
  }

  try {
    const message = await Message.findById(message_id);

    if (!message) {
      return res.redirect("/member");
    }

    const member_id = req.session.passport.user;

    if (message.member_id != member_id) {
      return res.redirect("/error?message=您沒有權限刪除此留言");
    }

    await Message.delete(message_id);
    res.redirect("/member");
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
