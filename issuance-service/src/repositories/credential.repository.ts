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
        timestamp: row.timeStamp
    };
  }

  async createCredential(credential_hash:string,timestamp:String,worker_id:Number): Promise<Credential>{
    const insertQuery = `INSERT INTO credentials (credential_hash, worker_id, timestamp) 
            VALUES ($1, $2, $3) 
            RETURNING credential_id`
    const result = await pool.query(insertQuery,[credential_hash,worker_id,timestamp]);
    const row = result.rows[0];
    return {
        credential_id: row.credential_id,
        credential_hash: row.credential_hash,
        worker_id: row.worker_id,
        timestamp: row.timestamp
    };
  }
}
