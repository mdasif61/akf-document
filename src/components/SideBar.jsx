import { NavLink } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuthor from "../hooks/useAuthor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faAngleDoubleRight,
  faChartLine,
  faHouse,
  faReceipt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const SideBar = ({ children }) => {
  const { isAdmin } = useAdmin();
  const { isAuthor } = useAuthor();
  const [showArrow, setShowArrow] = useState(false);

  return (
    <div className="flex md:space-x-4 bg-white">
      <FontAwesomeIcon
        onClick={() => setShowArrow(!showArrow)}
        className="text-2xl font-bold text-blue-700 fixed top-5 bg-blue-100 rounded-full border border-blue-700 p-3 bg-opacity-70 left-5 z-50 md:hidden"
        icon={faAngleDoubleRight}
      />
      <div
        className={`md:w-[30%] absolute md:left-0 md:relative ${
          showArrow ? "left-0 z-40" : "z-40 -left-96"
        } `}
      >
        <div className="bg-black border-r-2 border-gray-300 w-full min-h-screen md:p-10 p-3">
          {/* admin dashboard start */}
          {isAdmin && (
            <div className="space-y-2 font-semibold flex flex-col text-gray-500 text-lg">
              <NavLink
                to="/dashboard/admin"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gradient-to-l from-transparent rounded-full to-purple-900 px-4 text-white py-2 cursor-pointer"
                    : " bg-none px-4 py-2 cursor-pointer"
                }
              >
                <FontAwesomeIcon className="font-bold" icon={faChartLine} />
                <span className="mx-2">Dashboard</span>
              </NavLink>
              <NavLink
                to="/dashboard/manage-user"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gradient-to-l from-transparent rounded-full to-purple-900 text-white px-4 py-2 cursor-pointer"
                    : " bg-none px-4 py-2 cursor-pointer"
                }
              >
                <FontAwesomeIcon className="font-bold" icon={faUsers} />
                <span className="mx-2">Manage users</span>
              </NavLink>
              <NavLink
                to="/dashboard/my-accounts"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gradient-to-l from-transparent rounded-full to-purple-900 text-white px-4 py-2 cursor-pointer"
                    : " bg-none px-4 py-2 cursor-pointer"
                }
              >
                <FontAwesomeIcon className="font-bold" icon={faReceipt} />
                <span className="mx-2">My Accounts</span>
              </NavLink>
              <NavLink
                to="/dashboard/add-members"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gradient-to-l from-transparent rounded-full to-purple-900 text-white px-4 py-2 cursor-pointer"
                    : " bg-none px-4 py-2 cursor-pointer"
                }
              >
                <FontAwesomeIcon className="font-bold" icon={faAddressBook} />
                <span className="mx-2">Add Members</span>
              </NavLink>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gradient-to-l from-transparent rounded-full to-purple-900 text-white px-4 py-2 cursor-pointer"
                    : " bg-none px-4 py-2 cursor-pointer"
                }
              >
                <FontAwesomeIcon className="font-bold" icon={faHouse} />
                <span className="mx-2">Back to home</span>
              </NavLink>
            </div>
          )}
          {/* admin dashboard end */}

          {/* user dashboard start */}
          {!isAdmin && !isAuthor && (
            <div className="space-y-2 font-semibold flex flex-col text-gray-500 text-lg">
              <NavLink
                to="/dashboard/user-dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gradient-to-l from-transparent rounded-full to-purple-900 px-4 text-white py-2 cursor-pointer"
                    : " bg-none px-4 py-2 cursor-pointer"
                }
              >
                <FontAwesomeIcon className="font-bold" icon={faChartLine} />
                <span className="mx-2">Dashboard</span>
              </NavLink>
              <NavLink
                to="/dashboard/my-accounts"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gradient-to-l from-transparent rounded-full to-purple-900 text-white px-4 py-2 cursor-pointer"
                    : " bg-none px-4 py-2 cursor-pointer"
                }
              >
                <FontAwesomeIcon className="font-bold" icon={faReceipt} />
                <span className="mx-2">My Accounts</span>
              </NavLink>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gradient-to-l from-transparent rounded-full to-purple-900 text-white px-4 py-2 cursor-pointer"
                    : " bg-none px-4 py-2 cursor-pointer"
                }
              >
                <FontAwesomeIcon className="font-bold" icon={faHouse} />
                <span className="mx-2">Back to home</span>
              </NavLink>
            </div>
          )}
        </div>
      </div>
      <div className="md:w-[70%] w-full bg-white">{children}</div>
    </div>
  );
};

export default SideBar;
