import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { setPoint } from '../../reducers/userSlice'
import { conteffi } from "../../App";
import { useState } from 'react';
import Scratch from './Scratch';
import Toast from '../common/Toast'

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
        if(user.userData.point === undefined || user.userData.point - props.rafflePoint < 0){
            setIsToast(true);
            return false;
        } 

        setIsScratch(true);
        axios({
            url: '/api/raffle/submit',
            method: "POST",
            data: {
                'raffleId': raffleId
            },
            dataType: 'json',
        }).then((result) => {
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
                alert('Wallet registration is required.\nPlease register your wallet on My Page.')
                window.location.href = '';
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
                            onClick={() => {Congratulation();}}
                        >
                            Congratulation
                        </button>
                        // <button
                        //     type="button"
                        //     className="w-full inline-block mt-3 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l text-white leading-tight rounded-full shadow-md "
                        //     onClick={() => {Congratulation();}}
                        // >
                        //     Congratulation
                        // </button>
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
        </>
    )
}

export default RegistBtn;