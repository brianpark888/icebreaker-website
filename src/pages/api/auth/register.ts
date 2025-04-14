import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, password, name, username, imgUrl } = req.body;

  if (!email || !password || !name || !username) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Validate username
  if (username.length < 3 || username.length > 20 || !/^[a-zA-Z0-9]+$/.test(username)) {
    return res.status(422).json({ error: 'Username must be 3-20 characters and alphanumeric' });
  }

  try {
    const existingUsername = await supabase
      .from('users')
      .select('username')
      .eq('username', username)
      .single();

    if (existingUsername.data) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    const existingEmail = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single();

    if (existingEmail.data) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const { data, error } = await supabase.from('users').insert([
      {
        email,
        password, // ❗ Not hashed — MVP mode
        name,
        username,
        imgUrl,
        created_at: new Date().toISOString(),
      }
    ]).select('id, username'); // ✅ Select only the fields you want returned

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({
      message: 'User registered successfully',
      user: {
        id: data?.[0]?.id,
        username: data?.[0]?.username,
      },
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Unexpected error' });
  }
}
