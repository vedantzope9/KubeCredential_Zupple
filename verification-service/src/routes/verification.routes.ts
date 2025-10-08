import { Router } from "express";
import { verifyCredential } from "../controllers/verification.controller";

const router = Router();

router.post("/verify", verifyCredential);

export default router;
