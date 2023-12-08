import { useEffect, useState } from "react"
import axios from 'axios';

import { useSelector } from 'react-redux'
import AddQuest from "./AddQuest";
import Quest from "./Quest";
import QuestTabs from "./QuestTabs"

export default function QuestList(props) {

    // 로그인정보
    const user = useSelector(state => state.user.value);

    // ADD QUEST
    const [isAddQuest, setIsAddQuest] = useState(false);
    const isAddQuestClick = () => {
        setIsAddQuest(!isAddQuest);
    }


    // 정렬 조건
    const [recurrence, setRecurrence] = useState('ALL');

    useEffect(() => {
        getQuestList();
    }, [recurrence])

    // 퀘스트 목록 조회
    const [questList, setQuestList] = useState([]);
    const getQuestList = () => {
        console.log(recurrence);
        axios({
            url: `/api/quest/${recurrence}`,
            method: 'GET',
        }).then((response) => {
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
    

    return (
        <>
        

        {/* 퀘스트 생성 */}
        {isAddQuest ? <AddQuest isAddQuestClick={isAddQuestClick} getQuestList={getQuestList}/> : null}

        <div className="h-full">
            <QuestTabs 
                setRecurrence={setRecurrence}
            />
            <div className="overflow-y-auto h-[95%] mt-3">
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
                            <Quest
                                key={index}
                                quest={quest}
                                getQuestList={getQuestList}
                                getLimemonList={props.getLimemonList}

                                setIsAlert={props.setIsAlert}
                                setIsResultAlert={props.setIsResultAlert}
                                setResultAlertData={props.setResultAlertData}
                            />
                        )
                    })
                }
            </div>
        </div>
        </>
    )
}