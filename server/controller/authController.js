const { request } = require('undici');
const pointModel = require('../model/pointModel')

const auth = {};

auth.session = async function(req, res) {
    try {
        return res.status(200).json(req.session);
    } catch (error) {
        res.status(500).json(error);
    }
}

auth.signIn = async function(req, res) {
    const code = req.query.code;

	let redirectUri = '';
    if(process.env.NODE_ENV === 'development'){
        redirectUri = 'http://localhost:3001/api/auth/signIn'
    }else{
        redirectUri = 'https://limelight.town/api/auth/signIn'
    }

    if (code) {
		try {
			const tokenResponseData = await request('https://discord.com/api/oauth2/token', {
				method: 'POST',
				body: new URLSearchParams({
					client_id: process.env.CLIENT_ID,
					client_secret: process.env.CLIENT_SECRET,
					code,
					grant_type: 'authorization_code',
					redirect_uri: redirectUri,
					scope: 'identify',
				}).toString(),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});

			const oauthData = await tokenResponseData.body.json();
            const [accessToken, tokenType] = [oauthData.access_token, oauthData.token_type];

            const userResponseData = await request('https://discord.com/api/users/@me', {
                headers: {
                    authorization: `${tokenType} ${accessToken}`,
                },
            });
                
            const userData = await userResponseData.body.json();

            // 포인트 조회
            const userId = userData.id;
            let data = {};
            await pointModel.get(userId).then((resultData) => {
                data = resultData
            }).catch((error) => {
                throw error;
            })

            // 세션에 데이터 저장
            req.session.isLogin = true;
            req.session.userId = userData.id;
            req.session.userName = userData.username;
            req.session.discriminator = userData.discriminator;
            if(userData.avatar) req.session.userAvatar = `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}`;
            req.session.point = data['총 획득 포인트']

		} catch (error) {
            console.log(error);
		}
	}
	

	if(process.env.NODE_ENV === 'development'){
        return res.redirect('http://localhost:3000')
    }else{
        return res.redirect('/')
    }
}

auth.signOut = (req, res) => {
    try {
        req.session.destroy();
        res.status(200).json("SignOut Success");
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = auth;