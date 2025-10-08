import { useState } from "react";
import axios from "axios";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ShieldCheck, Search, CheckCircle2, XCircle, User, UserCheck, FileText } from "lucide-react";

interface VerificationResult {
  status: "valid" | "invalid" | null;
  issuedAt?: string;
  issuedBy?:number;
}

const VerifyCredential = () => {
  const [issuer, setIssuer] = useState("");
  const [receiver, setReceiver] = useState("");
  const [credential, setCredential] = useState("");
  const [verificationResult, setVerificationResult] = useState<VerificationResult>({ status: null });

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!issuer.trim() || !receiver.trim() || !credential.trim()) {
      toast.error("All fields are required for verification");
      return;
    }
try {
    const response = await axios.post("http://localhost:3000/api/verify", {
      issuer,
      reciever: receiver, // match backend spelling
      credential,
    });

    if (response.data?.valid) {
      setVerificationResult({
        status: "valid",
       issuedAt:response.data.timestamp,
       issuedBy:response.data.worker_id
      });
      toast.success(response.data.message || "Credential verified successfully!");
    } else {
      setVerificationResult({
        status: "invalid",
      });
      toast.error(response.data.message || "Credential verification failed!");
    }
  } catch (error: any) {
    setVerificationResult({ status: "invalid" });
    toast.error("Verification failed. Please try again.");
  }
  };

  const resetVerification = () => {
    setIssuer("");
    setReceiver("");
    setCredential("");
    setVerificationResult({ status: null });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-foreground">Verify Credential</h1>
          <p className="text-muted-foreground">Validate the authenticity of issued credentials</p>
        </div>

        <div className="mx-auto max-w-2xl space-y-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Credential Verification
              </CardTitle>
              <CardDescription>Enter credential details to verify authenticity</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerify} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="verifyIssuer" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Issuer
                  </Label>
                  <Input
                    id="verifyIssuer"
                    placeholder="Enter issuer name or ID"
                    value={issuer}
                    onChange={(e) => setIssuer(e.target.value)}
                    className="transition-all focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="verifyReceiver" className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4" />
                    Receiver
                  </Label>
                  <Input
                    id="verifyReceiver"
                    placeholder="Enter receiver name or ID"
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                    className="transition-all focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="verifyCredential" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Credential
                  </Label>
                  <Input
                    id="verifyCredential"
                    placeholder="Enter credential information"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    className="transition-all focus:ring-2 focus:ring-primary"
                  />
                </div>

                <Button type="submit" className="w-full shadow-md">
                  <Search className="mr-2 h-4 w-4" />
                  Verify Credential
                </Button>
              </form>
            </CardContent>
          </Card>

          {verificationResult.status && (
            <Card
              className={`shadow-lg ${
                verificationResult.status === "valid"
                  ? "border-success bg-success/5"
                  : "border-destructive bg-destructive/5"
              }`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {verificationResult.status === "valid" ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-success" />
                      <span className="text-success">Verification Successful</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-destructive" />
                      <span className="text-destructive">Verification Failed</span>
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {verificationResult.status === "valid" ? (
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start justify-between rounded-lg bg-card p-3">
                      <span className="font-medium text-foreground">Issuer:</span>
                      <span className="text-muted-foreground">{verificationResult.issuedBy}</span>
                    </div>
                    <div className="flex items-start justify-between rounded-lg bg-card p-3">
                      <span className="font-medium text-foreground">Verified At:</span>
                      <span className="text-muted-foreground">
                        {new Date(verificationResult.issuedAt!).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    The credential could not be verified. Please check the details and try again.
                  </p>
                )}
                <Button onClick={resetVerification} variant="outline" className="w-full">
                  Verify Another Credential
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default VerifyCredential;
