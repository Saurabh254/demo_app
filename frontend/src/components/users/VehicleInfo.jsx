import { useEffect } from "react";
import CustomMap from "../common/CustomMap";
import RealTimeMap from "../common/RealTimeMap";

const DriveInformation = ({ ride }) => {
    return (
        <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <h1 className="text-2xl font-bold mb-4 text-center">Ride Information</h1>
            <table className="table-auto w-full text-left">
                <tbody>
                    {/* Ride Info */}
                    <InfoRow label="Ride ID:" value={ride.id} />
                    <InfoRow label="Ride Status:" value={ride.status} />
                    <InfoRow label="Pickup Location (Lat, Long):" value={`${ride.pickup_location.latitude}, ${ride.pickup_location.longitude}`} />
                    <InfoRow label="Drop-off Location (Lat, Long):" value={`${ride.dropoff_location.latitude}, ${ride.dropoff_location.longitude}`} />
                    <InfoRow label="Created At:" value={new Date(ride.created_at).toLocaleString()} />
                    <InfoRow label="Updated At:" value={new Date(ride.updated_at).toLocaleString()} />

                    {/* Driver Info */}
                    <h2 className="text-xl font-semibold mt-6 mb-3 text-center">Driver Information</h2>
                    <InfoRow label="Driver Name:" value={ride.driver.name} />
                    <InfoRow label="Driver ID:" value={ride.driver.id} />

                    {/* Vehicle Info */}
                    <h2 className="text-xl font-semibold mt-6 mb-3 text-center">Vehicle Information</h2>
                    <InfoRow label="Vehicle ID:" value={ride.vehicle.id} />
                    <InfoRow label="License Number:" value={ride.vehicle.license_number} />
                    <InfoRow label="Registration Number:" value={ride.vehicle.registration_number} />
                    <InfoRow label="Capacity:" value={`${ride.vehicle.capacity * 1000} kg`} />
                    <InfoRow label="Vehicle Location (Lat, Long):" value={`${ride.vehicle.location.latitude}, ${ride.vehicle.location.longitude}`} />
                </tbody>
            </table>
        </div>
    );
};

const InfoRow = ({ label, value }) => (
    <tr>
        <td className="font-semibold pr-4 py-2">{label}</td>
        <td className="py-2">{value}</td>
    </tr>
);
const RenderMapWithWebsocket = (user_id, dropoff_location) => {
    console.log(user_id)
    return <RealTimeMap endpoint={`drivers/ws/${user_id}`} location_b={dropoff_location} />
}
const VehicleInfo = () => {
    const what = {
        "status": "completed",
        "driver_id": "DRIVER-123",
        "id": "RIDE-456",
        "user": {
            "name": "Alice Johnson",
            "id": "USER-789",
            "created_at": "2024-10-15T08:30:00.000Z",
            "updated_at": "2024-10-15T09:00:00.000Z"
        },
        "driver": {
            "name": "Bob Smith",
            "id": "DRIVER-123",
            "created_at": "2024-10-16T10:00:00.000Z",
            "updated_at": "2024-10-16T10:30:00.000Z"
        },
        "pickup_location": {
            "longitude": -73.935242,
            "latitude": 40.730610
        },
        "dropoff_location": {
            "longitude": -73.991379,
            "latitude": 40.750582
        },
        "created_at": "2024-10-17T08:00:00.000Z",
        "updated_at": "2024-10-17T08:45:00.000Z",
        "vehicle": {
            "id": "VEHICLE-555",
            "license_number": "XYZ-987",
            "registration_number": "REG-001",
            "capacity": 4,
            "driver_id": "DRIVER-123",
            "location": {
                "latitude": 40.735657,
                "longitude": -74.172366
            }
        }
    }

    return <div className="h-full  flex items-center  justify-evenly mt-8 px-24">
        <DriveInformation ride={what} />
        <RenderMapWithWebsocket dropoff_location={what.dropoff_location} user_id={what.driver.id} />
    </div>
}

export default VehicleInfo;
