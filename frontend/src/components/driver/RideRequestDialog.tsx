import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import React from "react";

const RideRequestDialog = ({ open, onAccept, onDecline, rideDetails }) => {
  const {
    pickupLocation,
    dropoffLocation,
    distance,
    estimatedTime,
    fare,
    passengerName,
    passengerContact,
  } = rideDetails;

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
                    New Ride Request.
                  </DialogTitle>
                  <RideDetails
                    pickupLocation={pickupLocation}
                    dropoffLocation={dropoffLocation}
                    distance={distance}
                    estimatedTime={estimatedTime}
                    fare={fare}
                    passengerName={passengerName}
                    passengerContact={passengerContact}
                  />
                </div>
              </div>
            </div>
            <div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse gap-6 sm:px-6">
              <button
                onClick={onAccept}
                className="btn  bg-green-500 hover:bg-green-600 text-white font-semibold"
              >
                Accept
              </button>
              <button
                onClick={onDecline}
                className="btn  bg-red-500 hover:bg-red-600 text-white font-semibold"
              >
                Reject
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

const RideDetails = ({
  pickupLocation,
  dropoffLocation,
  distance,
  estimatedTime,
  fare,
  passengerName,
  passengerContact,
}) => (
  <table className="w-full text-left mb-4 mt-8">
    <tbody>
      <InfoRow label="Pickup Location:" value={pickupLocation} />
      <InfoRow label="Drop-off Location:" value={dropoffLocation} />
      <InfoRow label="Distance:" value={`${distance} km`} />
      <InfoRow label="Estimated Time:" value={`${estimatedTime} minutes`} />
      <InfoRow label="Ride Fare:" value={`Rs ${fare}`} />
      <InfoRow label="Passenger Name:" value={passengerName} />
      <InfoRow label="Passenger Contact:" value={passengerContact} />
    </tbody>
  </table>
);

const InfoRow = ({ label, value }) => (
  <tr>
    <th className="font-semibold py-2">{label}</th>
    <td>{value}</td>
  </tr>
);

export default RideRequestDialog;
