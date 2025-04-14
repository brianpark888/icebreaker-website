import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).end("Method Not Allowed");
  }

  const username = req.query.user_id;

  if (!username || typeof username !== "string") {
    return res.status(400).json({ detail: "Missing or invalid username" });
  }

  try {
    // Get all team_ids the user is part of based on username
    const { data: memberships, error: memberError } = await supabase
      .from("team_members")
      .select("team_id")
      .eq("username", username);

    if (memberError) throw memberError;
    if (!memberships || memberships.length === 0) {
      return res.status(200).json([]); // not part of any team
    }

    const teamIds = memberships.map((m) => m.team_id);

    // Get the actual team details
    const { data: teams, error: teamError } = await supabase
      .from("teams")
      .select("*")
      .in("id", teamIds);

    if (teamError) throw teamError;

    return res.status(200).json(teams);
  } catch (err: any) {
    return res.status(500).json({ detail: err.message || "Internal server error" });
  }
}
