import { NavLink } from "react-router-dom";

const SideBar = ({ children }) => {
  return (
    <div className="flex p-10 space-x-4 bg-white">
      <div className="w-[30%]">
        <div className="bg-gray-200 w-full rounded-lg min-h-screen p-10">
          <div className="space-y-2 font-semibold flex flex-col text-gray-500 text-lg">
            <NavLink
              to="/dashboard/all-users"
              className={({ isActive }) =>
                isActive
                  ? "bg-white px-4 py-2 cursor-pointer"
                  : " bg-none px-4 py-2 cursor-pointer"
              }
            >
              All users
            </NavLink>
            <NavLink
              to="/dashboard/manage-user"
              className={({ isActive }) =>
                isActive
                  ? "bg-white px-4 py-2 cursor-pointer"
                  : " bg-none px-4 py-2 cursor-pointer"
              }
            >
              Manage users
            </NavLink>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "bg-white px-4 py-2 cursor-pointer"
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
