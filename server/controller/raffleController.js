const mysql = require("../config/mysql");
const raffle = {};

// 래플 목록 조회
raffle.findAll = async function (req, res) {
    try {
        const userId = req.session.userId;
        const sql = `
            SELECT A.*, COALESCE(B.WIN_YN, 'N') AS WIN_YN
                 , (SELECT COUNT(*) FROM RAFFLE_APC_LIST WHERE WIN_YN = 'Y' AND RAFFLE_ID = A.RAFFLE_ID) AS WIN_CNT
            FROM RAFFLE A
                 LEFT OUTER JOIN RAFFLE_APC_LIST B 
                 ON A.RAFFLE_ID = B.RAFFLE_ID
                 AND B.WIN_YN = 'Y'
                 AND B.USER_ID = '${userId}'
            ORDER BY RAFFLE_STD_DATE ASC
            `;
        console.log(sql);
        mysql.query(sql, function (err, result) {
            if(err) throw err;
            res.status(200).json(result)
        });
    } catch (error) {
        res.status(500).json(error)
    }
}

// 래플 당첨여부 조회
raffle.getRaffleWinYn = async function (req, res) {
    try {
        console.log(req);
        const userId = req.param.userId;
        const sql = `SELECT * FROM RAFFLE_APC_LIST WHERE USER_ID = ${userId}`;
        mysql.query(sql, function (err, result) {
            if(err) throw err;
            res.status(200).json(result)
        });
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = raffle;