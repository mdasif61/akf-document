import akfLogo from "../../../public/images/akf logo.jpg";
import loginAnim from "../../../public/animation/Animation - 1700473818664.json";
import { useLottie } from "lottie-react";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserProvider } from "../context/AuthContext";

const Display = () => {
  const location = useLocation();
  const { currentUser } = useContext(UserProvider);
  const loginAndSignUpCond = location.pathname !== "/" || !currentUser;

  const options = {
    animationData: loginAnim,
    loop: true,
  };

  const { View } = useLottie(options);

  return (
    <div className="bg-white h-screen w-full flex">
      <div className="p-20 w-1/2">
        <img src={akfLogo} alt="logo" />
      </div>
      <div className="bg-gray-100 relative w-1/2 p-20 flex flex-col items-center justify-center">
        <div>{View}</div>
        {loginAndSignUpCond && (
          <div className="absolute bottom-10">
            <Link to="/login">
              <button className="bg-blue-600 w-32 hover:bg-blue-800 border-none outline-none rounded-none m-1 btn text-white font-bold">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-red-600 w-32 hover:bg-red-800 border-none outline-none rounded-none m-1 btn text-white font-bold">
                Signup
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Display;
