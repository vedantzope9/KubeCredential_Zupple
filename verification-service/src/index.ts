import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import verificationRoutes from "./routes/verification.routes";
import { pool } from "./config/db";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", verificationRoutes);

const PORT = process.env.PORT || 3000;
const WORKER_ID = process.env.WORKER_ID || "unknown";

app.use(express.json());

app.listen(PORT, () => console.log(`Verification Service running on http://localhost:${PORT}/api/verify`));
