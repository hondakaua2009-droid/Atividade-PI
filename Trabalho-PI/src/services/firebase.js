import { initializeApp } from 'firebase/app';

import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from 'firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'SUA_API_KEY',
  authDomain: 'eduagenda-9e777.firebaseapp.com',
  projectId: 'eduagenda-9e777',
  storageBucket: 'eduagenda-9e777.firebasestorage.app',
  messagingSenderId: '756216166637',
  appId: '1:756216166637:web:37d6967e50cd8629634e4',
};

const app = initializeApp(firebaseConfig);

let auth;

try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch {
  auth = getAuth(app);
}

export { auth };
export const db = getFirestore(app);