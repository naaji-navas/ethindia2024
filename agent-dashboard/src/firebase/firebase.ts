import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

const firebaseConfig = {
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,

};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, onValue };