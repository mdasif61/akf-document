import { useQuery } from "@tanstack/react-query";
import useAxiosProtact from "./useAxiosProtact";

const useAdmin = () => {
  const [axiosProtact]=useAxiosProtact()
  const { data: isAdmin, isLoading: adminLoading, refetch } = useQuery(
    ["isAdmin"],
    async () => {
      try {
        const res = await axiosProtact.get(
          `/api/member/isAdmin`);
        return res.data.admin;
      } catch (error) {
        throw new Error("isAdmin Error :", error);
      }
    }
  );
  return { isAdmin, adminLoading, refetch };
};

export default useAdmin;
