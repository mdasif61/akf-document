import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useAdmin = () => {

  const { data: isAdmin, isLoading: adminLoading } = useQuery(
    ["isAdmin"],
    async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/member/isAdmin`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
              "Content-Type": "application/json",
            },
          }
        );
        return res.data.admin;
      } catch (error) {
        throw new Error("isAdmin Error :", error);
      }
    }
  );
  return { isAdmin, adminLoading };
};

export default useAdmin;
