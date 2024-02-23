import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const Receipt = ({ month, currentUser }) => {

  const documentPrint=useRef()

  const handleDownload = useReactToPrint({
    content: () => documentPrint.current,
    documentTitle: `AKF - ${month.month} - ${month.year}`,
  });

   const handleDownloadInvoice=()=>{
    handleDownload(month._id)
   }

  return (
    <div ref={documentPrint} className="bg-white my-2 border w-full">
      <div className="relative"> 
        <div className="bg-black p-2 text-center">
          <h1 className="md:text-2xl text-lg font-bold text-white">
            {`Alor Kafela Foundation - ${month.month} - ${month.year}`}
          </h1>
        </div>
        <div className="p-3 flex">
          <div className="w-1/2 flex flex-col justify-center items-center space-y-2">
            <div className="avatar">
              <div className="w-16 rounded-full">
                <img src={currentUser?.photo} />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-black">
                {currentUser?.name}
              </h3>
              <h3>{currentUser?.email}</h3>
            </div>
          </div>
          <div className="w-1/2 bg-gray-100 border rounded-md p-5">
            <p className="text-gray-500 border-b">
              <span className="font-semibold text-black">Share : </span>
              {month?.share}
            </p>
            <p className="text-gray-500 border-b">
              <span className="font-semibold text-black">Fee :</span> $
              {month?.fee}
            </p>
            <p className="text-gray-500 border-b">
              <span className="font-semibold text-black">I.Found :</span> $
              {month?.ifound}
            </p>
            <p className="text-gray-500 border-b">
              <span className="font-semibold text-black">Penalty :</span> $
              {month?.penalty}
            </p>
            <p className="text-gray-500 border-b">
              <span className="font-semibold text-black">Total :</span> $
              {month?.total}
            </p>
          </div>
        </div>
        <button
          onClick={handleDownloadInvoice}
          className="btn btn-xs absolute md:bottom-5 bottom-2 left-5 rounded-none hover:bg-transparent hover:border hover:border-gray-600 hover:text-gray-800"
        >
          Download <FontAwesomeIcon icon={faDownload} />
        </button>
      </div>
    </div>
  );
};
  
export default Receipt;
