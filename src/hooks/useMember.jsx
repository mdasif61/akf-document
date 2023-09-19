import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useMember = () => {
    const {data:member=[], refetch}=useQuery(['members'],
    async()=>{
        try {
            const res=await axios.get(`http://localhost:5000/api/member/members`);
            return res.data;
        } catch (error) {
            console.log(error)
        }
    }
    );
    return {member,refetch}
};

export default useMember;