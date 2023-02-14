import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { setPoint } from '../../reducers/userSlice'
import { conteffi } from "../../App";
import Spinner from '../common/Spinner';
import { useState } from 'react';

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
        axios({
            url: '/api/raffle/submit',
            method: "POST",
            data: {
                'raffleId': raffleId
            },
            dataType: 'json',
        }).then((result) => {
            setIsLoading(true);

            setTimeout(() => {
                if (result.data.success < 0) alert(result.data.msg);
                dispatch(setPoint(result.data.point))
                props.getRaffle();
                Congratulation();

                setIsLoading(false);
            }, 1000);

        }).catch((error) => {
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