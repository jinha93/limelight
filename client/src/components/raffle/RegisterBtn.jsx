import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { setPoint } from '../../reducers/userSlice'
import { conteffi } from "../../App";
import { useState } from 'react';
import Scratch from './Scratch';
import Toast from '../common/Toast'
import WinnerList from './WinnerList';

function RegistBtn(props) {

    // 로그인정보
    const user = useSelector(state => state.user.value);
    const dispatch = useDispatch();

    const login = () => {
        alert('로그인필요');
    }

    // Congratulation
    const Congratulation = () => {
        conteffi.addConfetti({
            emojis: ["🎉"],
            emojiSize: 50,
            confettiNumber: 200,
        });
    };

    // 복권
    const [isScratch, setIsScratch] = useState(false);
    const [winYn, isWinYn] = useState('');
    // Toast
    const [isToast, setIsToast] = useState(false);
    const fnClose = () => {
        setIsToast(false)
    }

    const submitRaffle = (raffleId) => {
        if (user.userData.point === undefined || user.userData.point - props.rafflePoint < 0) {
            setIsToast(true);
            return false;
        }


        axios({
            url: '/api/raffle/submit',
            method: "POST",
            data: {
                'raffleId': raffleId
            },
            dataType: 'json',
        }).then((result) => {
            setIsScratch(true);

            // reducer 포인트 업데이트
            dispatch(setPoint(result.data.point))

            // 래플 정보 재랜더링
            // props.getRaffle();

            // 결과 저장
            isWinYn(result.data.winYn);

        }).catch((error) => {
            // 로딩 효과 비활성화
            setIsScratch(false);

            // 로그인 세션 에러
            if (error.response.status === 401) {
                // alert 활성화
                props.setIsAlert(true);
            }

            // 등록된 지갑 없음
            if (error.response.status === 400) {
                console.log(isScratch);
                alert('Wallet registration is required.\nPlease register your wallet on My Page.')
                window.location.href = '/myPage';
            }

            // alert('error! Contact your administrator.')
            window.location.reload();
            console.log(error);
        })
    }

    // WinnerList
    const [isWinnerList, setIsWinnerList] = useState(false);


    // raffle delete
    const deleteRaffle = (raffleId) => {
        axios({
            url: `/api/raffle/${raffleId}`,
            method: "DELETE",
            dataType: 'json',
        }).then((result) => {
            // 래플 정보 재랜더링
            props.getRaffle();
        }).catch((error) => {
            // 어드민 에러
            if (error.response.status === 403) {
                alert('관리자만 사용 가능합니다.')
            }
            console.log(error);
        })
    }

    return (
        <>
            {/* 포인트 부족 Toast */}
            {
                isToast
                    ?
                    <Toast type={'danger'} text={'Not enough points.'} fnClose={fnClose}></Toast>
                    :
                    null
            }

            {/* 로딩 */}
            {
                isScratch
                    ?
                    <Scratch
                        winYn={winYn}
                        setIsScratch={() => setIsScratch(false)}
                        getRaffle={props.getRaffle}
                    />
                    :
                    null
            }

            {/* WinnerList */}
            {
                isWinnerList
                    ?
                    <WinnerList
                        raffleId={props.raffleId}
                        raffleName={props.raffleName}
                        setIsWinnerList={() => setIsWinnerList(false)}
                    />
                    :
                    null
            }
            <div className='flex gap-3'>
                {
                    //로그인여부
                    user.isLogin
                        ?
                        //당첨여부
                        props.winYn === "Y"
                            ?
                            <button
                                type="button"
                                className="w-full inline-block mt-3 px-6 py-2 bg-[#be86ea] text-white leading-tight rounded-full shadow-md hover:bg-purple-500 hover:shadow-lg"
                                onClick={Congratulation}
                            >
                                Congratulation
                            </button>
                            :
                            //종료여부
                            props.ended
                                ?
                                <button
                                    type="button"
                                    className="w-full inline-block mt-3 px-6 py-2 bg-[#bcaeaa] opacity-60 text-white leading-tight rounded-full shadow-md cursor-not-allowed"
                                    disabled={true}
                                >
                                    Ended
                                </button>
                                :
                                <button
                                    type="button"
                                    className="w-full inline-block mt-3 px-6 py-2 bg-[#1B7EEA] text-white leading-tight rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg"
                                    onClick={() => submitRaffle(`${props.raffleId}`)}
                                >
                                    Register
                                </button>
                        :
                        props.ended
                            ?
                            <button
                                type="button"
                                className="w-full inline-block mt-3 px-6 py-2 bg-[#bcaeaa] opacity-60 text-white leading-tight rounded-full shadow-md cursor-not-allowed"
                                disabled={true}
                            >
                                Ended
                            </button>
                            :
                            <button
                                type="button"
                                className="w-full inline-block mt-3 px-6 py-2 bg-[#1B7EEA] text-white leading-tight rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg"
                                onClick={() => login()}
                            >
                                Register
                            </button>
                }
            </div>
            {
                user.userData.admin === true
                ?
                <div className='flex gap-3'>
                    <button
                        type="button"
                        className={
                            props.ended || props.winCnt > 0
                            ? 'w-full mt-3 px-2 py-2 bg-gray-400 text-white leading-tight rounded-full shadow-md cursor-not-allowed'
                            : 'w-full mt-3 px-2 py-2 bg-red-600 text-white leading-tight rounded-full shadow-md hover:bg-red-500 hover:shadow-lg' 
                        }
                        onClick={() => deleteRaffle(`${props.raffleId}`)}
                        disabled={props.ended || props.winCnt > 0}
                    >
                        삭제
                    </button>
                    <button
                        type="button"
                        className={props.ended ? 'w-full mt-3 px-2 py-2 bg-green-600 text-white leading-tight rounded-full shadow-md hover:bg-green-500 hover:shadow-lg' : 'w-full mt-3 px-2 py-2 bg-gray-400 text-white leading-tight rounded-full shadow-md cursor-not-allowed'}
                        onClick={() => { setIsWinnerList(true); }}
                        disabled={!props.ended}
                    >
                        결과
                    </button>
                </div>
                :
                null
            }
            
        </>
    )
}

export default RegistBtn;