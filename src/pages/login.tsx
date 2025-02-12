'use client'

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from 'lucide-react'

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)

    // Add your login logic here
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground overflow-hidden relative">
      <div className="absolute inset-0 bg-grid opacity-[0.02]" />
      
      {/* Back Button */}
      <Link 
        href="/" 
        className="absolute top-8 left-8 inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="relative flex flex-col items-center justify-center flex-1 w-full px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-gradient">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">
              Sign in to continue building better remote teams
            </p>
          </div>

          <div className="relative">
            <div className="p-8 rounded-2xl bg-gradient-to-b from-muted/50 to-muted/30 backdrop-blur-sm border border-muted/20 glow-border">
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border border-muted/30 bg-muted/30 px-3 py-2 text-foreground shadow-sm backdrop-blur-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 sm:text-sm"
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
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border border-muted/30 bg-muted/30 px-3 py-2 text-foreground shadow-sm backdrop-blur-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 sm:text-sm"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-muted/30 bg-muted/30 text-primary focus:ring-primary/20"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link
                      href="/forgot-password"
                      className="text-primary hover:text-primary/90"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full text-lg px-4 py-2 rounded bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 animate-glow disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </button>
              </form>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:text-primary/90">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
