import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import MarkerCar from '../../assets/car_top_view.png';
import { GOOGLE_MAPS_API_KEY } from '../../config';

const containerStyle = {
    width: '600px',
    height: '600px',
};

function CustomMap() {
    const [location, setLocation] = useState({ lat: null, lng: null });
    const [error, setError] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);


    // Two marker positions
    const markerA = {
        lat: 21.745,
        lng: 70.523,
    };
    const center = { ...markerA }

    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLocation({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                        setError(null);
                    },
                    (error) => {
                        setError(error.message);
                    }
                );
            } else {
                setError("Geolocation is not supported by this browser.");
            }
        };

        // Get location initially and every 5 seconds (5000 ms)
        getLocation();
        const intervalId = setInterval(getLocation, 5000);

        return () => clearInterval(intervalId);
    }, []);


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GOOGLE_MAPS_API_KEY, // Add your Google Maps API Key here
    });

    const [map, setMap] = useState(null);

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    // Request directions between markerA and current location
    useEffect(() => {
        if (isLoaded && location.lat && location.lng) {
            const directionsService = new window.google.maps.DirectionsService();
            directionsService.route(
                {
                    origin: markerA,
                    destination: location,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === 'OK') {
                        setDirectionsResponse(result);
                    } else {
                        console.error(`Error fetching directions: ${status}`);
                    }
                }
            );
        }
    }, [isLoaded]);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onUnmount={onUnmount}
        >
            {/* Marker A */}
            <Marker position={markerA} />

            {/* Marker for the current location with a custom icon */}
            {location.lat && location.lng && (
                <Marker
                    position={location}
                    icon={{
                        url: MarkerCar, // Custom image URL
                        scaledSize: new window.google.maps.Size(50, 50), // Adjust size
                    }}
                />
            )}

            {/* Show the directions between markerA and the current location */}
            {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
            )}
        </GoogleMap>
    ) : <></>;
}

export default React.memo(CustomMap);
