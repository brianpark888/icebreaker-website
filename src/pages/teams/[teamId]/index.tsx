"use client"
import {
  Users,
  Trophy,
  Activity,
  ArrowLeft,
  Calendar,
  MessageCircle,
  Clock,
  Play,
  BarChart,
  Target,
  Bell,
  Award,
} from "lucide-react"
import Button from "@/components/ui/Button"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"

export default function TeamPage() {
  const params = useParams()
  const router = useRouter()
  const teamId = params.teamId as string

  // Find the team from our mock data
  const team = teams.find((t) => t.id === teamId)

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

  async function joinGame(gameId: string) {
    localStorage.setItem("gameSession", gameId)
    await router.push(`/teams/${params.teamId}/game/ASDASD`)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="grid gap-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="rounded-full" onClick={() => router.push("/teams")}>
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
                <Button className="px-6 rounded-full">Create New Game</Button>
                <Button variant="outline" className="px-6 rounded-full">
                  Invite Members
                </Button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-muted/50 to-muted/30 backdrop-blur-sm border border-muted/20">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Team Members</p>
                    <p className="text-2xl font-bold">{team.members.length}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-b from-muted/50 to-muted/30 backdrop-blur-sm border border-muted/20">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500">
                    <Trophy className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Games Played</p>
                    <p className="text-2xl font-bold">{Math.floor(Math.random() * 20) + 5}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-b from-muted/50 to-muted/30 backdrop-blur-sm border border-muted/20">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500">
                    <Activity className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Players</p>
                    <p className="text-2xl font-bold">{Math.floor(Math.random() * 10) + 3}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-b from-muted/50 to-muted/30 backdrop-blur-sm border border-muted/20">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500">
                    <Trophy className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Points</p>
                    <p className="text-2xl font-bold">{Math.floor(Math.random() * 1000) + 500}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Games Section */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-muted/50 to-muted/30 backdrop-blur-sm border border-muted/20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Live Games</h2>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-sm text-green-500">2 games in progress</span>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {liveGames.map((game) => (
                  <div
                    key={game.id}
                    className="p-4 rounded-xl bg-muted/30 border border-muted/20 hover:border-primary/20 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500">
                          <Play className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium">{game.name}</h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>Started {game.startedAgo}</span>
                          </div>
                        </div>
                      </div>
                      <Button className="px-4 py-1 h-8 rounded-full text-xs" onClick={() => joinGame(game.id)}>
                        Join Now
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {game.participants.map((participant, index) => (
                          <div key={index} className="w-6 h-6 rounded-full border-2 border-background overflow-hidden">
                            <Image
                              src={`/placeholder.svg?height=24&width=24&text=${participant.charAt(0)}`}
                              alt={participant}
                              width={24}
                              height={24}
                              className="bg-muted"
                            />
                          </div>
                        ))}
                        {game.participants.length > 4 && (
                          <div className="w-6 h-6 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs">
                            +{game.participants.length - 4}
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{game.participants.length} participants</span>
                    </div>
                  </div>
                ))}
              </div>

              {liveGames.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No live games at the moment</p>
                  <Button className="mt-4">Start a Game</Button>
                </div>
              )}
            </div>

            {/* Upcoming Games */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-muted/50 to-muted/30 backdrop-blur-sm border border-muted/20">
              <h2 className="text-xl font-semibold mb-4">Upcoming Games</h2>
              <div className="space-y-4">
                {upcomingGames.map((game, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500">
                        <Calendar className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{game.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {game.date} • {game.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">{game.participants} participants</span>
                      <Button variant="outline" className="px-4 py-1 h-8 rounded-full text-xs">
                        RSVP
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Team Members Panel */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-muted/50 to-muted/30 backdrop-blur-sm border border-muted/20">
                <h2 className="text-xl font-semibold mb-4">Team Members</h2>
                <div className="space-y-4">
                  {team.members.map((member, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-muted/30">
                      <div className="flex-shrink-0">
                        <Image
                          src={`/placeholder.svg?height=40&width=40&text=${member.name.charAt(0)}`}
                          alt={member.name}
                          width={40}
                          height={40}
                          className="rounded-full bg-muted"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span className="font-semibold">{Math.floor(Math.random() * 500) + 100}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity Panel */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-muted/50 to-muted/30 backdrop-blur-sm border border-muted/20">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-muted/30">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500">{activity.icon}</div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Team Performance */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-muted/50 to-muted/30 backdrop-blur-sm border border-muted/20">
              <h2 className="text-xl font-semibold mb-4">Team Performance</h2>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="p-4 rounded-xl bg-muted/30">
                  <div className="flex items-center gap-3 mb-3">
                    <BarChart className="h-5 w-5 text-blue-500" />
                    <h3 className="font-medium">Engagement Score</h3>
                  </div>
                  <p className="text-3xl font-bold mb-1">92%</p>
                  <p className="text-xs text-green-500">↑ 5% from last month</p>
                </div>

                <div className="p-4 rounded-xl bg-muted/30">
                  <div className="flex items-center gap-3 mb-3">
                    <Target className="h-5 w-5 text-violet-500" />
                    <h3 className="font-medium">Team Goals</h3>
                  </div>
                  <p className="text-3xl font-bold mb-1">3/5</p>
                  <p className="text-xs text-muted-foreground">2 goals remaining</p>
                </div>

                <div className="p-4 rounded-xl bg-muted/30">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="h-5 w-5 text-yellow-500" />
                    <h3 className="font-medium">Achievements</h3>
                  </div>
                  <p className="text-3xl font-bold mb-1">12</p>
                  <p className="text-xs text-green-500">New badge unlocked!</p>
                </div>
              </div>
            </div>

            {/* Team Chat */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-muted/50 to-muted/30 backdrop-blur-sm border border-muted/20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Team Chat</h2>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
              <div className="bg-muted/30 rounded-xl p-4 h-[200px] flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Team chat will appear here</p>
                  <Button className="mt-4">Start Conversation</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

const teams = [
  {
    id: "1",
    name: "Icebreakers",
    status: "Active",
    members: [
      { id: "user-1", name: "Sarah Johnson", role: "Product Manager" },
      { id: "user-2", name: "Michael Chen", role: "Software Engineer" },
      { id: "user-3", name: "Emma Wilson", role: "UI Designer" },
      { id: "user-4", name: "James Brown", role: "Marketing Lead" },
      { id: "user-5", name: "Alex Rodriguez", role: "QA Engineer" },
    ],
  },
]

const liveGames = [
  {
    id: "game-1",
    name: "Two Truths and a Lie",
    startedAgo: "15 minutes ago",
    participants: ["Sarah Johnson", "Michael Chen", "Emma Wilson", "James Brown", "Alex Rodriguez"],
  },
  {
    id: "game-2",
    name: "Virtual Scavenger Hunt",
    startedAgo: "5 minutes ago",
    participants: ["Sarah Johnson", "Michael Chen", "Emma Wilson"],
  },
]

const upcomingGames = [
  {
    name: "Team Trivia Challenge",
    date: "Tomorrow",
    time: "3:00 PM",
    participants: 8,
  },
  {
    name: "Virtual Escape Room",
    date: "Friday, Mar 8",
    time: "2:00 PM",
    participants: 12,
  },
  {
    name: "Word Association Game",
    date: "Monday, Mar 11",
    time: "10:00 AM",
    participants: 6,
  },
]

const activities = [
  {
    title: "Team Building Game Completed",
    time: "2 hours ago",
    icon: <Trophy className="h-4 w-4 text-white" />,
  },
  {
    title: "New Team Member Joined",
    time: "5 hours ago",
    icon: <Users className="h-4 w-4 text-white" />,
  },
  {
    title: "Achievement Unlocked",
    time: "1 day ago",
    icon: <Trophy className="h-4 w-4 text-white" />,
  },
  {
    title: "Game Session Scheduled",
    time: "2 days ago",
    icon: <Calendar className="h-4 w-4 text-white" />,
  },
]

