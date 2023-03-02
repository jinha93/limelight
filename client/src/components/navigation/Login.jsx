import axios from 'axios';
import { useEffect } from "react";
import { FaRegTimesCircle } from "react-icons/fa"

import { useSelector, useDispatch } from 'react-redux'
import { signIn, signOut } from '../../reducers/userSlice'

import limemon from '../../assets/images/limemon.jpg';
import { useNavigate } from 'react-router-dom';

function Login() {
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
    },[])

    const LogOut = () => {
        axios({
            url: '/api/auth/signOut',
            method: "GET",
        }).then(() => {
            dispatch(signOut())
            navigate("/");
        }).catch((error) => {
            console.log(error);
        })
    }

    const navigate = useNavigate();
    const myPage = () => {
        navigate("/myPage");
    }
      

    let discordUrl = '';
    if (process.env.NODE_ENV === 'development') {
        discordUrl = 'https://discord.com/api/oauth2/authorize?client_id=1045203263592603692&redirect_uri=http%3A%2F%2Flocalhost:3001%2Fapi%2Fauth%2FsignIn&response_type=code&scope=identify';
    } else {
        discordUrl = 'https://discord.com/api/oauth2/authorize?client_id=1045203263592603692&redirect_uri=https%3A%2F%2Flimelight.town%2Fapi%2Fauth%2FsignIn&response_type=code&scope=identify';
    }

    return (
        <div className=''>
            {
                isLogin
                    ?
                    <div className='flex items-center gap-2 cursor-pointer'>
                        <img 
                            className='object-cover h-10 rounded-full'
                            src={userData.userAvatar ? userData.userAvatar : limemon}
                            alt="userAvatar"
                            onClick={() => myPage()}
                        />
                        <div className='cursor-pointer' onClick={() => myPage()}>
                            <p className='text-sm'>
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
                            className='ml-auto cursor-pointer'
                            onClick={() => LogOut()}
                        />
                    </div>
                    :
                    <div className=''>
                        <a href={discordUrl}>
                            LOGIN
                        </a>
                    </div>
            }
        </div>
    );
}

export default Login;


