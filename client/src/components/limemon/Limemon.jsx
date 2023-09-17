import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Limemon(props) {
    const levelUp = (limemonId) => {
        const exp = limemon.exp;
        const requireExp = limemon.LimemonLevelInfo.requiredExp;

        if(exp < requireExp){
            alert('Not enough exp');
            return;
        }

        axios({
            url: `/api/limemon/${limemonId}/levelUp`,
            method: 'PUT'
        }).then((response) => {
            if(response.data.success){
                getLimemonList();
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

    const [limemon, setLimemon] = useState();
    useEffect(() => {
        setLimemon(limemonList[0])
    }, [limemonList])

    return (
        <div className="flex flex-col justify-center items-center h-full">
            <img
                src={limemon ? `/api/img/${limemon.imgSrc}` : '/api/img/NotLimemon.png'}
                className="border-2 border-gray-900 rounded-lg w-80 mx-auto"
                alt="myLimemon"
            />
            <div className="w-full mt-5 flex justify-between items-center">
                <span>Lv {limemon ? limemon.level : 0}</span>
                {
                limemon ? 
                    <button 
                        className="rounded-lg shadow bg-yellow-400 text-white px-2 py-1 text-sm uppercase"
                        onClick={() => levelUp(limemon.limemonId)}
                    >
                        Level Up
                    </button>
                : 
                <button 
                    className="rounded-lg shadow bg-gray-400 text-white px-2 py-1 text-sm uppercase"
                    disabled
                >
                    Level Up
                </button>
                }
            </div>
            <div className="w-full mt-3">
                <span>EXP</span>
                <span className="relative block rounded-full bg-gray-200">
                    <span
                        className="absolute inset-0 flex items-center justify-center text-[10px]/4"
                    >
                        <span className="font-bold text-white">
                            {limemon ? `${limemon.exp} / ${limemon.LimemonLevelInfo.requiredExp}` : '0 / 0'}
                        </span>
                    </span>

                    <span
                        className="block h-4 rounded-full bg-yellow-400 text-center"
                        style={{ width: limemon ? limemon.exp / limemon.LimemonLevelInfo.requiredExp > 1 ? '100%' : limemon.exp / limemon.LimemonLevelInfo.requiredExp * 100 + '%' : '0%' }}
                    ></span>
                </span>
            </div>
        </div>
    )
}