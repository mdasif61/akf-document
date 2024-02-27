import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SideBar from "../../SideBar";
import { UserProvider } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import defaultProfile from "../../../../public/images/profile-web.jpg";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { LinearGradient } from "react-text-gradients";
import useTitle from "../../../hooks/useTitle";

const User = () => {
  useTitle("AKF- User Dashboard")
  const { currentUser } = useContext(UserProvider);

  return (
    <SideBar>
      <div className="mx-auto w-full flex flex-col min-h-screen items-center justify-center text-center">
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-2 gap-2">
            <div className="w-12 h-12 bg-black"></div>
            <div className="w-12 h-12 bg-black"></div>
            <div className="w-12 h-12 bg-black"></div>
            <div className="w-12 h-12 bg-black"></div>
          </div>
        </div>
        <h1 className="text-2xl my-7 font-semibold text-gray-700">
          <LinearGradient gradient={["to left", "#19acff ,#ff68f0"]}>
            Hi <span className="font-bold">{currentUser?.name}!</span>{" "}
            What&apos;s Your Next Plan?
          </LinearGradient>
        </h1>
        <div className="mb-4">
          <Link to="/dashboard/my-accounts">
            <button className="btn hover:border hover:border-black rounded-none bg-black text-white hover:bg-white hover:text-black  outline-none">
              My Acounts
            </button>
          </Link>
          <Link to="/">
            <button className="btn hover:border hover:border-black rounded-none bg-black text-white hover:bg-white hover:text-black outline-none">
              Back to home
            </button>
          </Link>
        </div>
        <div className="flex items-center flex-col justify-center my-20">
          <div className="avatar mb-2">
            <div className="w-16 border-gray-700 border-4 rounded-full">
              <img src={currentUser?.photo || defaultProfile} />
            </div>
          </div>
          <div className="text-center">
            <span className="m-0 text-gray-700 font-bold">
              <FontAwesomeIcon
                className="font-bold mr-1 text-gray-700"
                icon={faUser}
              />{" "}
              {currentUser?.name}
            </span>
            <br />
            <span className="m-0 text-gray-700">
              <FontAwesomeIcon
                className="font-bold mr-1 text-gray-700"
                icon={faEnvelope}
              />{" "}
              {currentUser?.email}
            </span>
            <br />
          </div>
        </div>
      </div>
    </SideBar>
  );
};

export default User;
