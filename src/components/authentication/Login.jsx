import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../../public/images/akf logo.jpg";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import useTitle from "../../hooks/useTitle";

const Login = () => {
  useTitle('AKF- Login')
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      toast.error("please fill all fields");
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data, status } = await axios.post(
        "https://akf-document-server.vercel.app/api/member/login",
        { email, password },
        config
      );
      if (status == 200) {
        toast.success("login successfull");
        localStorage.setItem("jwtToken", data?.token);
        setLoading(false);
        navigate(from);
        window.location.reload();
      }
    } catch (error) {
      toast.error("login failed, try again");
    }
  };

  return (
    <div className="bg-white md:flex min-h-screen w-full">
      <div className="md:w-1/2 md:p-20 p-5 flex items-center justify-center">
        <img className="w-32 md:w-auto" src={logo} alt="" />
      </div>
      <form
        onSubmit={handleLogin}
        className="md:w-1/2 w-full p-10 flex flex-col justify-center md:bg-gray-100 space-y-10 items-center"
      >
        <h1 className="text-xl font-bold text-black">Login Now</h1>
        <div className="md:w-3/4 w-full h-12 mx-auto">
          <label htmlFor="email">
            <span className="font-semibold text-black">Your Email</span>
          </label>
          <br />
          <input
            className="px-4 w-full h-full focus:outline-none border bg-white focus:bg-gray-200 text-black font-semibold"
            type="email"
            name="email"
            id=""
            placeholder="Enter Your Email"
          />
        </div>

        <div className="md:w-3/4 w-full h-12 mx-auto">
          <label htmlFor="email">
            <span className="font-semibold text-black">Password</span>
          </label>
          <br />
          <input
            className="px-4 w-full h-full focus:outline-none border bg-white focus:bg-gray-200 text-black font-semibold"
            type="password"
            name="password"
            id=""
            placeholder="Password"
          />
        </div>

        <button
          disabled={loading}
          className="btn bg-blue-600 text-white border-none outline-none md:w-3/4 w-full mx-auto"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
