import VehicleInfo from './VehicleInfo';
import CustomMap from '../common/CustomMap';

const UserInfo = () => {
    const ride = {
        pickup_location: '123 Main St, San Francisco, CA',
        dropoff_location: '456 Oak St, Oakland, CA',
        user: {
            name: 'Jane Smith',
            contact_number: '+1 (555) 987-6543',
        },
        status: 'Pending',
        distance: 15.3,
        eta: 25,
        fare: 30.00,
        additional_charges: 5.00,
        total_price: 35.00,
        driver: {
            name: 'John Doe',
            contact_number: '+1 (555) 123-4567',
        },
    };

    return (
        <div className="w-full flex md:flex-col lg:flex-row mt-24 [&>*]:w-1/2 items-center justify-center">
            <VehicleInfo ride={ride} />
            <div className='md:w-full'>
                <CustomMap />
            </div>
        </div>
    );
};

export default UserInfo;
