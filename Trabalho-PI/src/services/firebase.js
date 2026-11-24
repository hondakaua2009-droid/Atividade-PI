
import { Platform } from 'react-native';

import {
  initializeApp,
  getApps,
  getApp
} from 'firebase/app';

import {
  getAuth,
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA8CL2DVTxq6ZhrbjNMbQHYyy_w0di35Mw',
  authDomain: 'agendaedu-a4475.firebaseapp.com',
  projectId: 'agendaedu-a4475',
  storageBucket: 'agendaedu-a4475.firebasestorage.app',
  messagingSenderId: '202527471065',
  appId: '1:202527471065:web:775628025ac472361ad5c8',
};

export const app = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

function criarAuth() {
  if (Platform.OS === 'web') {
    return getAuth(app);
  }

  try {
    return initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });
  } catch (erro) {
    return getAuth(app);
  }
}

export const auth = criarAuth();

export const db = getFirestore(app);

export const storage = getStorage(app);
