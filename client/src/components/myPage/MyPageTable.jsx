import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';

import Pagination from "../common/Pagination";

function MyPageTable() {

    // 필요기능 : 
    // 1.
    // Nav >> MyPage 버튼을 눌러 접근하거나
    // 홈페이지에서 로그인 아이디(킹재훈#1646)를 눌러 MyPage에 들어가거나 미확정

    // 2.
    // 로그인 여부를 체크 
    // 로그인 O ==> MyPage 접근  
    // 로그인 X ==> 알림창('로그인을 먼저 진행해주세요.') 모달창 이후 접근 불가

    // 3.
    // 목표기능 : 나의 포인트 사용내역, 나의 포인트 적립내역...etc
    

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
          <h2 className="mx-auto text-5xl mb-5">나의 포인트 적립내역</h2>
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
          <h2 className="mx-auto text-5xl mb-5">나의 포인트 사용내역</h2>
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

export default MyPageTable;