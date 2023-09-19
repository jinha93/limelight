import { useEffect, useState } from "react"
import axios from 'axios';

import { useSelector } from 'react-redux'
import { FaCheckCircle } from "react-icons/fa"
import InputText from "./InputText";
import AddQuest from "./AddQuest";

export default function QuestList(props) {

    // 로그인정보
    const user = useSelector(state => state.user.value);

    // ADD QUEST
    const [isAddQuest, setIsAddQuest] = useState(false);
    const isAddQuestClick = () => {
        setIsAddQuest(!isAddQuest);
    }

    // Input Text
    const [isInputText, setIsInputText] = useState(false);
    const [questId, setQuestId] = useState('');
    const fnInputTextSetting = (questId) => {
        setQuestId(questId);
        setIsInputText(true);
    }
    const fnClose = () => {
        setIsInputText(false);
    }

    useEffect(() => {
        getQuestList();
    }, [])

    // 퀘스트 목록 조회
    const [questList, setQuestList] = useState([]);
    const getQuestList = () => {
        axios({
            url: '/api/quest',
            method: 'GET'
        }).then((response) => {
            // Input Text 팝업 닫기
            setIsInputText(false);

            // 퀘스트 목록
            const questList = [...response.data.result];
            setQuestList(questList);
        }).catch((error) => {
            // 로그인 세션 에러
            if(error.response.status === 401){
                // alert 활성화
                props.setIsAlert(true);
            }
            console.log(error);
        })
    }

    // 퀘스트 클레임
    const cliam = (questId, inputText) => {
        axios({
            url: '/api/quest/claim',
            method: 'POST',
            data: {
                questId: questId,
                inputText: inputText
            }
        }).then((response) => {
            if(response.data.success){
                getQuestList();
                props.getLimemonList();
            }
        }).catch((error) => {
            // 로그인 세션 에러
            if(error.response.status === 401){
                // alert 활성화
                props.setIsAlert(true);
            }else{
                alert(error.response.data.message);
            }
        })
    }

    return (
        <>
        {/* 텍스트 입력 */}
        {isInputText ? <InputText cliam={cliam} fnClose={fnClose} questId={questId}/> : null}

        {/* 퀘스트 생성 */}
        {isAddQuest ? <AddQuest isAddQuestClick={isAddQuestClick} getQuestList={getQuestList}/> : null}

        <div className="h-[90%]">
            <div className="overflow-y-auto h-full">
                {user.userData.admin === true &&
                    <div className="border-2 border-gray-900 rounded-lg px-5 py-5 flex items-center gap-5 bg-white shadow-md mr-2.5 h-24 mb-3"
                        onClick={isAddQuestClick}
                    >
                        ➕ Quest Add
                    </div>
                }
                {
                    questList.map((quest, index) => {
                        return (
                            <div className="border-2 border-gray-900 rounded-lg px-5 py-5 flex items-center gap-5 bg-white shadow-md mr-2.5 h-24 mb-3" key={index}>
                                <div className="w-1/6">{quest.recurrence}</div>
                                <div className="w-3/6 flex flex-col">
                                    <span className="text-lg">{quest.name}</span>
                                    <span className="text-xs mt-1">{quest.content}</span>
                                </div>
                                <div className="w-1/6">
                                    {quest.Rewards.map((reward, i) => {
                                        return(
                                            <div key={i}>
                                                <span>{reward.type} x {reward.value}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="w-1/6 text-center">
                                    {quest.QuestStatus == null || !quest.QuestStatus.status
                                    ?
                                        <button onClick={() => quest.Submission.type === 'TEXT' ? fnInputTextSetting(`${quest.questId}`) : cliam(`${quest.questId}`)}>
                                            <div className="group relative block h-full bg-white before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-dashed before:border-gray-900">
                                                <div className="rounded-lg border-2 border-gray-900 bg-white transition -translate-y-1 -translate-x-1 px-2 py-1 hover:bg-lime-200 group-hover:translate-y-0 group-hover:translate-x-0">
                                                Claim
                                                </div>
                                            </div>
                                        </button>
                                    :
                                        <FaCheckCircle size={30} className="inline-block"/>
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