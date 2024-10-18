import { useEffect, useState } from 'react';
import DrivesTable from './DrivesTable';
import { getRides } from '../../utils/api';
import { DriverHeader } from '../common/Header';
import VehicleDialog from './UpdateVehicle';
import UserInfo from './UserInfo';
import { Routes, Route } from 'react-router-dom';

const DriverHomePage = () => {
    const [showVehicleDialog, setShowVehicleDialog] = useState(false);

    return (
        <>
            {showVehicleDialog && <VehicleDialog setShowVehicleDialog={setShowVehicleDialog} />}
            <DriverHeader showVehicleDialog={showVehicleDialog} setShowVehicleDialog={setShowVehicleDialog} />

            <Routes>
                <Route path='' element={<DrivesTable />} />
                <Route path=':driver_id' element={<UserInfo />} />
            </Routes>
        </>

    );
};

export default DriverHomePage;