import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { userId } = req.query;
  const teamId = req.query.teamId as string;

  if (req.method !== "GET") {
    return res.status(405).json({ detail: "Method Not Allowed" });
  }

  if (!userId || typeof userId !== "string") {
    return res.status(400).json({ detail: "Missing or invalid userId" });
  }

  if (!teamId || typeof teamId !== "string") {
    return res.status(400).json({ detail: "Missing or invalid teamId" });
  }

  try {
    // 1. Get user info from users table
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("username", userId)
      .single();

    if (userError || !user) {
      return res.status(404).json({ detail: "User not found" });
    }

    // 2. Get team member data for that user from team_members
    const { data: teamMember, error: teamMemberError } = await supabase
      .from("team_members")
      .select("*")
      .eq("username", userId)
      .eq("team_id", teamId)
      .single();

    if (teamMemberError || !teamMember) {
      return res.status(404).json({ detail: "Team membership not found" });
    }

    // Merge data
    const mergedUser = {
      ...user,
      ...teamMember,
    };

    return res.status(200).json({
      user: mergedUser,
    });
  } catch (err: any) {
    console.error("Error in /api/users/[userId]:", err);
    return res
      .status(500)
      .json({ detail: err.message || "Internal Server Error" });
  }
}
