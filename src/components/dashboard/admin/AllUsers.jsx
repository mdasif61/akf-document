import useAllUserGet from "../../../hooks/useAllUserGet";
import SideBar from "../../SideBar";
import SingleUser from "./SingleUser";

const AllUsers = () => {
  const { allUser, userLoading } = useAllUserGet();

  return (
    <SideBar>
      <div>
        <div>
          <input
            type="search"
            className="w-full bg-white border mb-4 py-2 px-4 focus:border-gray-300 focus:border-1 outline-none"
            placeholder="Search user..."
            name=""
            id=""
          />
        </div>
        <hr className="mb-4" />
        {!userLoading ? (
          allUser?.map((user) => (
            <SingleUser key={user._id} user={user}></SingleUser>
          ))
        ) : (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex flex-col items-center">
              <span className="loading loading-spinner loading-lg"></span>
              <span>Loading...</span>
            </div>
          </div>
        )}
      </div>
    </SideBar>
  );
};

export default AllUsers;
