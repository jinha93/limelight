import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'

import Alert from '../common/Alert';
import QuestTabs from "./QuestTabs"
import QuestList from "./QuestList"
import Limemon from "./Limemon"

export default function LimemonIO() {

    // 로그인정보
    const user = useSelector(state => state.user.value);

    // alert
    const [isAlert, setIsAlert] = useState(false);
    let discordUrl = '';
    if (process.env.NODE_ENV === 'development') {
        discordUrl = process.env.REACT_APP_DEV_DISCORD_LOGIN_URL;
    } else {
        discordUrl = process.env.REACT_APP_DISCORD_LOGIN_URL;
    }
    

    return (
        <>
        {isAlert ? <Alert type={'danger'} text={<span>You can use it after logging in. <a href={discordUrl} className="underline">Go to the login page.</a></span>}/> : null}
        <div className='bg min-h-screen pt-32 pb-5 h-screen'>
            <div className="w-3/4 mx-auto md:flex gap-5 max-h-full">
                <div className="grid grid-rows-6 gap-5 md:w-1/3">
                    <div className="bg-white rounded-lg shadow-sm px-10 row-span-4">
                        <Limemon setIsAlert={setIsAlert}/>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-5 row-span-2">
                        <div className="border-2 border-gray-900 rounded-lg h-full grid grid-cols-6 gap-3 p-3 overflow-y-auto">
                            <img className="border-2 border-gray-900 rounded-lg w-full pb-full"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full pb-full"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full pb-full"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full pb-full"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full pb-full"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full pb-full"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full pb-full"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full pb-full"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full pb-full"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full pb-full"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full pb-full"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full pb-full"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full pb-full"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full pb-full"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full pb-full"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full pb-full"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full pb-full"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full pb-full"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full pb-full"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full pb-full"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full pb-full"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full pb-full"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full pb-full"/>
                            <img className="border-2 border-gray-900 rounded-lg w-full pb-full"/>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm py-5 px-10 col-span-2 gap-5 overflow-y-hidden md:w-2/3">
                    <QuestTabs />
                    <QuestList setIsAlert={setIsAlert}/>
                </div>
            </div>
        </div>
        </>
    )
}