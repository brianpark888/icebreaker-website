import React, { useState } from "react";

interface CreateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateTeamModal: React.FC<CreateTeamModalProps> = ({ isOpen, onClose }) => {
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  

  const handleCreate = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    const userId = localStorage.getItem("user_id");
    const username = localStorage.getItem("username");


    try {
      const res = await fetch("/api/teams/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          team_name: teamName,
          description: "", // Add description field if needed
          test: true,
          test_user: {
            id: Number(userId),
            username: username,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.detail || "Failed to create team");

      if (res.ok){
      setSuccess("Team created successfully!");
      window.location.href= `teams/${data.team.id}`
      }
      setTimeout(() => {
        setTeamName("");
        setSuccess("");
        onClose();
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-gradient-to-b from-muted/50 to-muted/30 p-6 border border-muted/20 shadow-xl">
        <h2 className="text-2xl font-bold text-foreground mb-2">Create Team</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Start a new team and invite your colleagues.
        </p>

        <label htmlFor="teamName" className="block text-sm font-medium mb-1">
          Team Name
        </label>
        <input
          id="teamName"
          name="teamName"
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          required
          className="mb-4 block w-full rounded-md border border-muted/30 bg-muted/30 px-3 py-2 text-sm text-foreground shadow-sm backdrop-blur-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

        <div className="flex justify-end gap-3">
          <button
            onClick={handleCreate}
            disabled={loading}
            className="rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 text-sm"
          >
            {loading ? "Creating..." : "Create"}
          </button>
          <button
            onClick={() => {
              setTeamName("");
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

export default CreateTeamModal;
