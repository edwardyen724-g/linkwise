import type { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

interface AuthedRequest extends NextApiRequest {
  uid?: string;
}

const records: Map<string, object[]> = new Map();

const handler = async (req: AuthedRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const userID = req.query.userID as string;
      if (!userID || !records.has(userID)) {
        return res.status(404).json({ message: 'Records not found' });
      }
      return res.status(200).json(records.get(userID));
    }

    if (req.method === 'POST') {
      const { userID, record } = req.body;
      if (!userID || !record) {
        return res.status(400).json({ message: 'Invalid request data' });
      }
      
      const userRecords = records.get(userID) || [];
      userRecords.push(record);
      records.set(userID, userRecords);
      
      return res.status(201).json({ message: 'Record created', record });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
};

export default handler;