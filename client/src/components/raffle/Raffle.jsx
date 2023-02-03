import { useEffect, useState } from "react";
import axios from 'axios';
import RaffleCard from "./RaffleCard";

function Raffle() {
    //scroll to top
    window.scrollTo(0,0);

    const [inputData, setInputData] = useState([{}]);
    useEffect(() => {
        try {
            async function fetchData() {
                const res = await axios.get('/api/raffle');
                const _inputData = res.data.map((rowData) => (
                    {
                        raffleId: rowData.RAFFLE_ID,
                        raffleName: rowData.RAFFLE_NAME,
                        raffleStdDate: rowData.RAFFLE_STD_DATE,
                        raffleEndDate: rowData.RAFFLE_END_DATE,
                        rafflePoint: rowData.RAFFLE_POINT,
                        raffleImgSrc: rowData.RAFFLE_IMG_SRC,
                        winCount: rowData.WIN_COUNT,
                        winRate: rowData.WIN_RATE,
                        
                    })
                )
                //초기 값 세팅
                setInputData(_inputData)
            }
            fetchData();

        } catch (error) {
            console.error(error.message);
        }
    }, [])
    return (
        <div className='bg min-h-screen'>
            <div className="mx-auto w-3/4 pt-32 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 text-center">
                {inputData.map((rowData) => (
                    rowData.raffleId != undefined &&
                        <RaffleCard
                            key={rowData.raffleId}
                            raffleId={rowData.raffleId}
                            raffleName={rowData.raffleName}
                            raffleStdDate={rowData.raffleStdDate}
                            raffleEndDate={rowData.raffleEndDate}
                            raffleImgSrc={rowData.raffleImgSrc}
                            rafflePoint={rowData.rafflePoint}
                            winRate={rowData.winRate}
                            winCount={rowData.winCount}
                        />
                ))}
            </div>
        </div>
    )
}

export default Raffle;