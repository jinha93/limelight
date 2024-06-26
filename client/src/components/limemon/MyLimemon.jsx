import { useEffect, useState } from 'react';
import axios from 'axios';

import Alert from '../common/Alert';

import Limemon from "./Limemon"
import QuestList from "./quest/QuestList"

import { FcAbout, FcHome, FcShop, FcLike } from "react-icons/fc"


export default function MyLimemon() {

    // alert
    const [isAlert, setIsAlert] = useState(false);
    let discordUrl = '';
    if (process.env.NODE_ENV === 'development') {
        discordUrl = process.env.REACT_APP_DEV_DISCORD_LOGIN_URL;
    } else {
        discordUrl = process.env.REACT_APP_DISCORD_LOGIN_URL;
    }

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

    useEffect(() => {
        // 라임몬 정보 불러오기
        getLimemonList();
    }, [])




    // side menu
    const menus = [
        {
            name: 'Quest',
            value: 'Q',
            icon: <FcAbout size={30} />,
        },
        {
            name: 'Inventory',
            value: 'I',
            icon: <FcHome size={30} />,
        },
        {
            name: 'Shop',
            value: 'S',
            icon: <FcShop size={30} />,
        },
    ]
    const [selectMenu, setSelectMenu] = useState('Q');

    // 베타ver 팝업
    const [isBetaPopup, setIsBetaPopup] = useState(false);

    return (
        <>

            {/* 로그인 alert */}
            {isAlert ? <Alert type={'danger'} text={<span>You can use it after logging in. <a href={discordUrl} className="underline">Go to the login page.</a></span>} /> : null}

            {
                isBetaPopup
                    ?
                    <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <section class="rounded-3xl shadow-2xl bg-white">
                            <div class="p-8 text-center sm:p-12">
                                <p class="font-semibold uppercase tracking-widest">
                                    <FcLike className='inline-block' size={50}/>
                                </p>

                                <h2 class="mt-6 text-3xl font-bold">Thank You</h2>
                                <p class="mt-6 w-[23rem]">Thank you for participating in Alpha Season 1. Please clear Pioneer quest, get role and participate in event.</p>

                                <button
                                    type="button"
                                    class="mt-8 inline-block rounded-full border-2 border-gray-900 py-3 px-6 font-bold shadow-xl"
                                    onClick={() => setIsBetaPopup(false)}
                                >
                                    Done
                                </button>
                            </div>
                        </section>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                    : null
            }

            <div className='bg min-h-screen pt-32 pb-10 lg:h-screen'>
                <div className="w-3/4 mx-auto lg:flex gap-5 min-h-full max-h-full">
                    <div className="bg-white rounded-lg shadow-sm p-10">
                        <Limemon
                            setIsAlert={setIsAlert}
                            limemonList={limemonList}
                            getLimemonList={getLimemonList}

                            setIsBetaPopup={setIsBetaPopup}
                        />
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-10 col-span-2 overflow-y-hidden flex">
                        <div className='w-full border-2 border-gray-900 border-r-0 rounded-l-lg p-5'>
                            {
                                selectMenu === 'Q' 
                                ?
                                <QuestList
                                    setIsAlert={setIsAlert}
                                    getLimemonList={getLimemonList}
                                />
                                :
                                <div className='flex justify-center items-center h-full'>
                                    <span className='text-5xl'>Comming Soon</span>
                                </div>
                            }
                        </div>
                        <div className='border-l-2 border-gray-900 '>
                            <nav className='-ml-[2px]'>
                                {
                                    menus.map((menu, index) => {
                                        return (
                                            <div 
                                                className={'flex gap-1 p-3 border-2 border-gray-900 rounded-r-lg cursor-pointer -mb-[2px] ' + (selectMenu === `${menu.value}` ? 'border-l-white' : '')} 
                                                onClick={() => setSelectMenu(`${menu.value}`)}
                                                key={index}
                                            >
                                                {menu.icon}
                                            </div>
                                        )
                                    })
                                }
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}