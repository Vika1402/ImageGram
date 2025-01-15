import express from "express";
import { signin, signup } from "../controller/userController.js";
import validate from "../validator/zodValidator.js";
import { zodSignUpSchema } from "../validator/zodSignUpSchema.js";
import { zodSigninSchema } from "../validator/zodSigninSchema.js";
const router = express.Router();
router.get("/profile");
router.post("/signup", validate(zodSignUpSchema), signup);
router.post("/signin", validate(zodSigninSchema), signin);

export default router;
