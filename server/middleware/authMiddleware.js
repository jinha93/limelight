const mysql = require("../config/mysql");
const middleware = {};

middleware.authChecker = async function(req, res, next){
    if(req.session.isLogin){
        next();
    }else{
        res.status(401).json('auth error');
    }
}

middleware.adminCheck = async function(req, res, next){
    const adminDiscordId = process.env.ADMIN_DISCORD_ID.split(',');
    const userId = req.session.userId;
    if(adminDiscordId.includes(userId)){
        next();
    }else{
        res.status(403).json('admin check error');
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
        res.status(500).json(error)
    } finally {
        connection.release();
    }
    
    if(rows[0].length > 0){
        next();
        
    }else{
        res.status(400).json('tt')
    }
}
module.exports = middleware;