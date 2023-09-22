import { useParams } from "react-router-dom";
import usePage from "../../hooks/usePage";

const Invoice = () => {
    const { id } = useParams();
    const { pages } = usePage(id);
    console.log(pages)
    return (
        <div className="w-[1120px] h-[800px] bg-white mx-auto">
            <div>
                <div className="w-full bg-blue-100 text-center py-5 border-b-2 border-blue-500">
                    <h1 className="text-5xl font-bold text-blue-600">Alor Kafela Foundation</h1>
                    <p className="text-xl text-blue-500 mt-2 font-semibold">Since : 2020</p>
                </div>
                <div className="flex justify-between py-2 text-white w-full px-5 my-3 bg-blue-500 text-xl">
                    <h1><span className="font-bold">Month :</span> {pages.month}</h1>
                    <h1>{pages.account}</h1>
                    <h1><span className="font-bold">Year :</span> {pages.year}</h1>
                </div>
                <div>
                    <div className="overflow-x-auto bg-white">
                        <table className="table table-xs">
                            <thead>
                                <tr className="border text-sm text-black font-bold">
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
                                    pages?.member?.map((user) => (
                                        <tr className="text-gray-800" key={user._id}>
                                            <td className="border">
                                                {user.name}
                                            </td>
                                            <td className="border">
                                                {user.mobile}
                                            </td>
                                            <td className="border">
                                                {user.date}
                                            </td>
                                            <td className="border">
                                                {user.share}
                                            </td>
                                            <td className="border">
                                               {user.fee}
                                            </td>
                                            <td className="border">
                                               {user.ifound}
                                            </td>
                                            <td className="border">
                                                {user.penalty}
                                            </td>
                                            <td className="border">
                                               {user.total}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Invoice;