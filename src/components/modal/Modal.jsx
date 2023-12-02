import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const Modal = ({ handleHideModal, pageData, refetch }) => {
    const [modifiCheck,setModifiCheck]=useState(false)
    const monthMutation = useMutation(
        async ({ memberIndex, data }) => {
            try {
                const res = await axios.patch(`http://localhost:5000/api/member/update-month/${pageData._id}`, { data: data, index: memberIndex },{
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem('jwtToken')}`,
                        'Content-Type':'application/json'
                    }
                });
                return res.data;
            } catch (error) {
                console.log(`Error month update :`, error)
            }
        }, {
        onSuccess: (data) => {
            if (data.modifiedCount > 0) {
                setModifiCheck(true)
            }
        }
    }
    );

    const updateMonth = (memberIndex, data) => {
        monthMutation.mutate({ memberIndex, data })
    };

    const handleSavePage=()=>{
        handleHideModal()
        refetch();
        setModifiCheck(false)
    }

    return (
        <div className="w-full fixed bg-zinc-200 bg-opacity-20 flex items-center justify-center h-screen top-0 left-0">
            <dialog open className="w-10/12 relative min-h-[400px] p-3 rounded-lg shadow-lg mx-auto bg-white">
                <button onClick={handleHideModal} className="btn btn-circle btn-sm bg-red-500 hover:bg-red-600 text-white -right-4 -top-4 absolute border-none outline-none"><FontAwesomeIcon icon={faXmark} /></button>
                <div className="overflow-x-auto bg-white">
                    <table className="table table-xs">
                        <thead>
                            <tr className="font-semibold text-black">
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
                        <tbody>
                            {
                                pageData?.member?.map((page, index) => (
                                    <tr key={page._id}>
                                        <td className="border">
                                            <input onChange={(e) => updateMonth(index, { name: e.target.value })} defaultValue={page.name} className="w-full text-black bg-white h-full border-none outline-none" type="text" name="name" placeholder="Name" id="" />
                                        </td>
                                        <td className="border">
                                            <input onChange={(e) => updateMonth(index, { mobile: e.target.value })} defaultValue={page.mobile} className="w-full bg-white h-full border-none text-black outline-none" type="text" name="" placeholder="Mobile" id="" />
                                        </td>
                                        <td className="border">
                                            <input onChange={(e) => updateMonth(index, { date: e.target.value })} defaultValue={page.date} className="w-full bg-white h-full border-none text-black outline-none" type="text" name="" placeholder="Date" id="" />
                                        </td>
                                        <td className="border">
                                            <input onChange={(e) => updateMonth(index, { share: e.target.value })} defaultValue={page.share} className="w-full bg-white h-full border-none text-black outline-none" type="text" name="" placeholder="Share Number" id="" />
                                        </td>
                                        <td className="border">
                                            <input onChange={(e) => updateMonth(index, { fee: e.target.value })} defaultValue={page.fee} className="w-full bg-white h-full border-none text-black outline-none" type="text" name="" placeholder="Montly Fee" id="" />
                                        </td>
                                        <td className="border">
                                            <input onChange={(e) => updateMonth(index, { ifound: e.target.value })} defaultValue={page.ifound} className="w-full bg-white h-full border-none text-black outline-none" type="text" name="" placeholder="I.F" id="" />
                                        </td>
                                        <td className="border">
                                            <input onChange={(e) => updateMonth(index, { penalty: e.target.value })} defaultValue={page.penalty} className="w-full bg-white h-full border-none text-black outline-none" type="text" name="" placeholder="Penalty" id="" />
                                        </td>
                                        <td className="border relative">
                                            <input onChange={(e) => updateMonth(index, { total: e.target.value })} defaultValue={page.total} className="w-full bg-white h-full border-none text-black outline-none" type="text" name="" placeholder="Total" id="" />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end h-full mt-3 w-full">
                    <button disabled={!modifiCheck} onClick={handleSavePage} className="btn btn-sm bg-blue-500 rounded-none hover:bg-blue-600 text-white">Save Change</button>
                </div>
            </dialog>
        </div>
    );
};

export default Modal;