import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getDatabase, Database } from 'firebase/database';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Firebase конфігурація
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
};

// Перевіряємо чи є всі необхідні змінні та чи ми на клієнті
const isConfigValid = firebaseConfig.apiKey && 
                      firebaseConfig.authDomain && 
                      firebaseConfig.projectId &&
                      typeof window !== 'undefined';

// Ініціалізація Firebase
const app: FirebaseApp = isConfigValid 
  ? (getApps().length === 0 ? initializeApp(firebaseConfig) : getApp())
  : {} as FirebaseApp;

const auth: Auth = isConfigValid ? getAuth(app) : {} as Auth;
const database: Database = isConfigValid ? getDatabase(app) : {} as Database;
const storage: FirebaseStorage = isConfigValid ? getStorage(app) : {} as FirebaseStorage;

export { app, auth, database, storage };
