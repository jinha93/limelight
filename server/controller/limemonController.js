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
const LimemonLevelInfo = require("../models/limemonLevelInfo");

const quest = {};

// 라임몬 조회
quest.findAll = async (req, res) => {
    try {
        const userId = req.session.userId ? req.session.userId : null;

        const limemon = await Limemon.findAll({
            include:[
                {
                    model: LimemonLevelInfo,
                    required: false
                },
            ],
            where: {
                userId: userId,
            },
        });
        return res.status(CODE.OK).send(UTIL.success(limemon));
    } catch (error) {
        console.log(error)
        return res.status(CODE.INTERNAL_SERVER_ERROR).send(UTIL.fail(MSG.SEARCH_FAIL));
    }
}

quest.levelUp = async (req, res) => {
    try {
        const {limemonId} = req.params;
        const userId = req.session.userId ? req.session.userId : null;
        const {level, exp} = await Limemon.findOne({
            attributes:[
                'level',
                'exp'
            ],
            where: {
                limemonId: limemonId,
                userId: userId
            },
            raw: true,
        });

        const {requiredExp} = await LimemonLevelInfo.findOne({
            attributes: [
                ['required_exp', 'requiredExp']
            ],
            where: {
                level: level
            },
            raw: true,
        });

        await Limemon.update({
            level: sequelize.literal("level + 1"),
            exp: exp - requiredExp
        },{
            where: {
                limemonId: limemonId,
                userId: userId
            }
        });

        return res.status(CODE.OK).send(UTIL.success(1));
    } catch (error) {
        console.log(error)
        return res.status(CODE.INTERNAL_SERVER_ERROR).send(UTIL.fail('Level Up Fail'));
    }
}

module.exports = quest;