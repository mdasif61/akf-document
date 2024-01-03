import { useQuery } from "@tanstack/react-query";
import useAxiosProtact from "./useAxiosProtact";

const useMyAccount = () => {
  const [axiosProtact] = useAxiosProtact();
  const { data: myData, refetch } = useQuery(["my-account"],
  async () => {
    try {
      const res = await axiosProtact.get(`/api/member/my-account`);
      return res.data;
    } catch (error) {
      throw new Error("My Account Error :", error);
    }
  });
  return { myData, refetch };
};

export default useMyAccount;
