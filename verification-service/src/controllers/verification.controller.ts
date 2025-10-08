import { Request, Response } from "express";
import { VerificationService } from "../services/verification.service";
import { CredentialRequest } from "../models/credentialRequest.model";


export const verifyCredential = (service: VerificationService) => {
    return async (req: Request, res: Response) => {
    try {
      const payload: CredentialRequest = req.body;

      if (!payload.credential || !payload.issuer || !payload.reciever) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const result = await service.verifyCredential(payload);

      res.status(200).json(result);
    } catch (err) {
      console.error("Verification error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
};