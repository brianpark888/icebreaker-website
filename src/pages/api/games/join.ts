import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ detail: "Method Not Allowed" });
  }

  const { game_session_id, user_id, username, role = "player" } = req.body;

  if (!game_session_id || !user_id || !username) {
    return res.status(400).json({ detail: "Missing required fields" });
  }

  try {
    // 1. Get the game session from the database
    const { data: gameSession, error: gameSessionError } = await supabase
      .from("game_sessions")
      .select("*")
      .eq("id", game_session_id)
      .single();

    if (gameSessionError || !gameSession) {
      return res.status(404).json({ detail: "Game session not found" });
    }

    // 2. Check if the user is already part of the game session
    const { data: existingParticipant, error: participantError } =
      await supabase
        .from("game_participants")
        .select("*")
        .eq("game_session_id", game_session_id)
        .eq("user_id", user_id);

    if (participantError) {
      return res.status(500).json({
        detail: "Error checking existing participant",
      });
    }

    if (existingParticipant.length == 1) {
      return res
        .status(200)
        .json({ message: "User is already part of the game" });
    }

    // 3. Check if there is space in the game session
    if (gameSession.is_single_player) {
      return res.status(403).json({
        detail: "This game session is for single player only",
      });
    } else {
      const { count, error: countError } = await supabase
        .from("game_participants")
        .select("*", { count: "exact" })
        .eq("game_session_id", game_session_id);

      if (countError) {
        return res.status(500).json({
          detail: "Error counting participants",
        });
      }

      if ((count ?? 0) >= gameSession.game_size) {
        return res.status(403).json({
          detail: "Game session is full",
        });
      }
    }

    // 3. Add the user to the game_participants table
    const { error: insertError } = await supabase
      .from("game_participants")
      .insert([
        {
          game_session_id,
          user_id,
          username,
          role,
        },
      ]);

    if (insertError) {
      return res.status(500).json({ detail: "Failed to join the game" });
    }

    return res.status(201).json({ message: "Successfully joined the game" });
  } catch (err: any) {
    return res
      .status(500)
      .json({ detail: err.message || "Unexpected server error" });
  }
}
