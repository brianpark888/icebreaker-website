"use client"

import { useState } from "react"
import { Plus, UserPlus } from "lucide-react"
import Button from "@/components/ui/Button"

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
    <div className="flex flex-col gap-10 h-screen bg-background p-8 items-center justify-center">
      
      <div className="flex h-16 items-center gap-2 px-6 border-b border-muted/20">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
        <span className="font-semibold">Icebreakers</span>
      </div>
      
      <h1 className="text-4xl font-bold">Team Setup</h1>
      <div className="max-w-3xl w-full grid gap-8 md:grid-cols-2">
        {/* Create Team Card */}
        <div className="p-6 rounded-2xl bg-muted/10 backdrop-blur-md border border-muted/20 shadow-lg border border-muted"> 
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Plus className="w-5 h-5" /> Create a Team
          </h2>
          <p className="text-muted-foreground mb-4">Start a new team and invite your colleagues</p>
          <form onSubmit={handleCreateTeam} className="space-y-4">
            <div>
              <label htmlFor="teamName" className="block text-sm font-medium">Team Name</label>
              <input id="teamName" placeholder="Enter team name" required className="w-full p-2 border rounded bg-background" />
            </div>
            <Button type="submit">
              Create Team
            </Button>
            {inviteLink && (
              <div className="mt-4 p-4 rounded-lg bg-muted/30 border border-muted">
                <label className="text-sm text-muted-foreground">Share this code with your team</label>
                <div className="flex gap-2 mt-2">
                  <input value={inviteLink} readOnly className="flex-1 p-2 border rounded bg-background" />
                  <Button onClick={() => navigator.clipboard.writeText(inviteLink)} className="px-3 py-1 bg-gray-200 rounded">Copy</Button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Join Team Card */}
        <div className="p-6 rounded-2xl bg-muted/10 backdrop-blur-md border border border-muted hover:bg-muted/5">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <UserPlus className="w-5 h-5" /> Join a Team
          </h2>
          <p className="text-muted-foreground mb-4">Join an existing team using an invite code</p>
          <form onSubmit={handleJoinTeam} className="space-y-4">
            <div>
              <label htmlFor="inviteCode" className="block text-sm font-medium">Invite Code</label>
              <input id="inviteCode" placeholder="Enter invite code" required className="w-full p-2 border rounded bg-background" />
            </div>
            <Button type="submit">
              Join Team
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
