import akfLogo from "../../../public/images/akf logo.jpg";
import loginAnim from "../../../public/animation/Animation - 1700473818664.json";
import { useLottie } from "lottie-react";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserProvider } from "../context/AuthContext";
import useTitle from "../../hooks/useTitle";

const Display = () => {
  const location = useLocation();
  const { currentUser } = useContext(UserProvider);
  const loginAndSignUpCond = location.pathname !== "/" || !currentUser;
  useTitle(loginAndSignUpCond?'AKF- Started':"AKF- Home")

  const options = {
    animationData: loginAnim,
    loop: true,
  };

  const { View } = useLottie(options);

  return (
    <div className="bg-white md:h-screen h-auto w-full md:flex">
      <div className="p-20 md:w-1/2">
        <img src={akfLogo} alt="logo" />
      </div>
      <div className="md:bg-gray-100 bg-blue-700 relative md:w-1/2 p-20 flex flex-col items-center justify-center">
        <div>{View}</div>
        {loginAndSignUpCond && (
          <div className="absolute w-full flex items-center justify-center md:bottom-10 bottom-5">
            <Link to="/login">
              <button className="md:bg-blue-700 md:rounded-full w-96 rounded-none md:hover:bg-blue-800 bg-transparent border-1 border-blue-400 hover:bg-blue-900 hover:border-none md:border-none outline-none m-1 btn text-white font-bold">
                Get Started
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Display;
