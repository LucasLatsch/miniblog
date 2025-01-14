import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAIf_UKJIyoC-J3l60hlF5bYUuW2RV9qBg",
  authDomain: "miniblog-92751.firebaseapp.com",
  projectId: "miniblog-92751",
  storageBucket: "miniblog-92751.firebasestorage.app",
  messagingSenderId: "762426575555",
  appId: "1:762426575555:web:0b20ff05874e20f7f27076",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
