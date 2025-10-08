import { Router } from "express";
import { verifyCredential } from "../controllers/verification.controller";
import { VerificationService } from "../services/verification.service";

const router = Router();
const service = new VerificationService();

router.post("/verify", verifyCredential(service));


export default router;
