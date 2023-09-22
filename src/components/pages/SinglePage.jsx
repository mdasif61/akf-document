import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const SinglePage = ({ page }) => {
    return (
        <div className="w-10/12 mx-auto p-1">
            <Link to={`/invoice/${page._id}`}>
                <div className="w-full flex bg-blue-600 duration-300 rounded-md hover:bg-blue-700 space-x-4 border py-3 px-5 hover:cursor-pointer">
                    <div>
                        <h1 className="text-lg font-bold text-white">{page.month}</h1>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white">{page.account}</h1>
                    </div>
                    <div className="flex-1">
                        <h1 className="text-lg font-bold text-white">{page.year}</h1>
                    </div>
                    <div>
                        <FontAwesomeIcon className="text-white" icon={faArrowRight} />
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default SinglePage;