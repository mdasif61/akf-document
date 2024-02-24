import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useMember = () => {
  const {
    data: member = [],
    refetch,
    isSuccess,
    isFetched,
  } = useQuery(["members"], async () => {
    try {
      const res = await axios.get(
        `https://akf-document-server.vercel.app/api/member/members`
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  });
  return { member, refetch, isFetched, isSuccess };
};

export default useMember;
