import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate=useNavigate()

    const handleLogout=async()=>{
        try {
            const res=await axios.post('http://localhost:5000/api/member/logout',null,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('jwtToken')}`
                }
            })
            console.log(res)
            if(res?.data?.message=='logout successfull'){
                localStorage.removeItem('jwtToken');
                navigate('/login')
            }else{
                toast.error('logout failed')
            }
            
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }

    return (
        <div className="p-4 text-end">
            <div>
                <button onClick={handleLogout} className="btn btn-primary rounded-none">Logout</button>
            </div>
        </div>
    );
};

export default Navbar;