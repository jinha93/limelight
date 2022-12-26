import axios from 'axios';
import { useState, useEffect } from "react";
import { FaRegTimesCircle } from "react-icons/fa"

function Login() {
    //로그인여부
    const [isLogin, setIsLogin] = useState(false);
    const [userData, setUserData] = useState({});

    const getSession = async () => {
        const res = await axios.get('/api/auth/session');
        if (res.data.userId !== '' && res.data.userId !== undefined && res.data.userId !== null) {
            setIsLogin(true);
            setUserData({
                userId: res.data.userId,
                userName: res.data.userName,
                discriminator: res.data.discriminator
            })
            getPoint(res.data);
        }else{
            setIsLogin(false);
        }
    }

    const getPoint = async (data) => {
        const res = await axios.get(`/api/point/${data.userId}`);
        if(res){
            setUserData({
                userId: data.userId,
                userName: data.userName,
                discriminator: data.discriminator,
                point: res.data['총 획득 포인트']
            })
        }
    }

    useEffect(() => {
        const run = async () => {
            await getSession();
        };
        run();
    },[])

    const signOut = () => {
        try {
            async function fetchData() {
                const res = await axios.get('/api/auth/signOut');
                if (res.data.success) {
                    setIsLogin(false);
                }
            }
            fetchData();

        } catch (error) {
            console.error(error.message);
        }
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
                    <div className='flex items-center gap-2'>
                        <div>
                            <p className='text-sm'>
                                {userData.userName}
                                #{userData.discriminator}
                            </p>
                            {
                                userData.point && 
                                <p className='text-xs'>{userData.point}P</p>
                            }
                        </div>
                        <FaRegTimesCircle
                            color='red'
                            size='20'
                            className='ml-auto cursor-pointer'
                            onClick={() => signOut()}
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