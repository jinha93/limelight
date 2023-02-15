const pointModel = require('../model/pointModel')

const point = {};

point.getAll = async function (req, res) {
    await pointModel.getAll().then((resultData) => {
        return res.status(200).json(resultData);
    }).catch((error) => {
        console.log(error);
        return res.status(500).json(error)
    })
}

point.get = async function (req, res) {
    const {userId} = req.params;
    await pointModel.get(userId).then((resultData) => {
        return res.status(200).json(resultData);
    }).catch((error) => {
        console.log(error);
        return res.status(500).json(error)
    })
}

module.exports = point;