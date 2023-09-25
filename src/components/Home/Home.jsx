import { faBorderAll, faFileLines, faPager, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import useMember from "../../hooks/useMember";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import usePage from "../../hooks/usePage";

const Home = () => {
    const { pages, refetch: pageRefetch } = usePage()
    const [showMenu, setShowMenu] = useState(false);
    const [showPage, setShowPage] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [rowId, setRowId] = useState(null);
    const menuRef = useRef(null);
    const { refetch, member } = useMember();
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [account, setAccount] = useState('');

    useEffect(() => {
        member.slice(0, 1).map((head) => {
            setMonth(head.month);
            setAccount(head.account);
            setYear(head.year)
        })
    }, [member]);

    const isSaveDisabled = () => {
        return (
            !month || !account || !year ||
            member.some(user =>
                !user.name || !user.mobile || !user.share || !user.date || !user.fee || !user.ifound || !user.total
            )
        );
    };

    const handleSubmit = async () => {
        await axios.post(`http://localhost:5000/api/member/pages`, { month, account, year, member })
            .then(res => {
                if (res.statusText === 'Created') {
                    axios.delete('http://localhost:5000/api/member/delete-all')
                        .then(res => {
                            if (res.data.deletedCount > 0) {
                                pageRefetch()
                                refetch()
                            }

                        })
                }
            })

    }

    const blankData = {
        name: '',
        mobile: '',
        date: '',
        share: '',
        fee: '',
        ifound: '',
        penalty: '',
        total: '',
        month: '',
        account: '',
        year: ''
    }

    const addMembers = () => {
        axios.post('http://localhost:5000/api/member/members', blankData)
            .then(res => {
                refetch()
                if (res.data._id) {
                    // console.log(res.data._id)
                }
            }).catch(err => {
                console.log(err)
            })
    };

    const mutation = useMutation(
        async (id) => {
            try {
                const res = await axios.delete(`http://localhost:5000/api/member/delete-member/${id}`)
                return res.data;
            } catch (error) {
                console.log(`Error delete member: ${error}`)
                throw error;
            }
        }, {
        onSuccess: (data) => {
            if (data.deletedCount > 0) {
                refetch()
            }
        }
    }
    )

    const removeRow = (memberId) => {
        Swal.fire({
            title: 'Are you sure?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                mutation.mutate(memberId)
            }
        })
    };

    const updateMutaton = useMutation(
        async ({ id, data }) => {
            try {
                const res = await axios.patch(`http://localhost:5000/api/member/update-member/${id}`, { data: data });
                return res.data;
            } catch (error) {
                console.log(`Error update member : ${error}`)
            }
        }, {
        onSuccess: () => {
            refetch()
            // console.log(data)
        }
    }
    );

    const updateMember = (id, data) => {
        updateMutaton.mutate({ id, data })
    };

    useEffect(() => {
        const handleOutSideClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false)
            }
        };
        document.addEventListener('click', handleOutSideClick);
        return () => {
            document.removeEventListener('click', handleOutSideClick)
        }
    }, [])

    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <div className="bg-white relative left-0 top-0 p-5 min-h-[400px] w-full mx-auto bg-opacity-20 ">
                <div ref={menuRef} onClick={() => setShowMenu(!showMenu)} className="w-8 mb-3 h-8 cursor-pointer rounded-full border border-white flex items-center justify-center">
                    <FontAwesomeIcon className="text-white" icon={faPlus} />
                </div>
                {showMenu && <div className="absolute z-50 space-y-2 top-10 bg-white w-48 p-4 left-10 rounded-md">
                    <p onClick={() => setShowPage(true)} className="hover:cursor-pointer border-b pb-1 font-semibold text-blue-500"><FontAwesomeIcon className="text-blue-500 mr-2" icon={faPager} />Create page</p>
                    <p className="border-b pb-1">
                        <Link to='/pages'>
                            <span className="font-semibold hover:cursor-pointer text-black"><FontAwesomeIcon icon={faBorderAll} /> All page</span>
                            <span className="badge bg-black text-white ml-1 border-none p-2 font-bold badge-xs"><span className="absolute ">{pages.length ? pages.length : 0}</span></span>
                        </Link>
                    </p>
                </div>}

                {
                    showPage && <div className="w-full">
                        <div className="flex w-full p-5 bg-blue-600 items-center">
                            <div className="flex-1">
                                {member.slice(0, 1).map((head) => {
                                    return <form key={head._id} className="items-center flex  top-20 justify-between">
                                        <div>
                                            <input defaultValue={head.month} onChange={(e) => {
                                                updateMember(head._id, { month: e.target.value })
                                            }} className="h-12 border-b border-white text-white bg-transparent focus:outline-none py-2 font-bold text-xl" type="text" name="month" id="" placeholder="MONTH NAME" />
                                        </div>
                                        <div>
                                            <input defaultValue={head.account} onChange={(e) => {
                                                updateMember(head._id, { account: e.target.value })
                                            }} className="h-12 focus:outline-none bg-transparent text-white border-b border-white py-2 font-bold text-xl" type="text" name="account" id="" placeholder="MONTHLY ACCOUNT" />
                                        </div>
                                        <div>
                                            <input defaultValue={head.year} onChange={(e) => {
                                                updateMember(head._id, { year: e.target.value })
                                            }} className="h-12 focus:outline-none border-b text-white border-white bg-transparent py-2 font-bold text-xl" type="text" name="year" id="" placeholder="YEAR" />
                                        </div>
                                    </form>
                                })}
                            </div>

                            <button disabled={isSaveDisabled()} onClick={handleSubmit} type="submit" className="btn bg-blue-400 border-none outline-none ml-5 hover:bg-blue-700 h-12 rounded-none text-white">SAVE</button>
                        </div>

                        <div className="bg-blue-500 p-2">
                            <button onClick={addMembers} className="text-white"><FontAwesomeIcon icon={faPlus} /> Add Member</button>
                            <Link to='/pages'>
                                <button className="text-white ml-4 hover:underline"><FontAwesomeIcon icon={faFileLines} /> Pages <div className="badge bg-blue-200 border-none p-2 font-bold badge-xs"><span className="absolute ">{pages.length ? pages.length : 0}</span></div></button>
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
                                <tbody>
                                    {
                                        member?.map((user) => (
                                            <tr onMouseOver={() => {
                                                setRowId(user._id)
                                                setShowDelete(true);
                                            }} onMouseOut={() => {
                                                setShowDelete(false);
                                                setRowId(null)
                                            }} key={user._id}>
                                                <td className="border">
                                                    <input defaultValue={user.name} onChange={(e) => updateMember(user._id, { name: e.target.value })} className="w-full bg-white h-full border-none outline-none" type="text" name="name" placeholder="Name" id="" />
                                                </td>
                                                <td className="border">
                                                    <input defaultValue={user.mobile} onChange={(e) => updateMember(user._id, { mobile: e.target.value })} className="w-full bg-white h-full border-none outline-none" type="text" name="" placeholder="Mobile" id="" />
                                                </td>
                                                <td className="border">
                                                    <input defaultValue={user.date} onChange={(e) => updateMember(user._id, { date: e.target.value })} className="w-full bg-white h-full border-none outline-none" type="text" name="" placeholder="Date" id="" />
                                                </td>
                                                <td className="border">
                                                    <input defaultValue={user.share} onChange={(e) => updateMember(user._id, { share: e.target.value })} className="w-full bg-white h-full border-none outline-none" type="text" name="" placeholder="Share Number" id="" />
                                                </td>
                                                <td className="border">
                                                    <input defaultValue={user.fee} onChange={(e) => updateMember(user._id, { fee: e.target.value })} className="w-full bg-white h-full border-none outline-none" type="text" name="" placeholder="Montly Fee" id="" />
                                                </td>
                                                <td className="border">
                                                    <input defaultValue={user.ifound} onChange={(e) => updateMember(user._id, { ifound: e.target.value })} className="w-full bg-white h-full border-none outline-none" type="text" name="" placeholder="I.F" id="" />
                                                </td>
                                                <td className="border">
                                                    <input defaultValue={user.penalty} onChange={(e) => updateMember(user._id, { penalty: e.target.value })} className="w-full bg-white h-full border-none outline-none" type="text" name="" placeholder="Penalty" id="" />
                                                </td>
                                                <td className="border relative">
                                                    <input defaultValue={user.total} onChange={(e) => updateMember(user._id, { total: e.target.value })} className="w-full bg-white h-full border-none outline-none" type="text" name="" placeholder="Total" id="" />
                                                    <button onClick={() => removeRow(user._id)} className={`border-none ${showDelete && rowId == user._id ? '' : 'hidden'} outline-none absolute right-3`}>X</button>
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