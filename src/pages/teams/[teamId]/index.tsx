"use client";
import {
  Users,
  Trophy,
  Activity,
  ArrowLeft,
  Calendar,
  Clock,
  Play,
  ChartColumnDecreasing,
  Gamepad,
  Gamepad2,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CreateGameModal from "@/components/ui/CreateGameModal";
import InviteMembersModal from "@/components/ui/InviteMembersModal";

export default function TeamPage() {
  const params = useParams();
  const router = useRouter();
  const teamId = params?.teamId as string;

  const [team, setTeam] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [myData, setMyData] = useState<any>(null);
  const [games, setGames] = useState<any[]>([]);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const res = await fetch(`/api/teams/${teamId}`);
        const data = await res.json();

        if (res.ok) {
          setTeam(data.team);
          setMembers(data.members);
          const sortedGames = [...data.games].sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime(),
          );
          setGames(sortedGames);
        } else {
          console.error("Failed to load team", data.detail);
        }
      } catch (err) {
        console.error("Error fetching team:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchProfile = async (username: string) => {
      try {
        const res = await fetch(`/api/user/${username}?teamId=${teamId}`);
        const data = await res.json();
        if (res.ok) {
          setMyData(data.user);
        } else {
          console.error("Failed to load profile", data.detail);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    if (teamId) fetchTeamData();
    if (teamId && localStorage.getItem("username")) {
      fetchProfile(localStorage.getItem("username") as string);
    }
  }, [teamId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading team data...</p>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Team not found</h1>
          <Button onClick={() => router.push("/teams")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Teams
          </Button>
        </div>
      </div>
    );
  }

  const joinGame = async (gameId: string) => {
    const userId = localStorage.getItem("user_id");
    const username = localStorage.getItem("username");

    if (!userId || !username) {
      return alert("You must be logged in to join the game.");
    }

    try {
      const res = await fetch(`/api/games/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          game_session_id: gameId,
          user_id: userId,
          username: username,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("gameSession", gameId);
        router.push(`/teams/${teamId}/game/${gameId}`);
      } else {
        alert(data.detail || "Failed to join the game");
      }
    } catch (err) {
      console.error("Error joining the game:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* <Button
                    className="bg-transparent"
                    onClick={() => router.push("/teams")}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button> */}
                <button
                  onClick={() => router.push("/teams")}
                  className="flex items-center justify-center rounded-lg p-1 transition-colors duration-200 ease-in-out hover:bg-muted/20"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <h1 className="text-gradient text-3xl font-bold">
                  {team.team_name} Dashboard
                </h1>
                <div
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    team.status === "Active"
                      ? "bg-green-500/10 text-green-500"
                      : team.status === "Pending"
                        ? "bg-yellow-500/10 text-yellow-500"
                        : "bg-blue-500/10 text-blue-500"
                  }`}
                >
                  {team.status}
                </div>
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="rounded-full px-6"
                >
                  Create Game
                </Button>
                <CreateGameModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  teamId={teamId}
                />
                <Button onClick={() => setInviteOpen(true)}>
                  Invite Members
                </Button>
                <InviteMembersModal
                  isOpen={inviteOpen}
                  onClose={() => setInviteOpen(false)}
                  teamId={teamId}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-muted/20 bg-gradient-to-b from-muted/50 to-muted/30 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 p-3">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Team Members
                    </p>
                    <p className="text-2xl font-bold">{members?.length}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-muted/20 bg-gradient-to-b from-muted/50 to-muted/30 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 p-3">
                    <Gamepad2 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Games Played
                    </p>
                    <p className="text-2xl font-bold">{games.length}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-muted/20 bg-gradient-to-b from-muted/50 to-muted/30 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 p-3">
                    <ChartColumnDecreasing className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Points
                    </p>
                    <p className="text-2xl font-bold">
                      {members.reduce(
                        (total, member) =>
                          total + (member.leadership_score ?? 0),
                        0,
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-muted/20 bg-gradient-to-b from-muted/50 to-muted/30 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 p-3">
                    <Trophy className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Achievments
                    </p>
                    <p className="text-2xl font-bold">0</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Games + Members */}
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-muted/20 bg-gradient-to-b from-muted/50 to-muted/30 p-6 backdrop-blur-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Live Games</h2>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                    <span className="text-sm text-green-500">
                      {games?.filter((game) => game.status === "live")?.length}{" "}
                      games in progress
                    </span>
                  </div>
                </div>

                {games?.length === 0 ? (
                  <div className="flex flex-col items-center py-8 text-center text-muted-foreground">
                    <p className="text-sm">No games created yet</p>
                    <Button
                      className="mt-4 text-white"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Start a Game
                    </Button>
                  </div>
                ) : (
                  games
                    .filter((game) => game.status === "live")
                    .map((game) => (
                      <div
                        key={game.id}
                        className="mt-2 rounded-xl border border-muted/20 bg-muted/30 p-5 transition hover:bg-muted/90 hover:shadow-md"
                      >
                        <div className="mb-2 flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className="rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 p-2">
                              <Play className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold">
                                {game.game_name}
                              </h3>
                              <p className="text-xs capitalize text-muted-foreground">
                                {game.game_type.replaceAll("_", " ")} game •
                                created by{" "}
                                <span className="font-medium">
                                  {game.creator_username} •{" "}
                                  {game.participants_count}/{game.game_size}{" "}
                                  players
                                </span>
                              </p>
                            </div>
                          </div>
                          <Button
                            className="h-8 rounded-full px-3 text-xs"
                            onClick={() => joinGame(game.id)}
                          >
                            Join
                          </Button>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(game.created_at).toLocaleDateString()}{" "}
                              at{" "}
                              {new Date(game.created_at).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )}
                            </span>
                          </div>
                          <div
                            className={`rounded-full px-2 py-1 text-xs font-medium ${
                              game.status === "live"
                                ? "bg-green-500/10 text-green-500"
                                : game.status === "finished"
                                  ? "bg-gray-500/10 text-gray-500"
                                  : "bg-yellow-500/10 text-yellow-500"
                            }`}
                          >
                            {game.status.replace("_", " ")}
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </div>

              {/* Members */}
              <div className="rounded-2xl border border-muted/20 bg-gradient-to-b from-muted/50 to-muted/30 p-6 backdrop-blur-sm">
                <h2 className="mb-4 text-xl font-semibold">Team Members</h2>
                <div className="space-y-4">
                  {members.map((member, i) => (
                    <div
                      key={i}
                      className="flex cursor-pointer items-center gap-4 rounded-lg bg-muted/30 p-4 transition hover:bg-muted/90"
                      onClick={() => {
                        router.push(
                          `/teams/${teamId}/profile/${member.username}`,
                        );
                      }}
                    >
                      <Image
                        src={member.users.imgUrl}
                        alt={member.username}
                        width={40}
                        height={40}
                        className="rounded-full bg-muted"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{member.username}</p>
                        <p className="text-sm">
                          <span
                            className={`cursor-pointer rounded px-1 transition-all duration-150 ${
                              myData?.links?.some(
                                (obj: {
                                  member_id_2: string;
                                  two_truths_and_a_lie_correct: boolean | null;
                                }) =>
                                  obj.member_id_2 === member.id &&
                                  obj.two_truths_and_a_lie_correct !== null,
                              )
                                ? /* answered → show normally */
                                  "text-muted-foreground"
                                : /* not answered → spoiler */
                                  "bg-muted-foreground text-transparent hover:text-muted-foreground focus:text-muted-foreground"
                            }`}
                          >
                            {member.role}
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span className="font-semibold">
                          {member.leadership_score ?? 0}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
