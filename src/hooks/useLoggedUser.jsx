import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useLoggedUser = () => {
    const { data: currentUser, refetch, isLoading:userLoading } = useQuery(['user'],
        async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/member/user', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                    }
                })
                return res.data
            } catch (error) {
                throw new Error('please login :', error)
            }
        },
        {
            enabled:!! localStorage.getItem('jwtToken')
        }
    )
    return { currentUser, refetch, userLoading }
};

export default useLoggedUser;