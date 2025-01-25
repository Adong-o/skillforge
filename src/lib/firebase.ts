import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDtegLPTuBtEr3TydsqF-Dui4Wb3jgC_ls",
  authDomain: "skillhabit-efef8.firebaseapp.com",
  projectId: "skillhabit-efef8",
  storageBucket: "skillhabit-efef8.firebasestorage.app",
  messagingSenderId: "721352409759",
  appId: "1:721352409759:web:4c180b9d5954a70b8018aa",
  measurementId: "G-9VEQCBTDFJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics only if supported
const analytics = async () => {
  if (await isSupported()) {
    return getAnalytics(app);
  }
  return null;
};

export { analytics };
export default app;