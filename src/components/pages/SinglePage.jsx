import {
  faArrowRight,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Modal from "../modal/Modal";

const SinglePage = ({ page, refetch }) => {
  const [showModal, setShowModal] = useState(false);
  const [pageData, setPageData] = useState(null);

  const handleRemoveMonth = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://akf-document-server.vercel.app/api/member/month-delete/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
            }
          });
      }
    });
  };

  const handleShowModal = (pages) => {
    setShowModal(true);
    setPageData(pages);
  };

  const handleHideModal = () => {
    setShowModal(false);
    setPageData(null);
  };

  return (
    <div className="mx-auto p-1">
      <div className="w-full flex bg-gradient-to-t from-black to-blue-500 duration-300 rounded-md hover:bg-blue-700 space-x-4 py-3 px-5 hover:cursor-pointer">
        <div className="flex-1">
          <h1 className="text-lg font-bold text-white">
            {page.month} - {page.year}
          </h1>
        </div>
        <div className="bg-blue-100 shadow-lg rounded-full px-2 flex items-center justify-center">
          <FontAwesomeIcon
            onClick={() => handleRemoveMonth(page._id)}
            className="text-red-500 mx-2 text-sm hover:text-red-600"
            icon={faTrash}
          />

          <FontAwesomeIcon
            onClick={() => handleShowModal(page)}
            className="text-blue-500 mx-2 text-sm hover:text-blue-600"
            icon={faEdit}
          />

          {showModal && (
            <Modal
              handleHideModal={handleHideModal}
              pageData={pageData}
              refetch={refetch}
            />
          )}
        </div>
        <div>
          <Link to={`/invoice/${page._id}`}>
            <FontAwesomeIcon className="text-white" icon={faArrowRight} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
