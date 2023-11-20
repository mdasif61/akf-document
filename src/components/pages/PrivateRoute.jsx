import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserProvider } from "../context/AuthContext";


const PrivateRoute = ({ children }) => {
    const {currentUser, userLoading}=useContext(UserProvider)
    const location = useLocation()
    if (userLoading) {
        return (
            <div className="w-full h-screen fixed flex items-center justify-center">
                <span className="loading loading-ring loading-lg"></span>
            </div>
        )
    }
    if (currentUser) {
        return children
    }

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;