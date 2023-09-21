import { useState } from "react"
import axios from 'axios';

import AddReward from "./AddReward";
import AddMission from "./AddMission";

export default function AddQuest(props) {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [repeat, setRepeat] = useState('');
    const [rewards, setRewards] = useState([]);
    const [mission, setMission] = useState({});


    const [rewardsCountList, setRewardsCountList] = useState([0]);
    const onAddRewards = () => {
        let countArr = [...rewardsCountList];
        let counter = countArr.slice(-1)[0];
        counter += 1;
        countArr.push(counter);
        setRewardsCountList(countArr);
    }

    const add = () => {
        if(validation()){
            axios({
                url: '/api/quest/',
                method: 'POST',
                data: {
                    title: title,
                    content: content,
                    repeat: repeat,
                    rewards: rewards,
                    mission: mission,
                }
            }).then((response) => {
                if(response.data.success){
                    props.isAddQuestClick();
                    props.getQuestList();
                }
            }).catch((error) => {
                if (error.response.status === 403) {
                    alert('관리자만 사용 가능합니다.')
                }else{
                    alert(error.response.data.message);
                }
            })
        }
    }

    const validation = () => {
        if(title === ''){
            alert("제목을 입력해주세요.")
            return false;
        }
        if(content === ''){
            alert("내용을 입력해주세요.")
            return false;
        }
        if(repeat === ''){
            alert("반복을 선택해주세요.")
            return false;
        }
        for(let reward of rewards){
            if(reward.value === ''){
                alert("보상 수량을 입력해주세요.")
                return false;
            }
        }
        if(mission.value === ''){
            if(mission.type === 'TEXT'){
                alert("미션 텍스트를 입력해주세요.")
                return false;
            }else if(mission.type === 'DISCORD_ROLE'){
                alert("미션 디스코드 ROLE ID 를 입력해주세요.")
                return false;
            }
        }
        return true;
    }

    return (
        <div className="absolute w-[100vw] h-[100vh] top-0 left-0 bg-black/25 z-20 flex flex-col items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg w-5/12 p-5 flex flex-col gap-5">
                <div className="flex">
                    <h2 className="text-2xl">New Quest</h2>
                    <button
                        type="button"
                        className="text-gray-400 hover:text-gray-900 ml-auto"
                        data-dismiss-target="#toast-success"
                        aria-label="Close"
                        onClick={props.isAddQuestClick}
                    >
                        <span className="sr-only">Close</span>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                </div>

                <div className="flow-root p-5 border rounded-lg">
                    <dl className="-my-3 divide-y divide-gray-100 text-sm">
                        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">Title</dt>
                            <dd className="text-gray-700 sm:col-span-2">
                                <input
                                    type="text"
                                    id="Title"
                                    placeholder="Title"
                                    className="w-full border-none focus:outline-none"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">Content</dt>
                            <dd className="text-gray-700 sm:col-span-2">
                                <input
                                    type="text"
                                    id="Content"
                                    placeholder="Content"
                                    className="w-full border-none focus:outline-none"
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">Repeat</dt>
                            <dd className="text-gray-700 sm:col-span-2">
                                <select
                                    id="Repeat"
                                    onChange={(e) => setRepeat(e.target.value)}
                                >
                                    <option value="">Please select</option>
                                    <option value="ONCE">ONCE</option>
                                    <option value="DAILY">DAILY</option>
                                    <option value="WEEKLY">WEEKLY</option>
                                    <option value="MONTHLY">MONTHLY</option>
                                </select>
                            </dd>
                        </div>
                        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">Rewards</dt>
                            <dd className="text-gray-700 sm:col-span-2">
                                
                                {rewardsCountList.map((item, i) => {
                                    return(
                                        <AddReward 
                                            key={i}
                                            index={i}
                                            rewards={rewards}
                                            setRewards={setRewards}
                                        />
                                    )
                                })}
                                <button className="rounded-lg bg-gray-200 px-2 py-1 hover:bg-gray-300 float-right mt-3" onClick={onAddRewards}>+ Add Reward</button>
                            </dd>
                        </div>

                        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">Mission</dt>
                            <dd className="text-gray-700 sm:col-span-2">
                                <AddMission
                                    setMission={setMission}
                                />
                            </dd>
                        </div>
                    </dl>
                </div>
                <button className="ml-auto" onClick={add}>
                    <div className="group relative block h-full bg-white before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-dashed before:border-gray-900">
                        <div className="rounded-lg border-2 border-gray-900 bg-white transition -translate-y-1 -translate-x-1 px-2 py-1 hover:bg-lime-200 group-hover:translate-y-0 group-hover:translate-x-0">
                            Add Quest
                        </div>
                    </div>
                </button>
            </div>
        </div>
    )
}