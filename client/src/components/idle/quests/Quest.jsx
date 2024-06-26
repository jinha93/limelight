import { ReactComponent as QuestCheckicon03 } from "../../../assets/icons/QuestCheckicon-03.svg"
import { ReactComponent as QuestCheckicon04 } from "../../../assets/icons/QuestCheckicon-04.svg"

import { FaDiscord } from "react-icons/fa"
import { FcRating } from "react-icons/fc"
import lime from "../../../assets/images/lime.png"

import { useState } from "react"
import { toast } from 'react-toastify';
import axios from 'axios';

import { setPoint } from '../../../reducers/userSlice'
import { useDispatch } from 'react-redux'

import InputText from './InputText'

export default function Quest({ quest, getQuestList }) {

    const dispatch = useDispatch();

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

    // 퀘스트 클레임
    const cliam = async (questId, inputText) => {
        const id = toast.loading("Please wait...")

        axios({
            url: '/api/quest/claim',
            method: 'POST',
            data: {
                questId: questId,
                inputText: inputText
            }
        }).then((response) => {
            setTimeout(() => {
                if (response.data.success) {
                    getQuestList();
                    fnClose();

                    // reducer 포인트 업데이트
                    if (response.data.result.point > 0) {
                        dispatch(setPoint(Number(response.data.result.point)))
                    }
                }
                toast.update(
                    id,
                    {
                        render: 'Claim is Success',
                        type: "success",
                        isLoading: false,
                        autoClose: 5000,
                        closeButton: true,
                        closeOnClick: true,
                        draggable: true,
                    }
                );
            }, 1000)
        }).catch((error) => {
            setTimeout(() => {
                toast.update(
                    id,
                    {
                        render: error.response.data.message,
                        type: "error",
                        isLoading: false,
                        autoClose: 5000,
                        closeButton: true,
                        closeOnClick: true,
                        draggable: true,
                    }
                );

                // 로그인 세션 에러
                if (error.response.status === 401) {

                } else {

                }
            }, 1000)
        })
    }

    const [isClaimed, setClaimed] = useState(false);
    const onChangeClaimed = () => {
        setClaimed(true);
    }

    return (
        <>
            {/* 퀘스트 TEXT 입력 */}
            {isInputText ? <InputText cliam={cliam} fnClose={fnClose} questId={questId} /> : null}

            <div className='border border-[#7c7a75] rounded-lg px-7 py-5 flex gap-10'>
                <div className='flex flex-col gap-3'>
                    {
                        quest.recurrence === 'ONCE'
                        &&
                        <>
                            <span className='SUITE-Bold bg-[#dcebc2] border border-[#7b9b18] text-[#7b9b18] px-2'>{quest.recurrence}</span>
                            {
                                quest.QuestStatus == null || !quest.QuestStatus.status
                                    ?
                                    <QuestCheckicon03 />
                                    :
                                    <QuestCheckicon04 />
                            }
                        </>
                    }
                    {
                        quest.recurrence === 'DAILY'
                        &&
                        <>
                            <span className='SUITE-Bold bg-[#bee5d2] border border-[#458965] text-[#458965] px-2'>{quest.recurrence}</span>
                            {
                                quest.QuestStatus == null || !quest.QuestStatus.status
                                    ?
                                    <QuestCheckicon03 />
                                    :
                                    <QuestCheckicon04 />
                            }
                        </>
                    }

                </div>

                <div className='flex flex-col gap-5 w-full'>
                    <span className="SUITE-Bold text-[#5d5a56] text-lg">{quest.name}</span>
                    <span className="SUITE-Medium text-[#7c7a75]">{quest.content}</span>
                </div>

                <div className='flex flex-col justify-between text-right'>
                    <span className='SUITE-Bold text-lg'>Reward</span>
                    {quest.Rewards.map((reward, i) => {
                        switch (reward.type) {
                            case 'POINT':
                                return (
                                    <div className="flex gap-1 justify-end items-center">
                                        <FcRating size={22} />
                                        <span>x</span>
                                        <span>{reward.value}</span>
                                    </div>
                                )
                            case 'ROLE':
                                return (
                                    <div className="flex gap-1 justify-end items-center">
                                        <FaDiscord size={22} color='#5865F2' />
                                        <span>{reward.value}</span>
                                    </div>
                                )
                            case 'LIMEMON':
                                return (
                                    <div className="flex gap-1 justify-end items-center">
                                        <img src={lime} className="w-[22px] h-[22px]" alt="lime" />
                                        <span>x</span>
                                        <span>{reward.value}</span>
                                    </div>
                                )
                            default:
                                return (
                                    <div className="flex gap-1 justify-end">
                                        <span>{reward.value}</span>
                                    </div>
                                )
                        }
                    })}
                    {quest.QuestStatus == null || !quest.QuestStatus.status
                        ?
                        quest.Submission.type.indexOf('TWITTER') !== -1 && !isClaimed
                            ?
                            <a
                                className='bg-[#f48a94] rounded-full text-white px-7'
                                target='_blank'
                                rel="noreferrer"
                                href={
                                    `
                                    ${quest.Submission.type.indexOf('LIKE') !== -1 ? 'https://twitter.com/intent/like?tweet_id='+quest.Submission.value : ''}
                                    ${quest.Submission.type.indexOf('RETWEET') !== -1 ? 'https://twitter.com/intent/retweet?tweet_id='+quest.Submission.value : ''}
                                    ${quest.Submission.type.indexOf('FOLLOW') !== -1 ? 'https://twitter.com/intent/follow?screen_name='+quest.Submission.value : ''}
                                    `
                                }
                                onClick={onChangeClaimed}
                            >
                                Claim
                            </a>
                            :
                            <button
                                type="button"
                                className='bg-[#f48a94] rounded-full text-white px-7'
                                onClick={() => quest.Submission.type === 'TEXT' ? fnInputTextSetting(`${quest.questId}`) : cliam(`${quest.questId}`)}
                            >
                                Claim
                            </button>
                        :
                        <button type="button" className='bg-[#e3e3e3] rounded-full text-[#7c7a75] px-7 cursor-not-allowed'>Completed</button>
                    }
                </div>
            </div>
        </>
    )
}