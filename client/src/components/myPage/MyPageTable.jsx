import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import limemon from "../../assets/images/limemon.jpg";
import Pagination from "../common/Pagination";

function MyPageTable() {
  //TODO 작성
  //- 탭 이벤트로 리스트 조회 미구현
  //- 디자인 미완성

  //템플릿 URL
  //- https://codepen.io/cruip/pen/MWEWxLK

  /*
  EX)
  discriminator: "1646"
  isLogin: true
  point: 100000
  userAvatar: "https://cdn.discordapp.com/avatars/864874628014014514/61415fe75b548bc600886e78a22f04aa"
  userId: "864874628014014514"
  userName: "킹재훈"           
  */
  const user = useSelector((state) => state.user.value);
  const userData = user.userData;

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
    <div className="mx-auto w-3/4 flex flex-col items-start mb-1 pt-32">
      <div className="w-1/2 h-96">
        <div class="max-w-xs mx-0">
          <div class="flex flex-col h-full bg-white shadow-lg rounded-lg overflow-hidden">
            <figure class="relative h-0 pb-[56.25%] overflow-hidden">
              <h2 className="mx-auto text-2xl mb-5">나의 페이지</h2>
              <img
                className="object-cover h-30 rounded-full"
                src={userData.userAvatar ? userData.userAvatar : limemon}
                alt="userAvatar"
              />
            </figure>
            <div class="flex-grow flex flex-col p-5">
              <div class="flex-grow">
                <header class="mb-3">
                  <h3 class="text-[22px] text-gray-900 font-extrabold leading-snug">
                    {userData.userName}#{userData.discriminator}
                  </h3>
                </header>
                <div class="mb-8">
                  <p>현재 포인트 : {userData.point} Point</p>
                </div>
              </div>
              <div class="flex justify-end space-x-2"></div>
            </div>
          </div>
        </div>
      </div>
      <table className="w-full text-center table-fixed bg-white/80 rounded-xl overflow-hidden shadow">
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
            <th scope="col" className="py-3 hidden sm:block">
              사용포인트
            </th>
            <th scope="col" className="pr-3 py-3">
              사용내용
            </th>
          </tr>
        </thead>
        <tbody>
          {inputData.slice(offset, offset + limit).map((rowData, idx) => (
            <tr className="border-b" key={idx}>
              <td className="py-3 whitespace-nowrap truncate">
                {rowData.useDate}
              </td>
              <td className="py-3 whitespace-nowrap hidden sm:block">
                {rowData.usePoint}
              </td>
              <td className="pr-3 py-3 whitespace-nowrap">{rowData.useCts}</td>
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
