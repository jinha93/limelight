const raffleModel = require("../model/raffleModel");
const raffle = {};

// 래플 목록 조회
raffle.findAll = async function (req, res) {
    try {
        raffleModel.findAll(function(err, data){
            if(err) res.send(err);
            res.status(200).send(data)
        })
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = raffle;