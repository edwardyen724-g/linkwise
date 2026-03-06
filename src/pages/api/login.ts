import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseApp } from '../../../lib/firebase'; // Assume firebase is configured in lib/firebase.ts

interface AuthedRequest extends NextApiRequest {
  user?: { uid: string; email: string };
}

const auth = getAuth(firebaseApp);

export default async function login(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Optionally, you can add user information here
    req.user = { uid: user.uid, email: user.email };

    return res.status(200).json({ message: 'Login successful', uid: user.uid });
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}