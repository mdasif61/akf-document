import { useQuery } from "@tanstack/react-query";
import useAxiosProtact from "./useAxiosProtact";

const usePage = (id) => {
  const [axiosProtact] = useAxiosProtact();
  const {
    data: pages = [],
    refetch,
    isLoading,
    isFetching,
  } = useQuery(["all-page"], async () => {
    let url = id
      ? `https://akf-document-server.vercel.app/api/member/all-page/${id}`
      : `https://akf-document-server.vercel.app/api/member/all-page`;
    const res = await axiosProtact.get(url);
    return res.data;
  });
  return { pages, refetch, isLoading, isFetching };
};

export default usePage;
