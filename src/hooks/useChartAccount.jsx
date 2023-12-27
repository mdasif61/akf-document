import { useQuery } from "@tanstack/react-query";
import useAxiosProtact from "./useAxiosProtact";

const useChartAccount = () => {
    const [axiosProtact]=useAxiosProtact()
    const {data:chartData,refetch}=useQuery(['chart-total'],
    async()=>{
        try {
            const res=await axiosProtact.get('http://localhost:5000/api/member/chart-total')
            return res.data;
        } catch (error) {
            throw new Error('Chart-Total_error :', error)
        }
    }
    )
    return {chartData,refetch}
};

export default useChartAccount;