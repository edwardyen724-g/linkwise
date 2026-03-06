import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase-admin/auth";
import { firestore } from "firebase-admin"; // Assuming the Firestore is initialized elsewhere
import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import admin from "firebase-admin";

const app = initializeApp({
  credential: applicationDefault(), // Or use cert(serviceAccount) for service account
});

interface AuthedRequest extends NextApiRequest {
  uid?: string;
}

const db = firestore(app);

const rateLimit = new Map<string, number>();

const checkRateLimit = (id: string) => {
  const currentTime = Date.now();
  const limit = 1000; // 1 second
  if (rateLimit.has(id)) {
    const lastRequestTime = rateLimit.get(id)!;
    if (currentTime - lastRequestTime < limit) {
      throw new Error("Too many requests, please try again later.");
    }
  }
  rateLimit.set(id, currentTime);
};

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Invalid record ID" });
  }

  try {
    checkRateLimit(id);

    const authToken = req.headers.authorization?.split("Bearer ")[1];
    if (!authToken) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decodedToken = await getAuth().verifyIdToken(authToken);
    req.uid = decodedToken.uid;

    if (method === "DELETE") {
      const recordRef = db.collection("records").doc(id);
      await recordRef.delete();
      return res.status(204).end();
    }

    if (method === "PUT") {
      const { data } = req.body;
      if (!data) {
        return res.status(400).json({ error: "No data provided" });
      }

      const recordRef = db.collection("records").doc(id);
      await recordRef.update(data);
      return res.status(200).json({ message: "Record updated successfully" });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
}