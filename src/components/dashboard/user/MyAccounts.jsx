import { useContext, useState } from "react";
import useMyAccount from "../../../hooks/useMyAccount";
import useSingleMonth from "../../../hooks/useSingleMonth";
import SideBar from "../../SideBar";
import { UserProvider } from "../../context/AuthContext";
import Receipt from "./Receipt";

const MyAccounts = () => {
  const { myData } = useMyAccount();
  const [monthName, setMonthName] = useState("");
  const [yearValue, setYearValue] = useState("");
  const { singleMonth } = useSingleMonth(monthName, yearValue);
  const { currentUser } = useContext(UserProvider);

  const handleMonth = (check, value) => {
    setMonthName(value);
  };

  const options = [
    "All",
    2020,
    2021,
    2022,
    2023,
    2024,
    2025,
    2026,
    2027,
    2028,
    2029,
    2030,
  ];

  const handleYearSort = (value) => {
    setYearValue(value);
  };

  return (
    <SideBar>
      <div className="w-full md:rounded-lg rounded-none min-h-[100px] bg-gradient-to-t p-5 from-blue-100 to-transparent">
        <div className="md:flex items-center md:gap-4 gap-2 justify-evenly grid grid-cols-2">
          <div className="w-full rounded-lg space-y-1 flex items-center justify-center flex-col h-[100px] bg-gray-800">
            <h1 className="text-4xl font-bold text-white">
              ${myData?.totalFee || 0}
            </h1>
            <h6 className="text-white">Main Balance</h6>
          </div>
          <div className="w-full rounded-lg space-y-1 flex items-center justify-center flex-col h-[100px] bg-[#6300C6]">
            <h1 className="text-4xl font-bold text-white">
              ${myData?.totalIfound || 0}
            </h1>
            <h6 className="text-white">Total I.F</h6>
          </div>
          <div className="w-full rounded-lg space-y-1 flex items-center justify-center flex-col h-[100px] bg-[#0057FF]">
            <h1 className="text-4xl font-bold text-white">
              ${myData?.totalPenalty || 0}
            </h1>
            <h6 className="text-white">Total Penalty</h6>
          </div>
          <div className="w-full rounded-lg space-y-1 flex items-center justify-center flex-col h-[100px] bg-[#FF5C00]">
            <h1 className="text-4xl font-bold text-white">
              ${myData?.totalTotal || "00"}
            </h1>
            <h6 className="text-white">Total Amount</h6>
          </div>
        </div>
      </div>
      <div className={`w-full bg-gradient-to-t my-2 from-blue-500 to-blue-900 md:rounded-lg rounded-none p-5`}>
        <div>
          <ul className="grid md:grid-cols-6 grid-cols-3 text-white">
            <li className="flex items-center">
              <input
                onChange={(e) => handleMonth(e.target.checked, e.target.value)}
                value="January"
                type="checkbox"
                checked={monthName === "January"}
                className="checkbox checkbox-warning checkbox-xs"
              />
              <label className="ml-2">January</label>
            </li>
            <li className="flex items-center">
              <input
                onChange={(e) => handleMonth(e.target.checked, e.target.value)}
                value="February"
                type="checkbox"
                checked={monthName === "February"}
                className="checkbox checkbox-warning checkbox-xs"
              />
              <label className="ml-2">February</label>
            </li>
            <li className="flex items-center">
              <input
                onChange={(e) => handleMonth(e.target.checked, e.target.value)}
                value="March"
                type="checkbox"
                checked={monthName === "March"}
                className="checkbox checkbox-warning checkbox-xs"
              />
              <label className="ml-2">March</label>
            </li>
            <li className="flex items-center">
              <input
                onChange={(e) => handleMonth(e.target.checked, e.target.value)}
                value="April"
                type="checkbox"
                checked={monthName === "April"}
                className="checkbox checkbox-warning checkbox-xs"
              />
              <label className="ml-2">April</label>
            </li>
            <li className="flex items-center">
              <input
                onChange={(e) => handleMonth(e.target.checked, e.target.value)}
                value="May"
                type="checkbox"
                checked={monthName === "May"}
                className="checkbox checkbox-warning checkbox-xs"
              />
              <label className="ml-2">May</label>
            </li>
            <li className="flex items-center">
              <input
                onChange={(e) => handleMonth(e.target.checked, e.target.value)}
                value="June"
                type="checkbox"
                checked={monthName === "June"}
                className="checkbox checkbox-warning checkbox-xs"
              />
              <label className="ml-2">June</label>
            </li>
            <li className="flex items-center">
              <input
                onChange={(e) => handleMonth(e.target.checked, e.target.value)}
                value="July"
                type="checkbox"
                checked={monthName === "July"}
                className="checkbox checkbox-warning checkbox-xs"
              />
              <label className="ml-2">July</label>
            </li>
            <li className="flex items-center">
              <input
                onChange={(e) => handleMonth(e.target.checked, e.target.value)}
                value="August"
                type="checkbox"
                checked={monthName === "August"}
                className="checkbox checkbox-warning checkbox-xs"
              />
              <label className="ml-2">August</label>
            </li>
            <li className="flex items-center">
              <input
                onChange={(e) => handleMonth(e.target.checked, e.target.value)}
                value="September"
                type="checkbox"
                checked={monthName === "September"}
                className="checkbox checkbox-warning checkbox-xs"
              />
              <label className="ml-2">September</label>
            </li>
            <li className="flex items-center">
              <input
                onChange={(e) => handleMonth(e.target.checked, e.target.value)}
                value="Octobar"
                type="checkbox"
                checked={monthName === "Octobar"}
                className="checkbox checkbox-warning checkbox-xs"
              />
              <label className="ml-2">Octobar</label>
            </li>
            <li className="flex items-center">
              <input
                onChange={(e) => handleMonth(e.target.checked, e.target.value)}
                value="November"
                type="checkbox"
                checked={monthName === "November"}
                className="checkbox checkbox-warning checkbox-xs"
              />
              <label className="ml-2">November</label>
            </li>
            <li className="flex items-center">
              <input
                onChange={(e) => handleMonth(e.target.checked, e.target.value)}
                value="December"
                type="checkbox"
                checked={monthName === "December"}
                className="checkbox checkbox-warning checkbox-xs"
              />
              <label className="ml-2">December</label>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-white flex items-center justify-end">
        <div className="label">
          <span className="label-text">Sort by year : </span>
        </div>
        <select
          onChange={(e) => handleYearSort(e.target.value)}
          className="h-8 w-24 px-4 border bg-transparent outline-none"
        >
          {options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {singleMonth.length
        ? singleMonth?.map((month, i) => (
            <Receipt
              key={i}
              month={month}
              currentUser={currentUser}
            ></Receipt>
          ))
        : ""}
    </SideBar>
  );
};

export default MyAccounts;
