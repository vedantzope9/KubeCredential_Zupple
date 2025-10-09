import { CredentialRepository } from "../repositories/credential.repository";
import { CredentialRequest } from "../models/credentialRequest.model";
import crypto from "crypto";
import { timeStamp } from "console";

export class IssuanceService {
  private repository = new CredentialRepository();

  async IssueCredential(payload: CredentialRequest) {
    const concatenatedString = `${payload.issuer}|${payload.reciever}|${payload.credential}`;

    const credential_hash = crypto.createHash('sha256').update(concatenatedString).digest('hex');

    let record = await this.repository.findByCredential(credential_hash);

    if (record) {
      return { valid: false, message: "Credential already exists" ,created_by:record.worker_id};
    }
    
    const timeStamp = new Date().toISOString()
    const WORKER_ID = process.env.WORKER_ID || "unknown";
    record = await this.repository.createCredential(credential_hash,timeStamp,WORKER_ID)
    
    return {
      valid: true,
      message: "Credential created successfully",
      worker_id: record.worker_id,
      timestamp: record.timestamp,
    };
  }
}
