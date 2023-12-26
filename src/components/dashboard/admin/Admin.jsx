import SideBar from "../../SideBar";
import dashboardAnim from "../../../../public/animation/dashboardAnim.json";
import { useLottie } from "lottie-react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserProvider } from "../../context/AuthContext";

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
        <h1 className="text-2xl font-semibold text-blue-700">
          Hi <span className="font-bold">{currentUser?.name}!</span> What&apos;s
          Your Next Plan?
        </h1>
        <div className="my-4">
          <Link to="/dashboard/all-users">
            <button className="btn hover:border hover:border-black rounded-none bg-black text-white hover:bg-white hover:text-black  outline-none">
              See All Users
            </button>
          </Link>
          <Link to="/dashboard/manage-user">
            <button className="btn hover:border hover:border-black rounded-none bg-black text-white hover:bg-white hover:text-black outline-none">
              Manage Users
            </button>
          </Link>
        </div>
        <div className="flex space-x-5">
          <div className="w-10">
            <img src={currentUser?.photo} alt="user" />
          </div>
          <div className="flex flex-col items-start">
            <span className="m-0">
              <FontAwesomeIcon className="font-bold mr-1" icon={faUser} /> {currentUser?.name}
            </span>
            <br />
            <span className="m-0">
              <FontAwesomeIcon className="font-bold mr-1" icon={faEnvelope} /> {currentUser?.email}
            </span>
            <br />
          </div>
        </div>
      </div>
    </SideBar>
  );
};

export default Admin;
