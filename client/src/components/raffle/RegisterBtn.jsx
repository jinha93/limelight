import { useSelector } from 'react-redux'
import { conteffi } from "../../App";

function RegistBtn(props){

    //로그인정보
    const user = useSelector(state => state.user.value);

    let discordUrl = '';
    if (process.env.NODE_ENV === 'development') {
        discordUrl = 'https://discord.com/api/oauth2/authorize?client_id=1045203263592603692&redirect_uri=http%3A%2F%2Flocalhost:3001%2Fapi%2Fauth%2FsignIn&response_type=code&scope=identify';
    } else {
        discordUrl = 'https://discord.com/api/oauth2/authorize?client_id=1045203263592603692&redirect_uri=https%3A%2F%2Flimelight.town%2Fapi%2Fauth%2FsignIn&response_type=code&scope=identify';
    }

    const login = () => {
        alert('로그인필요');
        window.location.href=discordUrl;
    }
    
    // Congratulation
    const handleClick = () => {
        conteffi.addConfetti({
            emojis: ["🎉"],
            emojiSize: 50,
            confettiNumber: 5000,
        });
    };

    return (
        //로그인여부
        user.isLogin
        ?
            //당첨여부
            props.winYn === "Y"
            ?
            <button
                type="button"
                className="w-full inline-block mt-3 px-6 py-2 bg-gray-500 text-white leading-tight rounded-full shadow-md hover:bg-gray-700 hover:shadow-lg"
                onClick={() => handleClick()}
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
                        onClick={() => alert(`${props.raffleId}`)}
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
    )
}

export default RegistBtn;