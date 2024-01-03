import { useQuery } from "@tanstack/react-query";
import useAxiosProtact from "./useAxiosProtact";

const useAuthor = () => {
    const [axiosProtact]=useAxiosProtact();
    const {data:isAuthor,refetch}=useQuery(['isAuthor'],
    async()=>{
        try {
            const res=await axiosProtact.get('/api/member/isAuthor');
            return res.data.author
        } catch (error) {
            throw new Error(`Author Error : `, error)
        }
    }
    );
    return {isAuthor,refetch}
};

export default useAuthor;