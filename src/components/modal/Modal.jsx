import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const Modal = ({ handleHideModal, pageData }) => {

    const monthMutation = useMutation(
        async ({ id, memberIndex, data }) => {
            try {
                const res = await axios.patch(`http://localhost:5000/api/member/update-month/${id}`, { data: data, index: memberIndex });
                return res.data;
            } catch (error) {
                console.log(`Error month update :`, error)
            }
        }, {
        onSuccess: (data) => {
            console.log(data)
        }
    }
    );

    const updateMonth = async (id, memberIndex, data) => {
        monthMutation.mutate({ id, memberIndex, data })
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
                                            <input onChange={(e) => updateMonth(page._id, index, { name: e.target.value })} defaultValue={page.name} className="w-full text-black bg-white h-full border-none outline-none" type="text" name="name" placeholder="Name" id="" />
                                        </td>
                                        <td className="border">
                                            <input onChange={(e) => updateMonth(page._id, index, { mobile: e.target.value })} defaultValue={page.mobile} className="w-full bg-white h-full border-none text-black outline-none" type="text" name="" placeholder="Mobile" id="" />
                                        </td>
                                        <td className="border">
                                            <input onChange={(e) => updateMonth(page._id, index, { date: e.target.value })} defaultValue={page.date} className="w-full bg-white h-full border-none text-black outline-none" type="text" name="" placeholder="Date" id="" />
                                        </td>
                                        <td className="border">
                                            <input onChange={(e) => updateMonth(page._id, index, { share: e.target.value })} defaultValue={page.share} className="w-full bg-white h-full border-none text-black outline-none" type="text" name="" placeholder="Share Number" id="" />
                                        </td>
                                        <td className="border">
                                            <input onChange={(e) => updateMonth(page._id, index, { fee: e.target.value })} defaultValue={page.fee} className="w-full bg-white h-full border-none text-black outline-none" type="text" name="" placeholder="Montly Fee" id="" />
                                        </td>
                                        <td className="border">
                                            <input onChange={(e) => updateMonth(page._id, index, { ifound: e.target.value })} defaultValue={page.ifound} className="w-full bg-white h-full border-none text-black outline-none" type="text" name="" placeholder="I.F" id="" />
                                        </td>
                                        <td className="border">
                                            <input onChange={(e) => updateMonth(page._id, index, { penalty: e.target.value })} defaultValue={page.penalty} className="w-full bg-white h-full border-none text-black outline-none" type="text" name="" placeholder="Penalty" id="" />
                                        </td>
                                        <td className="border relative">
                                            <input onChange={(e) => updateMonth(page._id, index, { total: e.target.value })} defaultValue={page.total} className="w-full bg-white h-full border-none text-black outline-none" type="text" name="" placeholder="Total" id="" />
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </dialog>
        </div>
    );
};

export default Modal;