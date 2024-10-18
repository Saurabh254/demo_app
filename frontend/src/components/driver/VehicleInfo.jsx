
const VehicleInfo = ({ ride }) => {
    return (
        <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
            <h1 className="text-2xl font-bold mb-4 text-center">Ride Information</h1>
            <table className="table-auto w-full text-left">
                <tbody>
                    <InfoRow label="Pickup Location:" value={ride.pickup_location} />
                    <InfoRow label="Drop-off Location:" value={ride.dropoff_location} />
                    <InfoRow label="User Name:" value={ride.user.name} />
                    <InfoRow label="User Contact Number:" value={ride.user.contact_number} />
                    <InfoRow label="Ride Status:" value={ride.status} />
                    <InfoRow label="Distance:" value={`${ride.distance} km`} />
                    <InfoRow label="Estimated Time of Arrival:" value={`${ride.eta} minutes`} />
                    <InfoRow label="Fare:" value={`Rs ${ride.fare}`} />
                    <InfoRow label="Additional Charges:" value={`Rs ${ride.additional_charges}`} />
                    <InfoRow label="Total Price:" value={`Rs ${ride.total_price}`} />
                    <InfoRow label="Driver Name:" value={ride.driver.name} />
                    <InfoRow label="Driver Contact Number:" value={ride.driver.contact_number} />
                </tbody>
            </table>
        </div>
    );
};

const InfoRow = ({ label, value }) => (
    <tr className="border-b">
        <th className="p-2 font-semibold text-gray-700">{label}</th>
        <td className="p-2 text-gray-600">{value}</td>
    </tr>
);

export default VehicleInfo;
