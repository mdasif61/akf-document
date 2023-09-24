import { useParams } from "react-router-dom";

const EditPage = () => {
    const {id}=useParams();
    return (
        <div>
            <h1>This is edit page</h1>
        </div>
    );
};

export default EditPage;