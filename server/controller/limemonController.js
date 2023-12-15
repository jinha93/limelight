const CODE = require("../modules/status-code");
const MSG = require("../modules/response-message");
const UTIL = require("../modules/util");

const { sequelize } = require('../models/index');
const Limemon = require("../models/limemon");
const LimemonLevelInfo = require("../models/limemonLevelInfo");
const LimemonEquipItem = require("../models/limemonEquipItem");
const Items = require("../models/items");

const limemon = {};

// 라임몬 조회
limemon.findAll = async (req, res) => {
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

limemon.findAllEquipItems = async (req, res) => {
    try {
        const { limemonId } = req.query;

        const equipItems = await LimemonEquipItem.findAll({
            include:[
                {
                    model: Items,
                    required: true
                },
            ],
            where: {
                limemonId: limemonId,
            },
        });
        return res.status(CODE.OK).send(UTIL.success(equipItems));
    } catch (error) {
        console.log(error)
        return res.status(CODE.INTERNAL_SERVER_ERROR).send(UTIL.fail(MSG.SEARCH_FAIL));
    }
}

// 라임몬 레벨업
limemon.levelUp = async (req, res) => {
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

module.exports = limemon;