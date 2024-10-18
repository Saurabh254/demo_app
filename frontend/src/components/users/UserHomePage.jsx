import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import VehicleDialog from './VehicleDialog'; // Make sure to import your dialog component

const UserHomePage = () => {
    const navigate = useNavigate(); // Use the useNavigate hook for navigation
    const [showVehicleDialog, setShowVehicleDialog] = useState(false);

    const user = {
        name: "John Doe",
        id: "12345",
        created_at: "2024-10-17T06:47:21.008Z",
        updated_at: "2024-10-17T06:47:21.008Z"
    };

    const drives = [
        {
            status: "accepted",
            driver_id: "67890",
            id: "drive_001",
            user: {
                name: "Alice Smith",
                id: "54321",
                created_at: "2024-10-17T06:48:33.046Z",
                updated_at: "2024-10-17T06:48:33.046Z"
            },
            created_at: "2024-10-17T06:48:33.046Z",
            updated_at: "2024-10-17T06:48:33.046Z"
        }
        // Add more drive objects here as needed
    ];

    const currentDrive = drives[0]; // Example: assuming the first drive is the current one

    const handleBookRide = () => {
        setShowVehicleDialog(true); // Open the dialog to book a new ride
    };

    return (
        <div className="min-h-screen bg-gray-100 p-5">
            <header className="bg-white shadow p-4 rounded">
                <h1 className="text-2xl font-bold">Logistics System</h1>
            </header>

            <div className="mt-5 bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold">My Information</h2>
                <table className="min-w-full mt-3 border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 text-left">Field</th>
                            <th className="px-4 py-2 text-left">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="px-4 py-2 font-medium">Name</td>
                            <td className="px-4 py-2">{user.name}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="px-4 py-2 font-medium">ID</td>
                            <td className="px-4 py-2">{user.id}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="px-4 py-2 font-medium">Created At</td>
                            <td className="px-4 py-2">{new Date(user.created_at).toLocaleString()}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="px-4 py-2 font-medium">Updated At</td>
                            <td className="px-4 py-2">{new Date(user.updated_at).toLocaleString()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>



            <div className="mt-5 bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold">Current Drive</h2>
                {currentDrive ? (
                    <table className="min-w-full mt-3 border">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 text-left">Drive ID</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Driver ID</th>
                                <th className="px-4 py-2 text-left">User Name</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={currentDrive.id} className="border-b">
                                <td className="px-4 py-2">{currentDrive.id}</td>
                                <td className="px-4 py-2">{currentDrive.status}</td>
                                <td className="px-4 py-2">{currentDrive.driver_id}</td>
                                <td className="px-4 py-2">{currentDrive.user.name}</td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => navigate(`/user/homepage/${currentDrive.id}`)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <p>No current drive.</p>
                )}
            </div>

            <div className="mt-5 bg-white p-4 rounded shadow">
                <h2 className="text-xl font-semibold">Recent Drives</h2>
                <table className="min-w-full mt-3 border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2 text-left">Drive ID</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left">Driver ID</th>
                            <th className="px-4 py-2 text-left">User Name</th>
                            <th className="px-4 py-2 text-left">User ID</th>
                            <th className="px-4 py-2 text-left">Created At</th>
                            <th className="px-4 py-2 text-left">Updated At</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drives.map((drive) => (
                            <tr key={drive.id} className="border-b">
                                <td className="px-4 py-2">{drive.id}</td>
                                <td className="px-4 py-2">{drive.status}</td>
                                <td className="px-4 py-2">{drive.driver_id}</td>
                                <td className="px-4 py-2">{drive.user.name}</td>
                                <td className="px-4 py-2">{drive.user.id}</td>
                                <td className="px-4 py-2">{new Date(drive.created_at).toLocaleString()}</td>
                                <td className="px-4 py-2">{new Date(drive.updated_at).toLocaleString()}</td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => navigate(`${drive.id}`)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserHomePage;
