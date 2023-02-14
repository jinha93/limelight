import { useEffect, useState } from "react";
import axios from 'axios';
import RaffleCard from "./RaffleCard";

function Raffle() {
    // scroll to top
    window.scrollTo(0,0);

    //래플 데이터 조회
    const [inputData, setInputData] = useState([{}]);
    const getRaffle = () => {
        axios({
            url: '/api/raffle',
            method: 'GET'
        }).then((result) => {
            const _inputData = result.data.map((rowData) => (
                {
                    raffleId: rowData.RAFFLE_ID,
                    raffleName: rowData.RAFFLE_NAME,
                    raffleStdDate: rowData.RAFFLE_STD_DATE,
                    raffleEndDate: rowData.RAFFLE_END_DATE,
                    rafflePoint: rowData.RAFFLE_POINT,
                    raffleImgSrc: rowData.RAFFLE_IMG_SRC,
                    winMaxCnt: rowData.WIN_MAX_CNT,
                    winRate: rowData.WIN_RATE,
                    winYn: rowData.WIN_YN,
                    winCnt: rowData.WIN_CNT
                })
            )
            //초기 값 세팅
            setInputData(_inputData)
        }).catch((error) => {
            if(error.response.status == 401) alert('로그인에러')
            console.log(error);
        })
    }
    
    useEffect(() => {
        getRaffle();
    }, [])

    return (
        <div className='bg min-h-screen'>
            <div className="mx-auto w-3/4 pt-32 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 text-center">
                {inputData.map((rowData) => (
                    rowData.raffleId !== undefined &&
                        <RaffleCard
                            key={rowData.raffleId}
                            raffleId={rowData.raffleId}
                            raffleName={rowData.raffleName}
                            raffleStdDate={rowData.raffleStdDate}
                            raffleEndDate={rowData.raffleEndDate}
                            raffleImgSrc={rowData.raffleImgSrc}
                            rafflePoint={rowData.rafflePoint}
                            winRate={rowData.winRate}
                            winMaxCnt={rowData.winMaxCnt}
                            winYn={rowData.winYn}
                            winCnt={rowData.winCnt}
                            getRaffle={getRaffle}
                        />
                ))}
            </div>
        </div>
    )
}

export default Raffle;