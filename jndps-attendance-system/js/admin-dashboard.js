// JNDPS Admin Dashboard Logic
import { db } from '../firebase/firebase-config.js';

export const fetchDashboardData = async () => {
    const today = new Date().toISOString().split('T')[0];
    const snapshot = await db.collection('attendance')
        .where('date', '==', today)
        .get();
    
    const records = [];
    snapshot.forEach(doc => records.push({ id: doc.id, ...doc.data() }));

    const teachersSnapshot = await db.collection('teachers').get();
    const totalTeachers = teachersSnapshot.size;
    const presentCount = records.length;
    const absentCount = totalTeachers - presentCount;
    const lateThreshold = "09:15:00 AM"; // Threshold example

    const lateCount = records.filter(r => {
        const arrivalTime = r.time; // Format: "10:15:23 AM"
        return arrivalTime > lateThreshold;
    }).length;

    return { totalTeachers, presentCount, absentCount, lateCount, records };
};

/**
 * Calculates salary for a specific teacher based on monthly attendance
 * @param {String} teacherID 
 * @param {Number} month (0-11)
 * @param {Number} year 
 * @returns {Promise<Object>} Salary status
 */
export const calculateTeacherSalary = async (teacherID, month, year) => {
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);

    const teacherDoc = await db.collection('teachers').doc(teacherID).get();
    if (!teacherDoc.exists) return null;

    const { monthlySalary, totalWorkingDays, name } = teacherDoc.data();
    const perDaySalary = monthlySalary / totalWorkingDays;

    const snapshot = await db.collection('attendance')
        .where('teacherID', '==', teacherID)
        .where('timestamp', '>=', startOfMonth)
        .where('timestamp', '<=', endOfMonth)
        .get();
    
    const presentDays = snapshot.size;
    const absentDays = totalWorkingDays - presentDays;
    const salaryDeduction = absentDays * perDaySalary;
    const finalPayableSalary = monthlySalary - salaryDeduction;

    return {
        name,
        teacherID,
        presentDays,
        absentDays,
        salaryDeduction: salaryDeduction.toFixed(2),
        finalPayableSalary: finalPayableSalary.toFixed(2)
    };
};
