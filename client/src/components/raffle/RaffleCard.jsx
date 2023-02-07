import { useEffect, useState } from "react";
import RegisterBtn from "./RegisterBtn";

import point from "../../assets/images/icons/point.png";
import clock from "../../assets/images/icons/clock.png";
import question from "../../assets/images/icons/question.png";

const leftPad = (value) => {
    if (value >= 10) {
        return value;
    }

    return `0${value}`;
}

const TimeLeft = (endDateVal) => {
    endDateVal = endDateVal.replaceAll('-','').substr(0,8);
    const yyyy = endDateVal.substr(0, 4);
    const mm = endDateVal.substr(4, 2);
    const dd = endDateVal.substr(6, 2);

    const endDate = new Date(Date.UTC(yyyy,mm-1,dd));
    const [diff, setDiff] = useState(endDate - new Date());

    useEffect(() => {
        setInterval(() => {
            setDiff(endDate - new Date())
        }, 1000)
    }, [])

    let result = 'ended';
    if (diff > 0) {
        const diffDay = Math.floor(diff / (1000 * 60 * 60 * 24));
        const diffHour = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const diffMin = Math.floor((diff / (1000 * 60)) % 60);
        const diffSec = Math.floor(diff / 1000 % 60);

        if (diffDay > 0) {
            result = diffDay + '<p> days ago</p>';
        } else {
            result = leftPad(diffHour) + ':' + leftPad(diffMin) + ':' + leftPad(diffSec) + ' ago';
        }
    }

    return result
}

const isEnded = (props) =>{
    //현재일자와 종료일자 비교
    const endDateVal = props.raffleEndDate.replaceAll('-','').substr(0,8);
    const yyyy = endDateVal.substr(0, 4);
    const mm = endDateVal.substr(4, 2);
    const dd = endDateVal.substr(6, 2);

    const endDate = new Date(Date.UTC(yyyy,mm-1,dd));
    
    const diff = endDate - new Date();

    if(diff <= 0) return true;

    //남은당첨자 수 비교
    const leftCnt = props.winMaxCnt - props.winCnt ? props.winMaxCnt - props.winCnt : 0;
    if(leftCnt <= 0) return true;
    
    return false;
}

function RaffleCard(props) {
    return (
        <div className="rounded-lg shadow-lg bg-white text-[#534741]">
            <img 
                className="rounded-t-lg h-48 w-full object-cover object-center group-hover:opacity-75" 
                src={require(`../../assets/images/raffle/${props.raffleImgSrc}`)}
                alt={props.raffleName}
            />
            <div className="p-6">
                <div className="bg-[#f3eee9] rounded-lg mb-3 pt-2 pb-1">
                    <h5 className="text-xl font-medium">{props.raffleName}</h5>
                    <p className="NanumBold text-lg text-gray-600">{props.winMaxCnt} winners ({props.winMaxCnt - props.winCnt} left)</p>
                </div>

                <div className="px-4">
                    <div className="flex items-center">
                        <img src={point} className="h-6 mr-1" alt="" />
                        <p className="text-gray-500"><span className="text-lg text-[#534741]">{props.rafflePoint} points</span> required</p>
                    </div>
                    <div className="flex items-center">
                        <img src={question} className="h-6 mr-1" alt="" />
                        <p className="text-gray-500">a <span className="text-lg text-[#534741]">{props.winRate} chance</span> of winning</p>
                    </div>
                    <div className="flex items-center">
                        <img src={clock} className="h-6 mr-1" alt="" />
                        <p className="text-gray-500">Ends in <span className="text-lg text-[#534741]">{TimeLeft(props.raffleEndDate)}</span></p>
                    </div>

                    <RegisterBtn
                        raffleId={props.raffleId}
                        winYn={props.winYn}
                        ended={isEnded(props)}
                    />
                </div>

            </div>
        </div>
    )
}

export default RaffleCard;