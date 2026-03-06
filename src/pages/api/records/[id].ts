import { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';

interface AuthedRequest extends NextApiRequest {
  uid?: string;
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT as string)),
  });
}

const db = admin.firestore();

const rateLimitMap = new Map<string, { count: number; timer: NodeJS.Timeout }>();

const rateLimit = (req: NextApiRequest) => {
  const key = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  const limit = 5; // Limit requests to 5 per minute
  const resetTime = 60000; // 1 minute

  if (!rateLimitMap.has(key)) {
    rateLimitMap.set(key, { count: 1, timer: setTimeout(() => rateLimitMap.delete(key), resetTime) });
    return true;
  }

  const record = rateLimitMap.get(key)!;
  if (record.count < limit) {
    record.count++;
    return true;
  }

  return false;
};

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  if (!rateLimit(req)) {
    return res.status(429).json({ message: 'Too many requests. Please try again later.' });
  }

  const { id } = req.query;

  switch (req.method) {
    case 'DELETE':
      try {
        await db.collection('records').doc(String(id)).delete();
        return res.status(204).end();
      } catch (err) {
        return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
      }

    case 'PUT':
      try {
        const data = req.body;
        await db.collection('records').doc(String(id)).set(data, { merge: true });
        return res.status(200).json({ message: 'Record updated successfully.' });
      } catch (err) {
        return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
      }

    default:
      return res.setHeader('Allow', ['PUT', 'DELETE']).status(405).end(`Method ${req.method} Not Allowed`);
  }
}