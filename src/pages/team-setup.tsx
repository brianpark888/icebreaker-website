"use client";

import { useState } from "react";
import { Plus, UserPlus } from "lucide-react";
import Button from "@/components/ui/Button";

export default function TeamSetup() {
  const [teamName, setTeamName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [succes, setSuccess] = useState("");

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    const user_id = localStorage.getItem("user_id");
    const username= localStorage.getItem("username");
  

    const res = await fetch("/api/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        team_name: teamName,
        description: "My awesome team",
        test: true,
        test_user: {
          id: Number(user_id),
          username: username
        },
      }),
    });

    const data = await res.json();

    if (res.ok) {
      window.location.href = `/teams/${data.team.id}`;
    } else {
      alert(data.detail || "Failed to create team");
    }
  };
  const handleJoinTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
  
    const user_id = localStorage.getItem("user_id");
    const username = localStorage.getItem("username");
  
    if (!user_id || !username) {
      setError("User not logged in");
      setLoading(false);
      return;
    }
  
    try {
      const res = await fetch(`/api/teams/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          team_id: inviteCode,
          test: true,
          test_user: {
            id: Number(user_id),
            username,
          },
        }),
      });
  
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || "Failed to join team");
      }
  
      if (data.team_id) {
        window.location.href = `/teams/${data.team_id}`;
      }
  
      setTimeout(() => {
        setSuccess("");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col gap-10 h-screen bg-background p-8 items-center justify-center">
      <div className="flex h-16 items-center gap-2 px-6 border-b border-muted/20">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
        <span className="font-semibold">Icebreakers</span>
      </div>

      <h1 className="text-4xl font-bold">Team Setup</h1>
      <div className="max-w-3xl w-full grid gap-8 md:grid-cols-2">
        {/* Create Team Card */}
        <div className="p-6 rounded-2xl bg-muted/10 backdrop-blur-md border border-muted/20 shadow-lg">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Plus className="w-5 h-5" /> Create a Team
          </h2>
          <p className="text-muted-foreground mb-4">Start a new team and invite your colleagues</p>
          <form onSubmit={handleCreateTeam} className="space-y-4">
            <div>
              <label htmlFor="teamName" className="block text-sm font-medium">Team Name</label>
              <input
                id="teamName"
                placeholder="Enter team name"
                required
                className="w-full p-2 border rounded bg-background"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>
            <Button type="submit">Create Team</Button>
          </form>
        </div>

        {/* Join Team Card */}
        <div className="p-6 rounded-2xl bg-muted/10 backdrop-blur-md border hover:bg-muted/5">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <UserPlus className="w-5 h-5" /> Join a Team
          </h2>
          <p className="text-muted-foreground mb-4">Join an existing team using an invite code</p>
          <form onSubmit={handleJoinTeam} className="space-y-4">
            <div>
              <label htmlFor="inviteCode" className="block text-sm font-medium">Invite Code</label>
              <input
                id="inviteCode"
                placeholder="Enter invite code"
                required
                className="w-full p-2 border rounded bg-background"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
              />
            </div>
            <Button type="submit">Join Team</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
