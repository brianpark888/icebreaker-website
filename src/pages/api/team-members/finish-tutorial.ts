import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { user_id, teamId } = req.body;

  if (!user_id || !teamId) {
    return res.status(400).json({ error: "Missing user_id or teamId" });
  }

  try {
    // 1. Find the user in the team_members table
    const { data: member, error: fetchError } = await supabase
      .from("team_members")
      .select("*")
      .eq("user_id", user_id)
      .eq("team_id", teamId)
      .single();

    if (fetchError) {
      return res.status(404).json({ error: "User not found in team" });
    }

    // 2. Update onboarding_stage to 2
    const { error: updateError } = await supabase
      .from("team_members")
      .update({ onboarding_stage: 2 })
      .eq("user_id", user_id)
      .eq("team_id", teamId);

    if (updateError) {
      return res.status(500).json({ error: updateError.message });
    }

    return res.status(200).json({ message: "Onboarding stage updated to 2" });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
