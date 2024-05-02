import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import TopInfo from "../TopInfo";
import Item from "./Item";
import Loading from '../Loading';

export default function MyLimemon() {

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


    const [ownerdItems, setOwnerdItems] = useState([]);
    const [showItems, setShowItems] = useState([]);
    const [equipItems, setEquipItems] = useState([]);
    const [totalPower, setTotalPower] = useState(0);
    const getOwnerdItems = (limemonId) => {
        axios({
            url: `/api/limemon/ownerdItems?limemonId=${limemonId}`,
            method: 'GET'
        }).then((response) => {
            const ownerdItemsArr = [];
            const equippedItemsArr = [];
            let power = 0;

            response.data.result.forEach(result => {
                const equipYn = result.equipYn;
                if (equipYn === 'Y') {
                    equippedItemsArr.push(result);
                    power += result.Item.power;
                } else if (equipYn === 'N') {
                    ownerdItemsArr.push(result);
                }
            });

            setEquipItems(equippedItemsArr);
            setOwnerdItems(ownerdItemsArr);
            setShowItems(ownerdItemsArr);
            setTotalPower(power);

        }).catch((error) => {
            console.log(error);
        })
    }

    // 장착아이템 파츠별
    const equippedItemFindByPart = (part) => {
        return equipItems.find(item => item.Item.part === part);
    }

    // 보유아이템 파츠별
    const [tab, setTab] = useState('');
    const onChangeTab = (selectTab) => {
        setTab(selectTab);
    }
    useEffect(() => {
        if(tab === ''){
            setShowItems(ownerdItems);
        }else{
            setShowItems(ownerdItems.filter(item => item.Item.part === tab))
        }
    }, [tab, ownerdItems])

    

    useEffect(() => {
        if (limemonList[0]) {
            getOwnerdItems(limemonList[0].limemonId);
        }
    }, [limemonList])

    return (
        <>
        <Loading/>
        <div className='h-full'>
            <TopInfo
                title={'MY LIMEMON'}
                description={'Grow your Limemon.'}
            />
            <div className='lg:flex gap-10 w-full 2xl:w-2/3 mx-auto h-[90%]'>
                <div className="mb-10 lg:mb-0 border border-[#7c7a75] rounded-lg w-full overflow-y-auto">
                    {/* img */}
                    <div className='pb-[100%]'>
                        {
                            limemonList[0]
                                ?
                                <div className='relative'>
                                    {/* LIMEMON IMG */}
                                    <img
                                        src={`/api/img?imgSrc=${limemonList[0].imgSrc}`}
                                        className="absolute z-10 w-full rounded-t-lg"
                                        alt="myLimemon"
                                    />
                                    {/* 장착 장비 */}
                                    {
                                        equipItems.map((items) => {
                                            return (
                                                <img
                                                    key={items.itemId}
                                                    src={`/api/img?imgSrc=${items.Item.imgSrc}`}
                                                    className={`absolute w-full rounded-t-lg right-0 ${items.Item.part === 'BACKGROUND' ? 'z-0': 'z-20'}`}
                                                    alt={items.itemName}
                                                />
                                            )
                                        })
                                    }
                                </div>
                                :
                                <div className='relative'>
                                    <img
                                        src={'/api/img?imgSrc=limemon/default.png'}
                                        className="absolute rounded-lg z-10 w-full"
                                        alt="myLimemon"
                                    />
                                </div>
                        }
                    </div>

                    <div className='border-t border-[#7c7a75] p-5 flex flex-col gap-3'>

                        <nav className="flex gap-1 justify-between w-full">
                            <button
                                href="#"
                                className="rounded-lg border border-[#7c7a75] p-2 w-full text-center SUITE-Bold text-[#5d5a51] bg-[#e3e3e3]"
                                
                            >
                                장착
                            </button>

                            <button
                                href="#"
                                className="rounded-lg border border-[#7c7a75] p-2 w-full text-center SUITE-Medium text-[#5d5a51] hover:bg-[#e3e3e3] cursor-not-allowed"
                                disabled={true}
                            >
                                외형
                            </button>
                        </nav>

                        <div className='grid grid-cols-7 gap-3 whitespace-nowrap'>
                            {
                                equippedItemFindByPart('HEAD')
                                    ? <Item item={equippedItemFindByPart('HEAD')} getOwnerdItems={getOwnerdItems}/>
                                    : <div className='border border-dashed border-[#7c7a75] rounded-lg pb-[100%] relative'><div className='absolute w-full h-full text-center content-center'>모자</div></div>
                            }
                            {
                                equippedItemFindByPart('FACE')
                                    ? <Item item={equippedItemFindByPart('FACE')} getOwnerdItems={getOwnerdItems}/>
                                    : <div className='border border-dashed border-[#7c7a75] rounded-lg pb-[100%] relative'><div className='absolute w-full h-full text-center content-center'>얼굴</div></div>
                            }
                            {
                                equippedItemFindByPart('TOP')
                                    ? <Item item={equippedItemFindByPart('TOP')} getOwnerdItems={getOwnerdItems}/>
                                    : <div className='border border-dashed border-[#7c7a75] rounded-lg pb-[100%] relative'><div className='absolute w-full h-full text-center content-center'>상의</div></div>
                            }
                            {
                                equippedItemFindByPart('PANTS')
                                    ? <Item item={equippedItemFindByPart('PANTS')} getOwnerdItems={getOwnerdItems}/>
                                    : <div className='border border-dashed border-[#7c7a75] rounded-lg pb-[100%] relative'><div className='absolute w-full h-full text-center content-center'>하의</div></div>
                            }
                            {
                                equippedItemFindByPart('WEAPON')
                                    ? <Item item={equippedItemFindByPart('WEAPON')} getOwnerdItems={getOwnerdItems}/>
                                    : <div className='border border-dashed border-[#7c7a75] rounded-lg pb-[100%] relative'><div className='absolute w-full h-full text-center content-center'>무기</div></div>
                            }
                            {
                                equippedItemFindByPart('BAG')
                                    ? <Item item={equippedItemFindByPart('BAG')} getOwnerdItems={getOwnerdItems}/>
                                    : <div className='border border-dashed border-[#7c7a75] rounded-lg pb-[100%] relative'><div className='absolute w-full h-full text-center content-center'>가방</div></div>
                            }
                            {
                                equippedItemFindByPart('BACKGROUND')
                                    ? <Item item={equippedItemFindByPart('BACKGROUND')} getOwnerdItems={getOwnerdItems}/>
                                    : <div className='border border-dashed border-[#7c7a75] rounded-lg pb-[100%] relative'><div className='absolute w-full h-full text-center content-center'>배경</div></div>
                            }
                        </div>

                        <div className='flex justify-between gap-20'>
                            <span className='text-3xl'>전투력</span>
                            <span className='text-3xl'>+{totalPower}</span>
                        </div>

                    </div>
                </div>

                <div className="border border-[#7c7a75] rounded-lg w-full p-3">
                    <div className="border-b border-[#7c7a75] sticky top-0 bg-[#f7f7f7] z-20">
                        <nav className="-mb-px grid grid-cols-5 sm:flex gap-1 whitespace-nowrap">
                            <button
                                type="button"
                                className={`rounded-t-lg border border-[#7c7a75] p-2 text-center w-full ${tab === '' ? " border-b-[#f7f7f7] SUITE-Bold" : ""} `}
                                onClick={() => onChangeTab('')}
                            >
                                전체
                            </button>
                            <button
                                type="button"
                                className={`rounded-t-lg border border-[#7c7a75] p-2 text-center w-full ${tab === 'HEAD' ? " border-b-[#f7f7f7] SUITE-Bold" : ""} `}
                                onClick={() => onChangeTab('HEAD')}
                            >
                                모자
                            </button>
                            <button
                                type="button"
                                className={`rounded-t-lg border border-[#7c7a75] p-2 text-center w-full ${tab === 'FACE' ? " border-b-[#f7f7f7] SUITE-Bold" : ""} `}
                                onClick={() => onChangeTab('FACE')}
                            >
                                얼굴
                            </button>
                            <button
                                type="button"
                                className={`rounded-t-lg border border-[#7c7a75] p-2 text-center w-full ${tab === 'TOP' ? " border-b-[#f7f7f7] SUITE-Bold" : ""} `}
                                onClick={() => onChangeTab('TOP')}
                            >
                                상의
                            </button>
                            <button
                                type="button"
                                className={`rounded-t-lg border border-[#7c7a75] p-2 text-center w-full ${tab === 'PANTS' ? " border-b-[#f7f7f7] SUITE-Bold" : ""} `}
                                onClick={() => onChangeTab('PANTS')}
                            >
                                하의
                            </button>
                            <button
                                type="button"
                                className={`rounded-t-lg border border-[#7c7a75] p-2 text-center w-full ${tab === 'WEAPON' ? " border-b-[#f7f7f7] SUITE-Bold" : ""} `}
                                onClick={() => onChangeTab('WEAPON')}
                            >
                                무기
                            </button>
                            <button
                                type="button"
                                className={`rounded-t-lg border border-[#7c7a75] p-2 text-center w-full ${tab === 'BAG' ? " border-b-[#f7f7f7] SUITE-Bold" : ""} `}
                                onClick={() => onChangeTab('BAG')}
                            >
                                가방
                            </button>
                            <button
                                type="button"
                                className={`rounded-t-lg border border-[#7c7a75] p-2 text-center w-full ${tab === 'BACKGROUND' ? " border-b-[#f7f7f7] SUITE-Bold" : ""} `}
                                onClick={() => onChangeTab('BACKGROUND')}
                            >
                                배경
                            </button>
                        </nav>
                    </div>
                    <div className='grid grid-cols-5 sm:grid-cols-7 gap-3 p-3 border border-[#7c7a75] border-t-[#f7f7f7] h-[94%] overflow-y-auto'>
                        {/* {
                            ownerdItems.map((ownerdItem, index) => {
                                return (
                                    <Item key={index} item={ownerdItems[index]} getOwnerdItems={getOwnerdItems} />
                                )
                            })
                        } */}
                        {/* 보유 장비 */}
                        {[...Array(parseInt(showItems.length > 63 ? showItems.length : 63))].map((n, index) => {
                            return (
                                showItems[index]
                                ?
                                <Item key={index} item={showItems[index]} getOwnerdItems={getOwnerdItems}/>
                                : <div key={index} className='border border-dashed border-[#7c7a75] rounded-lg pb-[100%] relative'></div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}





