const middleware = {};

middleware.test = async function(req, res, next){
    next();
}

// middleware.isLogin = async function(req, res, next){
//     if(req.session.username()
//     next();
// }

module.exports = middleware;