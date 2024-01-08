import SideBar from "../../SideBar";
import dashboardAnim from "../../../../public/animation/dashboardAnim.json";
import { useLottie } from "lottie-react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserProvider } from "../../context/AuthContext";
import defaultProfile from "../../../../public/images/profile-web.jpg";

const Admin = () => {
  const { currentUser } = useContext(UserProvider);
  console.log(currentUser);

  const options = {
    animationData: dashboardAnim,
    loop: true,
  };

  const { View } = useLottie(options);

  return (
    <SideBar>
      <div className="w-6/12 mx-auto">{View}</div>
      <div className="mx-auto w-full text-center">
        <h1 className="text-2xl font-semibold text-gray-700 mb-5">
          Hi <span className="font-bold">{currentUser?.name}!</span> What&apos;s
          Your Next Plan?
        </h1>
        <div>
          <Link to="/dashboard/all-users">
            <button className="btn hover:border hover:border-black rounded-none bg-black text-white hover:bg-white hover:text-black outline-none">
              See All Users
            </button>
          </Link>
          <Link to="/dashboard/manage-user">
            <button className="btn hover:border hover:border-black rounded-none bg-black text-white hover:bg-white hover:text-black outline-none">
              Manage Users
            </button>
          </Link>
        </div>
        <div className="flex items-center flex-col justify-center my-10">
          <div className="avatar">
            <div className="w-16 border-gray-700 border-4 rounded-full">
              <img src={currentUser?.photo || defaultProfile} />
            </div>
          </div>
          <div className="text-center text-gray-700">
            <span className="m-0">
              <FontAwesomeIcon
                className="font-bold mr-1"
                icon={faUser}
              />{" "}
              {currentUser?.name}
            </span>
            <br />
            <span className="m-0">
              <FontAwesomeIcon
                className="font-bold mr-1"
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

export default Admin;
