const middleware = {};

middleware.authChecker = async function(req, res, next){
    if(req.session.loginData){
        next();
    }else{
        res.status(401).json('auth error')
    }
}

// middleware.isLogin = async function(req, res, next){
//     if(req.session.username()
//     next();
// }

module.exports = middleware;