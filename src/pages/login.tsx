"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import BackButton from "@/components/ui/BackButton";
import { useRouter } from "next/navigation";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    // ✅ Fix: Explicitly cast `e.currentTarget.elements.username` as an HTMLInputElement
    const usernameInput = e.currentTarget.elements.namedItem("username") as HTMLInputElement;
    const username = usernameInput?.value || "";

    localStorage.setItem("username", username);
    localStorage.setItem("team", "Icebreakers");

    setIsLoading(false);
    router.push("/dashboard");
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground relative">
      {/* Back Button */}
      <BackButton path="/" displayString="Home" />

      <div className="relative flex flex-col items-center justify-center flex-1 w-full px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-gradient">
              Welcome Back
            </h1>
          </div>

          <div className="relative">
            <div className="p-8 rounded-2xl bg-gradient-to-b from-muted/50 to-muted/30 backdrop-blur-sm border border-muted/20 glow-border">
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="username" className="block text-sm font-medium">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="block w-full rounded-md border border-muted/30 bg-muted/30 px-3 py-2 text-foreground shadow-sm backdrop-blur-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 sm:text-sm"
                  />
                </div>

                <Button type="submit" disabled={isLoading} className="w-full rounded-full">
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
