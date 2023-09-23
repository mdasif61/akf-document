import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useChartAccount = () => {
    const {data:chartData,refetch}=useQuery(['chart-total'],
    async()=>{
        try {
            const res=await axios.get('http://localhost:5000/api/member/chart-total')
            return res.data;
        } catch (error) {
            throw new Error('Chart-Total_error :', error)
        }
    }
    )
    return {chartData,refetch}
};

export default useChartAccount;