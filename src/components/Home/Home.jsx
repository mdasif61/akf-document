import { faPager, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import useMember from "../../hooks/useMember";

const Home = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showPage, setShowPage] = useState(false);
    const { refetch, member } = useMember();

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target;
        const month = form.month.value;
        const account = form.account.value;
        const year = form.year.value;
        console.log(month, account, year)
    }

    const blankData = {
        name: 'Name',
        mobile: 'Mobile',
        date: 'Date',
        share: 'Share Number',
        fee: 'Fee',
        ifound: 'iFound',
        penalty: 'Penalty',
        total: 'Total'
    }

    const addMembers = () => {
        axios.post('http://localhost:5000/api/member/members', blankData)
            .then(res => {
                refetch()
                if (res.data._id) {
                    console.log(res.data._id)
                }
            }).catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <div className="bg-white relative left-0 top-0 p-5 min-h-[400px] w-full mx-auto bg-opacity-20 ">
                <div onClick={() => setShowMenu(!showMenu)} className="w-8 mb-3 h-8 cursor-pointer rounded-full border border-white flex items-center justify-center">
                    <FontAwesomeIcon className="text-white" icon={faPlus} />
                </div>
                {showMenu && <div className="absolute top-10 bg-white w-48 p-4 left-10 rounded-md">
                    <span onClick={() => setShowPage(true)} className="hover:cursor-pointer"><FontAwesomeIcon className="text-blue-500 mr-2" icon={faPager} /> <span className="text-blue-500 font-semibold">Create New</span></span>
                </div>}
                {
                    showPage && <div className="w-full">
                        <form onSubmit={handleSubmit} className="items-center flex p-5 top-20 bg-white justify-between">
                            <div>
                                <input className="border h-12 focus:outline-none bg-white py-2 px-4 font-semibold" type="text" name="month" id="" placeholder="MONTH NAME" />
                            </div>
                            <div>
                                <input className="border h-12 focus:outline-none bg-white py-2 px-4 font-semibold" type="text" name="account" id="" placeholder="MONTHLY ACCOUNT" />
                            </div>
                            <div>
                                <input className="border h-12 focus:outline-none bg-white py-2 px-4 font-semibold" type="text" name="year" id="" placeholder="YEAR" />
                            </div>
                            <button type="submit" className="btn bg-black h-12 rounded-none text-white">SAVE</button>

                        </form>
                        <div className="bg-blue-500 p-2">
                            <button onClick={addMembers} className="text-white"><FontAwesomeIcon icon={faPlus} /> Add Member</button>
                        </div>
                        <div className="overflow-x-auto bg-white">
                            <table className="table table-xs">
                                <thead>
                                    <tr>
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
                                        member?.map((user) => (
                                            <tr key={user._id}>
                                                <td className="border">
                                                    <input className="w-full h-full border-none outline-none" type="text" name="name"  placeholder="Name" id="" />
                                                </td>
                                                <td className="border">
                                                    <input className="w-full h-full border-none outline-none" type="text" name="" placeholder="Mobile" id="" />
                                                </td>
                                                <td className="border">
                                                    <input className="w-full h-full border-none outline-none" type="text" name="" placeholder="Date" id="" />
                                                </td>
                                                <td className="border">
                                                    <input className="w-full h-full border-none outline-none" type="text" name="" placeholder="Share Number" id="" />
                                                </td>
                                                <td className="border">
                                                    <input className="w-full h-full border-none outline-none" type="text" name="" placeholder="Montly Fee" id="" />
                                                </td>
                                                <td className="border">
                                                    <input className="w-full h-full border-none outline-none" type="text" name="" placeholder="I.F" id="" />
                                                </td>
                                                <td className="border">
                                                    <input className="w-full h-full border-none outline-none" type="text" name="" placeholder="Penalty" id="" />
                                                </td>
                                                <td className="border">
                                                    <input className="w-full h-full border-none outline-none" type="text" name="" placeholder="Total" id="" />
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Home;