"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import BackButton from "@/components/ui/BackButton";
import { useRouter } from "next/navigation";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const form = e.currentTarget;
    const username =
      (form.elements.namedItem("username") as HTMLInputElement)?.value || "";
    const password =
      (form.elements.namedItem("password") as HTMLInputElement)?.value || "";

    try {
      // const res = await fetch("http://localhost:8001/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ username, password }),
      // });

      // if (!res.ok) {
      //   const err = await res.json();
      //   throw new Error(err.detail || "Login failed");
      // }

      // const data = await res.json();
      localStorage.setItem("username", username);

      localStorage.setItem("team", "Icebreakers");

      router.push("/teams");
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen bg-background text-foreground">
      <BackButton path="/" displayString="Home" />
      <div className="relative flex w-full flex-1 flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-8">
          <div className="space-y-6 text-center">
            <h1 className="text-gradient text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome Back
            </h1>
          </div>

          <div className="relative">
            <div className="glow-border rounded-2xl border border-muted/20 bg-gradient-to-b from-muted/50 to-muted/30 p-8 backdrop-blur-sm">
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium"
                  >
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

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border border-muted/30 bg-muted/30 px-3 py-2 text-foreground shadow-sm backdrop-blur-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 sm:text-sm"
                  />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-full"
                >
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
