import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MapComponent from './MapComponent'; // Import the new MapComponent
import { create_drive, get_nearby_vehicle } from '../../utils/api';


const NearbyVehicles = ({ vehicles, selectedVehicle, setSelectedVehicle }) => {
    console.log(selectedVehicle)
    return (
        <div className="mt-5">
            <h3 className="text-lg">Nearby Vehicles:</h3>
            <table className="min-w-full mt-3 border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 text-left">Vehicle Number</th>
                        <th className="px-4 py-2 text-left">Driver Name</th>
                        <th className="px-4 py-2 text-left">Capacity</th>
                        <th className="px-4 py-2 text-left">Select</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicles.length > 0 && vehicles.map((vehicle) => (
                        <tr key={vehicle.id} className="border-b">
                            <td className="px-4 py-2">{vehicle.licenseNumber}</td>
                            <td className="px-4 py-2">{vehicle.driver.name}</td>
                            <td className="px-4 py-2">{vehicle.capacity * 100} kg</td>
                            <td className="px-4 py-2">
                                <button
                                    type="button"
                                    onClick={() => setSelectedVehicle(vehicle)}
                                    className={`px-2 py-1 rounded ${selectedVehicle && selectedVehicle.id === vehicle.id ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}
                                >
                                    {selectedVehicle && selectedVehicle.id === vehicle.id ? 'Selected' : 'Select'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
const NewRidePage = () => {
    const navigate = useNavigate();
    const [pickupLocation, setPickupLocation] = useState({ lat: 0, lng: 0 });
    const [dropOffLocation, setDropOffLocation] = useState({ lat: 0, lng: 0 });
    const [submitted, setSubmitted] = useState(false);
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [stage, setStage] = useState(0);
    useEffect(() => {
        // Get the current location when the component mounts
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setPickupLocation({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        }
    }, []);

    const fetchNearbyVehicles = async (lat, lng) => {
        try {
            const response = await get_nearby_vehicle(lat, lng, 5);
            console.log('these are drivers', response.data)
            setVehicles(response.data);
        } catch (error) {
            console.error('Error fetching nearby drivers:', error);
        }
    };

    const handleMapClick = (event) => {
        const { lat, lng } = event.latLng.toJSON();
        if (stage == 0) {
            setPickupLocation({ lat, lng })
        }
        else if (stage == 1) {

            setDropOffLocation({ lat, lng });
        }
    };

    const handleSearch = () => {
        if (stage == 1) {

            fetchNearbyVehicles(pickupLocation.lat, pickupLocation.lng);
        } else {
            alert('Select your pickup location')
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log(selectedVehicle)
        const rideData = {
            driver_id: selectedVehicle.driver.id,
            vehicle_id: selectedVehicle.id,
            pickup_location: {
                longitude: pickupLocation.lng,
                latitude: pickupLocation.lat,
            },
            dropoff_location: {
                longitude: dropOffLocation.lng,
                latitude: dropOffLocation.lat,
            }
        };
        console.log('Submitting ride data:', rideData);
        const response = await create_drive(rideData)
        if (response.status == 200) {

            navigate(`/user/homepage/${selectedVehicle.driverId}`)
        }
        setSubmitted(true);
        navigate('/user/homepage');
    };
    const handlePickUpStage = () => {
        if (stage == 0) {
            setStage(1)
        } else {

            console.log('Your are ready to navigate')
        }
    }
    return (
        <div className="min-h-screen bg-gray-100 p-5">
            <header className="bg-white shadow p-4 rounded">
                <h1 className="text-2xl font-bold">New Ride</h1>
            </header>

            <div className="mt-5 bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold">Select Locations</h2>

                <MapComponent
                    location={pickupLocation}
                    dropoff_location={dropOffLocation}
                    onMapClick={handleMapClick}
                    stage={stage}// Handle click for setting drop-off location
                    allVehicles={vehicles} // Pass nearby drivers' locations to the map
                />

                <form onSubmit={handleSubmit} className="mt-5">
                    <h3 className="text-lg">Selected Pickup Location:</h3>
                    <p>Latitude: {pickupLocation.lat}, Longitude: {pickupLocation.lng}</p>

                    <h3 className="text-lg mt-4">Selected Drop-off Location:</h3>
                    <p>Latitude: {dropOffLocation.lat}, Longitude: {dropOffLocation.lng}</p>
                    <div>

                        <button
                            type="button"
                            onClick={handleSearch}
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Search Nearby Drivers
                        </button>

                        <button
                            type="submit"
                            className="mt-4 ml-8 bg-green-500 text-white px-4 py-2 rounded"
                            disabled={stage == 0 ? false : !selectedVehicle} // Disable if no driver is selected
                            onClick={handlePickUpStage}
                        >
                            {stage == 0 ? 'Confirm Pickup location?' : "Confirm Drop location"}
                        </button>
                    </div>

                    {vehicles.length > 0 && (
                        <NearbyVehicles
                            vehicles={vehicles}
                            selectedVehicle={selectedVehicle}
                            setSelectedVehicle={setSelectedVehicle}
                        />
                    )}

                </form>

                {submitted && <p className="mt-3 text-green-600">Ride request submitted successfully!</p>}
            </div>
        </div>
    );
};

export default NewRidePage;
