import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/outline";

import { get_my_vehicle, update_vehicle_data } from "../../utils/api";

const VehicleDialog = ({ setShowVehicleDialog }) => {
    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVehicle = async () => {
            const response = await get_my_vehicle();
            console.log(response.data);
            if (response.status === 200) {
                setVehicle(response.data);
            } else if (response.status === 404) {
                setVehicle(null); // No vehicle found
            }
            setLoading(false);
        };

        fetchVehicle();
    }, []);

    if (loading) {
        return <div></div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            {vehicle ? (
                <UpdateVehicleComponent
                    setShowVehicleDialog={setShowVehicleDialog}
                    vehicle={vehicle}
                />
            ) : (
                <AddVehicleComponent setShowVehicleDialog={setShowVehicleDialog} />
            )}
        </>
    );
};

const UpdateVehicleComponent = ({ vehicle, setShowVehicleDialog }) => {
    const [open, setOpen] = useState(true);
    const [licenseNumber, setLicenseNumber] = useState(vehicle.licenseNumber);
    const [registrationNumber, setRegistrationNumber] = useState(
        vehicle.registrationNumber
    );
    const [capacity, setCapacity] = useState(vehicle.capacity);
    const onDecline = () => {
        setOpen(false);
        setShowVehicleDialog(false);
    };
    const onAccept = async (updatedVehicle) => {
        if (
            updatedVehicle.licenseNumber == vehicle.licenseNumber ||
            updatedVehicle.registrationNumber == vehicle.registrationNumber ||
            updatedVehicle.capacity == vehicle.capacity
        ) {
            const data = {
                "license_number": updatedVehicle.licenseNumber,
                "registration_number": updatedVehicle.registrationNumber,
                "capacity": updatedVehicle.capacity,
            }
            const response = await update_vehicle_data(vehicle.id, data)
            if (response.status == 200 || response.status == 204) {
                alert('Updated Vehicle data successfully');
            } else {
                alert('failed to updated the data')
            }
            setShowVehicleDialog(false);
            setOpen(false);
        }
    };

    const handleUpdate = async () => {
        const updatedVehicle = {
            ...vehicle,
            licenseNumber: licenseNumber,
            registrationNumber: registrationNumber,
            capacity: capacity,
        };
        console.log(updatedVehicle)
        await onAccept(updatedVehicle); // Pass the updated vehicle data to the parent
    };
    return (
        <Dialog open={open} onClose={onDecline} className="relative z-10">
            <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <ExclamationTriangleIcon
                                        aria-hidden="true"
                                        className="h-6 w-6 text-red-600"
                                    />
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle
                                        as="h3"
                                        className="text-base font-semibold leading-6 text-gray-900"
                                    >
                                        Update Vehicle Information
                                    </DialogTitle>
                                    <div className="mt-4 overflow-x-auto">
                                        <table className="min-w-full border border-gray-200">
                                            <thead>
                                                <tr>
                                                    <th className="border-b px-4 py-2 text-left">
                                                        Field
                                                    </th>
                                                    <th className="border-b px-4 py-2 text-left">
                                                        Value
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="border-b px-4 py-2">License Number</td>
                                                    <td className="border-b px-4 py-2 flex items-center">
                                                        <input
                                                            type="text"
                                                            value={licenseNumber}
                                                            onChange={(e) => setLicenseNumber(e.target.value)}
                                                            className="border rounded p-1 w-full"
                                                        />
                                                        <PencilIcon
                                                            className="h-5 w-5 text-gray-500 cursor-pointer ml-2"
                                                            onClick={() => setLicenseNumber(licenseNumber)}
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="border-b px-4 py-2">
                                                        Registration Number
                                                    </td>
                                                    <td className="border-b px-4 py-2 flex items-center">
                                                        <input
                                                            type="text"
                                                            value={registrationNumber}
                                                            onChange={(e) =>
                                                                setRegistrationNumber(e.target.value)
                                                            }
                                                            className="border rounded p-1 w-full"
                                                        />
                                                        <PencilIcon
                                                            className="h-5 w-5 text-gray-500 cursor-pointer ml-2"
                                                            onClick={() =>
                                                                setRegistrationNumber(registrationNumber)
                                                            }
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="border-b px-4 py-2">Capacity</td>
                                                    <td className="border-b px-4 py-2 flex items-center">
                                                        <input
                                                            type="number"
                                                            value={capacity}
                                                            onChange={(e) => setCapacity(e.target.value)}
                                                            className="border rounded p-1 w-full"
                                                        />
                                                        <PencilIcon
                                                            className="h-5 w-5 text-gray-500 cursor-pointer ml-2"
                                                            onClick={() => setCapacity(capacity)}
                                                        />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button onClick={handleUpdate} className="btn btn-green">
                                Update
                            </button>
                            <button onClick={onDecline} className="btn btn-red">
                                Cancel
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export const AddVehicleComponent = ({ setShowVehicleDialog }) => {
    const [open, setOpen] = useState(true);

    const onDecline = () => setOpen(false);
    setShowVehicleDialog(false);
    const onAccept = () => {
        // Handle the add vehicle logic here
        setShowVehicleDialog(false);
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={onDecline} className="relative z-10">
            <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <ExclamationTriangleIcon
                                        aria-hidden="true"
                                        className="h-6 w-6 text-red-600"
                                    />
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle
                                        as="h3"
                                        className="text-base font-semibold leading-6 text-gray-900"
                                    >
                                        Add New Vehicle
                                    </DialogTitle>
                                    <div>{/* Add form fields to add vehicle information */}</div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button onClick={onAccept} className="btn btn-green">
                                Add Vehicle
                            </button>
                            <button onClick={onDecline} className="btn btn-red">
                                Cancel
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default VehicleDialog;
