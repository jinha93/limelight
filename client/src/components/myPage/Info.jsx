import axios from 'axios';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import limemon from "../../assets/images/limemon.jpg";
import metamask from "../../assets/images/icons/metamask.svg";

function Info({setIsAlert}) {
    const user = useSelector((state) => state.user.value);
    const userData = user.userData;

    const [userInfo, setUserInfo] = useState({});

    const getUserInfo = () => {
        axios({
            url: "/api/myPage/getUserInfo",
            method: 'GET'
        }).then((result) => {
            const _inputData = {
                wallet: result.data.WALLET,
                discordHandle: result.data.DISCORD_HANDLE
            }
            setUserInfo(_inputData)
        }).catch((error) => {
            // 로그인 세션 에러
            if(error.response.status === 401){
                // alert 활성화
                setIsAlert(true);
            }
            console.log(error);
        })
    }

    useEffect(()=>{
        getUserInfo();
    },[])

    const walletRegister = async () => {
        const ethereum = window.ethereum;
        let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        let msg = 'Welcome to LIMELIGHT!\nClick to Sign'
        let signature = await ethereum.request({
            method: 'personal_sign',
            params: [msg, accounts[0]]
        });

        if(signature){
            const wallet = accounts[0];

            axios({
                url: '/api/myPage/wallet',
                method: "PUT",
                data: {
                    wallet: wallet
                },
                dataType: 'json',
            }).then((result) => {
                console.log(result);
                getUserInfo();
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    return (
        <div className="w-full bg-white/80 flex p-5 rounded-2xl shadow">
            <img
                className="object-cover h-20 rounded-2xl"
                src={userData.userAvatar ? userData.userAvatar : limemon}
                alt="userAvatar"
            />
            <div className="flex items-center justify-between w-full mx-5">
                <div>
                    <p className="text-xl">{userData.userName}#{userData.discriminator}</p>
                    <p className="text-gray-600 text-sm">{userData.point} Point</p>
                </div>
                {
                    userInfo.wallet
                    ?
                        <p>{userInfo.wallet}</p>
                    :
                        <button
                            onClick={walletRegister}
                            type="button"
                            data-ripple-dark="true"
                            className="flex select-none items-center gap-3 rounded-lg bg-white py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-blue-gray-900 shadow-md shadow-blue-gray-500/10 transition-all hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        >
                            <img src={metamask} alt="metamask" className="h-6 w-6" />
                            Connect Wallet
                        </button>
                }
            </div>
        </div>
    )
}
export default Info;