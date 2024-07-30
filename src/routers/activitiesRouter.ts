import express from "express";
import { getActivities } from "../controllers/activitiesController";

const router = express.Router()

router.get("/", getActivities)

export default router