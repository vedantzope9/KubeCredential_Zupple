import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, FileCheck, CheckCircle2, Lock } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center">
            <div className="flex items-center gap-2 text-xl font-bold text-primary">
              <ShieldCheck className="h-6 w-6" />
              KubeCredential
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-16">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-5xl font-bold text-foreground">
            Secure Credential Management
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Issue and verify digital credentials with confidence. Built for trust, transparency, and security.
          </p>
        </div>

        <div className="mb-16 grid gap-8 md:grid-cols-2">
          <Card className="shadow-lg transition-all hover:shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <FileCheck className="h-6 w-6 text-primary" />
                Issue Credentials
              </CardTitle>
              <CardDescription className="text-base">
                Create and distribute verifiable credentials to recipients
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  Define issuer, receiver, and credential data
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  Generate unique credential IDs
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  Track all issued credentials
                </li>
              </ul>
              <Link to="/issue">
                <Button className="w-full shadow-md">
                  Go to Issue Credentials
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="shadow-lg transition-all hover:shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <ShieldCheck className="h-6 w-6 text-primary" />
                Verify Credentials
              </CardTitle>
              <CardDescription className="text-base">
                Validate the authenticity of issued credentials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  Instant verification results
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  View complete credential details
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  Ensure data integrity
                </li>
              </ul>
              <Link to="/verify">
                <Button className="w-full shadow-md">
                  Go to Verify Credentials
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Lock className="h-6 w-6 text-primary" />
              Why KubeCredential?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Secure</h3>
                <p className="text-sm text-muted-foreground">
                  Built with security-first architecture to protect sensitive credential data
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Transparent</h3>
                <p className="text-sm text-muted-foreground">
                  Track credential lifecycle with complete visibility and audit trails
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Easy to Use</h3>
                <p className="text-sm text-muted-foreground">
                  Simple interface for issuing and verifying credentials without complexity
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;
