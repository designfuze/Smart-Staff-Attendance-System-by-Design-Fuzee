// Utility script to initialize Firestore with dummy data for testing
import { db } from './firebase/firebase-config.js';

export const setupDummyData = async () => {
    try {
        console.log("Setting up dummy data...");

        // 1. Create Teacher Profile
        const teacherId = "test-teacher-001";
        await db.collection('teachers').doc(teacherId).set({
            name: "Rahul Sharma",
            employeeID: "JNDPS-001",
            photoURL: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=256", // Placeholder profile
            monthlySalary: 25000,
            totalWorkingDays: 26,
            joinedDate: new Date().toISOString()
        });

        console.log("Dummy teacher created successfully.");
        alert("Dummy teacher created! Use this for testing.");
    } catch (error) {
        console.error("Setup Error:", error);
    }
};
