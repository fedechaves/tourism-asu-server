import express from "express";
import { register, login } from "../controllers/auth.js";

const router = express.Router();

//register route
router.post("/register", register)

router.get("/login", login)

export default router
