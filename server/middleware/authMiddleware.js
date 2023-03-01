const mysql = require("../config/mysql");
const middleware = {};

middleware.authChecker = async function(req, res, next){
    if(req.session.isLogin){
        next();
    }else{
        res.status(401).json('auth error');
    }
}

middleware.userWalletChecker = async function(req, res, next){

    const connection = await mysql.getConnection(async conn => conn);
    let wallet = '';
    try {
        const userId = req.session.userId;
        const sql = `
            SELECT A.USER_ID
                 , A.WALLET
              FROM USER_INF A
             WHERE USER_ID = ?
        `;
        [rows] = await connection.query(sql, [userId]);
        wallet=rows[0].wallet;
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    } finally {
        connection.release();
    }

    if(wallet == '' || wallet == 'undefined'){
        res.status(400).json(error)
    }else{
        next();
    }
}
module.exports = middleware;