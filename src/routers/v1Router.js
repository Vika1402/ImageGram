import express from "express";
const router = express.Router();
import apiRoute from "./apiRouter.js";
router.use("/v1", apiRoute);

export default router;
