import { useNavigate } from "react-router-dom";
import { logout_user } from "../../utils/api";

export const DriverHeader = ({ showVechileDialog, setShowVehicleDialog }) => {
    const navigate = useNavigate();
    return <div className="navbar bg-base-100 border-b-2 border-gray-200 px-8 flex">
        <a className="btn btn-ghost text-xl">Welcome to Sonnet</a>
        <button className='btn btn-sm btn-neutral ml-auto' onClick={async () => {
            setShowVehicleDialog(showVechileDialog ? false : true);
        }}>Manage vehicle</button>
        <button className='btn btn-sm btn-neutral ml-8' onClick={async () => {
            logout_user();
            navigate('/')
        }}>Logout</button>
    </div>
}


export const UserHeader = () => {
    const navigate = useNavigate();
    return <div className="navbar bg-base-100 border-b-2  border-gray-200 px-8 flex">
        <a className="btn btn-ghost text-xl">Welcome to Sonnet</a>
        <button
            className=" ml-auto  bg-green-500  hover:bg-green-600 btn btn-sm text-white px-3 py-1 rounded"
            onClick={() => {
                navigate(
                    'new-ride'
                )
            }}
        >
            Book a New Ride
        </button>
        <button className='btn btn-sm btn-neutral ml-8' onClick={async () => {
            logout_user();
            navigate('/')
        }}>Logout</button>
    </div>
}
