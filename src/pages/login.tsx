"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import BackButton from "@/components/ui/BackButton";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    const username = (form.elements.namedItem("username") as HTMLInputElement)?.value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)?.value;
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value;

    try {
      const url = mode === "register" ? "/api/auth/register" : "/api/auth/login";
      const payload =
        mode === "register"
          ? { email, password, name, username }
          : { username, password };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      localStorage.setItem("username", data.user.username || username); // use backend username if returned
      localStorage.setItem("user_id", data.user.id); // assuming `id` is returned from the API
      
      if (mode === "register") {
        router.push("/team-setup");
      } else {
        router.push("/teams");
      }
      
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
              {mode === "login" ? "Welcome Back" : "Create an Account"}
            </h1>

            <div className="flex justify-center space-x-2 text-sm">
              <button
                className={`px-3 py-1 rounded ${
                  mode === "login" ? "bg-primary text-white" : "bg-muted"
                }`}
                onClick={() => setMode("login")}
              >
                Login
              </button>
              <button
                className={`px-3 py-1 rounded ${
                  mode === "register" ? "bg-primary text-white" : "bg-muted"
                }`}
                onClick={() => setMode("register")}
              >
                Register
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="glow-border rounded-2xl border border-muted/20 bg-gradient-to-b from-muted/50 to-muted/30 p-8 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                {mode === "register" && (
                  <>
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className="block w-full rounded-md border border-muted/30 bg-muted/30 px-3 py-2 text-foreground shadow-sm backdrop-blur-sm sm:text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="block w-full rounded-md border border-muted/30 bg-muted/30 px-3 py-2 text-foreground shadow-sm backdrop-blur-sm sm:text-sm"
                      />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <label htmlFor="username" className="block text-sm font-medium">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="block w-full rounded-md border border-muted/30 bg-muted/30 px-3 py-2 text-foreground shadow-sm backdrop-blur-sm sm:text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full rounded-md border border-muted/30 bg-muted/30 px-3 py-2 text-foreground shadow-sm backdrop-blur-sm sm:text-sm"
                  />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-full"
                >
                  {isLoading
                    ? mode === "login"
                      ? "Signing in..."
                      : "Creating account..."
                    : mode === "login"
                    ? "Sign in"
                    : "Register"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
