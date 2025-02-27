import "dotenv/config";
import express from "express";
import session from "express-session";
import database from "./models/database.js";
import passport from "passport";
import authRoutes from "./routes/auth_routes.js";
import memberRoutes from "./routes/member_routes.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function connectDB() {
  try {
    const connection = await database.getConnection();
  } catch (error) {
    console.error("連線或查詢錯誤：", error);
  } finally {
  }
}

connectDB();

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const secretKey = process.env.SECRET_KEY;
app.use(
  session({
    secret: secretKey,
    resave: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/member", memberRoutes);

app.get("/", (req, res) => {
  return res.render("index", { user: req.user });
});

app.listen(3000, () => {
  console.log("Serve is running on port 3000...");
});
