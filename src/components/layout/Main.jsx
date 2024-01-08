import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { useContext } from "react";
import { UserProvider } from "../context/AuthContext";

const Main = () => {
    const location = useLocation();
    const {currentUser}=useContext(UserProvider);

    const navBarShowCond = location.pathname !== '/' || currentUser;

    return (
        <div>
            {navBarShowCond && <Navbar/>}
            <Outlet></Outlet>
        </div>
    );
};

export default Main;