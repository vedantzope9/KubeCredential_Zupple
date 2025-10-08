// tests/verification.routes.test.ts
import request from "supertest";
import express, { Express } from "express";
import { verifyCredential } from "../src/controllers/verification.controller";
import { VerificationService } from "../src/services/verification.service";
import { CredentialRequest } from "../src/models/credentialRequest.model";

describe("Verification Route", () => {
  let app: Express;
  let mockService: jest.Mocked<VerificationService>;

  beforeEach(() => {
    app = express();
    app.use(express.json());

    // Create a fresh mocked service for each test
    mockService = {
      verifyCredential: jest.fn()
    } as any;

    // Inject mocked service into route
    app.post("/api/verify", verifyCredential(mockService));
  });

  const payload: CredentialRequest = {
    issuer: "RCOEM",
    reciever: "Arnav J",
    credential: "Btech IT"
  };

  it("should return 400 if any field is missing", async () => {
    const res = await request(app)
      .post("/api/verify")
      .send({ issuer: "RCOEM" }); // missing reciever and credential

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "All fields are required" });
  });

  it("should return valid:false if credential not found", async () => {
    // Mock the service to return not found
    mockService.verifyCredential.mockResolvedValueOnce({ valid: false, message: "Credential not found" } as any);

    const res = await request(app)
      .post("/api/verify")
      .send(payload);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ valid: false, message: "Credential not found" });
    expect(mockService.verifyCredential).toHaveBeenCalledTimes(1);
    expect(mockService.verifyCredential).toHaveBeenCalledWith(payload);
  });

  it("should return valid:true if credential exists", async () => {
    const fakeResult = {
      valid: true,
      message: "Credential verified successfully",
      worker_id: 1,
      timestamp: "2025-10-08T10:00:00Z"
    };

    mockService.verifyCredential.mockResolvedValueOnce(fakeResult as any);

    const res = await request(app)
      .post("/api/verify")
      .send(payload);

    expect(res.status).toBe(200);
    expect(res.body).toEqual(fakeResult);
    expect(mockService.verifyCredential).toHaveBeenCalledTimes(1);
    expect(mockService.verifyCredential).toHaveBeenCalledWith(payload);
  });
});
