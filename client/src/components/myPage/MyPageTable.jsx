import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import limemon from '../../assets/images/limemon.jpg';
import Pagination from "../common/Pagination";

function MyPageTable() {

  const user = useSelector(state => state.user.value);
  const isLogin = user.isLogin;
  const userData = user.userData;

  //2023-01-23 TODO 작성

  //상단바 : 디스코드이미지,디스코드명,나의 포인트
  //하단바 : 포인트 사용내역

  //!!Mypage 정보는 Session에 담겨있음

  // 3.
  // 목표기능 : 나의 포인트 사용내역

  const [inputData, setInputData] = useState([{}]);

  //페이지네이션
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const getUserUseHisList = () => {
    axios({
      url: '/api/point/getUserUseHisList',
      method: 'GET'
    }).then((result) => {
      const _inputData = result.data.map((rowData) => (
        {
            userId: rowData.USER_ID,
            useDate: rowData.USE_DATE,
            usePoint: rowData.USE_POINT,
            useCts: rowData.USE_CTS,
        })
      );
      //초기 값 세팅
      setInputData(_inputData);
    }).catch((error) => {
      console.log(error);
    })
  }
  useEffect(() => {
    getUserUseHisList();
  }, []);

  return (
    <div className="mx-auto w-3/4 flex flex-col items-start mb-1 pt-32">
       <h2 className="mx-auto text-5xl mb-5">나의 포인트 적립내역</h2>
      <table className="w-full text-center table-fixed bg-white/80 rounded-xl overflow-hidden shadow">
        <colgroup>
          <col className="w-2/12"></col>
          <col className="w-6/12 truncate"></col>
          <col className="w-2/12 hidden sm:block"></col>
          <col className="w-2/12"></col>
        </colgroup>
        <thead className="border-b bg-slate-50">
          <tr>
            <th scope="col" className="pl-3 py-3">
              RANK
            </th>
            <th scope="col" className="py-3">
              DISCORD ID
            </th>
            <th scope="col" className="py-3 hidden sm:block">
              USED POINT
            </th>
            <th scope="col" className="pr-3 py-3">
              POINT
            </th>
          </tr>
        </thead>
        <tbody>
          {inputData.slice(offset, offset + limit).map((rowData, idx) => (
            <tr className="border-b" key={idx}>
              <td className="pl-3 py-3 whitespace-nowrap">{rowData.userId}</td>
              <td className="py-3 whitespace-nowrap truncate">
                {rowData.useDate}
              </td>
              <td className="py-3 whitespace-nowrap hidden sm:block">
                {rowData.usePoint}
              </td>
              <td className="pr-3 py-3 whitespace-nowrap">
                {rowData.useCts}
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
      <div className="w-full h-96 bg-white">
        <div className="w-1/2 h-96 float-left bg-orange-200">
          <h2 className="mx-auto text-2xl mb-5">나의 페이지
          </h2>
          <img 
            className='object-cover h-30 rounded-full'
            src={userData.userAvatar ? userData.userAvatar : limemon}
            alt="userAvatar"
          />          
          <p>닉네임 : {userData.userName}</p>
          <p>discriminator : {userData.discriminator}</p>
          <p>id : {userData.id}</p>
          <p>Point : {userData.point}</p>      
              
        </div>
        <div className="w-1/2 h-96 float-right text-center bg-red-200">
        </div>
      </div>
      <div className="w-full h-96 bg-yellow-200">
        포인트 적립내역 / 래플 응모내역
      </div>

    </div>
  );
}

export default MyPageTable;
