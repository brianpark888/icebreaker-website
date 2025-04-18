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
    /* ---------- 1.  Insert / update link ---------- */
    const { data: link, error: fetchError } = await supabase
      .from("team_members_link")
      .select("*")
      .eq("member_id_1", myId)
      .eq("member_id_2", profileId)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      return res.status(500).json({ error: fetchError.message });
    }

    if (!link) {
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
    } else {
      const { error: updateError } = await supabase
        .from("team_members_link")
        .update({ two_truths_and_a_lie_correct: correct })
        .eq("member_id_1", myId)
        .eq("member_id_2", profileId);

      if (updateError) {
        return res.status(500).json({ error: updateError.message });
      }
    }

    /* ---------- 2.  Bump leadership score if correct ---------- */
    if (correct) {
      const userIdToUpdate = myId; // or profileId – see assumption above

      // Fetch current score
      const { data: member, error: memberError } = await supabase
        .from("team_members")
        .select("leadership_score,id")
        .eq("id", userIdToUpdate)
        .single();

      if (memberError) {
        return res.status(500).json({ error: memberError.message });
      }

      const newScore = (member?.leadership_score ?? 0) + 15;

      // Persist the increment
      const { error: scoreError } = await supabase
        .from("team_members")
        .update({ leadership_score: newScore })
        .eq("id", userIdToUpdate);

      if (scoreError) {
        return res.status(500).json({ error: scoreError.message });
      }
    }

    return res
      .status(link ? 200 : 201)
      .json({ message: "Result recorded successfully" });
  } catch (err) {
    console.error("Unexpected error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
