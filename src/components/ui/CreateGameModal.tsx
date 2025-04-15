"use client";
import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

interface CreateGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamId: string;
}

const CreateGameModal: React.FC<CreateGameModalProps> = ({
  isOpen,
  onClose,
  teamId,
}) => {
  const router = useRouter();

  const [gameName, setGameName] = useState("");
  const [gameType, setGameType] = useState("two-truths-and-a-lie");
  const [playerCount, setPlayerCount] = useState(2); // Number of players instead of time limit

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCreate = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    const creator_id = localStorage.getItem("user_id");
    const creator_username = localStorage.getItem("username");

    if (!creator_id || !creator_username) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    try {
      const isSinglePlayer = gameType === "two-truths-and-a-lie-single"; // Check if the selected game type is Single Player

      const res = await fetch("/api/games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          team_id: teamId,
          game_name: gameName,
          game_type: gameType,
          game_size:
            gameType === "two-truths-and-a-lie" ? playerCount : undefined, // Set player count only for the "2 Truths and A Lie" mode
          is_single_player: isSinglePlayer, // Send is_single_player based on the selected game type
          status: "live",
          creator_username,
          creator_id: Number(creator_id),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || "Failed to create game");
      }

      setSuccess("Game created!");
      setTimeout(() => {
        onClose();
        router.push(`/teams/${teamId}/game/${data.game.id}`);
      }, 1200);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-muted/20 bg-gradient-to-b from-muted/50 to-muted/30 p-6 shadow-xl">
        <h2 className="mb-2 text-2xl font-bold text-foreground">
          Create New Game
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Set up the game session and invite your team.
        </p>

        <label className="mb-1 block text-sm text-muted-foreground">
          Game Name
        </label>
        <input
          type="text"
          placeholder="Game Name"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          className="mb-3 block w-full rounded-md border border-muted/30 bg-muted/30 px-3 py-2 text-sm text-foreground shadow-sm backdrop-blur-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />

        <label className="mb-1 block text-sm text-muted-foreground">
          Game Type
        </label>
        <select
          value={gameType}
          onChange={(e) => setGameType(e.target.value)}
          className="mb-3 block w-full rounded-md border border-muted/30 bg-muted/30 px-3 py-2 text-sm text-foreground shadow-sm backdrop-blur-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="two-truths-and-a-lie">2 Truths and A Lie</option>
          <option value="two-truths-and-a-lie-single">
            2 Truths and A Lie (Single Player)
          </option>
        </select>

        {/* Only show Number of Players input if "2 Truths and A Lie" (not Single Player mode) is selected */}
        {gameType === "two-truths-and-a-lie" && (
          <div className="mb-3 flex-1">
            <label className="mb-1 block text-sm text-muted-foreground">
              Number of Players
            </label>
            <input
              type="number"
              value={playerCount}
              onChange={(e) => setPlayerCount(Number(e.target.value))}
              className="block w-full rounded-md border border-muted/30 bg-muted/30 px-3 py-2 text-sm text-foreground shadow-sm backdrop-blur-sm"
              min={2}
              max={100} // You can adjust the max players as needed
            />
          </div>
        )}

        {error && <p className="mb-2 text-sm text-red-500">{error}</p>}
        {success && <p className="mb-2 text-sm text-green-600">{success}</p>}

        <div className="flex justify-end gap-3">
          <Button
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700"
            onClick={handleCreate}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </Button>
          <button
            onClick={() => {
              setGameName("");
              setError("");
              setSuccess("");
              onClose();
            }}
            className="rounded-lg bg-gray-200 px-4 py-2 text-sm text-gray-800 transition hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGameModal;
