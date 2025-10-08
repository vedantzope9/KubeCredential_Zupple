import { pool } from "../config/db";
import { Credential } from "../models/credential.model";

export class CredentialRepository {
  async findByCredential(credential_hash: string): Promise<Credential | null> {
    const result = await pool.query("SELECT * FROM credentials WHERE credential_hash = $1", [credential_hash]);

    if(result.rows.length === 0)
        return null;

    const row= result.rows[0];

    return {
        credential_id: row.credential_id,
        credential_hash: row.credential_hash,
        worker_id: row.worker_id,
        timestamp: new Date(row.timestamp)
    };
  }
}
