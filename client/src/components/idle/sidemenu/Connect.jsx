import axios from 'axios';
import { useEffect } from "react";
import { FaRegTimesCircle } from "react-icons/fa"

import { useSelector, useDispatch } from 'react-redux'
import { signIn, signOut } from '../../../reducers/userSlice'

import limemon from '../../../assets/images/limemon.jpg';
import { useNavigate } from 'react-router-dom';


export default function Connect() {
    const user = useSelector(state => state.user.value)
    const dispatch = useDispatch();

    const isLogin = user.isLogin;
    const userData = user.userData;

    useEffect(() => {
        axios({
            url: '/api/auth/session',
            method: "GET",
        }).then((result) => {
            if (result.data.userId !== '' && result.data.userId !== undefined && result.data.userId !== null) {
                dispatch(signIn(result.data))
            }
        }).catch((error) => {
            console.log(error);
        })
    }, [dispatch])

    const LogOut = () => {
        axios({
            url: '/api/auth/signOut',
            method: "GET",
        }).then(() => {
            dispatch(signOut())
            navigate("/idle");
        }).catch((error) => {
            console.log(error);
        })
    }

    const navigate = useNavigate();
    const myPage = () => {
        navigate("/idle/myLimemon");
    }

    let discordUrl = '';
    if (process.env.NODE_ENV === 'development') {
        discordUrl = process.env.REACT_APP_DEV_DISCORD_LOGIN_URL;
    } else {
        discordUrl = process.env.REACT_APP_DISCORD_LOGIN_URL;
    }

    return (
        <div className="text-center my-5">
            {
                isLogin
                    ?
                    // <button type="button" className="SUITE-ExtraBold rounded-full text-[#5d5a51] bg-[#dcefda] px-7 py-0.5">
                    //     DISCONNECT LIMELIGHT
                    // </button>
                    <div className='flex justify-between items-center gap-2 cursor-pointer SUITE-ExtraBold rounded-full text-[#5d5a51] bg-[#dcefda] mx-5 py-0.5' onClick={() => myPage()}>
                        <img
                            className='object-cover h-10 rounded-full'
                            src={userData.userAvatar ? userData.userAvatar : limemon}
                            alt="userAvatar"
                        />
                        <div className='cursor-pointer'>
                            <p>
                                {userData.userName}
                                #{userData.discriminator}
                            </p>
                            {
                                userData.point !== undefined &&
                                <p className='text-xs'>{userData.point}P</p>
                            }
                        </div>
                        <FaRegTimesCircle
                            color='red'
                            size='20'
                            className='mr-3 cursor-pointer'
                            onClick={() => LogOut()}
                        />
                    </div>
                    :
                    <a href={discordUrl} className="SUITE-ExtraBold rounded-full text-[#5d5a51] bg-[#dcefda] px-7 py-1">CONNECT LIMELIGHT</a>
            }
        </div>
    )
}