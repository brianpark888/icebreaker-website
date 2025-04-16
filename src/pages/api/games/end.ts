import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase"; // Assuming supabase client is set up in this location

// Interface for expected input
interface ScoreInput {
  usernames: string[]; // Array of usernames (1st, 2nd, 3rd)
  team_id: string; // The team ID
  game_session_id: string; // The game session ID
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Extract data from the request body
  const { usernames, team_id, game_session_id }: ScoreInput = req.body;

  // Validate input
  if (!usernames || usernames.length !== 3) {
    return res
      .status(400)
      .json({ error: "Invalid input: must provide 3 usernames." });
  }

  // Points mapping for positions
  const pointsMapping = [100, 50, 30];
  const points: { [key: string]: number } = {}; // Use object type for points

  try {
    // 1. Retrieve team members and leadership scores
    for (let i = 0; i < usernames.length; i++) {
      const username = usernames[i]; // explicitly store username
      if (!username) {
        return res
          .status(400)
          .json({ error: `Invalid username at position ${i + 1}.` });
      }

      const { data: teamMember, error: teamMemberError } = await supabase
        .from("team_members")
        .select("*")
        .eq("username", username)
        .eq("team_id", team_id) // Ensure the username belongs to the correct team
        .single();

      console.log("Team member data:", teamMember); // Debugging line

      if (teamMemberError || !teamMember) {
        return res
          .status(404)
          .json({ error: `Team member ${username} not found.` });
      }

      // Assign points based on position (1st, 2nd, 3rd)
      const positionPoints = pointsMapping[i];
      points[username] = teamMember.leadership_score + positionPoints;

      // Update the team member's leadership score in the database
      const { error: updateError } = await supabase
        .from("team_members")
        .update({ leadership_score: points[username] })
        .eq("id", teamMember.id);

      if (updateError) {
        return res
          .status(500)
          .json({ error: `Error updating score for ${username}` });
      }
    }

    // 2. Find the game session and update the status to 'finished'
    const { data: gameSession, error: gameSessionError } = await supabase
      .from("game_sessions")
      .select("id, status")
      .eq("id", game_session_id)
      .single();

    if (gameSessionError || !gameSession) {
      return res.status(404).json({ error: "Game session not found." });
    }

    // Update game session status
    const { error: statusUpdateError } = await supabase
      .from("game_sessions")
      .update({ status: "finished" })
      .eq("id", game_session_id);

    if (statusUpdateError) {
      return res
        .status(500)
        .json({ error: "Error updating game session status." });
    }

    // 3. Respond with a success message
    return res.status(200).json({
      message:
        "Scores updated successfully and game session status changed to 'finished'.",
      scores: points,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
}
