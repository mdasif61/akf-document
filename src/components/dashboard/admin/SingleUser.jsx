import { useState } from "react";
import defaultProfile from "../../../../public/images/profile-web.jpg";

const SingleUser = ({ user }) => {

  const [isDropDownOpen,setIsDropDownOpen]=useState(false)

  const handleToggle=()=>{
    setIsDropDownOpen(!isDropDownOpen)
  }

  const handleUserInput=(e)=>{
    console.log(e.target.checked)
  }

  return (
    <div className="bg-gray-100 relative cursor-pointer flex items-center justify-between border p-2 mb-2">
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
      <div>
          
<button onClick={handleToggle} id="dropdownToggleButton" data-dropdown-toggle="dropdownToggle" className="text-white btn-sm bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center " type="button">Choose Action <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
</svg>
</button>

<div id="dropdownToggle" className={`z-10 ${isDropDownOpen?'absolute shadow-xl right-0':'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-72 dark:bg-gray-700 dark:divide-gray-600`}>
    <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownToggleButton">
      <li>
        <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <label className="relative inline-flex items-center w-full cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer"/>
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Make as Admin</span>
          </label>
        </div>
      </li>
      <li>
        <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <label className="relative inline-flex items-center w-full cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer"/>
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Make as Author</span>
          </label>
        </div>
      </li>
      <li>
        <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
          <label className="relative inline-flex items-center w-full cursor-pointer">
            <input onChange={handleUserInput} type="checkbox" value="user" className="sr-only peer"/>
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Make as User</span>
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
