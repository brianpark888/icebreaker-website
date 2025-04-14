// pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` })
  }

  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' })
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single()

    if (error || !data) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const user = data

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Remove sensitive fields before sending back
    const { password: _, ...safeUser } = user

    return res.status(200).json({
      message: 'Login successful',
      user: safeUser,
    })
  } catch (err) {
    console.error('Login error:', err)
    return res.status(500).json({ message: 'Server error' })
  }
}
