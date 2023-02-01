import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';

import Pagination from "../common/Pagination";

function MyPageTable() {

    //2023-01-23 TODO 작성

    //1. 포인트 사용내역 DB 설계 (끝)
    //2. 래플 신청내역(향후 진행예정)(패스)
    //3. 보내준 디자인 틀 구성 후 입히기
    //상단바 : 디스코드이미지,디스코드명,나의 포인트
    //하단바 : Tab박스(포인트 사용내역, 래플 신청 내역)

    //!!Mypage 정보는 Session에 담겨있음
    

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
            <div className="w-full h-96 bg-white">
                <div className="w-1/2 h-96 float-left bg-orange-200">
                    <h2 className="mx-auto text-2xl mb-5">나의 페이지</h2>
                </div>
                <div className="w-1/2 h-96 float-right text-center bg-red-200">총 포인트</div>
            </div>
            <div className="w-full h-96 bg-yellow-200">포인트 적립내역 / 래플 응모내역</div>
        </div>
    )
}

export default MyPageTable;