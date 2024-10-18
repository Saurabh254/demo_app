import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from '../../config';

function RealTimeMap({ location_b, endpoint }) {
    const [location_a, setLocationA] = useState(null); // Initially null
    const [directionsResponse, setDirectionsResponse] = useState(null);

    // Fetch the user's current location (location_a)
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocationA({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => console.error("Error fetching location", error),
                { enableHighAccuracy: true }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

    const center = { lat: location_b.lat, lng: location_b.lng }

    // Load Google Maps API
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY, // Add your Google Maps API Key here
        libraries: ['places'], // Optional if you need more features
    });

    // WebSocket to track real-time changes, if needed
    const websocketRef = useRef(null); // Reference for the WebSocket connection


    // When the map is loaded
    const onLoad = (map) => {
        if (center) {
            const bounds = new window.google.maps.LatLngBounds(center);
            map.fitBounds(bounds);
        }
    };

    const onUnmount = () => {
    };


    return (
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={{ width: '100%', height: '400px' }}
                center={{ lat: 37.7749, lng: -122.4194 }} // Center of the map is between A and B
                zoom={10}
            // onLoad={onLoad}
            // onUnmount={onUnmount}
            >


            </GoogleMap>
        </LoadScript>
    );
}

export default RealTimeMap;
