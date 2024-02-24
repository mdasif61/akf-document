import { faFileLines, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import useMember from "../../hooks/useMember";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import usePage from "../../hooks/usePage";
import useAllUserGet from "../../hooks/useAllUserGet";
import toast from "react-hot-toast";
import useAxiosProtact from "../../hooks/useAxiosProtact";
import { UserProvider } from "../context/AuthContext";

const Home = () => {
  const [axiosProtact] = useAxiosProtact();
  const { pages, refetch: pageRefetch } = usePage();
  const [showDelete, setShowDelete] = useState(false);
  const [rowId, setRowId] = useState(null);
  const { refetch, member } = useMember();
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [account, setAccount] = useState("");
  const { allUser } = useAllUserGet();
  const { currentUser } = useContext(UserProvider);

  useEffect(() => {
    member.slice(0, 1).map((head) => {
      setMonth(head.month);
      setAccount(head.account);
      setYear(head.year);
    });
  }, [member]);

  const isSaveDisabled = () => {
    return (
      !month ||
      !year ||
      member.some(
        (user) =>
          !user.name ||
          !user.mobile ||
          !user.share ||
          !user.date ||
          !user.fee ||
          !user.ifound ||
          !user.total
      )
    );
  };

  const blankData = {
    name: "",
    mobile: "",
    date: "",
    share: "",
    fee: "",
    ifound: "",
    penalty: "",
    total: "",
    month: "",
    account: "",
    year: "",
  };

  const handleSubmit = async () => {
    await axiosProtact
      .post(`https://akf-document-server.vercel.app/api/member/pages/`, {
        month,
        account,
        year,
        member,
      })
      .then((res) => {
        if (res.statusText === "Created") {
          refetch();
          pageRefetch();
          axiosProtact
            .delete(
              "https://akf-document-server.vercel.app/api/member/delete-all",
              {
                data: { allUser },
              }
            )
            .then((res) => {
              if (res.data.deletedCount > 0) {
                refetch();
                pageRefetch();
              }
            });
          axiosProtact
            .patch(
              `https://akf-document-server.vercel.app/api/member/fixed-user-row/${member.map(
                (user) => user._id
              )}`,
              blankData
            )
            .then((res) => {
              if (res.data.modifiedCount > 0) {
                refetch();
                pageRefetch();
                window.location.reload();
              }
            });
        }
      });
  };

  const addMembers = () => {
    axios
      .post(
        "https://akf-document-server.vercel.app/api/member/members",
        blankData
      )
      .then((res) => {
        refetch();
        if (res.data._id) {
          // console.log(res.data._id)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const mutation = useMutation(
    async (id) => {
      try {
        const res = await axios.delete(
          `https://akf-document-server.vercel.app/api/member/delete-member/${id}`
        );
        return res.data;
      } catch (error) {
        console.log(`Error delete member: ${error}`);
        throw error;
      }
    },
    {
      onSuccess: (data) => {
        if (data.deletedCount > 0) {
          refetch();
        }
      },
    }
  );

  const removeRow = (user) => {
    console.log(user);
    const findDatabaseUser = allUser.find((users) => {
      return user.name === users.name || user.name === currentUser.name;
    });

    if (findDatabaseUser) {
      toast.error("It is permanent user! Not valid for delete");
      return;
    } else {
      Swal.fire({
        title: "Are you sure?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete",
      }).then((result) => {
        if (result.isConfirmed) {
          mutation.mutate(user._id);
        }
      });
    }
  };

  const updateMutaton = useMutation(
    async ({ id, data }) => {
      try {
        const res = await axios.patch(
          `https://akf-document-server.vercel.app/api/member/update-member/${id}`,
          { data: data }
        );
        return res.data;
      } catch (error) {
        console.log(`Error update member : ${error}`);
      }
    },
    {
      onSuccess: () => {
        refetch();
        // console.log(data)
      },
    }
  );

  const updateMember = (id, data) => {
    updateMutaton.mutate({ id, data });
  };

  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center">
      <div className="md:p-5 bg-gray-100 min-h-screen w-full mx-auto">
        <div className="w-full">
          {member.length > 0 ? (
            <div className="flex md:flex-row space-y-4 flex-col w-full md:p-5 p-2 bg-blue-600 items-center">
              <div className="md:flex-1 w-full">
                {member.slice(0, 1).map((head) => {
                  return (
                    <form key={head._id} className="w-full grid md:grid-cols-3">
                      <div className="md:w-auto w-full">
                        <input
                          defaultValue={head.month}
                          onChange={(e) => {
                            updateMember(head._id, { month: e.target.value });
                          }}
                          className="md:h-12 h-10 md:w-auto w-full border-b border-white text-white bg-transparent focus:outline-none py-2 font-bold md:text-xl text-lg"
                          type="text"
                          name="month"
                          id=""
                          placeholder="MONTH NAME"
                        />
                      </div>
                      <div className="md:w-auto w-full">
                        <input
                          readOnly
                          value={"Monthly Account"}
                          onChange={(e) => {
                            updateMember(head._id, { account: e.target.value });
                          }}
                          className="md:h-12 h-10 md:w-auto w-full focus:outline-none bg-transparent text-white border-b border-white py-2 font-bold md:text-xl text-lg"
                          type="text"
                          name="account"
                          id=""
                          placeholder="MONTHLY ACCOUNT"
                        />
                      </div>
                      <div className="md:w-auto w-full">
                        <input
                          defaultValue={head.year}
                          onChange={(e) => {
                            updateMember(head._id, { year: e.target.value });
                          }}
                          className="md:h-12 h-10 md:w-auto w-full focus:outline-none border-b text-white border-white bg-transparent py-2 font-bold md:text-xl text-lg"
                          type="text"
                          name="year"
                          id=""
                          placeholder="YEAR"
                        />
                      </div>
                    </form>
                  );
                })}
              </div>

              <button
                disabled={isSaveDisabled()}
                onClick={handleSubmit}
                type="submit"
                className="btn bg-blue-400 border-none outline-none md:ml-5 hover:bg-blue-700 h-12 md:w-auto w-full rounded-none text-white"
              >
                SAVE
              </button>
            </div>
          ) : (
            <div className="w-full bg-blue-800 text-blue-300 p-5 text-lg">
              Add Your Member by clicking the{" "}
              <span className="font-bold">Add Member</span> button below...
            </div>
          )}

          <div className="bg-blue-500 p-2">
            <button onClick={addMembers} className="text-white hover:underline">
              <FontAwesomeIcon icon={faPlus} /> Add Manual Member
            </button>
            <Link to="/pages">
              <button className="text-white ml-4 hover:underline">
                <FontAwesomeIcon icon={faFileLines} /> Pages{" "}
                <div className="badge bg-blue-200 border-none p-2 font-bold badge-xs">
                  <span className="absolute ">
                    {pages.length ? pages.length : 0}
                  </span>
                </div>
              </button>
            </Link>
          </div>
          <div className="overflow-x-auto bg-white">
            <table className="table table-xs">
              <thead>
                <tr className="text-black font-semibold bg-blue-200">
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Date</th>
                  <th>Share</th>
                  <th>Fee</th>
                  <th>I.F</th>
                  <th>Penalty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody className="relative">
                {member?.map((user) => (
                  <tr
                    onMouseOver={() => {
                      setRowId(user._id);
                      setShowDelete(true);
                    }}
                    onMouseOut={() => {
                      setShowDelete(false);
                      setRowId(null);
                    }}
                    key={user._id}
                  >
                    <td className="border">
                      <input
                        defaultValue={user.name}
                        onChange={(e) =>
                          updateMember(user._id, { name: e.target.value })
                        }
                        className="w-full bg-white h-full border-none outline-none text-black font-semibold"
                        type="text"
                        name="name"
                        placeholder="Name"
                        id=""
                      />
                    </td>
                    <td className="border">
                      <input
                        defaultValue={user.mobile}
                        onChange={(e) =>
                          updateMember(user._id, { mobile: e.target.value })
                        }
                        className="w-full bg-white h-full border-none outline-none text-black font-semibold"
                        type="text"
                        name=""
                        placeholder="Mobile"
                        id=""
                      />
                    </td>
                    <td className="border">
                      <input
                        defaultValue={user.date}
                        onChange={(e) =>
                          updateMember(user._id, { date: e.target.value })
                        }
                        className="w-full bg-white h-full border-none outline-none text-black font-semibold"
                        type="text"
                        name=""
                        placeholder="Date"
                        id=""
                      />
                    </td>
                    <td className="border">
                      <input
                        defaultValue={user.share}
                        onChange={(e) =>
                          updateMember(user._id, { share: e.target.value })
                        }
                        className="w-full bg-white h-full border-none outline-none text-black font-semibold"
                        type="text"
                        name=""
                        placeholder="Share Number"
                        id=""
                      />
                    </td>
                    <td className="border">
                      <input
                        defaultValue={user.fee}
                        onChange={(e) =>
                          updateMember(user._id, { fee: e.target.value })
                        }
                        className="w-full bg-white h-full border-none outline-none text-black font-semibold"
                        type="text"
                        name=""
                        placeholder="Montly Fee"
                        id=""
                      />
                    </td>
                    <td className="border">
                      <input
                        defaultValue={user.ifound}
                        onChange={(e) =>
                          updateMember(user._id, { ifound: e.target.value })
                        }
                        className="w-full bg-white h-full border-none outline-none text-black font-semibold"
                        type="text"
                        name=""
                        placeholder="I.F"
                        id=""
                      />
                    </td>
                    <td className="border">
                      <input
                        defaultValue={user.penalty}
                        onChange={(e) =>
                          updateMember(user._id, { penalty: e.target.value })
                        }
                        className="w-full bg-white h-full border-none outline-none text-black font-semibold"
                        type="text"
                        name=""
                        placeholder="Penalty"
                        id=""
                      />
                    </td>
                    <td className="border relative">
                      <input
                        defaultValue={user.total}
                        onChange={(e) =>
                          updateMember(user._id, { total: e.target.value })
                        }
                        className="w-full bg-white h-full border-none outline-none text-black font-semibold"
                        type="text"
                        name=""
                        placeholder="Total"
                        id=""
                      />
                      <button
                        onClick={() => removeRow(user)}
                        className={`border-none ${
                          showDelete && rowId == user._id ? "" : "hidden"
                        } outline-none absolute right-3`}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
