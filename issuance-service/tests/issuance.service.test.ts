import { IssuanceService } from "../src/services/issuance.service";
import { CredentialRepository } from "../src/repositories/credential.repository";
import { CredentialRequest } from "../src/models/credentialRequest.model";

jest.mock("../src/repositories/credential.repository");

describe("IssuanceService", () => {
  let service: IssuanceService;
  let mockRepo: jest.Mocked<CredentialRepository>;

  beforeEach(() => {
    service = new IssuanceService();
    mockRepo = new CredentialRepository() as jest.Mocked<CredentialRepository>;
    (service as any).repository = mockRepo;
    jest.clearAllMocks();
  });

  const payload: CredentialRequest = {
    issuer: "RCOEM",
    reciever: "Arnav J",
    credential: "Btech IT"
  };

  it("returns 'Credential already exists' if found in DB", async () => {
    mockRepo.findByCredential.mockResolvedValueOnce({
      credential_id: 1,
      credential_hash: "somehash",
      worker_id: 1,
      timestamp: new Date().toISOString()
    } as any);

    const result = await service.IssueCredential(payload);

    expect(mockRepo.findByCredential).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      valid: false,
      message: "Credential already exists",
      created_by: 1
    });
  });

  it("creates a new credential if not found", async () => {
    mockRepo.findByCredential.mockResolvedValueOnce(null);

    const fakeRecord = {
      credential_id: 2,
      credential_hash: "newhash",
      timestamp: new Date().toISOString(),
      worker_id: 1
    };

    mockRepo.createCredential.mockResolvedValueOnce(fakeRecord as any);

    const result = await service.IssueCredential(payload);

    expect(mockRepo.findByCredential).toHaveBeenCalledTimes(1);
    expect(mockRepo.createCredential).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      valid: true,
      message: "Credential created successfully",
      worker_id: 1,
      timestamp: fakeRecord.timestamp
    });
  });
});
