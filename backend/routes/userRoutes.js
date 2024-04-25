import express from "express";
import checkAuth from "../middleware/authMiddleware.js";
import {
  getUser,
  signUpUser,
  signinUser,
  forgotPassword,
  resetPassword,
} from "../controllers/userControllers.js";

const router = express.Router();

// User

router.post("/signinuser", signinUser);

router.post("/signupuser", signUpUser);

router.post("/forgotpassword", forgotPassword);

router.post("/forgotpassword/:token", resetPassword);

router.post("/getuser", checkAuth, getUser);

export default router;
