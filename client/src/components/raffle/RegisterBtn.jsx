import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'

function RegistBtn(props){

    //로그인정보
    const user = useSelector(state => state.user.value);

    const register = () => {
        try {
            axios({
                url: "",
                method: "",
                withCredentials: true,
            });
        } catch (error) {
            
        }
    }

    return (
        //로그인여부
        user.isLogin
        ?
            //종료여부
            props.ended
            ?
                <button
                    type="button"
                    className="w-full inline-block mt-3 px-6 py-2 bg-gray-600 opacity-60 text-white leading-tight uppercase rounded-full shadow-md cursor-not-allowed"
                    disabled={true}
                >
                    Ended
                </button>
            :
                <button
                    type="button"
                    className="w-full inline-block mt-3 px-6 py-2 bg-[#1B7EEA] text-white leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg"
                    onClick={() => alert(`${props.raffleId}`)}
                >
                    {user.userData.userId}
                </button>
        :
            props.ended
            ?
                <button
                    type="button"
                    className="w-full inline-block mt-3 px-6 py-2 bg-gray-600 opacity-60 text-white leading-tight uppercase rounded-full shadow-md cursor-not-allowed"
                    disabled={true}
                >
                    Ended
                </button>
            :
                <button
                    type="button"
                    className="w-full inline-block mt-3 px-6 py-2 bg-[#1B7EEA] text-white leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg"
                    onClick={() => alert(`로그인함수호출`)}
                >
                    Register
                </button>
    )
}

export default RegistBtn;