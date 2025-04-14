import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const { team_id, test, test_user } = req.body;
  const user = test && test_user ? test_user : null;

  if (!team_id || !user || typeof user.id !== "number" || typeof user.username !== "string") {
    return res.status(400).json({ detail: "Valid team_id and user information are required" });
  }

  try {
    // Check if team exists
    const { data: teamExists, error: teamError } = await supabase
      .from("teams")
      .select("*")
      .eq("id", team_id)
      .single();

    if (teamError || !teamExists) {
      return res.status(404).json({ detail: "Team not found" });
    }

    // Check if user is already a member
    const { data: memberExists, error: memberCheckError } = await supabase
      .from("team_members")
      .select("*")
      .eq("team_id", team_id)
      .eq("user_id", user.id)
      .single();

    if (!memberCheckError && memberExists) {
      return res.status(400).json({ detail: "You are already a member of this team" });
    }

    // Add user as member (default role: "member")
    const { error: insertError } = await supabase
      .from("team_members")
      .insert([{
        id: uuidv4(),
        team_id,
        user_id: user.id,
        username: user.username,
        joined_at: new Date().toISOString(),
        role: "member"
      }]);

    if (insertError) throw insertError;

    return res.status(200).json({ message: "Successfully joined the team", team_id });
  } catch (e: any) {
    return res.status(400).json({ detail: e.message || "Unexpected error" });
  }
}
