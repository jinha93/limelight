import { useState } from "react"
import axios from 'axios';

export default function Item({ item, getOwnerdItems }) {

    const id = item ? item.id : null;
    const limemonId = item ? item.limemonId : null;
    const itemId = item ? item.itemId : null;
    const part = item ? item.Item.part : null;

    const [isDetail, setIsDetail] = useState(false);
    const isDetailChange = () => {
        if(!isDetail){
            setIsDetail(true);
        }
    }
    const isDetailClose = () => {
        setIsDetail(false);
    }

    const equip = () => {
        axios({
            url: '/api/limemon/item/equip',
            method: 'PUT',
            data: {
                id: id,
                limemonId: limemonId,
                itemId: itemId,
                part: part,
            }
        }).then((response) => {
            if (response.data.success) {
                getOwnerdItems(limemonId);
                isDetailClose();
            }
        }).catch((error) => {
            console.log(error);
            // 로그인 세션 에러
            if (error.response.status === 401) {

            } else {

            }
        })
    }

    const unequip = () => {
        axios({
            url: '/api/limemon/item/unequip',
            method: 'PUT',
            data: {
                id: id,
                limemonId: limemonId,
                itemId: itemId
            }
        }).then((response) => {
            if (response.data.success) {
                getOwnerdItems(limemonId);
                isDetailClose();
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className='border border-[#7c7a75] rounded-lg pb-[100%]'>
            <div className='relative' onClick={isDetailChange}>
                <img
                    src={`/api/img?imgSrc=${item.Item.iconImgSrc}`}
                    className="absolute rounded-lg z-10 w-full cursor-pointer"
                    alt="myLimemon"
                />
                {
                    isDetail
                        ?
                        <>
                            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
                                <div className="w-2/12 bg-white rounded-lg p-5 grid gap-3">

                                    <button 
                                        type="button" 
                                        className="text-gray-400 hover:text-gray-900 ml-auto" 
                                        data-dismiss-target="#toast-success" 
                                        aria-label="Close"
                                        onClick={isDetailClose}
                                    >
                                        <span className="sr-only">Close</span>
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </button>

                                    <div className="flex gap-5">
                                        <img
                                            src={`/api/img?imgSrc=${item.Item.iconImgSrc}`}
                                            className="rounded-lg border w-4/12"
                                            alt="myLimemon"
                                        />
                                        <div className="w-full text-left">
                                            <div><p className="SUITE-Bold text-[#5d5a51] uppercase">{item.Item.name}</p></div>
                                            <hr className="my-1"/>
                                            <div><span>{item.Item.description}</span></div>
                                        </div>
                                    </div>

                                    <div>
                                        <ul className="space-y-1">
                                            <li className="flex items-center justify-between">
                                                <svg className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                                </svg>
                                                <span>+ {item.Item.power}</span>
                                            </li>
                                        </ul>

                                    </div>

                                    <div className="grid grid-cols-2 gap-3">

                                        <button
                                            type="button"
                                            className="inline-block rounded border border-[#7c7a75] py-2 SUITE-Bold text-sm hover:bg-[#dcebc2]"
                                            onClick={equip}
                                        >
                                            Equip
                                        </button>

                                        {/* Border */}

                                        <button
                                            type="button"
                                            className="inline-block rounded border border-[#7c7a75] py-2 SUITE-Bold text-sm hover:bg-[#dcebc2]"
                                            onClick={unequip}
                                        >
                                            UnEquip
                                        </button>
                                    </div>

                                </div>
                            </div>
                            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                        </>
                        :
                        null
                }
            </div>
        </div>
    )
}