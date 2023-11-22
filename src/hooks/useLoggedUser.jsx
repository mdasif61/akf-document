import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useLoggedUser = () => {

    const token = localStorage.getItem('jwtToken');

    const { data: currentUser, refetch, isLoading: userLoading } = useQuery(['user'],
        async () => {
            if (!token) {
                return { currentUser: null, refetch: () => { }, userLoading: false }
            }
            try {
                const res = await axios.get('http://localhost:5000/api/member/user', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                return res.data
            } catch (error) {
                throw new Error('please login :', error)
            }
        }
    )
    return { currentUser, refetch, userLoading }
};

export default useLoggedUser;