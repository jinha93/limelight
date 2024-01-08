import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Limemon(props) {
    // 라임몬 레벨업
    const levelUp = (limemonId) => {
        if (limemon.level === 8) {
            props.setIsBetaPopup(true);
            return;
        }

        const exp = limemon.exp;
        const requireExp = limemon.LimemonLevelInfo.requiredExp;

        if (exp < requireExp) {
            toast.error('Not enough exp')
            return;
        }

        axios({
            url: `/api/limemon/${limemonId}/levelUp`,
            method: 'PUT'
        }).then((response) => {
            if (response.data.success) {
                props.getLimemonList();
            }
        }).catch((error) => {
            // 로그인 세션 에러
            if (error.response.status === 401) {
                // alert 활성화
                props.setIsAlert(true);
            } else {
                alert(error.response.data.message);
            }
        })
    }

    const reset = (limemonId) => {
        axios({
            url: `/api/limemon/${limemonId}/reset`,
            method: 'PUT'
        }).then((response) => {
            if (response.data.success) {
                props.getLimemonList();
            }
        }).catch((error) => {
            // 로그인 세션 에러
            if (error.response.status === 401) {
                // alert 활성화
                props.setIsAlert(true);
            } else {
                alert(error.response.data.message);
            }
        })
    }

    const [limemon, setLimemon] = useState();
    useEffect(() => {
        setLimemon(props.limemonList[0])
    }, [props.limemonList])

    useEffect(() => {
        if (limemon) {
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
        <>
            
            <div className="flex flex-col items-center h-full">
                <div className='border-2 border-gray-900 rounded-lg mx-auto relative w-full pb-[100%]'>
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
                                        return (
                                            <img
                                                src={`/api/img?imgSrc=${items.Item.imgSrc}`}
                                                className={items.Item.part === 'BACKGROUND' ? "rounded-lg absolute z-0" : "rounded-lg absolute z-20"}
                                                key={items.itemId}
                                                alt={items.itemName}
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
                            <div>
                                <button
                                    className="rounded-lg shadow bg-red-400 text-white px-2 py-1 text-sm uppercase"
                                    onClick={() => reset(limemon.limemonId)}
                                >
                                    RESET
                                </button>
                                <button
                                    className="rounded-lg shadow bg-yellow-400 text-white px-2 py-1 text-sm uppercase"
                                    onClick={() => levelUp(limemon.limemonId)}
                                >
                                    Level Up
                                </button>
                            </div>
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
        </>
    )
}