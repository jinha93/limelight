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

  //1. 포인트 사용내역 DB 설계 (끝)
  //2. 래플 신청내역(향후 진행예정)(패스)
  //3. 보내준 디자인 틀 구성 후 입히기
  //상단바 : 디스코드이미지,디스코드명,나의 포인트
  //하단바 : Tab박스(포인트 사용내역, 래플 신청 내역)

  //!!Mypage 정보는 Session에 담겨있음
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

 //검색어
 const [search, setSearch] = useState("");  

  //페이지네이션
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    try {
      async function fetchData() {
        const res = await axios.get("/api/point");
        const _inputData = res.data.map((rowData) => ({
          nickname: rowData["원래 닉네임"],
          usePoint: rowData["사용 포인트"],
          totalPoint: rowData["총 획득 포인트"],
          rank: rowData.rank,
        }));
        //초기 값 세팅
        setResultData(_inputData);
        setInputData(_inputData);
      }
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  useEffect(() => {
    try {
      async function fetchData() {
        if (search === "" || search === undefined || search === null) {
          setInputData(resultData);
        } else {
          const filterData = resultData.filter((rowData) => {
            return rowData.nickname
              .toLowerCase()
              .includes(search.toLowerCase());
          });
          setInputData(filterData);
        }
      }
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  }, [search]);

  useEffect(() => {
    axios({
        url: '/api/auth/session',
        method: "GET",
    }).then((result) => {
      // req.session.isLogin = true;
      // req.session.userId = userData.id;
      // req.session.userName = userData.username;
      // req.session.discriminator = userData.discriminator;
    }).catch((error) => {
        console.log(error);
    })
},[])  

  return (
    <div className="mx-auto w-3/4 flex flex-col items-start mb-1 pt-32">
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
          {/* <p>{userData.discriminator}</p> */}
              
        </div>
        <div className="w-1/2 h-96 float-right text-center bg-red-200">
          <p>Point : {userData.point}</p>      
        </div>
      </div>
      <div className="w-full h-96 bg-yellow-200">
        포인트 적립내역 / 래플 응모내역
      </div>
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
              <td className="pl-3 py-3 whitespace-nowrap">{rowData.rank}</td>
              <td className="py-3 whitespace-nowrap truncate">
                {rowData.nickname}
              </td>
              <td className="py-3 whitespace-nowrap hidden sm:block">
                {rowData.usePoint}
              </td>
              <td className="pr-3 py-3 whitespace-nowrap">
                {rowData.totalPoint}
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
      <h2 className="mx-auto text-5xl mb-5">나의 포인트 사용내역</h2>
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
              <td className="pl-3 py-3 whitespace-nowrap">{rowData.rank}</td>
              <td className="py-3 whitespace-nowrap truncate">
                {rowData.nickname}
              </td>
              <td className="py-3 whitespace-nowrap hidden sm:block">
                {rowData.usePoint}
              </td>
              <td className="pr-3 py-3 whitespace-nowrap">
                {rowData.totalPoint}
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
    </div>
  );
}

export default MyPageTable;
