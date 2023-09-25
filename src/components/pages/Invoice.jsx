import { useParams } from "react-router-dom";
import usePage from "../../hooks/usePage";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import logo from '../../../public/images/akf logo.jpg'
import { BarChart, Bar, Cell, XAxis, YAxis } from 'recharts';

const Invoice = () => {
    const { id } = useParams();
    const { pages } = usePage(id);
    const penalty = pages?.member?.reduce((sum, page) => sum + page.penalty, 0);
    const fee = pages?.member?.reduce((sum, page) => sum + page.fee, 0);
    const total = pages?.member?.reduce((sum, page) => sum + page.total, 0);

    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
    const data = [
        { name: 'Monthly Fee', account: fee },
        { name: 'Penalty', account: penalty },
        { name: 'Total', account: total }
    ];

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = ({ fill, x, y, width, height }) => {
        if (isNaN(y)) {
          y = 0;
        }
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
      };

    const componentPDF = useRef();
    const generatePdf = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: `AKF- ${pages.month}-${pages.year}`,
    })

    return (
        <div className="relative min-h-[1120px] w-[800px] bg-white mx-auto">
            <div ref={componentPDF} className="w-full flex flex-col justify-between min-h-[1120px] relative bg-white mx-auto">
                <img className="w-8/12 opacity-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute mx-auto" src={logo} alt="akf logo not found" />
                <div>
                    <div className="w-full bg-gradient-to-t from-blue-900 to-blue-600 text-center py-5 border-b-2 border-blue-300">
                        <h1 className="text-5xl font-bold text-white drop-shadow-md">Alor Kafela Foundation</h1>
                        <p className="text-xl font-bold text-blue-200 mt-2">Satkania, Chittagong</p>
                        <p className="text-lg text-blue-200 font-semibold">Since : 2020</p>
                    </div>
                    <div className="flex justify-between py-2 text-white w-full px-5 my-3 bg-blue-600 text-xl">
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
                <div className="flex items-center justify-center mb-10">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <XAxis className="font-semibold" dataKey="name" />
                        <YAxis />
                        <Bar dataKey="account" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
            </div>
            <button onClick={generatePdf} className="btn top-3/4 -translate-y-1/4 opacity-30 rounded-r-full hover:opacity-100 duration-500 fixed hover:bg-blue-600 bg-blue-500 rounded-none text-white outline-none border-none">Download Pdf</button>
        </div>
    );
};


export default Invoice;