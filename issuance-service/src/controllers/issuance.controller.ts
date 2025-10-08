import { Request, Response } from "express";
import { IssuanceService } from "../services/issuance.service";
import { CredentialRequest } from "../models/credentialRequest.model";

const service = new IssuanceService();

export const issueCredential = async (req: Request, res: Response) => {
  try {
    const payload: CredentialRequest = req.body;

    if (!payload.credential || !payload.issuer || !payload.reciever) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = await service.IssueCredential(payload);

    res.status(200).json(result);
  } catch (err) {
    console.error("Issuance error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
