const mysql = require("../config/mysql");
const firebase = require('../config/firebase');
const connection = require("../config/mysql");
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
                 AND B.USER_ID = '${userId}'
            ORDER BY RAFFLE_STD_DATE ASC
        `;

        const [rows] = await connection.query(sql);

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
        // await connection.beginTransaction();

        // 파라미터
        const { raffleId } = req.body;
        const { userId } = req.session;

        // 래플 정보 조회
        let sql = `SELECT * FROM RAFFLE WHERE RAFFLE_ID = ${raffleId}`;
        let [rows] = await connection.query(sql);
        const rafflePoint = rows[0].RAFFLE_POINT;

        // 포인트 잔액 조회
        let ref = firebase.ref(`ID/${userId}`);
        let data = {};
        ref.on('value', (snapshot) =>{
            data = snapshot.val();
        })
        const userPoint = data['총 획득 포인트']
        if(userPoint - rafflePoint < 0 ) return res.status(200).json({'success': -1, 'msg': 'lack of points'});

        // 포인트 사용 내역 INSERT

        // 포인트 감소
        changePoint = userPoint - rafflePoint;
        ref.update({'총 획득 포인트': changePoint})

        // 래플 확률
        const winRate = rows[0].WIN_RATE;
        // 랜덤값 생성 (1~100)
        const ranNum = Math.floor((Math.random() * 99) +1)
        let winYn = 'N';
        if(ranNum <= winRate) winYn = 'Y';


        

        // 래플 신청 내역 INSERT
        sql = `
            INSERT INTO RAFFLE_APC_LIST
            (
                RAFFLE_ID
                , USER_ID
                , RAFFLE_APC_DATE
                , WIN_YN
            )VALUES(
                ${raffleId}
                , ${userId}
                , NOW()
                , '${winYn}'
            )
        `;
        [rows] = await connection.query(sql);
        // await connection.commit();
        
        connection.release();
        res.status(200).json({'success': 1, 'point': changePoint});
        
    } catch (error) {
        await connection.rollback();
        connection.release();
        console.log(error);
        res.status(500).json(error)
    } finally {
        connection.release();
    }
}

module.exports = raffle;