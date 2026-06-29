import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAis3kTau3_g2LITmKjb_3HcEyK_hg5q3E",
  authDomain: "gen-lang-client-0738413409.firebaseapp.com",
  projectId: "gen-lang-client-0738413409",
  storageBucket: "gen-lang-client-0738413409.firebasestorage.app",
  messagingSenderId: "700511168297",
  appId: "1:700511168297:web:e8224ae0dbfb36f2d73938"
};

const app = initializeApp(firebaseConfig);

// Initialize Firestore using the custom database ID and enable long polling
// to work seamlessly within restricted iframe environments.
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
}, "ai-studio-onehealth-75cd70a1-e27e-4217-b755-bcfb7060d024");
