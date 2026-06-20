"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Redirect to admin dashboard
        router.push("/admin/project-status");
        router.refresh();
      } else {
        setError(data.error || "Invalid password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1'>
          <div className='flex items-center justify-center mb-4'>
            <div className='p-3 bg-primary/10 rounded-full'>
              <Lock className='w-8 h-8 text-primary' />
            </div>
          </div>
          <CardTitle className='text-2xl font-bold text-center'>
            Admin Access
          </CardTitle>
          <CardDescription className='text-center'>
            Enter your password to access the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            {error && (
              <Alert variant='destructive'>
                <AlertCircle className='h-4 w-4' />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                placeholder='Enter admin password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
                autoFocus
                className='w-full'
              />
            </div>

            <Button
              type='submit'
              className='w-full'
              disabled={isLoading || !password}
            >
              {isLoading ? (
                <>
                  <Lock className='mr-2 h-4 w-4 animate-pulse' />
                  Verifying...
                </>
              ) : (
                <>
                  <Lock className='mr-2 h-4 w-4' />
                  Login
                </>
              )}
            </Button>
          </form>

          <div className='mt-6 text-center text-sm text-muted-foreground'>
            <p>
              Set your password in the{" "}
              <code className='text-xs bg-muted px-2 py-1 rounded'>
                .env.local
              </code>{" "}
              file
            </p>
            <p className='mt-1 text-xs'>
              Variable:{" "}
              <code className='bg-muted px-1 rounded'>ADMIN_PASSWORD</code>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
