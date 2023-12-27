import { useQuery } from "@tanstack/react-query";
import useAxiosProtact from "./useAxiosProtact";

const useAllUserGet = () => {
    const [axiosProtact]=useAxiosProtact()
    
    const {data:allUser, refetch, isLoading:userLoading}=useQuery(['all-user'],
    async()=>{
        try {
            const res=await axiosProtact.get('http://localhost:5000/api/member/all-user')
            return res.data;
        } catch (error) {
            throw new Error ('all user error: ', error)
        }
    }
    )
    return {allUser,refetch,userLoading}
};

export default useAllUserGet;