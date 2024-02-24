import express from "express";
import { getScaffoldScheduler } from "../controller/businessController.js";
const router = express.Router();
router.get("/scheduler", getScaffoldScheduler);

export default router;
