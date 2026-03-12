// JNDPS Attendance recording logic
import { auth, db, storage } from '../firebase/firebase-config.js';
import { verifyFace } from './face-verification.js';
import { verifyLocation, getDeviceFingerprint } from './gps-security.js';

/**
 * Validates if attendance has already been recorded today
 * @param {String} teacherID 
 * @returns {Promise<Boolean>} True if already marked
 */
const checkAttendanceExistsToday = async (teacherID) => {
    const today = new Date().toISOString().split('T')[0];
    const snapshot = await db.collection('attendance')
        .where('teacherID', '==', teacherID)
        .where('date', '==', today)
        .get();
    
    return !snapshot.empty;
};

/**
 * Records attendance in Firestore/Storage
 * @param {HTMLVideoElement|Canvas} source 
 * @param {Object} teacher 
 */
export const markAttendanceFlow = async (videoElement, teacherData) => {
    try {
        const teacherID = teacherData.id;
        const teacherName = teacherData.name;
        const profileImageURL = teacherData.photoURL;

        // 1. One attendance per day rule
        const alreadyMarked = await checkAttendanceExistsToday(teacherID);
        if (alreadyMarked) {
             return { success: false, message: "Attendance already recorded for today!" };
        }

        // 2. Capture and GPS Verification
        const locationResult = await verifyLocation();
        if (!locationResult.success) {
            return locationResult;
        }

        // 3. Face Verification
        // Capture frame from video to canvas
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        canvas.getContext('2d').drawImage(videoElement, 0, 0);
        
        const faceResult = await verifyFace(canvas, profileImageURL);
        if (!faceResult.success) {
            return faceResult;
        }

        // 4. Capture Timestamp and Fingerprint
        const timestamp = new Date();
        const dateString = timestamp.toISOString().split('T')[0];
        const timeString = timestamp.toLocaleTimeString();
        const deviceID = getDeviceFingerprint();

        // 5. Upload Selfie to Storage
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.8));
        const fileRef = storage.ref().child(`attendance/${teacherID}_${timestamp.getTime()}.jpg`);
        const uploadTask = await fileRef.put(blob);
        const photoURL = await uploadTask.ref.getDownloadURL();

        // 6. Final Firestore Record
        const attendanceRecord = {
            teacherName,
            teacherID,
            photoURL,
            latitude: locationResult.coords.latitude,
            longitude: locationResult.coords.longitude,
            time: timeString,
            date: dateString,
            deviceID,
            attendanceStatus: "Present",
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        };

        await db.collection('attendance').add(attendanceRecord);

        return { 
            success: true, 
            message: `Attendance recorded successfully! [${timeString}]`,
            record: attendanceRecord 
        };

    } catch (error) {
        console.error("Attendance marking error:", error);
        return { success: false, message: `System error: ${error.message}` };
    }
};
