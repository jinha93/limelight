const mysql = require("../config/mysql");

let Raffle = (raffle) => {
    this.raffle_id = raffle.raffleId
    this.raffleName = raffle.raffleName
    this.raffleStdDate = raffle.raffleStdDate
    this.raffleEndDate = raffle.raffleEndDate
    this.raffleImgSrc = raffle.raffleImgSrc
    this.rafflePoint = raffle.rafflePoint
    this.winRate = raffle.winRate
    this.winCount = raffle.winCount
}

// 모든 래플 목록 조회
Raffle.findAll = function (result) {
    mysql.query("SELECT * FROM RAFFLE", function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log("employees : ", res);
        result(null, res);
      }
    });
  };

module.exports = Raffle;