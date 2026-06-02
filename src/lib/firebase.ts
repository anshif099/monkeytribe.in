// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, push, set } from "firebase/database";

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

// Helper to save contact form data
export async function saveContact(contactData: any) {
  try {
    const contactRef = ref(db, 'contacts');
    const newContactRef = push(contactRef);
    await set(newContactRef, {
      ...contactData,
      timestamp: Date.now()
    });
    return true;
  } catch (error) {
    console.error("Error saving contact request to Firebase:", error);
    throw error;
  }
}

// Helper to save course enrollment data (leads and paid enrollments)
export async function saveEnrollment(enrollData: any) {
  try {
    const enrollRef = ref(db, 'enrollments');
    const newEnrollRef = push(enrollRef);
    await set(newEnrollRef, {
      ...enrollData,
      timestamp: Date.now()
    });
    return true;
  } catch (error) {
    console.error("Error saving enrollment request to Firebase:", error);
    throw error;
  }
}

// Helper to save formal paid registrations (complete with transaction IDs)
export async function saveRegistration(registrationData: any) {
  try {
    const registrationRef = ref(db, 'registrations');
    const newRegistrationRef = push(registrationRef);
    await set(newRegistrationRef, {
      ...registrationData,
      timestamp: Date.now()
    });
    return true;
  } catch (error) {
    console.error("Error saving formal registration to Firebase:", error);
    throw error;
  }
}
