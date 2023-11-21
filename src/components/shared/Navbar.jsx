import axios from "axios";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { UserProvider } from "../context/AuthContext";

const Navbar = () => {

    const navigate = useNavigate();
    const { currentUser } = useContext(UserProvider)

    const handleLogout = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/member/logout', null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            })
            console.log(res)
            if (res?.data?.message == 'logout successfull') {
                localStorage.removeItem('jwtToken');
                navigate('/login')
            } else {
                toast.error('logout failed')
            }

        } catch (error) {
            console.error('Error during logout:', error);
        }
    }

    return (
        <div className="p-4 text-end bg-gray-800">
            <ul className="flex items-center justify-end text-white space-x-5">
                <Link to='/'><li className="cursor-pointer">Home</li></Link>
                <Link to='/pages'><li className="cursor-pointer">Pages</li></Link>
                <Link to='/create'><li className="cursor-pointer">Create Page</li></Link>
                <li>{currentUser ? <button onClick={handleLogout} className="btn btn-primary rounded-none">Logout</button> : <button className="btn btn-primary rounded-none">Login</button>}</li>
                {!currentUser && <li><button className="btn bg-red-600 border-none text-white outline-none rounded-none">Signup</button></li>}
            </ul>
        </div>
    );
};

export default Navbar;