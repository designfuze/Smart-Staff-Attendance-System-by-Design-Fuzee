// Google Maps Integration for JNDPS Attendance
let map;
let markers = [];

/**
 * Initializes the Google Map
 * @param {String} elementId 
 */
export const initAdminMap = (elementId) => {
    const defaultLocation = { lat: 26.1557, lng: 87.6186 }; // Jokihat location
    
    map = new google.maps.Map(document.getElementById(elementId), {
        center: defaultLocation,
        zoom: 14,
        styles: [
            { "elementType": "geometry", "stylers": [{ "color": "#212121" }] },
            { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
            { "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
            { "elementType": "labels.text.stroke", "stylers": [{ "color": "#212121" }] },
            { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "color": "#757575" }] },
            { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#181818" }] },
            { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "color": "#2c2c2c" }] },
            { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }] }
        ]
    });

    console.log("Map Initialized");
};

/**
 * Updates markers based on attendance records
 * @param {Array} records 
 */
export const updateMapMarkers = (records) => {
    // Clear existing markers
    markers.forEach(m => m.setMap(null));
    markers = [];

    records.forEach(record => {
        const position = { lat: record.latitude, lng: record.longitude };
        
        const contentString = `
            <div style="color: #000; font-family: sans-serif; min-width: 150px;">
                <img src="${record.photoURL}" style="width: 100%; border-radius: 8px; margin-bottom: 8px;">
                <h3 style="margin: 0; font-size: 14px;">${record.teacherName}</h3>
                <p style="margin: 4px 0; font-size: 12px; color: #666;">Time: ${record.time}</p>
                <p style="margin: 0; font-size: 10px; color: #999;">Lat: ${record.latitude.toFixed(4)}, Lng: ${record.longitude.toFixed(4)}</p>
            </div>
        `;

        const infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        const marker = new google.maps.Marker({
            position: position,
            map: map,
            title: record.teacherName,
            animation: google.maps.Animation.DROP
        });

        marker.addListener("click", () => {
            infowindow.open({
                anchor: marker,
                map,
                shouldFocus: false,
            });
        });

        markers.push(marker);
    });
};
