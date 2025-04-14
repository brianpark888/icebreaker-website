import React, { useState } from "react";

interface JoinTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const JoinTeamModal: React.FC<JoinTeamModalProps> = ({ isOpen, onClose }) => {
  const [teamId, setTeamId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleJoin = async () => {
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
      const res = await fetch("/api/teams/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          team_id: teamId, // ✅ send in body, not as query param
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
  
      setSuccess("Successfully joined the team!");
      if (res.ok){
        window.location.href = `teams/${data.team_id}`
      }
      setTimeout(() => {
        setSuccess("");
        setTeamId("");
        onClose();
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-gradient-to-b from-muted/50 to-muted/30 p-6 border border-muted/20 shadow-xl">
        <h2 className="text-2xl font-bold text-foreground mb-2">Join Team</h2>
        <p className="text-muted-foreground text-sm mb-4">
          Enter the team code (UUID) to join.
        </p>

        <input
          type="text"
          placeholder="e.g. 8a58d0f3-4b61-4fbc-bd4e-c24bde54e9d7"
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
          className="mb-4 block w-full rounded-md border border-muted/30 bg-muted/30 px-3 py-2 text-sm text-foreground shadow-sm backdrop-blur-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

        <div className="flex justify-end gap-3">
          <button
            onClick={handleJoin}
            disabled={loading}
            className="rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 text-sm"
          >
            {loading ? "Joining..." : "Join"}
          </button>
          <button
            onClick={() => {
              setTeamId("");
              setError("");
              setSuccess("");
              onClose();
            }}
            className="rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 transition px-4 py-2 text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinTeamModal;
