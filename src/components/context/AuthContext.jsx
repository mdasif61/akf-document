import { createContext } from "react";
import useLoggedUser from "../../hooks/useLoggedUser";

export const UserProvider=createContext(null)
const AuthContext = ({children}) => {

    const {currentUser, userLoading}=useLoggedUser();

    const info={
        currentUser,
        userLoading
    }
    
    return (
        <UserProvider.Provider value={info}>
            {children}
        </UserProvider.Provider>
    )
};

export default AuthContext;