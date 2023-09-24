import usePage from "../../hooks/usePage";
import SinglePage from "./SinglePage";

const Pages = () => {

    const {pages,isLoading,isFetching}=usePage();
    
    if(isLoading || isFetching){
        return <div className="w-full h-screen flex items-center justify-center"><h1 className="text-white font-semibold">Loading page...</h1></div>
    }

    return (
        <div className="max-w-7xl mx-auto min-h-screen">
            {
                pages?.map((page)=><SinglePage
                key={page._id}
                page={page}
                ></SinglePage>)
            }
        </div>
    );
};

export default Pages;