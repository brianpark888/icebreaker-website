"use client"
import {
  Users,
  Trophy,
  Activity,
  ArrowLeft,
  Calendar,
  Clock,
  Play,
} from "lucide-react"
import Button from "@/components/ui/Button"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import CreateGameModal from "@/components/ui/CreateGameModal"
import InviteMembersModal from "@/components/ui/InviteMembersModal"


export default function TeamPage() {
  const params = useParams()
  const router = useRouter()
  const teamId = params?.teamId as string

  const [team, setTeam] = useState<any>(null)
  const [members, setMembers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inviteOpen, setInviteOpen] = useState(false)
  const [games, setGames] = useState<any[]>([])



  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const res = await fetch(`/api/teams/${teamId}`)
        const data = await res.json()

        if (res.ok) {
          setTeam(data.team)
          setMembers(data.members)
          const sortedGames = [...data.games].sort(
            (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          )
          setGames(sortedGames)
        } else {
          console.error("Failed to load team", data.detail)
        }
      } catch (err) {
        console.error("Error fetching team:", err)
      } finally {
        setLoading(false)
      }
    }

    if (teamId) fetchTeamData()
  }, [teamId])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading team data...</p>
      </div>
    )
  }

  if (!team) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Team not found</h1>
          <Button onClick={() => router.push("/teams")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Teams
          </Button>
        </div>
      </div>
    )
  }

  function joinGame(gameId: string) {
    localStorage.setItem("gameSession", gameId)
    router.push(`/teams/${teamId}/game/${gameId}`)
  }

  // Mock liveGames until wired to backend
  const liveGames = [
    {
      id: "game-1",
      name: "Two Truths and a Lie",
      startedAgo: "15 minutes ago",
      participants: members.map(m => m.username).slice(0, 5),
    },
    {
      id: "game-2",
      name: "Virtual Scavenger Hunt",
      startedAgo: "5 minutes ago",
      participants: members.map(m => m.username).slice(0, 3),
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="grid gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button className="bg-transparent" onClick={() => router.push("/teams")}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-3xl font-bold text-gradient">Team Dashboard for {team.name}</h1>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
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
                <Button onClick={() => setIsModalOpen(true)} className="px-6 rounded-full">Create New Game</Button>
                {<CreateGameModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  teamId={teamId}
                />}
                <Button onClick={() => setInviteOpen(true)}>Invite Members</Button>
                <InviteMembersModal isOpen={inviteOpen} onClose={() => setInviteOpen(false)} teamId={teamId} />
              </div>
            </div>

            {/* Stats */}
            {/* <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard icon={<Users className="h-5 w-5 text-white" />} label="Team Members" value={members.length} />
              <StatCard icon={<Trophy className="h-5 w-5 text-white" />} label="Games Played" value={Math.floor(Math.random() * 20) + 5} />
              <StatCard icon={<Activity className="h-5 w-5 text-white" />} label="Active Players" value={Math.floor(Math.random() * 10) + 3} />
              <StatCard icon={<Trophy className="h-5 w-5 text-white" />} label="Total Points" value={Math.floor(Math.random() * 1000) + 500} />
            </div> */}

            {/* Games + Members */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Live Games */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-muted/50 to-muted/30 border border-muted/20 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Live Games</h2>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm text-green-500">{liveGames.length} games in progress</span>
                  </div>
                </div>

                {games.length === 0 ? (
    <div className="text-center py-8 text-muted-foreground">
      <p className="text-sm">No games created yet</p>
      <Button className="mt-4" onClick={() => setIsModalOpen(true)}>
        Start a Game
      </Button>
    </div>
  ) : (
    games.map((game) => (
      <div
        key={game.id}
        className="p-5 rounded-xl bg-muted/30 border border-muted/20 hover:shadow-md transition"
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500">
              <Play className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{game.game_name}</h3>
              <p className="text-xs text-muted-foreground capitalize">
                {game.game_type.replaceAll("_", " ")} game • created by <span className="font-medium">{game.creator_username}</span>
              </p>
            </div>
          </div>
          <Button
            className="h-8 rounded-full text-xs px-3"
            onClick={() => joinGame(game.id)}
          >
            Join Game
          </Button>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{new Date(game.created_at).toLocaleDateString()} at {new Date(game.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div
            className={`text-xs px-2 py-1 rounded-full font-medium ${
              game.status === "in_progress"
                ? "bg-green-500/10 text-green-500"
                : game.status === "completed"
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
              <div className="p-6 rounded-2xl bg-gradient-to-b from-muted/50 to-muted/30 border border-muted/20 backdrop-blur-sm">
                <h2 className="text-xl font-semibold mb-4">Team Members</h2>
                <div className="space-y-4">
                  {members.map((member, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-muted/30">
                      <Image
                        src={`/placeholder.svg?height=40&width=40&text=${member.username?.charAt(0) || "U"}`}
                        alt={member.username}
                        width={40}
                        height={40}
                        className="rounded-full bg-muted"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{member.username}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span className="font-semibold">{member.leadership_score ?? 0}</span>
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
  )
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: number }) {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-b from-muted/50 to-muted/30 border border-muted/20 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500">
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  )
}
