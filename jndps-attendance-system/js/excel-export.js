// Excel Export implementation using SheetJS (xlsx.full.min.js)
import { db } from '../firebase/firebase-config.js';

/**
 * Generates Excel report for a specific date range or all records
 * @param {Array} attendanceRecords 
 */
export const downloadAttendanceExcel = (attendanceRecords) => {
    try {
        if (!attendanceRecords || attendanceRecords.length === 0) {
            alert("No records to export.");
            return;
        }

        const data = attendanceRecords.map(record => ({
            Date: record.date,
            "Teacher Name": record.teacherName,
            "Teacher ID": record.teacherID,
            Time: record.time,
            Location: `Lat: ${record.latitude.toFixed(4)}, Lng: ${record.longitude.toFixed(4)}`,
            Latitude: record.latitude,
            Longitude: record.longitude,
            "Attendance Status": record.attendanceStatus,
            "Salary Deduction": record.salaryDeduction || "0.00" // Optional based on calculation
        }));

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);

        // Styling (optional depending on sheetjs version)
        XLSX.utils.book_append_sheet(wb, ws, "Attendance Report");
        
        const fileName = `JNDPS_Attendance_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(wb, fileName);
        
        console.log("Excel report downloaded successfully.");
    } catch (error) {
        console.error("Error generating Excel:", error);
        alert("Failed to export Excel report.");
    }
};
