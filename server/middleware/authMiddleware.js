const middleware = {};

middleware.authChecker = async function(req, res, next){
    if(req.session.isLogin){
        next();
    }else{
        let discordUrl = '';
        if (process.env.NODE_ENV === 'development') {
            discordUrl = 'https://discord.com/api/oauth2/authorize?client_id=1045203263592603692&redirect_uri=http%3A%2F%2Flocalhost:3001%2Fapi%2Fauth%2FsignIn&response_type=code&scope=identify';
        } else {
            discordUrl = 'https://discord.com/api/oauth2/authorize?client_id=1045203263592603692&redirect_uri=https%3A%2F%2Flimelight.town%2Fapi%2Fauth%2FsignIn&response_type=code&scope=identify';
        }
        res.status(401).json({msg: 'auth error', loginUrl: discordUrl})
    }
}

module.exports = middleware;