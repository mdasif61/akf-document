import { NavLink } from "react-router-dom";

const SideBar = ({ children }) => {
  return (
    <div className="flex p-10 space-x-4 bg-white">
      <div className="w-[30%]">
        <div className="bg-white border-r-2 border-gray-300 w-full min-h-screen p-10">
          <div className="space-y-2 font-semibold flex flex-col text-gray-500 text-lg">
            <NavLink
              to="/dashboard/all-users"
              className={({ isActive }) =>
                isActive
                  ? "bg-black px-4 text-white py-2 cursor-pointer"
                  : " bg-none px-4 py-2 cursor-pointer"
              }
            >
              All users
            </NavLink>
            <NavLink
              to="/dashboard/manage-user"
              className={({ isActive }) =>
                isActive
                  ? "bg-black text-white px-4 py-2 cursor-pointer"
                  : " bg-none px-4 py-2 cursor-pointer"
              }
            >
              Manage users
            </NavLink>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "bg-black text-white px-4 py-2 cursor-pointer"
                  : " bg-none px-4 py-2 cursor-pointer"
              }
            >
              Back to home
            </NavLink>
          </div>
        </div>
      </div>
      <div className="w-[70%] bg-white">{children}</div>
    </div>
  );
};

export default SideBar;
