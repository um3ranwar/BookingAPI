import express from "express";
import { authenticate, authorize } from "../Middleware/authentication.js";

import {
  getScheduler,
  createBooking,
  deleteBooking,
} from "../controller/clientController.js";
const router = express.Router();
router.post("/booking", authorize(["Admin"]), createBooking);
router.delete(
  "/booking/:id",
  authenticate,
  authorize(["Admin", "Agent"]),
  deleteBooking
);
router.get(
  "/scheduler",
  authenticate,
  authorize(["REGULAR", "ADMIN"]),
  getScheduler
);

export default router;
