"use client"

import React, { useState } from "react"
import Button from "@/components/ui/Button"
import { useRouter } from "next/navigation"

interface CreateGameModalProps {
  isOpen: boolean
  onClose: () => void
  teamId: string
}

const CreateGameModal: React.FC<CreateGameModalProps> = ({ isOpen, onClose, teamId }) => {
  const router = useRouter()

  const [gameName, setGameName] = useState("")
  const [gameType, setGameType] = useState("icebreaker")
  const [rounds, setRounds] = useState(3)
  const [timeLimit, setTimeLimit] = useState(60)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleCreate = async () => {
    setLoading(true)
    setError("")
    setSuccess("")

    const creator_id = localStorage.getItem("user_id")
    const creator_username = localStorage.getItem("username")

    if (!creator_id || !creator_username) {
      setError("User not logged in")
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          team_id: teamId,
          game_name: gameName,
          game_type: gameType,
          game_settings: {
            rounds,
            time_limit: timeLimit,
          },
          status: "live",
          creator_username,
          creator_id: Number(creator_id),
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.detail || "Failed to create game")
      }

      setSuccess("Game created!")
      setTimeout(() => {
        onClose()
        router.push(`/teams/${teamId}/game/${data.game.id}`)
      }, 1200)
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-gradient-to-b from-muted/50 to-muted/30 p-6 border border-muted/20 shadow-xl">
        <h2 className="text-2xl font-bold text-foreground mb-2">Create New Game</h2>
        <p className="text-muted-foreground text-sm mb-4">
          Set up the game session and invite your team.
        </p>

        <input
          type="text"
          placeholder="Game Name"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          className="mb-3 block w-full rounded-md border border-muted/30 bg-muted/30 px-3 py-2 text-sm text-foreground shadow-sm backdrop-blur-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />

        <select
          value={gameType}
          onChange={(e) => setGameType(e.target.value)}
          className="mb-3 block w-full rounded-md border border-muted/30 bg-muted/30 px-3 py-2 text-sm text-foreground shadow-sm backdrop-blur-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="icebreaker">Icebreaker</option>
          <option value="trivia">Trivia</option>
          <option value="escape">Escape Room</option>
        </select>

        <div className="flex gap-4 mb-3">
          <div className="flex-1">
            <label className="text-sm text-muted-foreground mb-1 block">Rounds</label>
            <input
              type="number"
              value={rounds}
              onChange={(e) => setRounds(Number(e.target.value))}
              className="block w-full rounded-md border border-muted/30 bg-muted/30 px-3 py-2 text-sm text-foreground shadow-sm backdrop-blur-sm"
              min={1}
              max={10}
            />
          </div>
          <div className="flex-1">
            <label className="text-sm text-muted-foreground mb-1 block">Time Limit (sec)</label>
            <input
              type="number"
              value={timeLimit}
              onChange={(e) => setTimeLimit(Number(e.target.value))}
              className="block w-full rounded-md border border-muted/30 bg-muted/30 px-3 py-2 text-sm text-foreground shadow-sm backdrop-blur-sm"
              min={10}
              max={300}
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

        <div className="flex justify-end gap-3">
          <Button className="rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 text-sm" onClick={handleCreate} disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </Button>
          <button
            onClick={() => {
              setGameName("")
              setError("")
              setSuccess("")
              onClose()
            }}
            className="rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition px-4 py-2 text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateGameModal
