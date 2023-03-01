import { useEffect, useState } from "react";
import axios from 'axios';
import RaffleCard from "./RaffleCard";
import common from "../common/Common";
import Alert from '../common/Alert';


function Raffle() {
    

    // alert
    const [isAlert, setIsAlert] = useState(false);

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
                    winCnt: rowData.WIN_CNT,
                    wallet: rowData.WALLET
                })
            )
            //초기 값 세팅
            setInputData(_inputData)
        }).catch((error) => {
            // 로그인 세션 에러
            if(error.response.status == 401){
                // alert 활성화
                setIsAlert(true);
            }
            console.log(error);
        })
    }
    
    useEffect(() => {
        // scroll to top
        window.scrollTo(0,0);
        
        getRaffle();
    }, [])

    let discordUrl = '';
    if (process.env.NODE_ENV === 'development') {
        discordUrl = 'https://discord.com/api/oauth2/authorize?client_id=1045203263592603692&redirect_uri=http%3A%2F%2Flocalhost:3001%2Fapi%2Fauth%2FsignIn&response_type=code&scope=identify';
    } else {
        discordUrl = 'https://discord.com/api/oauth2/authorize?client_id=1045203263592603692&redirect_uri=https%3A%2F%2Flimelight.town%2Fapi%2Fauth%2FsignIn&response_type=code&scope=identify';
    }
    
    return (
        <>
            {isAlert ? <Alert type={'danger'} text={<span>You can use it after logging in. <a href={discordUrl} className="underline">Go to the login page.</a></span>}/> : null}
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
                                setIsAlert={setIsAlert}
                                wallet={rowData.wallet}
                            />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Raffle;