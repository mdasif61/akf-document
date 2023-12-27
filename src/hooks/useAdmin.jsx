import { useQuery } from "@tanstack/react-query";
import useAxiosProtact from "./useAxiosProtact";

const useAdmin = () => {
  const [axiosProtact]=useAxiosProtact()
  const { data: isAdmin, isLoading: adminLoading } = useQuery(
    ["isAdmin"],
    async () => {
      try {
        const res = await axiosProtact.get(
          `http://localhost:5000/api/member/isAdmin`);
        return res.data.admin;
      } catch (error) {
        throw new Error("isAdmin Error :", error);
      }
    }
  );
  return { isAdmin, adminLoading };
};

export default useAdmin;
