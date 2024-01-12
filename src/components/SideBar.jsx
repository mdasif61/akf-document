import { NavLink } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuthor from "../hooks/useAuthor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faHouse, faReceipt, faUsers } from "@fortawesome/free-solid-svg-icons";

const SideBar = ({ children }) => {
  const { isAdmin } = useAdmin();
  const { isAuthor } = useAuthor();

  return (
    <div className="flex p-10 space-x-4 bg-white">
      <div className="w-[30%]">
        <div className="bg-white border-r-2 border-gray-300 w-full min-h-screen p-10">
          {/* admin dashboard start */}
          {isAdmin && (
            <div className="space-y-2 font-semibold flex flex-col text-gray-500 text-lg">
              <NavLink
                to="/dashboard/admin"
                className={({ isActive }) =>
                  isActive
                    ? "bg-black px-4 text-white py-2 cursor-pointer"
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
                    ? "bg-black text-white px-4 py-2 cursor-pointer"
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
                    ? "bg-black text-white px-4 py-2 cursor-pointer"
                    : " bg-none px-4 py-2 cursor-pointer"
                }
              >
                <FontAwesomeIcon className="font-bold" icon={faReceipt}/>
                <span className="mx-2">My Accounts</span>
              </NavLink>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "bg-black text-white px-4 py-2 cursor-pointer"
                    : " bg-none px-4 py-2 cursor-pointer"
                }
              >
                <FontAwesomeIcon className="font-bold" icon={faHouse}/>
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
                    ? "bg-black px-4 text-white py-2 cursor-pointer"
                    : " bg-none px-4 py-2 cursor-pointer"
                }
              >
                <FontAwesomeIcon className="font-bold" icon={faChartLine}/>
                <span className="mx-2">Dashboard</span>
              </NavLink>
              <NavLink
                to="/dashboard/my-accounts"
                className={({ isActive }) =>
                  isActive
                    ? "bg-black text-white px-4 py-2 cursor-pointer"
                    : " bg-none px-4 py-2 cursor-pointer"
                }
              >
                <FontAwesomeIcon className="font-bold" icon={faReceipt}/>
                <span className="mx-2">My Accounts</span>
              </NavLink>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "bg-black text-white px-4 py-2 cursor-pointer"
                    : " bg-none px-4 py-2 cursor-pointer"
                }
              >
                <FontAwesomeIcon className="font-bold" icon={faHouse}/>
                <span className="mx-2">Back to home</span>
              </NavLink>
            </div>
          )}
        </div>
      </div>
      <div className="w-[70%] bg-white">{children}</div>
    </div>
  );
};

export default SideBar;
