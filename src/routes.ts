import express from "express";
import { classifyNumber } from "./controller";

const router = express.Router();

router.get("/", classifyNumber); 

export default router;
