import { useEffect, useState } from "react";
import useAllUserGet from "../../../hooks/useAllUserGet";
import SideBar from "../../SideBar";
import SingleUser from "./SingleUser";
import useAxiosProtact from "../../../hooks/useAxiosProtact";

const AllUsers = () => {
  const { allUser, userLoading, refetch } = useAllUserGet();
  const [axiosProtact] = useAxiosProtact();
  const [searchData, setSearchData] = useState("");
  const [mainUser, setMainUser] = useState([]);

  useEffect(() => {
    if (searchData.trim() !== "") {
      axiosProtact
        .get(`/api/member/search-user/${searchData}`)
        .then((res) => {
          if (res.data) {
            setMainUser(res.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
      setMainUser(allUser);
    }
  }, [axiosProtact, searchData, allUser]);

  return (
    <SideBar>
      <div>
        <div>
          <input
            onChange={(e) => setSearchData(e.target.value)}
            type="search"
            className="w-full bg-white border md:mb-4 my-4 py-2 px-4 focus:border-gray-300 focus:border-1 outline-none"
            placeholder="Search user..."
            name=""
            id=""
          />
        </div>
        <hr className="mb-4" />
        {!userLoading ? <div className="grid grid-cols-2 md:grid-cols-none gap-2 md:gap-0">
          {mainUser?.map((user) => (
          <SingleUser
            key={user._id}
            user={user}
            refetch={refetch}
          ></SingleUser>
          ))}
        </div> : (
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
