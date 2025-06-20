import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!serviceAccountString) {
  throw new Error('The FIREBASE_SERVICE_ACCOUNT environment variable is not set. Please make sure to create a .env.local file with it.');
}

let serviceAccount;
try {
  serviceAccount = JSON.parse(serviceAccountString);
} catch (e) {
  throw new Error('Could not parse FIREBASE_SERVICE_ACCOUNT. Make sure it is a valid JSON object.');
}

const app = getApps().length
  ? getApp()
  : initializeApp({
      credential: cert(serviceAccount),
    });

const db = getFirestore(app);

export { db }; 