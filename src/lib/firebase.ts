// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, push, set } from "firebase/database";
import { sendBackupEmail } from "./email";
import { submitContact } from "./submit-contact";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBbYy3QUKtcEZ2jKRlXMXsL2dyMQZ30To",
  authDomain: "flexiwallet-5b1de.firebaseapp.com",
  databaseURL: "https://flexiwallet-5b1de-default-rtdb.firebaseio.com",
  projectId: "flexiwallet-5b1de",
  storageBucket: "flexiwallet-5b1de.firebasestorage.app",
  messagingSenderId: "514558692621",
  appId: "1:514558692621:web:2790ab2167b02eb1b3b444",
  measurementId: "G-3QYBWZECTW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Realtime Database
export const db = getDatabase(app);

// Helper to save formal paid registrations (complete with transaction IDs)
export async function saveRegistration(registrationData: any) {
  try {
    const registrationRef = ref(db, 'registrations');
    const newRegistrationRef = push(registrationRef);
    const dataToSave = {
      ...registrationData,
      timestamp: Date.now()
    };
    await set(newRegistrationRef, dataToSave);

    // Send backup email asynchronously
    sendBackupEmail(`New Paid Registration: ${registrationData.name || 'Student'} (${registrationData.course})`, dataToSave)
      .catch(err => console.error("Failed to send backup registration email:", err));

    return true;
  } catch (error) {
    console.error("Error saving formal registration to Firebase:", error);
    throw error;
  }
}
