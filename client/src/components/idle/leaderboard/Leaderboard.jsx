import axios from 'axios';
import { useEffect, useState } from "react"
import TopInfo from "../TopInfo"
import Pagination from './Pagination';

import { FaMedal } from "react-icons/fa";

export default function Leaderboard() {

    //페이지네이션
    // const [limit, setLimit] = useState(15);
    const limit = 15;
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    const [leaderboard, setLeaderboard] = useState([]);
    const getLeaderboard = () => {
        axios({
            url: `/api/leaderboard`,
            method: 'GET'
        }).then((response) => {
            setLeaderboard(response.data.result);
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        getLeaderboard();
        getRanker();
    }, [])



    const [ranker, setRanker] = useState([]);
    const getRanker = () => {
        axios({
            url: `/api/leaderboard/ranker`,
            method: 'GET'
        }).then((response) => {
            setRanker(response.data.result);
        }).catch((error) => {
            console.log(error);
        })
    }



    return (
        <div className='h-full'>
            <TopInfo
                title={'Leaderboard'}
                description={'Check your ranking.'}
            />
            <div className="w-full h-[90%] grid grid-cols-3 gap-5 px-5">
                <div className="col-span-2 h-full grid grid-rows-3 gap-5">
                    <div className="row-span-2 flex gap-5">
                        {
                            ranker.map((data, index) => (
                                <div className={`w-full h-full border-2 rounded-3xl grid  ${index === 0 ? 'border-yellow-400' : null} ${index === 1 ? 'border-gray-400' : null} ${index === 2 ? 'border-orange-400' : null}`}>

                                    <div className={`content-center text-center ${index === 0 ? 'bg-yellow-400/10 text-yellow-400' : null} ${index === 1 ? 'bg-gray-400/10 text-gary-400' : null} ${index === 2 ? 'bg-orange-400/10 text-orange-400' : null}`}>
                                        <div className="flex gap-3 justify-center items-center">
                                            <FaMedal size={30} />
                                            <span className='SUITE-Bold text-3xl'>{index + 1}</span>
                                        </div>
                                    </div>

                                    <div className='w-1/2 mx-auto content-center'>
                                        <div className='pb-[100%]'>
                                            <div className='relative'>
                                                {/* LIMEMON IMG */}
                                                <img
                                                    src={`/api/img?imgSrc=${data.imgSrc}`}
                                                    className={`absolute z-10 rounded-full border ${index === 0 ? 'border-yellow-400' : null} ${index === 1 ? 'border-gray-400' : null} ${index === 2 ? 'border-orange-400' : null}`}
                                                    alt="myLimemon"
                                                />
                                                {/* 장착 장비 */}
                                                {
                                                    data.OwnerdItems.map((items) => {
                                                        return (
                                                            <img
                                                                key={items.itemId}
                                                                src={`/api/img?imgSrc=${items.Item.imgSrc}`}
                                                                className={`absolute rounded-full ${items.Item.part === 'BACKGROUND' ? 'z-0' : 'z-20'}`}
                                                                alt={items.itemName}
                                                            />
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`content-center text-center ${index === 0 ? 'bg-yellow-400/10 text-yellow-400' : null} ${index === 1 ? 'bg-gray-400/10 text-gary-400' : null} ${index === 2 ? 'bg-orange-400/10 text-orange-400' : null}`}>
                                        <h2 className='text-3xl'>{data.User.username}</h2>
                                        <span className='text-2xl'>+ {data.power}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className='border border-[#7c7a75] rounded-3xl p-5 text-center flex flex-col'>
                        <h2 className='SUITE-Bold text-5xl'>Season Rewards</h2>
                        <div className='flex flex-col h-full justify-center'>
                            <span>Next Season Special Gacha Box * 1</span>
                            <span>Next Season Gacha Box * 3</span>
                        </div>
                    </div>
                </div>

                <div className="border border-[#7c7a75] rounded-3xl p-5 flex flex-col justify-between overflow-y-auto">
                    <div className='SUITE-Bold bg-[#dcebc2] border border-[#7b9b18] text-[#7b9b18] px-4 py-2 rounded-full flex justify-between'>
                        <h2>My Ranking</h2>
                        <p>#1234</p>
                    </div>

                    <table className="w-full mt-2">
                        <colgroup>
                            <col className="w-1/12"></col>
                            <col className="w-3/6"></col>
                            <col className="w-2/6"></col>
                        </colgroup>
                        <thead>
                            <tr>
                                <th className="text-center py-1.5 pr-2">#</th>
                                <th className="text-left py-1.5 px-2">Username</th>
                                <th className="text-right py-1.5 pl-2">Power</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                leaderboard.slice(offset, offset + limit).map((data, index) => (
                                    <tr>
                                        <td className="text-center py-1.5 pr-2">{(page - 1) * limit + index + 1}</td>
                                        <td className="text-left py-1.5 px-2">{data.User.username}</td>
                                        <td className="text-right py-1.5 pl-2">{data.power}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <Pagination
                        total={leaderboard.length}
                        limit={limit}
                        page={page}
                        setPage={setPage}
                    />
                </div>
            </div>
        </div>
    )
}