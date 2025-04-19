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
    const username = localStorage.getItem("username");

    const res = await fetch("/api/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        team_name: teamName,
        test: true,
        test_user: {
          id: Number(user_id),
          username: username,
        },
      }),
    });

    const data = await res.json();

    if (res.ok) {
      window.location.href = `/teams/${data.team.id}/join-setup`;
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
        window.location.href = `/teams/${data.team_id}/join-setup`;
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
    <div className="flex h-screen flex-col items-center justify-center gap-10 bg-background p-8">
      <div className="flex h-16 items-center gap-2 border-b border-muted/20 px-6">
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
        <span className="font-semibold">Icebreakers</span>
      </div>

      <h1 className="text-4xl font-bold">Team Setup</h1>
      <div className="grid w-full max-w-3xl gap-8 md:grid-cols-2">
        {/* Create Team Card */}
        <div className="rounded-2xl border bg-muted/10 p-6 shadow-lg backdrop-blur-md">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <Plus className="h-5 w-5" /> Create a Team
          </h2>
          <p className="mb-4 text-muted-foreground">
            Start a new team and invite your colleagues
          </p>
          <form onSubmit={handleCreateTeam} className="space-y-4">
            <div>
              <label htmlFor="teamName" className="block text-sm font-medium">
                Team Name
              </label>
              <input
                id="teamName"
                placeholder="Enter team name"
                required
                className="w-full rounded border bg-background p-2"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>
            <Button type="submit">Create Team</Button>
          </form>
        </div>

        {/* Join Team Card */}
        <div className="rounded-2xl border bg-muted/10 p-6 backdrop-blur-md hover:bg-muted/5">
          <h2 className="flex items-center gap-2 text-xl font-semibold">
            <UserPlus className="h-5 w-5" /> Join a Team
          </h2>
          <p className="mb-4 text-muted-foreground">
            Join an existing team using an invite code
          </p>
          <form onSubmit={handleJoinTeam} className="space-y-4">
            <div>
              <label htmlFor="inviteCode" className="block text-sm font-medium">
                Invite Code
              </label>
              <input
                id="inviteCode"
                placeholder="Enter invite code"
                required
                className="w-full rounded border bg-background p-2"
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
