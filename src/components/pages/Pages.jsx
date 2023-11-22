import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import usePage from "../../hooks/usePage";
import SinglePage from "./SinglePage";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";

const Pages = () => {
    const [searchWidth, setSearchWidth] = useState(false)
    const { pages, isLoading, isFetching, refetch } = usePage();
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState([])

    useEffect(() => {
        if (searchText.trim() !== '') {
            axios.get(`http://localhost:5000/api/member/search?text=${searchText}`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('jwtToken')}`
                }
            })
                .then(res => setData(res.data))
        } else {
            setData([])
        }
    }, [searchText])

    if (isLoading || isFetching) {
        return <div className="w-full h-screen flex items-center justify-center"><h1 className="text-white font-semibold">Loading page...</h1></div>
    }

    return (
        <div className="max-w-7xl mx-auto p-20 min-h-screen">
            <div className="mb-3 flex items-center w-full">
                <button onClick={() => setSearchWidth(!searchWidth)} className="btn btn-circle btn-sm border-none bg-gray-700 hover:bg-gray-800"><FontAwesomeIcon className="font-bold text-white" icon={faSearch} /></button>
                <input onChange={(e) => setSearchText(e.target.value)} className={`${searchWidth ? ' text-white flex-1 ml-2 bg-transparent border-b h-10 px-2 focus:outline-none' : 'w-0 border-b bg-transparent h-10 ml-2'} duration-500`} type="search" name="" placeholder="search month or year" id="" />
            </div>
            {
                searchText.trim() === '' ? pages?.map((page) => <SinglePage
                    key={page._id}
                    page={page}
                    refetch={refetch}
                ></SinglePage>) : data?.map((page) => <SinglePage
                    key={page._id}
                    page={page}
                    refetch={refetch}
                ></SinglePage>)
            }
        </div>
    );
};

export default Pages;