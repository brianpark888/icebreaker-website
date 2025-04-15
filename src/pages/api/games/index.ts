import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ detail: "Method Not Allowed" });
  }

  const {
    team_id,
    game_name,
    game_type,
    game_size,
    status = "live",
    creator_username,
    creator_id,
  } = req.body;

  if (
    !team_id ||
    !game_name ||
    !game_type ||
    !creator_username ||
    !creator_id
  ) {
    return res.status(400).json({ detail: "Missing required fields" });
  }

  try {
    // 1. Insert new game session
    const { data: game, error: gameError } = await supabase
      .from("game_sessions")
      .insert([
        {
          team_id,
          game_name,
          game_type,
          game_size,
          status,
          creator_username,
          creator_id,
        },
      ])
      .select()
      .single();

    if (gameError || !game) throw gameError;

    // 2. Add creator to game_participants
    const { error: participantError } = await supabase
      .from("game_participants")
      .insert([
        {
          game_session_id: game.id,
          user_id: creator_id,
          username: creator_username,
          role: "host",
        },
      ]);

    if (participantError) {
      console.error(
        "Game created but failed to add creator as participant:",
        participantError.message,
      );
      // Optionally return 207 Partial Success here
    }

    return res.status(201).json({ game });
  } catch (err: any) {
    return res
      .status(500)
      .json({ detail: err.message || "Unexpected server error" });
  }
}
