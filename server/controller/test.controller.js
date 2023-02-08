const CODE = require("../modules/status-code");
const MSG = require("../modules/response-message");
const UTIL = require("../modules/util");

const test = {};

test.test_api = async function(req, res, next) {
    try {
        return res.status(CODE.OK).send(UTIL.success(MSG.SEARCH_SUCCESS));
    } catch (error) {
        console.log(error);
        return res.status(CODE.INTERNAL_SERVER_ERROR).send(UTIL.fail(MSG.SEARCH_FAIL));
    }
}

module.exports = test;