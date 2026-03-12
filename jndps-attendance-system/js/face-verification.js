// Face Verification for JNDPS Attendance System
// Using face-api.js

export const loadFaceModels = async () => {
    const MODEL_URL = 'https://justadudewhohacks.github.io/face-api.js/models';
    try {
        await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
        console.log("Face API Models Loaded Successfully");
        return true;
    } catch (error) {
        console.error("Error loading face models:", error);
        return false;
    }
};

/**
 * Verifies face match between captured image and reference image
 * @param {HTMLImageElement|HTMLCanvasElement} capturedImage 
 * @param {String} referenceImageUrl 
 * @returns {Promise<Object>} Verification result
 */
export const verifyFace = async (capturedImage, referenceImageUrl) => {
    try {
        // Detect face in captured image
        const capturedDetection = await faceapi.detectSingleFace(capturedImage).withFaceLandmarks().withFaceDescriptor();
        
        if (!capturedDetection) {
            return { success: false, message: "No face detected in selfie" };
        }

        // Load reference image (profile image)
        const referenceImage = await faceapi.fetchImage(referenceImageUrl);
        const referenceDetection = await faceapi.detectSingleFace(referenceImage).withFaceLandmarks().withFaceDescriptor();

        if (!referenceDetection) {
            return { success: false, message: "Could not detect face in profile image" };
        }

        // Compare faces
        const faceMatcher = new faceapi.FaceMatcher(referenceDetection);
        const bestMatch = faceMatcher.findBestMatch(capturedDetection.descriptor);
        
        // Face API Distance: 0.0 is perfect match, > 0.6 is usually different person
        // Convert to match percentage (approximate)
        const matchScore = (1 - bestMatch.distance) * 100;
        
        console.log(`Match Score: ${matchScore}%`);

        if (matchScore < 80) {
            return { 
                success: false, 
                message: "Face verification failed. Please try again with better lighting.",
                score: matchScore 
            };
        }

        return { success: true, score: matchScore };

    } catch (error) {
        console.error("Face Verification Error:", error);
        return { success: false, message: "Face verification system error" };
    }
};
