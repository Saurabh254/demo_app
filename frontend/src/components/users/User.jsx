import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../common/LoginForm';
import SignUpForm from '../common/SignUpForm';
import { UserHeader } from '../common/Header';
import UserHomePage from './UserHomePage';
import NewRidePage from './NewRide';
import VehicleInfo from './VehicleInfo';
const User = () => {
    return <>
        <UserHeader />
        <Routes>
            <Route path='homepage/:drive_id' element={<VehicleInfo />} />
            <Route path='homepage/' element={<UserHomePage />} />
            <Route path="/new-ride" element={<NewRidePage />} />

        </Routes>
    </>
}

export default User;