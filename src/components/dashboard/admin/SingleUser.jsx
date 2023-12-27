import defaultProfile from "../../../../public/images/profile-web.jpg";

const SingleUser = ({ user }) => {
  return (
    <div className="bg-gray-100 cursor-pointer flex items-center justify-between border p-2 mb-2">
      <div className="avatar flex items-center">
        <div className="w-10 rounded-full border-2">
          <img src={user?.photo || defaultProfile} alt="profile" />
        </div>
        <p className="text-gray-600 ml-4 font-bold">{user?.name}</p>
      </div>
      <p className=" ml-4 text-white font-bold badge badge-primary">
        {user?.role}
      </p>
      <p className="text-gray-600 mx-2">{user?.email}</p>
      <p className="text-gray-600 mx-2">User ID : {user?._id.slice(-6)}</p>
    </div>
  );
};

export default SingleUser;
