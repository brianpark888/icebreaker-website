import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { userId, teamId, jobTitle, response } = req.body;

  if (!userId || !jobTitle || !response || !response.q || !response.a) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const { data: teamMember, error: fetchError } = await supabase
      .from("team_members")
      .select("*")
      .eq("user_id", userId)
      .eq("team_id", teamId)
      .single();

    if (fetchError || !teamMember) {
      return res.status(404).json({ error: "Team member not found" });
    }

    const { error: updateError } = await supabase
      .from("team_members")
      .update({
        role: jobTitle,
        promptResponse: response,
      })
      .eq("user_id", userId);

    if (updateError) {
      return res.status(500).json({ error: updateError.message });
    }

    return res
      .status(200)
      .json({ message: "Team member profile updated successfully" });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
