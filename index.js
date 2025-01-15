import express, { json } from "express";
import conectDb from "./src/config/dbConfig.js";
import dotenv from "dotenv";
import postRouter from "./src/routers/postRouters.js";
import apiRouter from "./src/routers/apiRouter.js";
import v1Router from "./src/routers/v1Router.js";
import {
  createPost,
  deletePostById,
  findAllPost,
  findPostByid,
  updatePostById,
} from "./src/repositories/postRepositories.js";
import { isAuthenticated } from "./src/middleware/authMiddleware.js";

dotenv.config();

const PORT = 4001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", v1Router);
app.get("/ping", (req, res) => {
  console.log(req.query);
  console.log(req.body);
  console.log(req.user);
  return res.json({ message: "pong" });
});
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  conectDb();
});
