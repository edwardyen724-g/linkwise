import type { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';
import { initializeApp, getApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

if (!admin.apps.length) {
  initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

interface AuthedRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  try {
    const user = await getAuth().getUserByEmail(email);
    const customToken = await getAuth().createCustomToken(user.uid);
    
    // Normally you would also validate the password here before creating a token.
    // However, we would use client-side Firebase SDK for signing in directly.
    
    res.status(200).json({ token: customToken });
  } catch (err) {
    res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}