import { useEffect, useState } from "react"
import axios from 'axios';

import { FaCheckCircle } from "react-icons/fa"
import Alert from '../common/Alert';

export default function QuestList() {

    // alert
    const [isAlert, setIsAlert] = useState(false);
    let discordUrl = '';
    if (process.env.NODE_ENV === 'development') {
        discordUrl = process.env.REACT_APP_DEV_DISCORD_LOGIN_URL;
    } else {
        discordUrl = process.env.REACT_APP_DISCORD_LOGIN_URL;
    }

    const [questList, setQuestList] = useState([]);

    useEffect(() => {
        getQuestList();
    }, [])

    const getQuestList = () => {
        axios({
            url: '/api/quest',
            method: 'GET'
        }).then((response) => {
            const questList = [...response.data.result];
            setQuestList(questList);
        }).catch((error) => {
            // 로그인 세션 에러
            if(error.response.status === 401){
                // alert 활성화
                setIsAlert(true);
            }
            console.log(error);
        })
    }

    const cliam = (questId) => {
        axios({
            url: '/api/quest/claim',
            method: 'POST',
            data: {
                questId: questId
            }
        }).then((response) => {
            if(response.data.success){
                getQuestList();
            }
        }).catch((error) => {
            // 로그인 세션 에러
            if(error.response.status === 401){
                // alert 활성화
                setIsAlert(true);
            }else{
                alert(error.response.data.message);
            }
        })
    }

    return (
        <>
        {isAlert ? <Alert type={'danger'} text={<span>You can use it after logging in. <a href={discordUrl} className="underline">Go to the login page.</a></span>}/> : null}
        <div className="h-[90%]">
            <div className="overflow-y-auto h-full">
                {
                    questList.map((quest, index) => {
                        return (
                            <div className="border-2 border-gray-900 rounded-lg px-5 py-5 flex items-center gap-5 bg-white shadow-md mr-2.5 max-h-24 mb-3" key={index}>
                                <div className="w-1/6">🔁{quest.recurrence}</div>
                                <div className="w-3/6 flex flex-col">
                                    <span className="text-lg">{quest.name}</span>
                                    <span className="text-xs mt-1">{quest.content}</span>
                                </div>
                                <div className="w-1/6"></div>
                                <div className="w-1/6 text-center">
                                    {quest.QuestStatus != null 
                                    ?
                                        quest.QuestStatus.status &&
                                        <FaCheckCircle size={30} className="inline-block"/>
                                    :
                                        <button onClick={() => cliam(`${quest.questId}`)}>
                                            <div className="group relative block h-full bg-white before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-dashed before:border-gray-900">
                                                <div className="rounded-lg border-2 border-gray-900 bg-white transition -translate-y-1 -translate-x-1 px-2 py-1 hover:bg-lime-200 group-hover:translate-y-0 group-hover:translate-x-0">
                                                Claim
                                                </div>
                                            </div>
                                        </button>
                                    }
                                    
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        </>
    )
}