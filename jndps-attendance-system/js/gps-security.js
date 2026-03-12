// GPS Security and Geofencing for JNDPS Attendance System

// School location: A.R Complex, Balwa Chowk, Near Jhulan Mela Ground, Jokihat, Araria, Bihar 
// Approx coordinates: 26.1557° N, 87.6186° E
const SCHOOL_COORDINATES = { lat: 26.1557, lng: 87.6186 };
const GEOFENCE_RADIUS_METERS = 200;

/**
 * Calculates distance between two points in meters using Haversine formula
 * @param {Number} lat1 
 * @param {Number} lon1 
 * @param {Number} lat2 
 * @param {Number} lon2 
 * @returns {Number} Distance in meters
 */
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};

/**
 * Validates the teacher's location within the geofence
 * @returns {Promise<Object>} Verification result
 */
export const verifyLocation = async () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            resolve({ success: false, message: "Geolocation is not supported by your browser." });
            return;
        }

        const options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude, accuracy, isMocked } = position.coords;

                // Anti-fraud: Basic check for mock locations
                if (isMocked || accuracy > 100) {
                    resolve({ 
                        success: false, 
                        message: "GPS precision too low or spoofing detected. Please turn off mock locations." 
                    });
                    return;
                }

                const distance = calculateDistance(
                    latitude, 
                    longitude, 
                    SCHOOL_COORDINATES.lat, 
                    SCHOOL_COORDINATES.lng
                );

                console.log(`Current distance from school: ${distance.toFixed(2)} meters`);

                if (distance > GEOFENCE_RADIUS_METERS) {
                    resolve({ 
                        success: false, 
                        message: `Access Denied. You are ${Math.round(distance)}m away. Attendance allowed only within 200m of the school.`
                    });
                } else {
                    resolve({ 
                        success: true, 
                        coords: { latitude, longitude },
                        accuracy: accuracy
                    });
                }
            },
            (error) => {
                resolve({ 
                    success: false, 
                    message: `Error retrieving location: ${error.message}` 
                });
            },
            options
        );
    });
};

/**
 * Captures basic device fingerprint
 * @returns {String} Device ID fingerprint
 */
export const getDeviceFingerprint = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const txt = 'jndps-security-v1';
    ctx.textBaseline = "top";
    ctx.font = "14px 'Arial'";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#f60";
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = "#069";
    ctx.fillText(txt, 2, 15);
    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
    ctx.fillText(txt, 4, 17);
    const result = canvas.toDataURL();
    return btoa(result).substring(0, 32); // Simple base64 fingerprint head
};
