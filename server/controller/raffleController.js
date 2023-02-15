const mysql = require("../config/mysql");
const pointModel = require('../model/pointModel');
const raffle = {};

// 래플 목록 조회
raffle.findAll = async (req, res) => {
    const connection = await mysql.getConnection(async conn => conn);

    try {
        const userId = req.session.userId;
        const sql = `
            SELECT A.*, COALESCE(B.WIN_YN, 'N') AS WIN_YN
                 , (SELECT COUNT(*) FROM RAFFLE_APC_LIST WHERE WIN_YN = 'Y' AND RAFFLE_ID = A.RAFFLE_ID) AS WIN_CNT
            FROM RAFFLE A
                 LEFT OUTER JOIN RAFFLE_APC_LIST B 
                 ON A.RAFFLE_ID = B.RAFFLE_ID
                 AND B.WIN_YN = 'Y'
                 AND B.USER_ID = ?
            ORDER BY RAFFLE_STD_DATE ASC
        `;

        const [rows] = await connection.query(sql, [userId]);

        connection.release();
        res.status(200).json(rows)

    } catch (error) {
        connection.release();
        console.log(error);
        res.status(500).json(error)
    } finally {
        connection.release();
    }
}


// 래플 등록
raffle.submit = async (req, res) => {
    const connection = await mysql.getConnection(async conn => conn);
    
    try {
        await connection.beginTransaction();

        // 파라미터
        const { raffleId } = req.body;
        const { userId } = req.session;

        // 래플 정보 조회
        let sql = `SELECT * FROM RAFFLE WHERE RAFFLE_ID = ?`;
        let [rows] = await connection.query(sql, [raffleId]);
        const rafflePoint = rows[0].RAFFLE_POINT;

        // 포인트 잔액 조회
        let userPoint;
        await pointModel.get(userId).then((resultData) => {
            userPoint = resultData['총 획득 포인트'];
        })
        const changePoint = userPoint - rafflePoint;
        if(changePoint < 0) return res.status(500).json('잔여 포인트 부족');

        // 포인트 사용 내역 INSERT

        
        // 래플 신청 내역 INSERT
        const winRate = rows[0].WIN_RATE;
        const ranNum = Math.floor((Math.random() * 99) +1)
        let winYn = 'N';
        if(ranNum <= winRate) winYn = 'Y';       

        sql = `
            INSERT INTO RAFFLE_APC_LIST
            (
                RAFFLE_ID
                , USER_ID
                , RAFFLE_APC_DATE
                , WIN_YN
            )VALUES(
                ?
                , ?
                , NOW()
                , ?
            )
        `;
        [rows] = await connection.query(sql, [raffleId, userId, winYn]);
        
        // 포인트 감소
        await pointModel.update(userId, changePoint);
        
        await connection.commit(); // 커밋

        return res.status(200).json({'point': changePoint, 'winYn': winYn});
    } catch (error) {
        console.log(error);
        await connection.rollback(); // 롤백
        return res.status(500).json(error)
    } finally {
        connection.release(); // connection 회수
    }
}

module.exports = raffle;