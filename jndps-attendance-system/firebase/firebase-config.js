// Firebase Configuration for JNDPS Attendance System
// Initialize Firebase
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5UK2XRCqHgbcwf6danMIgAPYhEq6upVo",
  authDomain: "jndps-staff-attendance-system.firebaseapp.com",
  projectId: "jndps-staff-attendance-system",
  storageBucket: "jndps-staff-attendance-system.firebasestorage.app",
  messagingSenderId: "745865070386",
  appId: "1:745865070386:web:b0238a8ec1d0118c28f92b",
  measurementId: "G-EENCHJ1M4L"
};

// Initialize Firebase app
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Admin credentials (from user request)
const ADMIN_CREDENTIALS = {
    email: "designfuzee@gmail.com",
    username: "maazalam04",
    password: "Maazalam@04"
};

export { app, auth, db, storage, ADMIN_CREDENTIALS };
