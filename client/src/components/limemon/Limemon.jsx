import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Limemon(props) {
    // 라임몬 레벨업
    const levelUp = (limemonId) => {
        const exp = limemon.exp;
        const requireExp = limemon.LimemonLevelInfo.requiredExp;

        if(exp < requireExp){
            alert('Not enough exp');
            props.setResultAlertData({ type: 'danger', title: 'Claim Failed', text: 'Not enough exp'})
            props.setIsResultAlert(true);
            setTimeout(() => {
                props.setIsResultAlert(false);
            }, 3000)
            return;
        }

        axios({
            url: `/api/limemon/${limemonId}/levelUp`,
            method: 'PUT'
        }).then((response) => {
            if(response.data.success){
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

    const [limemon, setLimemon] = useState();
    useEffect(() => {
        setLimemon(props.limemonList[0])
    }, [props.limemonList])
    
    useEffect(() => {
        console.log(limemon);
        if(limemon){
            getEquipItems(limemon.limemonId);
        }
    }, [limemon])


    const [equipItems, setEquipItems] = useState([]);
    const getEquipItems = (limemonId) => {
        axios({
            url: `/api/limemon/equipItems?limemonId=${limemonId}`,
            method: 'GET'
        }).then((response) => {
            setEquipItems(response.data.result);
        }).catch((error) => {
            console.log(error);
        })
    }


    return (
        <div className="flex flex-col items-center h-full">
            <div className='border-2 border-gray-900 rounded-lg mx-auto relative w-96 h-96'>
                {
                    limemon
                    ?
                        <div className='w-full absolute'>
                            <img
                                src={`/api/img?imgSrc=${limemon.imgSrc}`}
                                className="rounded-lg absolute z-10"
                                alt="myLimemon"
                            />
                            {
                                equipItems.map((items) => {
                                    return(
                                        <img
                                            src={`/api/img?imgSrc=${items.Item.imgSrc}`}
                                            className="rounded-lg absolute z-20"
                                            alt={items.part}
                                            key={items.part}
                                        />
                                    )
                                })
                            }
                        </div>
                    :
                    <div className='w-full'>
                        <img
                            src={'/api/img?imgSrc=limemon/default.png'}
                            className="rounded-lg absolute z-10"
                            alt="myLimemon"
                        />
                    </div>
                }
            </div>
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