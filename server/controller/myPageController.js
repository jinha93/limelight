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
  } finally {
    connection.release();
  }
};

module.exports = myPage;
