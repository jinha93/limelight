import { useState, useEffect } from "react";
import axios from 'axios';

export default function WinnerList(props) {

    const [winnerList, setWinnerList] = useState([{}]);
    const getWinnerList = () => {
        axios({
            url: `/api/raffle/getWinnerList/${props.raffleId}`,
            method: 'GET',
            dataType: 'json',
        }).then((result) => {
            console.log('result', result);
            const _inputData = result.data.map((rowData) => (
                {
                    userId: rowData.USER_ID,
                    discord: rowData.DISCORD_HANDLE,
                    wallet: rowData.WALLET
                })
            )
            //초기 값 세팅
            setWinnerList(_inputData)
        }).catch((error) => {
            // 어드민 에러
            if (error.response.status == 403) {
                alert('관리자만 사용 가능합니다.')
            }
            console.log(error);
        })
    }

    useEffect(() => {
        getWinnerList();
    }, [])

    const copyClipBoard = () => {
        let text = '';
        text += 'DISCORD\tDISCORD_ID\tWALLET\n';
        winnerList.map((rowData) => {
            text += `${rowData.userId}\t${rowData.discord}\t${rowData.wallet}`;
        })
        navigator.clipboard.writeText(text);
    }

    const downloadCsv = () => {
        let filename = `${props.raffleName}_WINNER_LIST.csv`;
        var csv = [];
        var row = [];

        //1열에는 컬럼명
        row.push(
            'DISCORD',
            'tDISCORD_ID',
            'tWALLET',
        );

        csv.push(row.join(','));

        // 2열 ~
        winnerList.map((rowData) => {
            row = [];
            row.push(
                rowData.userId,
                rowData.discord,
                rowData.wallet
            );
            csv.push(row.join(','));
        })

        // 한글 처리를 위한 BOM 추가
        const BOM = '\uFEFF';

        csv = BOM + csv.join('\n');

        let csvFile = new Blob([csv], { type: 'text/csv' });

        var downloadLink = document.createElement("a");
        downloadLink.download = filename;
        downloadLink.href = window.URL.createObjectURL(csvFile);
        downloadLink.style.display = "none";

        document.body.appendChild(downloadLink);

        downloadLink.click();
    }

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-30 outline-none focus:outline-none">
                <div className="relative">
                    {/*content*/}
                    <div className="bg-black/50 p-5 rounded-xl">

                        <div className="relative overflow-x-auto rounded-xl">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            DISCORD
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            DISCORD ID
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            WALLET
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {winnerList.map((rowData) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {rowData.userId}
                                            </th>
                                            <td className="px-6 py-4">
                                                {rowData.discord}
                                            </td>
                                            <td className="px-6 py-4">
                                                {rowData.wallet}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex gap-5 mt-3">
                            <button
                                type="button"
                                className="w-full text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                onClick={copyClipBoard}
                            >
                                COPY
                            </button>
                            <button
                                type="button"
                                className="w-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                onClick={downloadCsv}
                            >
                                DOWNLOAD
                            </button>
                            <button
                                type="button"
                                className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                onClick={props.setIsWinnerList}
                            >
                                CLOSE
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-20 bg-black"></div>
        </>
    );
}