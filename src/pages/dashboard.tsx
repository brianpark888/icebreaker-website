'use client'

import { useState } from "react"
import { Users, Trophy, Activity, Settings, Home, Calendar } from 'lucide-react'
import Link from "next/link"
import Button from "@/components/ui/Button"
import { useRouter } from 'next/router'

export default function Dashboard() {
  const [activePage, setActivePage] = useState("dashboard")
  const router = useRouter()

  function joinGame(){
    localStorage.setItem('gameSession','12345')
    await router.push('/game')  
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-muted/20 bg-muted/5 backdrop-blur-sm">
        <div className="flex h-16 items-center gap-2 px-6 border-b border-muted/20">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
          <span className="font-semibold">Icebreakers</span>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                activePage === item.name
                  ? "bg-gradient-to-r from-blue-500/10 to-violet-500/10 text-primary"
                  : "hover:bg-muted/50 text-muted-foreground"
              }`}
              onClick={() => setActivePage(item.name)}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="grid gap-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gradient">Team Dashboard for Icebreakers</h1>
              <Link href="/game">
                <Button className="px-6 rounded-full" onClick={() => joinGame()}>
                  Join Game
                </Button>
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-gradient-to-b from-muted/50 to-muted/30 backdrop-blur-sm border border-muted/20"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500">
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Leaderboard */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Left Panel */}
              {/* <div className="p-6 rounded-2xl bg-gradient-to-b from-muted/50 to-muted/30 backdrop-blur-sm border border-muted/20">
                <h2 className="text-xl font-semibold mb-4">Team Leaderboard</h2>
                <div className="space-y-4">
                  {leaderboard.map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-lg bg-muted/30"
                    >
                      <div className="flex-shrink-0">
                        <Image
                          src={member.avatar || "/placeholder.svg"}
                          alt={member.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span className="font-semibold">{member.points}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}

              {/* Recent Activity- Right Panel */}
                {/* <div className="p-6 rounded-2xl bg-gradient-to-b from-muted/50 to-muted/30 backdrop-blur-sm border border-muted/20">
                  <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    {activities.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 rounded-lg bg-muted/30"
                      >
                        <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500">
                          {activity.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div> */}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

const navItems = [
  {
    name: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: <Home className="h-5 w-5" />,
  },
  {
    name: "team",
    label: "Team",
    href: "/dashboard/team",
    icon: <Users className="h-5 w-5" />,
  },
  {
    name: "games",
    label: "Games",
    href: "/dashboard/games",
    icon: <Trophy className="h-5 w-5" />,
  },
  {
    name: "calendar",
    label: "Calendar",
    href: "/dashboard/calendar",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    name: "settings",
    label: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="h-5 w-5" />,
  },
]

const stats = [
  {
    label: "Team Members",
    value: "12",
    icon: <Users className="h-5 w-5 text-white" />,
  },
  {
    label: "Games Played",
    value: "24",
    icon: <Trophy className="h-5 w-5 text-white" />,
  },
  {
    label: "Active Players",
    value: "8",
    icon: <Activity className="h-5 w-5 text-white" />,
  },
  {
    label: "Total Points",
    value: "1,234",
    icon: <Trophy className="h-5 w-5 text-white" />,
  },
]

// const leaderboard = [
//   {
//     name: "Sarah Johnson",
//     role: "Product Manager",
//     points: 850,
//     avatar: "/placeholder.svg?height=40&width=40",
//   },
//   {
//     name: "Michael Chen",
//     role: "Software Engineer",
//     points: 720,
//     avatar: "/placeholder.svg?height=40&width=40",
//   },
//   {
//     name: "Emma Wilson",
//     role: "UI Designer",
//     points: 690,
//     avatar: "/placeholder.svg?height=40&width=40",
//   },
//   {
//     name: "James Brown",
//     role: "Marketing Lead",
//     points: 645,
//     avatar: "/placeholder.svg?height=40&width=40",
//   },
// ]

// const activities = [
//   {
//     title: "Team Building Game Completed",
//     time: "2 hours ago",
//     icon: <Trophy className="h-4 w-4 text-white" />,
//   },
//   {
//     title: "New Team Member Joined",
//     time: "5 hours ago",
//     icon: <Users className="h-4 w-4 text-white" />,
//   },
//   {
//     title: "Achievement Unlocked",
//     time: "1 day ago",
//     icon: <Trophy className="h-4 w-4 text-white" />,
//   },
//   {
//     title: "Game Session Scheduled",
//     time: "2 days ago",
//     icon: <Calendar className="h-4 w-4 text-white" />,
//   },
// ]
