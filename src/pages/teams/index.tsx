"use client";

import { useEffect, useState } from "react";
import { Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal"; // assumes updated modal name
import JoinTeamModal from "@/components/ui/JoinTeamModal";

interface Team {
  id: string;
  name: string;
  description?: string;
  status?: string;
}

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    setLoading(true);
    const fetchTeams = async () => {
      const res = await fetch(`/api/auth/profile?user_id=${username}`);
      const data = await res.json();

      if (res.ok) {
        const enrichedTeams = data.map((team: any) => ({
          id: team.id,
          name: team.team_name,
          description: team.description || "",
          status: "Active", // or use a real field if available
        }));
        setTeams(enrichedTeams);
      } else {
        console.error(data.detail || "Failed to load teams");
      }
      setLoading(false);
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background text-foreground">
        <p className="text-muted-foreground">Loading Teams...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-gradient text-3xl font-bold">Your Teams</h1>
                <p className="mt-1 text-muted-foreground">
                  View and manage the teams you are a part of.
                </p>
              </div>
              <div className="flex flex-row gap-4">
                <Button onClick={() => setIsCreateModalOpen(true)}>
                  Create Team
                </Button>
                <Modal
                  isOpen={isCreateModalOpen}
                  onClose={() => setIsCreateModalOpen(false)}
                />

                <Button onClick={() => setIsJoinModalOpen(true)}>
                  Join Team
                </Button>
                <JoinTeamModal
                  isOpen={isJoinModalOpen}
                  onClose={() => setIsJoinModalOpen(false)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {teams.length === 0 && loading === false && (
                <p className="mt-1 rounded border p-4 text-muted-foreground">
                  You are not part of any teams
                </p>
              )}
              {teams.map((team) => (
                <Link
                  key={team.id}
                  href={`/teams/${team.id}`}
                  className="block transition-transform hover:scale-[1.02]"
                >
                  <div className="h-full rounded-2xl border border-muted/20 bg-gradient-to-b from-muted/50 to-muted/30 p-6 backdrop-blur-sm">
                    <div className="mb-4 flex items-center gap-4">
                      <div className="rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 p-3">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold">{team.name}</h3>
                        {team.description && (
                          <p className="text-sm text-muted-foreground">
                            {team.description}
                          </p>
                        )}
                      </div>
                      <div
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          team.status === "Active"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-blue-500/10 text-blue-500"
                        }`}
                      >
                        {team.status}
                      </div>
                    </div>

                    <div className="flex items-center justify-end">
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
