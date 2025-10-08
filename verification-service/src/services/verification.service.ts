import { CredentialRepository } from "../repositories/credential.repository";
import { CredentialRequest } from "../models/credentialRequest.model";
import crypto from "crypto";

export class VerificationService {
  private repository = new CredentialRepository();

  async verifyCredential(payload: CredentialRequest) {
    const concatenatedString = `${payload.issuer}|${payload.reciever}|${payload.credential}`;

    const credential_hash = crypto.createHash('sha256').update(concatenatedString).digest('hex');

    const record = await this.repository.findByCredential(credential_hash);

    if (!record) {
      return { valid: false, message: "Credential not found" };
    }

    return {
      valid: true,
      message: "Credential verified successfully",
      worker_id: record.worker_id,
      timestamp: record.timestamp,
    };
  }
}
