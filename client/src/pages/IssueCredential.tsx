import { useState } from "react";
import axios from "axios";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { FileCheck, User, UserCheck, FileText } from "lucide-react";

const IssueCredential = () => {
  const [issuer, setIssuer] = useState("");
  const [reciever, setReceiver] = useState("");
  const [credential, setCredential] = useState("");
   const [loading, setLoading] = useState(false);

  const handleIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!issuer.trim() || !reciever.trim() || !credential.trim()) {
      toast.error("All fields are required");
      return;
    }


    try {
      setLoading(true);
      // ✅ Send POST request to your backend
      const response = await axios.post("http://104.208.120.163/api/issue", {
        issuer,
        reciever,  // ✅ match backend spelling
        credential,
      });

      // ✅ Handle backend responses
      if (response.data?.valid) {
      toast.success(response.data.message || "Credential issued successfully!");
    } else if (response.status === 409) {
      toast.error("This credential already exists!");
    } else {
      toast.info(response.data?.message || "Operation completed");
    }

      setIssuer("");
      setReceiver("");
      setCredential("");
    } catch (error: any) {
      if (error.response?.status === 409) {
        toast.error("This credential already exists!");
      } else {
        toast.error("Failed to issue credential. Please try again.");
      }
    } finally {
      setLoading(false);
    }
    // Reset form
    setIssuer("");
    setReceiver("");
    setCredential("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-foreground">Issue Credential</h1>
          <p className="text-muted-foreground">Create and issue new credentials to recipients</p>
        </div>

        <div className="mx-auto max-w-2xl">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-primary" />
                New Credential
              </CardTitle>
              <CardDescription>Fill in the details to issue a new credential</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleIssue} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="issuer" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Issuer
                  </Label>
                  <Input
                    id="issuer"
                    placeholder="Enter issuer name or ID"
                    value={issuer}
                    onChange={(e) => setIssuer(e.target.value)}
                    className="transition-all focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="receiver" className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4" />
                    Receiver
                  </Label>
                  <Input
                    id="receiver"
                    placeholder="Enter receiver name or ID"
                    value={reciever}
                    onChange={(e) => setReceiver(e.target.value)}
                    className="transition-all focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="credential" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Credential
                  </Label>
                  <Input
                    id="credential"
                    placeholder="Enter credential information"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    className="transition-all focus:ring-2 focus:ring-primary"
                  />
                </div>

                <Button type="submit" className="w-full shadow-md">
                  Issue Credential
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default IssueCredential;
