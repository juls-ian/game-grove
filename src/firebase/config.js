import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCxqYExTP2lFA9kXs7kM6FlFHNJuak0sx4',
  authDomain: 'game-grove-ff91d.firebaseapp.com',
  projectId: 'game-grove-ff91d',
  storageBucket: 'game-grove-ff91d.firebasestorage.app',
  messagingSenderId: '427048069494',
  appId: '1:427048069494:web:bb77017ef2e90039267257',
  measurementId: 'G-DF18SX3TR5',
};

// Initialize Firebase
initializeApp(firebaseConfig);

const DB = getFirestore();
const AUTH = getAuth();

export { DB, AUTH };
