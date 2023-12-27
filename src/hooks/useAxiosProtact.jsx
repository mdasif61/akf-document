import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const axiosProtact = axios.create({
  baseURL: "http://localhost:5000/",
});

const useAxiosProtact = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axiosProtact.interceptors.request.use((config) => {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    axiosProtact.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/");
        }
        return Promise.reject(error);
      }
    );
  }, [navigate]);
  return [axiosProtact];
};

export default useAxiosProtact;
