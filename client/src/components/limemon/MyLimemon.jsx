import { useEffect, useState } from 'react';
import axios from 'axios';

import Alert from '../common/Alert';
import ResultAlert from "./common/ResultAlert";

import Limemon from "./Limemon"
import QuestList from "./quest/QuestList"
import { FaBook, FaRegQuestionCircle, FaBox  } from "react-icons/fa";


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
            icon: <FaBook size={30} />,
        },
        {
            name: 'Inventory',
            value: 'I',
            icon: <FaBox size={30} />,
        },
    ]
    const [selectMenu, setSelectMenu] = useState('Q');

    // ResultAlert
    const [isResultAlert, setIsResultAlert] = useState(false);
    const [resultAlertData, setResultAlertData] = useState({ type: '', title: '', text: ''});


    return (
        <>
            {/* 퀘스트 결과 표시 */}
            {isResultAlert ? <ResultAlert type={resultAlertData.type} title={resultAlertData.title} text={resultAlertData.text}/> : null}

            {/* 로그인 alert */}
            {isAlert ? <Alert type={'danger'} text={<span>You can use it after logging in. <a href={discordUrl} className="underline">Go to the login page.</a></span>} /> : null}

            <div className='bg min-h-screen pt-32 pb-10 lg:h-screen'>
                <div className="w-3/4 mx-auto lg:flex gap-5 min-h-full max-h-full">
                    <div className="bg-white rounded-lg shadow-sm p-10 lg:w-1/3">
                        <Limemon
                            setIsAlert={setIsAlert}
                            limemonList={limemonList}
                            getLimemonList={getLimemonList}
                            setIsResultAlert={setIsResultAlert}
                            setResultAlertData={setResultAlertData}
                        />
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-10 col-span-2 overflow-y-hidden lg:w-2/3 flex">
                        <div className='w-full border-2 border-gray-900 border-r-0 rounded-l-lg p-5'>
                            {
                                selectMenu === 'Q' 
                                ?
                                <QuestList
                                    setIsAlert={setIsAlert}
                                    setIsResultAlert={setIsResultAlert}
                                    setResultAlertData={setResultAlertData}
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
                                                className={'p-3 border-2 border-gray-900 rounded-r-lg cursor-pointer -mb-[2px] ' + (selectMenu === `${menu.value}` ? 'border-l-white' : '')} 
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