import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';

import Pagination from "../common/Pagination";

function RankTable() {

    const [inputData, setInputData] = useState([{}]);
    const [resultData, setResultData] = useState([{}]);

    //페이지네이션
    const [limit, setLimit] = useState(7);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    //검색어
    const [search, setSearch] = useState('');

    useEffect(() => {
        try {
            async function fetchData() {
                const res = await axios.get('/api/point');
                const _inputData = res.data.map((rowData) => (
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
                        return rowData.nickname.toLowerCase().includes(search)
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
        <Fragment>

            <div className="flex flex-col mx-auto w-10/12 md:w-9/12 items-start mb-1">
                <div className="relative w-full md:w-60">
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
            </div>
            
            <div className="flex flex-col mx-auto w-10/12 md:w-9/12 bg-white/80 rounded-xl shadow">
                <div className="sm:-mx-6 lg:-mx-8">
                    <div className="p-2 inline-block w-full sm:px-6 lg:px-8">
                        <div className="">

                            <table className="w-full text-center table-fixed">
                                <colgroup>
                                    <col className='w-2/12'></col>
                                    <col className='w-6/12 truncate'></col>
                                    <col className='w-2/12 hidden sm:block'></col>
                                    <col className='w-2/12'></col>
                                </colgroup>
                                <thead className="border-b">
                                    <tr>
                                        <th scope="col" className="py-4">RANK</th>
                                        <th scope="col" className="py-4">DISCORD ID</th>
                                        <th scope="col" className="py-4 hidden sm:block">USED POINT</th>
                                        <th scope="col" className="py-4">POINT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        inputData.slice(offset, offset + limit).map((rowData, idx) => (
                                            <tr className="border-b" key={idx}>
                                                <td className="py-4 whitespace-nowrap">{rowData.rank}</td>
                                                <td className="py-4 whitespace-nowrap truncate">{rowData.nickname}</td>
                                                <td className="py-4 whitespace-nowrap hidden sm:block">{rowData.usePoint}</td>
                                                <td className="py-4 whitespace-nowrap">{rowData.totalPoint}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <Pagination
                total={inputData.length}
                limit={limit}
                page={page}
                setPage={setPage}
            />

        </Fragment>
    )
}

export default RankTable;