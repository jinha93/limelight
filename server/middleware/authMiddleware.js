const middleware = {};

middleware.authChecker = async function(req, res, next){
    if(req.session.isLogin){
        next();
    }else{
        res.status(401).json('auth error')
    }
}

module.exports = middleware;