import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const usePage = (id) => {
    const {data:pages=[],refetch,isLoading,isFetching}=useQuery(['all-page'],
    async()=>{
        let url=id?`http://localhost:5000/api/member/all-page/${id}`:`http://localhost:5000/api/member/all-page`
        const res=await axios.get(url)
        return res.data;
    }
    );
    return {pages,refetch,isLoading,isFetching}    
};

export default usePage;