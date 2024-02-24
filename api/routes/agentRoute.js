import express from "express";
import { getAgents, createAgent } from "../controller/commonController.js";
import { authenticate, authorize } from "../Middleware/authentication.js";
const router = express.Router();
router.post("/agents", createAgent);

router.get("/agents", authenticate, authorize(["Admin", "Agent"]), getAgents);

export default router;
