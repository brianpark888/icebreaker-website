import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { myId, profileId } = req.query;

  if (!myId || !profileId) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  try {
    const { data: link, error } = await supabase
      .from("team_members_link")
      .select("two_truths_and_a_lie_correct")
      .eq("member_id_1", myId)
      .eq("member_id_2", profileId)
      .single();

    if (error && error.code !== "PGRST116") {
      return res.status(500).json({ error: error.message });
    }

    if (!link) {
      return res.status(200).json({ exists: false, correct: null });
    }

    return res.status(200).json({
      exists: true,
      correct: link.two_truths_and_a_lie_correct,
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
