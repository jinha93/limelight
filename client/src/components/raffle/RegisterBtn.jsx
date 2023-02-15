import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import userSlice, { setPoint } from '../../reducers/userSlice'
import { conteffi } from "../../App";
import Spinner from '../common/Spinner';
import { useState } from 'react';
import common from "../common/Common";
import Alert from '../common/Alert';

function RegistBtn(props) {

    // 로딩
    const [isLoading, setIsLoading] = useState(false);

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

    const submit = (raffleId) => {
        setIsLoading(true);
        axios({
            url: '/api/raffle/submit',
            method: "POST",
            data: {
                'raffleId': raffleId
            },
            dataType: 'json',
        }).then((result) => {

            setTimeout(() => {
                // reducer 포인트 업데이트
                dispatch(setPoint(result.data.point))

                // 래플 정보 재랜더링
                props.getRaffle();

                // 결과가 당첨일 경우 효과
                if(result.data.winYn === 'Y') Congratulation();

                // 로딩 효과 활성화
                setIsLoading(false);
            }, 1000);

        }).catch((error) => {
            // 로딩 효과 비활성화
            setIsLoading(false);

            // 로그인 세션 에러
            if(error.response.status == 401){
                // alert 활성화
                props.setIsAlert(true);

                // 3초 후 로그인페이지 이동
                setTimeout(() => {
                    window.location.href = error.response.data.loginUrl
                }, 2000);
            } 
            console.log(error);
        })
    }

    return (
        <>
            {isLoading ? <Spinner /> : null}
            {
                //로그인여부
                user.isLogin
                    ?
                    //당첨여부
                    props.winYn === "Y"
                        ?
                        <button
                            type="button"
                            className="w-full inline-block mt-3 px-6 py-2 bg-gray-500 text-white leading-tight rounded-full shadow-md hover:bg-gray-700 hover:shadow-lg"
                            onClick={() => Congratulation()}
                        >
                            Congratulation!
                        </button>
                        :
                        //종료여부
                        props.ended
                            ?
                            <button
                                type="button"
                                className="w-full inline-block mt-3 px-6 py-2 bg-gray-600 opacity-60 text-white leading-tight rounded-full shadow-md cursor-not-allowed"
                                disabled={true}
                            >
                                Ended
                            </button>
                            :
                            <button
                                type="button"
                                className="w-full inline-block mt-3 px-6 py-2 bg-[#1B7EEA] text-white leading-tight rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg"
                                onClick={() => submit(`${props.raffleId}`)}
                            >
                                Register
                            </button>
                    :
                    props.ended
                        ?
                        <button
                            type="button"
                            className="w-full inline-block mt-3 px-6 py-2 bg-gray-600 opacity-60 text-white leading-tight rounded-full shadow-md cursor-not-allowed"
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