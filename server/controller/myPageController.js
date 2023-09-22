const mysql = require("../config/mysql");
const firebase = require("../config/firebase");
const connection = require("../config/mysql");
const myPage = {};

// 래플 목록 조회
myPage.getUserUseHisList = async (req, res) => {
  const connection = await mysql.getConnection(async (conn) => conn);

  try {
    const userId = req.session.userId;
    const sql = `
                    SELECT 
                        A.USER_ID 
                        , A.USE_DATE
                        , A.USE_POINT
                        , A.USE_CTS 
                    FROM use_point_history A
                    WHERE A.USER_ID = ?
                    ORDER BY A.USE_DATE DESC
                    `;
    const [rows] = await connection.query(sql, [userId]);

    connection.release();
    res.status(200).json(rows);
  } catch (error) {
    connection.release();
    console.log(error);
    res.status(500).json(error);
  }
};

// 유저 정보 조회
myPage.getUserInfo = async (req, res) => {
  const connection = await mysql.getConnection(async conn => conn);

  try {
    const userId = req.session.userId;
    const sql = `
                  SELECT 
                      A.USER_ID 
                      , A.WALLET
                      , A.DISCORD_HANDLE
                  FROM USER A
                  WHERE A.USER_ID = ?
                  `;
    const [rows] = await connection.query(sql, [userId]);

    connection.release();
    res.status(200).json(rows[0]);
  } catch (error) {
    connection.release();
    console.log(error);
    res.status(500).json(error);
  }
};

// 유저 정보 등록
myPage.walletUpdate = async (req, res) => {
  const connection = await mysql.getConnection(async conn => conn);

  try {
    const userId = req.session.userId;
    const { wallet } = req.body;
    const sql = `
      UPDATE USER
      SET WALLET = ?
      WHERE USER_ID = ?
  `;
    await connection.query(sql, [wallet, userId]);

    await connection.commit(); // 커밋

    return res.status(200).json('WALLET UPDATE SUCCESS');
  } catch (error) {
    console.log(error);
    await connection.rollback(); // 롤백
    return res.status(500).json(error)
  }
};

module.exports = myPage;
