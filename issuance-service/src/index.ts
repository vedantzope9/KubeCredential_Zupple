// import express ,{ Request, Response } from "express";
// import dotenv from "dotenv";
// import { CredentialRequest } from "./types/credential";
// import * as crypto from 'crypto';
// import { Pool } from 'pg';


// dotenv.config()

// const app = express();
// app.use(express.json())

// const PORT = process.env.PORT || 3000;
// const WORKER_ID = process.env.WORKER_ID || 1;
// const DATABASE_URL = process.env.DATABASE_URL || ""

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: parseInt(process.env.DB_PORT || '5432'),
//   ssl: {
//     rejectUnauthorized: false 
//   }
// })

// app.post("/issue",async (req: Request<{}, {}, CredentialRequest>, res: Response)=>{
//     let client;
//     try {
       
//         const { issuer, reciever, credential } = req.body;

    
//         if (!issuer || !reciever || !credential) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Missing required fields: issuer, reciever, and credential are all required"
//             });
//         }

//         if (typeof issuer !== 'string' || typeof reciever !== 'string' || typeof credential !== 'string') {
//             return res.status(400).json({
//                 success: false,
//                 message: "All fields must be strings"
//             });
//         }

//         // Trim fields
//         const trimmedIssuer = issuer.trim();
//         const trimmedReciever = reciever.trim();
//         const trimmedCredential = credential.trim();

//         if (!trimmedIssuer || !trimmedReciever || !trimmedCredential) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Fields cannot be empty or just whitespace"
//             });
//         }

//         // Concatenate the fields
//         const concatenatedString = `${trimmedIssuer}|${trimmedReciever}|${trimmedCredential}`;

//         // Generate hash
//         const hash = crypto.createHash('sha256').update(concatenatedString).digest('hex');

//         // Get worker_id
//         const worker_id = WORKER_ID;

//         // Create timestamp
//         const timestamp = new Date().toISOString();

//         // Get a client from the connection pool
//         client = await pool.connect();

//         // Check if hash already exists (to avoid duplicates)
//         const checkQuery = 'SELECT credential_hash FROM credentials WHERE credential_hash = $1';
//         const checkResult = await client.query(checkQuery, [hash]);

//         if (checkResult.rows.length > 0) {
//             const existingRecord = checkResult.rows[0];
//              return res.status(409).json({
//                 success: false,
//                 message: "Credential with this data already exists",
//                 issued_by: existingRecord.worker_id // This is the third field in your table
//             });
//         }

//         // Insert into PostgreSQL
//         const insertQuery = `
//             INSERT INTO credentials (credential_hash, worker_id, timestamp) 
//             VALUES ($1, $2, $3) 
//             RETURNING credential_id
//         `;
        
//         const result = await client.query(insertQuery, [hash, worker_id, timestamp]);

//         // Return success response
//         return res.status(201).json({
//             success: true,
//             message: "Credential created and stored",
//             worker_id: worker_id,
//             timestamp: timestamp,
//             databaseId: result.rows[0].id
//         });

//     } catch (error) {
//         console.error("Error issuing credential:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error during credential issuance"
//         });
//     } finally {
//         // Release the client back to the pool
//         if (client) {
//             client.release();
//         }
//     }

// });

// app.listen(PORT, () => {
//   console.log(`🚀 Issuance service running on port ${PORT} (${WORKER_ID})`);
// });


import express from "express";
import dotenv from "dotenv";
import Routes from "./routes/issuance.routes";
import { pool } from "./config/db";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", Routes);

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => console.log(`Issuance Service running on http://localhost:${PORT}/api/issue`));
