import { useQuery } from "@tanstack/react-query";
import useAxiosProtact from "./useAxiosProtact";

const useSingleMonth = (monthName,year) => {
  const [axiosProtact] = useAxiosProtact();
  const {
    data: singleMonth = [],
    refetch,
    isError,
    isLoading,
    isFetching,
  } = useQuery(["single-month", monthName,year], async () => {
    try {
      if (!monthName) {
        return {};
      }
      const res = await axiosProtact.get(
        `/api/member/single-month/${monthName}?year=${year}`
      );
      return res.data;
    } catch (error) {
      throw new Error("Single Month Error : ", error);
    }
  });
  return { singleMonth, refetch, isError, isLoading, isFetching };
};

export default useSingleMonth;
