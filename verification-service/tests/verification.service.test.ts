import { VerificationService } from "../src/services/verification.service";
import { CredentialRepository } from "../src/repositories/credential.repository";
import { CredentialRequest } from "../src/models/credentialRequest.model";

jest.mock("../src/repositories/credential.repository"); 

describe("VerificationService", () => {
  let service: VerificationService;
  let mockRepo: jest.Mocked<CredentialRepository>;

  beforeEach(() => {
    service = new VerificationService();
    mockRepo = new CredentialRepository() as jest.Mocked<CredentialRepository>;
    (service as any).repository = mockRepo; 
    jest.clearAllMocks();
  });

  const payload: CredentialRequest = {
    issuer: "RCOEM",
    reciever: "Arnav J",
    credential: "Btech IT"
  };

  it("should return valid:false if credential not found", async () => {
    mockRepo.findByCredential.mockResolvedValueOnce(null);

    const result = await service.verifyCredential(payload);

    expect(mockRepo.findByCredential).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ valid: false, message: "Credential not found" });
  });

  it("should return valid:true if credential exists", async () => {
    const fakeRecord = {
      credential_id: 1,
      credential_hash: "somehash",
      worker_id: 1,
      timestamp: new Date().toISOString()
    };

    mockRepo.findByCredential.mockResolvedValueOnce(fakeRecord as any);

    const result = await service.verifyCredential(payload);

    expect(mockRepo.findByCredential).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      valid: true,
      message: "Credential verified successfully",
      worker_id: 1,
      timestamp: fakeRecord.timestamp
    });
  });
});
