const CODE = require("../modules/status-code");
const MSG = require("../modules/response-message");
const UTIL = require("../modules/util");

const mysql = require("../config/mysql");
const middleware = {};

middleware.authChecker = async function(req, res, next){
    if(req.session.isLogin){
        next();
    }else{
        return res.status(CODE.UNAUTHORIZED).send(UTIL.fail('auth error'));
    }
}

middleware.adminCheck = async function(req, res, next){
    const adminDiscordId = process.env.ADMIN_DISCORD_ID.split(',');
    const userId = req.session.userId;
    if(adminDiscordId.includes(userId)){
        next();
    }else{
        return res.status(CODE.FORBIDDEN).send(UTIL.fail('admin auth error'));
    }
}

middleware.userWalletChecker = async function(req, res, next){

    const connection = await mysql.getConnection(async conn => conn);
    let rows = [];
    try {
        const userId = req.session.userId;
        const sql = `
            SELECT A.USER_ID
                 , A.WALLET
              FROM USER_INF A
             WHERE USER_ID = ?
        `;
        rows = await connection.query(sql, [userId]);
    } catch (error) {
        console.log(error);
        return res.status(CODE.INTERNAL_SERVER_ERROR).send(UTIL.fail('wallet check error'));
    } finally {
        connection.release();
    }
    
    if(rows[0].length > 0){
        next();
    }else{
        return res.status(CODE.INTERNAL_SERVER_ERROR).send(UTIL.fail('wallet check error'));
    }
}
module.exports = middleware;