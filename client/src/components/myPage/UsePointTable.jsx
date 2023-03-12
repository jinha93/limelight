import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";

function UsePointTable() {
    const [inputData, setInputData] = useState([{}]);

    //페이지네이션
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    const getUserUseHisList = () => {
        axios({
            url: "/api/myPage/getUserUseHisList",
            method: "GET",
        })
            .then((result) => {
                const _inputData = result.data.map((rowData) => ({
                    userId: rowData.USER_ID,
                    useDate: rowData.USE_DATE,
                    usePoint: rowData.USE_POINT,
                    useCts: rowData.USE_CTS,
                }));
                //초기 값 세팅
                setInputData(_inputData);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        getUserUseHisList();
    }, []);

    return (
        <>
            <table className="w-full text-center table-fixed bg-white/80 rounded-xl overflow-hidden shadow mt-5">
                <colgroup>
                    <col className="w-2/12"></col>
                    <col className="w-6/12 truncate"></col>
                    <col className="w-2/12 hidden sm:block"></col>
                    <col className="w-2/12"></col>
                </colgroup>
                <thead className="border-b bg-slate-50">
                    <tr>
                        <th scope="col" className="py-3">
                            사용날짜
                        </th>
                        <th scope="col" className="pr-3 py-3">
                            사용내용
                        </th>
                        <th scope="col" className="py-3 hidden sm:block">
                            사용포인트
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {inputData.slice(offset, offset + limit).map((rowData, idx) => (
                        <tr className="border-b" key={idx}>
                            <td className="py-3 whitespace-nowrap truncate">
                                {rowData.useDate}
                            </td>
                            <td className="pr-3 py-3 whitespace-nowrap">
                                {rowData.useCts}
                            </td>
                            <td className="py-3 whitespace-nowrap hidden sm:block">
                                {rowData.usePoint}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                total={inputData.length}
                limit={limit}
                page={page}
                setPage={setPage}
            />
        </>
    )
}

export default UsePointTable;