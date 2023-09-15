const mysql = require("../config/mysql");
const { request } = require('undici');

const CODE = require("../modules/status-code");
const MSG = require("../modules/response-message");
const UTIL = require("../modules/util");

const { sequelize } = require('../models/index');
const Quest = require("../models/quest");
const QuestStatus = require("../models/questStatus");
const Submission = require("../models/submission");
const User = require("../models/user");
const Reward = require("../models/reward");
const Limemon = require("../models/limemon");
const UserItem = require("../models/userItem");

const quest = {};

// 퀘스트 목록 조회
quest.findByUser = async (req, res) => {

    try {
        const userId = req.session.userId ? req.session.userId : null;

        const quest = await Limemon.findOne({
            where: {
                userId: userId,
            },
        });
        return res.status(CODE.OK).send(UTIL.success(quest));
    } catch (error) {
        console.log(error)
        return res.status(CODE.INTERNAL_SERVER_ERROR).send(UTIL.fail(MSG.SEARCH_FAIL));
    }
}

module.exports = quest;