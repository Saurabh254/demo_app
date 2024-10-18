import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const AddVehicleDialog = () => {
    const [open, setOpen] = useState(false);
    function onAccept() { }
    const [formData, setFormData] = useState({
        license_number: '',
        registration_number: '',
        capacity: ''
    });

    // Handle form changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Submit data
    const handleSubmit = () => {
        // Ensure all fields are filled
        if (formData.license_number && formData.registration_number && formData.capacity) {
            onAccept(formData);
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <Dialog open={open} className="relative z-10">
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
                                        You need to Add Vehicle Inorder to move forward
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <form className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    License Number
                                                </label>
                                                <input
                                                    type="text"
                                                    name="license_number"
                                                    value={formData.license_number}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Registration Number
                                                </label>
                                                <input
                                                    type="text"
                                                    name="registration_number"
                                                    value={formData.registration_number}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Capacity (kg)
                                                </label>
                                                <input
                                                    type="number"
                                                    name="capacity"
                                                    value={formData.capacity}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                                                    required
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                onClick={handleSubmit}
                                className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Add Vehicle
                            </button>

                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default AddVehicleDialog;
