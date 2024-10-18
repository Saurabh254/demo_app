import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';
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

    // Calculate map center based on location_a and location_b
    const center = React.useMemo(() => {
        if (!location_a || !location_b) return null;

        // Calculate the average of latitude and longitude to get the center
        const lat = (location_a.lat + location_b.lat) / 2;
        const lng = (location_a.lng + location_b.lng) / 2;

        return { lat, lng };
    }, [location_a, location_b]);

    // Load Google Maps API
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY, // Add your Google Maps API Key here
        libraries: ['places'], // Optional if you need more features
    });

    // Directions request to display path between location_a and location_b
    useEffect(() => {
        if (isLoaded && location_a && location_b) {
            const directionsService = new window.google.maps.DirectionsService();

            directionsService.route(
                {
                    origin: { lat: location_a.lat, lng: location_a.lng }, // Ensure valid LatLng format
                    destination: { lat: location_b.lat, lng: location_b.lng }, // Ensure valid LatLng format
                    travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        setDirectionsResponse(result);
                    } else {
                        console.error("Error fetching directions: " + status);
                    }
                }
            );
        }
    }, [isLoaded, location_a, location_b]);

    // When the map is loaded
    const onLoad = (map) => {
        if (center) {
            const bounds = new window.google.maps.LatLngBounds(center);
            map.fitBounds(bounds);
        }
    };

    const onUnmount = () => {
        setMap(null);
    };

    if (!isLoaded || !location_a || !location_b) {

        return <div>Loading...</div>;
    }
    return (
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={{ width: '100%', height: '400px' }}
                center={center} // Center of the map is between A and B
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                {/* Display directions from location_a to location_b */}
                {directionsResponse && (
                    <DirectionsRenderer directions={directionsResponse} />
                )}
            </GoogleMap>
        </LoadScript>
    );
}

export default RealTimeMap;
