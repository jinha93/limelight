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
        discordUrl = process.env.REACT_APP_DEV_DISCORD_LOGIN_URL;
    } else {
        discordUrl = process.env.REACT_APP_DISCORD_LOGIN_URL;
    }

    return (
        <div className=''>
            {
                isLogin
                    ?
                    <div className='flex items-center gap-2 cursor-pointer' onClick={() => myPage()}>
                        <img 
                            className='object-cover h-10 rounded-full'
                            src={userData.userAvatar ? userData.userAvatar : limemon}
                            alt="userAvatar"
                        />
                        <div className='cursor-pointer'>
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


