const CODE = require("../modules/status-code");
const MSG = require("../modules/response-message");
const UTIL = require("../modules/util");

const pointModel = require('../model/pointModel')

const point = {};

point.getAll = async function (req, res) {
    await pointModel.getAll().then((resultData) => {
        return res.status(CODE.OK).send(UTIL.success(resultData));
    }).catch((error) => {
        console.log(error);
        return res.status(CODE.INTERNAL_SERVER_ERROR).send(UTIL.fail(MSG.SEARCH_FAIL));
    })
}

point.get = async function (req, res) {
    const {userId} = req.params;
    await pointModel.get(userId).then((resultData) => {
        return res.status(CODE.OK).send(UTIL.success(resultData));
    }).catch((error) => {
        console.log(error);
        return res.status(CODE.INTERNAL_SERVER_ERROR).send(UTIL.fail(MSG.SEARCH_FAIL));
    })
}

module.exports = point;