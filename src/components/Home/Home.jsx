import { faPager, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Home = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showPage, setShowPage] = useState(false);

    const handleSubmit=(e)=>{
        e.preventDefault()
        const form=e.target;
        const month=form.month.value;
        const account=form.account.value;
        const year=form.year.value;
        console.log(month,account,year)
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <div className="bg-white relative left-0 top-0 p-5 min-h-[400px] w-full mx-auto bg-opacity-20 ">
                <div onClick={() => setShowMenu(!showMenu)} className="w-8 absolute h-8 cursor-pointer rounded-full border border-white flex items-center justify-center">
                    <FontAwesomeIcon className="text-white" icon={faPlus} />
                </div>
                {showMenu && <div className="absolute top-10 bg-white w-48 p-4 left-10 rounded-md">
                    <span onClick={() => setShowPage(true)} className="hover:cursor-pointer"><FontAwesomeIcon className="text-blue-500 mr-2" icon={faPager} /> <span className="text-blue-500 font-semibold">Create New</span></span>
                </div>}
                {
                    showPage && <div className="w-full">
                        <form onSubmit={handleSubmit} className="w-full items-center flex p-5 absolute top-20 bg-white justify-center">
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
                    </div>
                }
            </div>
        </div>
    );
};

export default Home;