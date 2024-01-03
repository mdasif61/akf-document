import useMyAccount from "../../../hooks/useMyAccount";
import SideBar from "../../SideBar";

const MyAccounts = () => {
  const { myData } = useMyAccount();
  console.log(myData);
  return (
    <SideBar>
      <div className="w-full rounded-lg min-h-[100px] bg-gradient-to-t p-5 from-blue-100 to-transparent">
        <div className="flex items-center gap-4 justify-evenly">
          <div className="w-full rounded-lg shadow-md space-y-1 flex items-center justify-center flex-col h-[100px] bg-gray-800">
            <h1 className="text-4xl font-bold text-white">
              ${myData?.totalFee}
            </h1>
            <h6 className="text-white">Main Balance</h6>
          </div>
          <div className="w-full rounded-lg shadow-md space-y-1 flex items-center justify-center flex-col h-[100px] bg-[#6300C6]">
            <h1 className="text-4xl font-bold text-white">
              ${myData?.totalIfound}
            </h1>
            <h6 className="text-white">Total I.F</h6>
          </div>
          <div className="w-full rounded-lg shadow-md space-y-1 flex items-center justify-center flex-col h-[100px] bg-[#0057FF]">
            <h1 className="text-4xl font-bold text-white">
              ${myData?.totalPenalty}
            </h1>
            <h6 className="text-white">Total Penalty</h6>
          </div>
          <div className="w-full rounded-lg shadow-md space-y-1 flex items-center justify-center flex-col h-[100px] bg-[#FF5C00]">
            <h1 className="text-4xl font-bold text-white">
              ${myData?.totalTotal}
            </h1>
            <h6 className="text-white">Total Amount</h6>
          </div>
        </div>
      </div>
    </SideBar>
  );
};

export default MyAccounts;
