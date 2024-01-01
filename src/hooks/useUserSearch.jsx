import { useQuery } from "@tanstack/react-query";
import useAxiosProtact from "./useAxiosProtact";

const useUserSearch = (searchData) => {
    const [axiosProtact]=useAxiosProtact()
    const {data:user=[],refetch}=useQuery(['search-user',searchData],
    async()=>{
        try {
            const res=await axiosProtact.get(`/api/member/search-user/${searchData}`)
            return res.data
        } catch (error) {
            throw new Error(error)
        }
    }
    )
    return {user,refetch}
};

export default useUserSearch;