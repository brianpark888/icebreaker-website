'use client'

import { Users, ArrowRight } from 'lucide-react'
import Link from "next/link"
import Button from "@/components/ui/Button"
import Image from "next/image"

export default function TeamsPage() {

  return (
    <div className="flex h-screen bg-background">
      

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="grid gap-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gradient">Your Teams</h1>
                <p className="text-muted-foreground mt-1">View and manage the teams you are a part of.</p>
              </div>
              <Link href="/team-setup" className="px-6 rounded-full">
                <Button>
                    Create Team
                </Button>
              </Link>
            </div>

            {/* Teams Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {teams.map((team) => (
                <Link 
                  href={`/teams/${team.id}`} 
                  key={team.id}
                  className="block transition-transform hover:scale-[1.02]"
                >
                  <div className="h-full p-6 rounded-2xl bg-gradient-to-b from-muted/50 to-muted/30 backdrop-blur-sm border border-muted/20">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{team.name}</h3>
                        <p className="text-sm text-muted-foreground">{team.members.length} members</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        team.status === 'Active' 
                          ? 'bg-green-500/10 text-green-500' 
                          : team.status === 'Pending' 
                            ? 'bg-yellow-500/10 text-yellow-500'
                            : 'bg-blue-500/10 text-blue-500'
                      }`}>
                        {team.status}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {team.members.slice(0, 3).map((member, index) => (
                          <div key={index} className="w-8 h-8 rounded-full border-2 border-background overflow-hidden">
                            <Image
                              src={`/placeholder.svg?height=32&width=32&text=${member.name.charAt(0)}`}
                              alt={member.name}
                              width={32}
                              height={32}
                              className="bg-muted"
                            />
                          </div>
                        ))}
                        {team.members.length > 3 && (
                          <div className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs">
                            +{team.members.length - 3}
                          </div>
                        )}
                      </div>
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
  )
}


const teams = [
  {
    id: 1,
    name: "Icebreakers",
    status: "Active",
    members: [
      { id: "user-1", name: "Sarah Johnson", role: "Product Manager" },
      { id: "user-2", name: "Michael Chen", role: "Software Engineer" },
      { id: "user-3", name: "Emma Wilson", role: "UI Designer" },
      { id: "user-4", name: "James Brown", role: "Marketing Lead" },
      { id: "user-5", name: "Alex Rodriguez", role: "QA Engineer" },
    ]
  },
//   {
//     id: "team-2",
//     name: "Marketing",
//     description: "Team responsible for brand awareness, customer acquisition, and growth strategies.",
//     status: "Active",
//     members: [
//       { id: "user-4", name: "James Brown", role: "Marketing Lead" },
//       { id: "user-6", name: "Lisa Wang", role: "Content Strategist" },
//       { id: "user-7", name: "David Kim", role: "Social Media Manager" },
//     ]
//   },
//   {
//     id: "team-3",
//     name: "Customer Success",
//     description: "Focused on ensuring customers achieve their desired outcomes while using our product.",
//     status: "Active",
//     members: [
//       { id: "user-8", name: "Rachel Green", role: "Customer Success Manager" },
//       { id: "user-9", name: "Tom Wilson", role: "Support Specialist" },
//       { id: "user-10", name: "Sophia Martinez", role: "Account Manager" },
//     ]
//   },
//   {
//     id: "team-4",
//     name: "Research & Innovation",
//     description: "Exploring new technologies and approaches to keep our product ahead of the curve.",
//     status: "Pending",
//     members: [
//       { id: "user-2", name: "Michael Chen", role: "Software Engineer" },
//       { id: "user-11", name: "Olivia Johnson", role: "Research Lead" },
//       { id: "user-12", name: "Ethan Williams", role: "Data Scientist" },
//     ]
//   },
//   {
//     id: "team-5",
//     name: "Operations",
//     description: "Ensuring smooth day-to-day functioning of all business processes and systems.",
//     status: "Invited",
//     members: [
//       { id: "user-13", name: "Daniel Lee", role: "Operations Manager" },
//       { id: "user-14", name: "Ava Thompson", role: "Business Analyst" },
//       { id: "user-15", name: "Noah Garcia", role: "Systems Administrator" },
//     ]
//   },
]
