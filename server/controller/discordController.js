const mysql = require("../config/mysql");
const { request } = require('undici');

const CODE = require("../modules/status-code");
const MSG = require("../modules/response-message");
const UTIL = require("../modules/util");

const { sequelize } = require('../models/index');
const { getRoles } = require('../bot');

const User = require("../models/user");


const discord = {};

// 퀘스트 목록 조회
discord.findAllRoles = async (req, res) => {

    try {
        const roles = await getRoles();

        return res.status(CODE.OK).send(UTIL.success(roles));
    } catch (error) {
        console.log(error)
        return res.status(CODE.INTERNAL_SERVER_ERROR).send(UTIL.fail(MSG.SEARCH_FAIL));
    }
}

module.exports = discord;