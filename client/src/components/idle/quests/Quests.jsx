import axios from 'axios';
import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'

import TopInfo from "../TopInfo";
import AddQuest from './AddQuest';
import Loading from '../Loading';
import Quest from './Quest';



export default function Quests() {

    // 로그인정보
    const user = useSelector(state => state.user.value);

    useEffect(() => {
        getQuestList();
    }, [])

    // 퀘스트 목록 조회
    const [questList, setQuestList] = useState([]);
    const getQuestList = () => {
        axios({
            url: `/api/quest/`,
            method: 'GET',
        }).then((response) => {
            // 퀘스트 목록
            const questList = [...response.data.result];
            setQuestList(questList);
        }).catch((error) => {
            console.log(error);
        })
    }

    // ADD QUEST
    const [isAddQuest, setIsAddQuest] = useState(false);
    const isAddQuestClick = () => {
        setIsAddQuest(!isAddQuest);
    }

    return (
        <>
            <Loading />

            {/* 퀘스트 생성 */}
            {isAddQuest ? <AddQuest isAddQuestClick={isAddQuestClick} getQuestList={getQuestList} /> : null}

            <div className='flex flex-col'>
                <TopInfo
                    title={'Quests'}
                    description={'Complete the quest below to claim your rewards.'}
                />
                <div className="grid lg:grid-cols-2 gap-5 px-5">
                    {user.userData.admin === true &&
                        <div
                            className='bg-[#dcebc2] border border-[#7b9b18] text-[#7b9b18] rounded-lg px-7 py-5 flex gap-10 col-span-2 cursor-pointer'
                            onClick={isAddQuestClick}
                        >
                            <span className='SUITE-Bold  uppercase'>+ ADD QUEST</span>
                        </div>
                    }
                    {
                        questList.map((quest, index) => {
                            return (
                                <Quest
                                    quest={quest}
                                    getQuestList={getQuestList}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}