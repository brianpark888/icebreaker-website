import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../lib/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { userId, bio, imgUrl } = req.body;

  // Validate required fields
  if (!userId || !bio) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Default image URL if none is provided
    const imageUrl = imgUrl || "https://i.imgur.com/IL3vcrZ.jpeg";

    // Check if the user exists in the database
    const { data: existingUser, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (userError || !existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user profile (only image and bio)
    const { data, error } = await supabase
      .from("users")
      .update({
        bio,
        imgUrl: imageUrl, // Update the image or set the default URL
      })
      .eq("id", userId)
      .select("id, bio, imgUrl"); // Return only bio and image URL

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user: data?.[0], // Return the updated user profile
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Unexpected error" });
  }
}
