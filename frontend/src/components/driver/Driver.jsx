import { Routes, Route } from 'react-router-dom';
import DriverHomePage from './DriverHomePage';
import UserInfo from './UserInfo';
import RideRequestDialog from './RideRequestDialog';
import { useEffect, useState } from 'react';
import { ACCESS_TOKEN_STORAGE_KEY } from '../../config';

export const Driver = () => {
    const [rideDetails, setRideDetails] = useState(null);
    const data = {
        pickupLocation: "30495 Samantha Plains\nSouth Mary, CA 87658",
        dropoffLocation: "12036 Jayne Roads\nNew John, MT 77877",
        distance: 34.76,
        estimatedTime: 62,
        fare: 85.45,
        passengerName: "Ronald Johnson",
        passengerContact: "(613) 951-7163"
    }
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };
    const token = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)
    const eventSource = new EventSource(`http://0.0.0.0:8000/api/v1/drivers/new_ride?token=${token}`);

    eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setRideDetails({
            pickupLocation: data.pickupLocation,
            dropoffLocation: data.dropoffLocation,
            distance: data.distance,
            estimatedTime: '18 min',
            fare: 2385.45,
            passengerName: data.user.name,
            passengerContact: data.user.phone
        })
    };

    eventSource.onerror = (error) => {
        console.error("SSE Error:", error);
    };

    function onAccept() {
        setRideDetails(null)
    }
    function onDecline() {
        setRideDetails(null)

    }
    return (
        <>
            <RideRequestDialog open={rideDetails ? true : false} onDecline={onDecline} onAccept={onAccept} rideDetails={data} />
            <Routes>
                <Route path="homepage/*" element={<DriverHomePage />} />
            </Routes>
        </>
    );
};
