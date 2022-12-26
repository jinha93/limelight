const CODE = require("../modules/status-code");
const MSG = require("../modules/response-message");
const UTIL = require("../modules/util");

const { request } = require('undici');
const { clientId, clientSecret } = require('../config/discord.json');

const auth = {};

auth.session = async function(req, res, next) {
	return res.send(req.session);
}

auth.signIn = async function(req, res, next) {
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
					client_id: clientId,
					client_secret: clientSecret,
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

            req.session.userId = userData.id;
            req.session.userName = userData.username;
            req.session.discriminator = userData.discriminator;

		} catch (error) {
			console.error(error);
		}
	}
	

	if(process.env.NODE_ENV === 'development'){
        return res.redirect('http://localhost:3000')
    }else{
        return res.redirect('/')
    }
}

auth.signOut = async function(req, res, next) {
	try {
		req.session.destroy();
        return res.status(CODE.OK).send(UTIL.success(MSG.SEARCH_SUCCESS));
    } catch (error) {
        console.log(error);
        return res.status(CODE.INTERNAL_SERVER_ERROR).send(UTIL.fail(MSG.SEARCH_FAIL));
    }
}

module.exports = auth;