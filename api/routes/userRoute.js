import express from "express";
import { getUsers, createUser } from "../controller/commonController.js";
import { authenticate, authorize } from "../Middleware/authentication.js";

const router = express.Router();

router.post("/users", createUser);
router.get("/users", authenticate, authorize(["REGULAR", "ADMIN"]), getUsers);

export default router;
