import { useEffect, useState } from "react";
import { getRides } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const Table = ({ drives }) => {
    const navigate = useNavigate();
    function handleViewButton(drive_id) {
        return () => {
            navigate(`${drive_id}`)
        }
    }
    return <div className="overflow-x-auto px-24">
        < table className="table w-full" >
            <thead>
                <tr>
                    <th>Status</th>
                    <th>Driver ID</th>
                    <th>Drive ID</th>
                    <th>User Name</th>
                    <th>User ID</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {drives.map((drive) => (
                    <tr key={drive.id}>
                        <td>{drive.status}</td>
                        <td>{drive.driverId}</td>
                        <td>{drive.id}</td>
                        <td>{drive.user.name}</td>
                        <td>{drive.user.id}</td>
                        <td>{new Date(drive.createdAt).toLocaleString()}</td>
                        <td>{new Date(drive.updatedAt).toLocaleString()}</td>
                        <td><button onClick={handleViewButton(drive.id)} className='btn btn-neutral btn-sm'> View</button></td>
                    </tr>
                ))}
            </tbody>
        </table >
    </div >
}


const DrivesTable = () => {
    const [drives, setDrives] = useState(null);
    useEffect(() => {
        async function fetchData() {
            const _drives = await getRides();
            setDrives(_drives);
        }
        fetchData();
    }, []);
    return <>
        {drives ? <Table drives={drives} /> : <div>Loading data </div>}
    </>

};

export default DrivesTable;
