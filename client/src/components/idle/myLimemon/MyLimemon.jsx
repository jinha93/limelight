import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function MyLimemon() {

    const [limemonList, setLimemonList] = useState([]);
    const getLimemonList = () => {
        axios({
            url: '/api/limemon',
            method: 'GET'
        }).then((response) => {
            // 퀘스트 목록
            const limemonList = [...response.data.result];
            setLimemonList(limemonList);
        }).catch((error) => {
            console.log(error);
        })
    }

    const [equipItems, setEquipItems] = useState([]);
    const getEquipItems = (limemonId) => {
        axios({
            url: `/api/limemon/equipItems?limemonId=${limemonId}`,
            method: 'GET'
        }).then((response) => {
            setEquipItems(response.data.result);
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        // 라임몬 정보 불러오기
        getLimemonList();
    }, [])

    useEffect(() => {
        if (limemonList[0]) {
            getEquipItems(limemonList[0].limemonId);
        }
    }, [limemonList])

    // 라임몬 레벨업
    const levelUp = (limemonId) => {
        if (limemonList[0].level === 8) {
            // setIsBetaPopup(true);
            return;
        }

        const exp = limemonList[0].exp;
        const requireExp = limemonList[0].LimemonLevelInfo.requiredExp;

        if (exp < requireExp) {
            toast.error('Not enough exp')
            return;
        }

        axios({
            url: `/api/limemon/${limemonId}/levelUp`,
            method: 'PUT'
        }).then((response) => {
            if (response.data.success) {
                getLimemonList();
            }
        }).catch((error) => {
            // 로그인 세션 에러
            if (error.response.status === 401) {
            } else {
                alert(error.response.data.message);
            }
        })
    }

    return (
        <div className='h-full'>
            <div className="mb-5">
                <h3 className="SUITE-Bold text-2xl text-[#5d5a51] ">MY LIMEMON</h3>
                <p className="mt-2 text-sm">Grow your Limemon.</p>
            </div>
            <div className='flex gap-10 h-[90%]'>
                <div className="border border-[#7c7a75] rounded-lg w-full bg-[#e3e3e3]">
                    {/* img */}
                    <div className='pb-[100%]'>
                        {
                            limemonList[0]
                                ?
                                <div className='relative'>
                                    {/* LIMEMON IMG */}
                                    <img
                                        src={`/api/img?imgSrc=${limemonList[0].imgSrc}`}
                                        className="absolute z-10 w-full rounded-t-lg"
                                        alt="myLimemon"
                                    />
                                    {/* 장착 장비 */}
                                    {
                                        equipItems.map((items) => {
                                            return (
                                                <img
                                                    src={`/api/img?imgSrc=${items.Item.imgSrc}`}
                                                    className={items.Item.part === 'BACKGROUND' ? "absolute z-0 w-full rounded-t-lg" : "absolute z-20 w-full rounded-t-lg"}
                                                    key={items.itemId}
                                                    alt={items.itemName}
                                                />
                                            )
                                        })
                                    }
                                </div>
                                :
                                <div className='relative'>
                                    <img
                                        src={'/api/img?imgSrc=limemon/default.png'}
                                        className="absolute rounded-lg z-10 w-full"
                                        alt="myLimemon"
                                    />
                                </div>
                        }
                    </div>
                    {/* info */}
                    <div className='flex flex-col gap-10 px-5 py-10 border-t border-[#7c7a75]'>
                        <div>
                            <div className="flex justify-between items-center">
                                <span>Lvl. {limemonList[0] ? limemonList[0].level : 0}</span>
                                {
                                    limemonList[0] ?
                                        <div>
                                            <button
                                                className="rounded-lg shadow bg-yellow-400 text-white px-2 py-1 text-sm uppercase"
                                                onClick={() => levelUp(limemonList[0].limemonId)}
                                            >
                                                Level Up
                                            </button>
                                        </div>
                                        :
                                        <button
                                            className="rounded-lg shadow bg-gray-400 text-white px-2 py-1 text-sm uppercase"
                                            disabled
                                        >
                                            Level Up
                                        </button>
                                }
                            </div>
                            <div className="">
                                <span>EXP</span>
                                <span className="relative block rounded-full bg-gray-200">
                                    <span
                                        className="absolute inset-0 flex items-center justify-center text-[10px]/4"
                                    >
                                        <span className="font-bold text-white">
                                            {limemonList[0] ? `${limemonList[0].exp} / ${limemonList[0].LimemonLevelInfo.requiredExp}` : '0 / 0'}
                                        </span>
                                    </span>

                                    <span
                                        className="block h-4 rounded-full bg-yellow-400 text-center"
                                        style={{ width: limemonList[0] ? limemonList[0].exp / limemonList[0].LimemonLevelInfo.requiredExp > 1 ? '100%' : limemonList[0].exp / limemonList[0].LimemonLevelInfo.requiredExp * 100 + '%' : '0%' }}
                                    ></span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border border-[#7c7a75] rounded-lg w-full overflow-y-auto text-center">
                    <div className='sticky top-0 z-20 bg-[#e3e3e3]'>
                        <h2 className='pt-3'>장착아이템</h2>
                        <div className='grid grid-cols-7 gap-3 p-3 border-b border-[#7c7a75]'>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'>
                                <div className='relative'>
                                    <img
                                        src={'/api/img?imgSrc=limemon/default.png'}
                                        className="absolute rounded-lg z-10 w-full"
                                        alt="myLimemon"
                                    />
                                </div>
                            </div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                        </div>
                    </div>

                    <div className='z-10'>
                        <h2 className='pt-3'>보유아이템</h2>
                        <div className='grid grid-cols-7 gap-3 p-3'>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>

                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                            <div className='border border-[#7c7a75] rounded-lg pb-[100%]'></div>
                        </div>
                    </div>
                </div>
                <div className="border border-[#7c7a75] rounded-lg w-full">
                    <div className='text-center pt-[50%]  uppercase'>
                        <p className='SUITE-Heavy text-[5rem]'>skill</p>
                        <span>comming soon</span>
                    </div>
                </div>
            </div>
        </div>
    )
}





