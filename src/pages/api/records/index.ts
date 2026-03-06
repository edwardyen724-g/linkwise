import type { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT as string);
const app = initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore(app);

interface AuthedRequest extends NextApiRequest {
  user?: {
    uid: string;
  };
}

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const recordsRef = db.collection('records');
      const snapshot = await recordsRef.get();
      const records = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return res.status(200).json(records);
    } else if (req.method === 'POST') {
      const { name, data } = req.body;
      const record = { name, data, createdAt: admin.firestore.FieldValue.serverTimestamp() };
      const newRecordRef = await db.collection('records').add(record);
      
      return res.status(201).json({ id: newRecordRef.id, ...record });
    } else {
      return res.setHeader('Allow', ['GET', 'POST']).status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
}