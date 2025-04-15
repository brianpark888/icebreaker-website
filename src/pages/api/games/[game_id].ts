import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { game_id } = req.query;

  // Ensure the request method is GET
  if (req.method !== "GET") {
    return res.status(405).json({ detail: "Method Not Allowed" });
  }

  // Ensure valid game_id parameter
  if (!game_id || typeof game_id !== "string") {
    return res.status(400).json({ detail: "Invalid game_id" });
  }

  try {
    // 1. Get game session by game_id
    const { data: gameSession, error: gameSessionError } = await supabase
      .from("game_sessions")
      .select("id, is_single_player, game_type, game_size, team_id")
      .eq("id", game_id)
      .single();
    console.log("game session: ", gameSession, gameSessionError);
    if (gameSessionError || !gameSession) {
      return res.status(404).json({ detail: "Game session not found" });
    }

    // 2. Get all user_ids of team members from the team_id found in gameSession
    const { data: teamMemberRecords, error: teamMemberError } = await supabase
      .from("team_members")
      .select("user_id, bio, leadership_score, two_truths_and_lie")
      .eq("team_id", gameSession.team_id);

    if (teamMemberError) throw teamMemberError;

    const userIds = teamMemberRecords?.map((member) => member.user_id) || [];

    // 3. Get all relevant users' info (ID, name, imgURL)
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("id, name, imgUrl")
      .in("id", userIds);

    if (usersError) throw usersError;

    // Return final combined data
    const responseData = {
      game: {
        id: gameSession.id,
        game_type: gameSession.game_type,
        single_player: gameSession.is_single_player,
        game_size: gameSession.game_size,
      },
      users: users || [],
      teamMembers: teamMemberRecords || [],
    };

    return res.status(200).json(responseData);
  } catch (err: any) {
    return res
      .status(500)
      .json({ detail: err.message || "Unexpected server error" });
  }
}
