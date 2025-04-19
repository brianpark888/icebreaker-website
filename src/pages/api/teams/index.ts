import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { on } from "events";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const { team_name, description, test, test_user } = req.body;
  const user = test && test_user ? test_user : null;

  if (
    !user ||
    typeof user.id !== "number" ||
    typeof user.username !== "string"
  ) {
    return res
      .status(400)
      .json({ detail: "User information is required and must be valid" });
  }

  try {
    // Check for duplicate team name
    const { data: existingTeam, error: existingError } = await supabase
      .from("teams")
      .select("*")
      .eq("team_name", team_name);

    if (existingError) throw existingError;
    if (existingTeam.length > 0) {
      return res.status(400).json({ detail: "Team name already exists" });
    }

    // Create new team
    const teamId = uuidv4();
    const { data: teamData, error: insertTeamError } = await supabase
      .from("teams")
      .insert([{ id: teamId, team_name, description }])
      .select();

    if (insertTeamError) throw insertTeamError;
    const createdTeam = teamData?.[0];

    // Add user to team_members as "admin"
    const { error: insertMemberError } = await supabase
      .from("team_members")
      .insert([
        {
          id: uuidv4(),
          team_id: teamId,
          user_id: user.id,
          username: user.username,
          joined_at: new Date().toISOString(),
          onboarding_stage: 2,
        },
      ]);

    if (insertMemberError) throw insertMemberError;

    return res.status(200).json({
      message: "Team created successfully",
      team: createdTeam,
    });
  } catch (e: any) {
    return res.status(400).json({ detail: e.message || "Unexpected error" });
  }
}
