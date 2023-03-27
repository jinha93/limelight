const mysql = require("../config/mysql");
const pointModel = require('../model/pointModel');

const raffle = {};

// 래플 목록 조회
raffle.findAll = async (req, res) => {
    const connection = await mysql.getConnection(async conn => conn);

    try {
        const userId = req.session.userId;
        const sql = `
            SELECT A.*
                 , COALESCE(B.WIN_YN, 'N') AS WIN_YN
                 , (SELECT COUNT(*) FROM RAFFLE_APC_LIST WHERE WIN_YN = 'Y' AND RAFFLE_ID = A.RAFFLE_ID) AS WIN_CNT
            FROM RAFFLE A
                 LEFT OUTER JOIN RAFFLE_APC_LIST B 
                 ON A.RAFFLE_ID = B.RAFFLE_ID
                 AND B.WIN_YN = 'Y'
                 AND B.USER_ID = ?
            ORDER BY RAFFLE_END_DATE DESC
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


// 래플 신청
raffle.submit = async (req, res) => {
    const connection = await mysql.getConnection(async conn => conn);

    try {
        await connection.beginTransaction();

        // 파라미터
        const { raffleId } = req.body;
        const { userId } = req.session;

        // 래플 정보 조회
        let sql = `SELECT A.RAFFLE_ID
                        , A.RAFFLE_NAME
                        , A.RAFFLE_STD_DATE
                        , A.RAFFLE_END_DATE
                        , A.RAFFLE_POINT
                        , A.RAFFLE_IMG_SRC
                        , A.WIN_MAX_CNT
                        , A.WIN_RATE
                        , A.WIN_MAX_CNT - (SELECT COUNT(*) FROM RAFFLE_APC_LIST B WHERE A.RAFFLE_ID = B.RAFFLE_ID AND B.WIN_YN = 'Y') AS LEFT_CNT
                     FROM RAFFLE A
                    WHERE A.RAFFLE_ID = ?`;
        let [rows] = await connection.query(sql, [raffleId]);
        const rafflePoint = rows[0].RAFFLE_POINT;
        const raffleName = rows[0].RAFFLE_NAME;
        const leftCnt = rows[0].LEFT_CNT;
        if (leftCnt < 1) return res.status(500).json('No seats left to win');

        // 포인트 잔액 조회
        let userPoint;
        let usedPoint;
        await pointModel.get(userId).then((resultData) => {
            userPoint = resultData['총 획득 포인트'];
            usedPoint = resultData['사용 포인트'];
        })
        const changePoint = parseInt(userPoint) - parseInt(rafflePoint);
        const changeUsedPoint = parseInt(usedPoint) + parseInt(rafflePoint);
        if (changePoint < 0) return res.status(500).json('Lack of remaining points');

        // 포인트 사용 내역 INSERT
        const usePoint = rafflePoint * -1;
        const useCts = `'${raffleName}' RAFFLE SUBMIT`
        sql = `
            INSERT INTO USE_POINT_HISTORY
            (
                USER_ID
                , USE_DATE
                , USE_POINT
                , USE_CTS
            )VALUES(
                ?
                , NOW()
                , ?
                , ?
            )
        `;
        await connection.query(sql, [userId, usePoint, useCts]);

        // 래플 신청 내역 INSERT
        const winRate = rows[0].WIN_RATE;
        const ranNum = Math.floor((Math.random() * 99) + 1)
        let winYn = 'N';
        if (ranNum <= winRate) winYn = 'Y';

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
        await connection.query(sql, [raffleId, userId, winYn, userId]);

        // 포인트 감소
        await pointModel.update(userId, changePoint, changeUsedPoint);

        await connection.commit(); // 커밋

        return res.status(200).json({ 'point': changePoint, 'winYn': winYn });
    } catch (error) {
        console.log(error);
        await connection.rollback(); // 롤백
        return res.status(500).json(error)
    } finally {
        connection.release(); // connection 회수
    }
}



// 래플 추가
raffle.addRaffle = async (req, res) => {
    const connection = await mysql.getConnection(async conn => conn);

    try {
        await connection.beginTransaction();

        // 파라미터
        const { originalname, filename } = req.file;
        const { raffleName, raffleEndDate, rafflePoint, winner, rate } = req.body;

        // RAFFLE INSERT
        sql = `
            INSERT INTO RAFFLE
            (
                RAFFLE_NAME
                , RAFFLE_STD_DATE
                , RAFFLE_END_DATE
                , RAFFLE_POINT
                , RAFFLE_IMG_SRC
                , WIN_MAX_CNT
                , WIN_RATE
            )VALUES(
                ?
                , NOW()
                , DATE_ADD(?, INTERVAL -9 HOUR)
                , ?
                , ?
                , ?
                , ?
            )
        `;
        await connection.query(sql, [raffleName, raffleEndDate, rafflePoint, filename, winner, rate]);

        await connection.commit(); // 커밋

        return res.status(200).json('NEW RAFFLE ADD SUCCESS');
    } catch (error) {
        console.log(error);
        await connection.rollback(); // 롤백
        return res.status(500).json(error)
    } finally {
        connection.release(); // connection 회수
    }
}

// 래플 승자 목록 조회
raffle.getWinnerList = async (req, res) => {
    const connection = await mysql.getConnection(async conn => conn);

    try {
        const { raffleId } = req.params;
        const sql = `
            SELECT A.USER_ID
                 , B.DISCORD_HANDLE
                 , B.WALLET
            FROM RAFFLE_APC_LIST A
                 INNER JOIN USER_INF B
                    ON A.USER_ID = B.USER_ID
            WHERE A.RAFFLE_ID = ?
              AND A.WIN_YN = 'Y'
            ORDER BY A.SNO ASC
        `;

        const [rows] = await connection.query(sql, [raffleId]);
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

module.exports = raffle;