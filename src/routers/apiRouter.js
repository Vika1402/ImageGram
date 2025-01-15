import express from "express";
const router = express.Router();
import postRouter from "./postRouters.js";
import userRouter from "./userRouters.js";
router.use("/post", postRouter);
router.use("/user", userRouter);

export default router;
