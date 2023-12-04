import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { UserProvider } from "../context/AuthContext";
import profiles from "../../../public/images/profile-web.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserProvider);
  const [userProfile, setUserProfile] = useState(false);
  console.log(currentUser);

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/member/logout",
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        }
      );
      if (res?.data?.message == "logout successfull") {
        localStorage.removeItem("jwtToken");
        navigate("/login");
      } else {
        toast.error("logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="p-4 text-end relative bg-gray-800">
      <ul className="flex items-center justify-end text-white space-x-5">
        <Link to="/">
          <li className="cursor-pointer">Home</li>
        </Link>
        <Link to="/pages">
          <li className="cursor-pointer">Pages</li>
        </Link>
        <Link to="/create">
          <li className="cursor-pointer">Create Page</li>
        </Link>
        <li onClick={() => setUserProfile(!userProfile)}>
          <div className="cursor-pointer">
            <div title={currentUser?.name} className="avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={currentUser?.photo || profiles} />
              </div>
            </div>
          </div>
        </li>
      </ul>

      <div
        className={`absolute bg-gray-800 flex items-center justify-between min-h-[400px] duration-300 w-56 p-4 ${
          userProfile ? "right-0" : "-right-full"
        } top-20`}
      >
        <ul className="flex flex-col h-full w-full items-center space-y-2">
          <li>
            <div className="flex flex-col items-center space-y-3">
              <div className="avatar">
                <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={currentUser?.photo || profiles} />
                </div>
              </div>
              <p>
                <span className="font-bold">User :</span>{" "}
                {currentUser?.name || "login not logged!"}
              </p>
            </div>
          </li>
          <li className="w-full">
            {currentUser ? (
              <button
                onClick={handleLogout}
                className="btn btn-block btn-primary rounded-none"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="btn btn-primary btn-block rounded-none">
                  Login
                </button>
              </Link>
            )}
          </li>
          {!currentUser && (
            <li className="w-full">
              <Link to="/signup">
                <button className="btn bg-red-600 btn-block border-none text-white outline-none rounded-none">
                  Signup
                </button>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
