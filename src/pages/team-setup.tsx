"use client"

import { useState } from "react"
import { Users, ArrowRight, Plus, UserPlus } from "lucide-react"
import { button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TeamSetup() {
  const [inviteLink, setInviteLink] = useState("")

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault()
    setInviteLink("TEAM123")
  }

  const handleJoinTeam = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = "/dashboard"
  }

  return (
    <div className="min-h-screen bg-background p-8">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <div className="flex justify-center mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500">
            <Users className="w-6 h-6 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
          Get Started with Your Team
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Icebreaker games are best played with teams! Set up your team now to get started.
        </p>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-3xl grid gap-8 md:grid-cols-2">
        {/* Create Team Card */}
        <Card className="bg-gradient-to-b from-muted/50 to-muted/30 backdrop-blur-sm border border-muted/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create a Team
            </CardTitle>
            <CardDescription>Start a new team and invite your colleagues</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateTeam} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="teamName">Team Name</label>
                <Input id="teamName" placeholder="Enter team name" required className="bg-background/50" />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600"
              >
                Create Team
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>

              {inviteLink && (
                <div className="mt-4 p-4 rounded-lg bg-muted/30 border border-muted">
                  <label className="text-sm text-muted-foreground">Share this code with your team</label>
                  <div className="flex gap-2 mt-2">
                    <Input value={inviteLink} readOnly className="bg-background/50" />
                    <button
                      onClick={() => navigator.clipboard.writeText(inviteLink)}
                      className="shrink-0"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Join Team Card */}
        <Card className="bg-gradient-to-b from-muted/50 to-muted/30 backdrop-blur-sm border border-muted/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Join a Team
            </CardTitle>
            <CardDescription>Join an existing team using an invite code</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleJoinTeam} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="inviteCode">Invite Code</label>
                <Input id="inviteCode" placeholder="Enter invite code" required className="bg-background/50" />
              </div>
              <button type="submit" className="w-full">
                Join Team
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Help Text */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        Need help? Contact our support team at{" "}
        <a href="mailto:support@icebreakers.app" className="text-primary hover:underline">
          support@icebreakers.app
        </a>
      </div>
    </div>
  )
}

