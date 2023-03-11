import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCfP5Iv4qLMgPoNM7rcFDKzA-FGWmBi2B0",
  authDomain: "l3uii-advanced-redux-app.firebaseapp.com",
  projectId: "l3uii-advanced-redux-app",
  storageBucket: "l3uii-advanced-redux-app.appspot.com",
  messagingSenderId: "253150215910",
  appId: "1:253150215910:web:33592d1454723bb9668527",
  measurementId: "G-JMN71VBW59"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);