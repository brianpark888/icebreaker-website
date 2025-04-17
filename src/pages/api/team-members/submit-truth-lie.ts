import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { myId, profileId, correct } = req.body;

  if (!myId || !profileId || typeof correct !== "boolean") {
    return res.status(400).json({ error: "Missing or invalid fields" });
  }

  try {
    // Check for existing link
    const { data: link, error: fetchError } = await supabase
      .from("team_members_link")
      .select("*")
      .eq("member_id_1", myId)
      .eq("member_id_2", profileId)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      // Not a "no rows" error
      return res.status(500).json({ error: fetchError.message });
    }

    if (!link) {
      // Insert new link
      const { error: insertError } = await supabase
        .from("team_members_link")
        .insert([
          {
            member_id_1: myId,
            member_id_2: profileId,
            two_truths_and_a_lie_correct: correct,
          },
        ]);

      if (insertError) {
        return res.status(500).json({ error: insertError.message });
      }

      return res
        .status(201)
        .json({ message: "Link created and result recorded successfully" });
    } else {
      // Update existing link
      const { error: updateError } = await supabase
        .from("team_members_link")
        .update({
          two_truths_and_a_lie_correct: correct,
        })
        .eq("member_id_1", myId)
        .eq("member_id_2", profileId);

      if (updateError) {
        return res.status(500).json({ error: updateError.message });
      }

      return res.status(200).json({ message: "Result updated successfully" });
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
