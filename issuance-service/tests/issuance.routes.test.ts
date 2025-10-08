import request from "supertest";
import express, { json } from "express";
import issuanceRouter from "../src/routes/issuance.routes";
import { IssuanceService } from "../src/services/issuance.service";

jest.mock("../src/services/issuance.service"); 
const app = express();
app.use(json());
app.use("/api", issuanceRouter);

describe("POST /api/issue", () => {
  const payload = {
    issuer: "RCOEM",
    reciever: "Arnav J",
    credential: "Btech IT"
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if any field is missing", async () => {
    const res = await request(app)
      .post("/api/issue")
      .send({ issuer: "RCOEM", reciever: "Arnav J" }); 

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "All fields are required" });
  });

  it("should return 'Credential already exists' if service returns false", async () => {
    const mockResult = { valid: false, message: "Credential already exists", created_by: 1 };
    (IssuanceService.prototype.IssueCredential as jest.Mock).mockResolvedValue(mockResult);

    const res = await request(app)
      .post("/api/issue")
      .send(payload);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockResult);
    expect(IssuanceService.prototype.IssueCredential).toHaveBeenCalledTimes(1);
    expect(IssuanceService.prototype.IssueCredential).toHaveBeenCalledWith(payload);
  });

  it("should create new credential if service returns true", async () => {
    const mockResult = { valid: true, message: "Credential created successfully", worker_id: 1, timestamp: new Date().toISOString() };
    (IssuanceService.prototype.IssueCredential as jest.Mock).mockResolvedValue(mockResult);

    const res = await request(app)
      .post("/api/issue")
      .send(payload);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockResult);
    expect(IssuanceService.prototype.IssueCredential).toHaveBeenCalledTimes(1);
    expect(IssuanceService.prototype.IssueCredential).toHaveBeenCalledWith(payload);
  });
});
