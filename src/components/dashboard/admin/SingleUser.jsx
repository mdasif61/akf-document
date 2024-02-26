import { useState } from "react";
import defaultProfile from "../../../../public/images/profile-web.jpg";
import { useMutation } from "@tanstack/react-query";
import useAxiosProtact from "../../../hooks/useAxiosProtact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const SingleUser = ({ user, refetch }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [axiosProtact] = useAxiosProtact();

  const handleToggle = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const mutation = useMutation(
    async ({ value, id }) => {
      try {
        const res = await axiosProtact.patch(`/api/member/change-role/${id}`, {
          value,
        });
        return res.data;
      } catch (error) {
        console.error("Action Update Error :", error);
        throw error;
      }
    },
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const handleUserInput = (value, id) => {
    mutation.mutate({ value, id });
  };

  const deleteUser = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosProtact.delete(`/api/member/delete-user/${userId}`).then((res) => {
          if (res.data.message === "user delete success") {
            toast.success("user delete success");
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="bg-gray-100 relative cursor-pointer flex items-center justify-between md:flex-row flex-col space-y-2 md:space-y-0 border md:p-2 py-4 mb-2">
      <div
        onClick={() => deleteUser(user._id)}
        className="flex items-center justify-center"
      >
        <FontAwesomeIcon
          className="text-red-500 hover:bg-red-200 h-4 w-4 rounded-full p-3 duration-500 hover:border-red-600 hover:border border"
          icon={faTrashAlt}
        />
      </div>
      <div className="avatar flex md:flex-row flex-col items-center">
        <div title={user?.email} className="md:w-10 w-24 rounded-full border-2">
          <img src={user?.photo || defaultProfile} alt="profile" />
        </div>
        <p className="text-gray-600 md:ml-4 font-bold">{user?.name}</p>
      </div>
      <p className="md:ml-4 text-white font-bold badge badge-primary">
        {user?.role}
      </p>
      <p className="text-gray-600 mx-2">{user?.email}</p>
      <p className="text-gray-600 mx-2">User ID : {user?._id.slice(-6)}</p>
      <div>
        <button
          onClick={handleToggle}
          id="dropdownToggleButton"
          data-dropdown-toggle="dropdownToggle"
          className="text-white btn-sm bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
          type="button"
        >
          Choose Action{" "}
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        <div
          id="dropdownToggle"
          className={`z-10 ${
            isDropDownOpen
              ? "absolute shadow-xl md:right-0 left-0 md:left-auto"
              : "hidden"
          } bg-white divide-y divide-gray-100 rounded-lg shadow md:w-72 w-56`}
        >
          <ul
            className="p-3 space-y-1 text-sm text-gray-900"
            aria-labelledby="dropdownToggleButton"
          >
            <li>
              <div className="flex p-2 rounded hover:bg-gray-200">
                <label className="relative inline-flex items-center w-full cursor-pointer">
                  <input
                    onChange={(e) => handleUserInput(e.target.value, user?._id)}
                    name="admin"
                    type="checkbox"
                    value="admin"
                    checked={user?.role === "admin"}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900">
                    Make as Admin
                  </span>
                </label>
              </div>
            </li>
            <li>
              <div className="flex p-2 rounded hover:bg-gray-200">
                <label className="relative inline-flex items-center w-full cursor-pointer">
                  <input
                    onChange={(e) => handleUserInput(e.target.value, user?._id)}
                    name="author"
                    type="checkbox"
                    value="author"
                    checked={user?.role === "author"}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900">
                    Make as Author
                  </span>
                </label>
              </div>
            </li>
            <li>
              <div className="flex p-2 rounded hover:bg-gray-200">
                <label className="relative inline-flex items-center w-full cursor-pointer">
                  <input
                    name="user"
                    onChange={(e) => handleUserInput(e.target.value, user?._id)}
                    type="checkbox"
                    value="user"
                    checked={user?.role === "user"}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900">
                    Make as User
                  </span>
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
