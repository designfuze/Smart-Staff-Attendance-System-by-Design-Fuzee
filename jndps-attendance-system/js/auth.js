// JNDPS Attendance - Auth Logic
import { auth, ADMIN_CREDENTIALS } from '../firebase/firebase-config.js';

// Login functionality
export const loginTeacher = async (email, password) => {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

// Check for admin login
export const loginAdmin = (username, password) => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        localStorage.setItem('isAdmin', 'true');
        return { success: true };
    } else {
        return { success: false, message: "Invalid Admin Credentials" };
    }
};

// Sign Out
export const logout = async () => {
    try {
        await auth.signOut();
        localStorage.removeItem('isAdmin');
        window.location.href = 'login.html';
    } catch (error) {
        console.error("Logout Error:", error);
    }
};

// Protect Routes
export const checkAuth = (role) => {
    auth.onAuthStateChanged(user => {
        if (!user && role === 'teacher') {
            window.location.href = 'login.html';
        }
        if (role === 'admin' && localStorage.getItem('isAdmin') !== 'true') {
            window.location.href = 'login.html';
        }
    });
};
