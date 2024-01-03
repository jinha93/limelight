import { useEffect, useState } from "react";
import axios from 'axios';
import RaffleCard from "./RaffleCard";
import Alert from '../common/Alert';
import { useSelector } from 'react-redux'


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
                    raffleId: rowData.raffle_id,
                    raffleName: rowData.raffle_name,
                    raffleStdDate: rowData.raffle_std_date,
                    raffleEndDate: rowData.raffle_end_date,
                    rafflePoint: rowData.raffle_point,
                    raffleImgSrc: rowData.raffle_img_src,
                    winMaxCnt: rowData.win_max_cnt,
                    winRate: rowData.win_rate,
                    winYn: rowData.win_yn,
                    winCnt: rowData.win_cnt
                })
            )
            //초기 값 세팅
            setInputData(_inputData)
        }).catch((error) => {
            // 로그인 세션 에러
            if(error.response.status === 401){
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

    // 로그인정보
    const user = useSelector(state => state.user.value);

    let discordUrl = '';
    if (process.env.NODE_ENV === 'development') {
        discordUrl = process.env.REACT_APP_DEV_DISCORD_LOGIN_URL;
    } else {
        discordUrl = process.env.REACT_APP_DISCORD_LOGIN_URL;
    }

    return (
        <>
            {isAlert ? <Alert type={'danger'} text={<span>You can use it after logging in. <a href={discordUrl} className="underline">Go to the login page.</a></span>}/> : null}
            <div className='bg min-h-screen pt-32'>
                {user.userData.admin === true
                    ? 
                    <div className="mx-auto w-3/4">
                        <a 
                            href="/addRaffle"
                            className="inline-block px-6 py-3 bg-[#be86ea] text-white leading-tight rounded-full shadow-md hover:bg-purple-500 hover:shadow-lg cursor-pointer"
                        >
                            🛠️ NEW RAFFLE
                        </a>
                    </div>
                    : null
                }
                <div className="mx-auto w-3/4 pt-5 32 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 text-center">
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
                            />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Raffle;