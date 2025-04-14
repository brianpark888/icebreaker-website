import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { team_id } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ detail: "Method Not Allowed" });
  }

  if (!team_id || typeof team_id !== "string") {
    return res.status(400).json({ detail: "Invalid team_id" });
  }

  try {
    // 1. Get team info
    const { data: team, error: teamError } = await supabase
      .from("teams")
      .select("*")
      .eq("id", team_id)
      .single();

    if (teamError || !team) {
      return res.status(404).json({ detail: "Team not found" });
    }

    // 2. Get team members
    const { data: members, error: memberError } = await supabase
      .from("team_members")
      .select("id, user_id, username, joined_at, role, leadership_score")
      .eq("team_id", team_id);

    if (memberError) throw memberError;

    // 3. Get games linked to the team
    const { data: games, error: gameError } = await supabase
      .from("game_sessions")
      .select("id, game_name, game_type, game_settings, status, creator_username, created_at")
      .eq("team_id", team_id);

    if (gameError) throw gameError;

    return res.status(200).json({ team, members, games });
  } catch (err: any) {
    return res.status(500).json({ detail: err.message || "Unexpected server error" });
  }
}
