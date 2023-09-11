import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';

import Pagination from "../common/Pagination";

function RankTable() {

    const [inputData, setInputData] = useState([{}]);
    const [resultData, setResultData] = useState([{}]);

    //페이지네이션
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    //검색어
    const [search, setSearch] = useState('');

    useEffect(() => {
        try {
            async function fetchData() {
                const res = await axios.get('/api/point');
                const _inputData = res.data.result.map((rowData) => (
                    {
                        nickname: rowData['원래 닉네임'],
                        usePoint: rowData['사용 포인트'],
                        totalPoint: rowData['총 획득 포인트'],
                        rank: rowData.rank
                    })
                )
                //초기 값 세팅
                setResultData(_inputData)
                setInputData(_inputData)
            }
            fetchData();

        } catch (error) {
            console.error(error.message);
        }
    }, [])

    useEffect(() => {
        try {
            async function fetchData() {
                if (search === '' || search === undefined || search === null) {
                    setInputData(resultData)
                } else {
                    const filterData = resultData.filter((rowData) => {
                        return rowData.nickname.toLowerCase().includes(search.toLowerCase())
                    })
                    setInputData(filterData);
                }
            }
            fetchData();

        } catch (error) {
            console.error(error.message);
        }
    }, [search])

    return (
        <div className="mx-auto w-3/4 flex flex-col items-start mb-1 pt-32">
            <div className="relative w-full lg:w-60 mb-3 mr-0 ml-auto z-10">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
                    </svg>
                </div>
                <input
                    type="text"
                    className="
                            bg-white/80 border border-gray-300 text-gray-900 text-sm rounded-lg 
                            focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5
                        "
                    placeholder="Search #0000"
                    onChange={(e) => {
                        setSearch(e.target.value)
                    }}
                />
            </div>
            

            <table className="w-full text-center table-fixed bg-white/80 rounded-xl overflow-hidden shadow">
                <colgroup>
                    <col className='w-2/12'></col>
                    <col className='w-6/12 truncate'></col>
                    <col className='w-2/12 hidden sm:block'></col>
                    <col className='w-2/12'></col>
                </colgroup>
                <thead className="border-b bg-slate-50">
                    <tr>
                        <th scope="col" className="pl-3 py-3">RANK</th>
                        <th scope="col" className="py-3">DISCORD ID</th>
                        <th scope="col" className="py-3 hidden sm:block">USED POINT</th>
                        <th scope="col" className="pr-3 py-3">POINT</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        inputData.slice(offset, offset + limit).map((rowData, idx) => (
                            <tr className="border-b" key={idx}>
                                <td className="pl-3 py-3 whitespace-nowrap">{rowData.rank}</td>
                                <td className="py-3 whitespace-nowrap truncate">{rowData.nickname}</td>
                                <td className="py-3 whitespace-nowrap hidden sm:block">{rowData.usePoint}</td>
                                <td className="pr-3 py-3 whitespace-nowrap">{rowData.totalPoint}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <Pagination
                total={inputData.length}
                limit={limit}
                page={page}
                setPage={setPage}
            />
        </div>
    )
}

export default RankTable;