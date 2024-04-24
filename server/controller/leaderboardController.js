const CODE = require("../modules/status-code");
const MSG = require("../modules/response-message");
const UTIL = require("../modules/util");
const { Op } = require("sequelize");


const leaderboard = {};

const User = require("../models/user");
const Limemon = require("../models/limemon");
const OwnerdItems = require("../models/ownerdItems");
const Items = require("../models/items");

leaderboard.findAll = async (req, res) => {
    try {
        const leaderboard = await Limemon.findAll({
            attributes:[
                'power',
            ],
            include:[
                {
                    model: User,
                    required: true,
                    attributes: [['discord_handle', 'username']],
                },
                {
                    model: OwnerdItems,
                    required: false,
                    where: { equip_yn: 'Y' },
                    include: [
                        {
                            model: Items,
                            required: true,
                        }
                    ],
                }
            ],
            order: [['power','DESC']],
        });
        return res.status(CODE.OK).send(UTIL.success(leaderboard));
    } catch (error) {
        console.log(error)
        return res.status(CODE.INTERNAL_SERVER_ERROR).send(UTIL.fail(MSG.SEARCH_FAIL));
    }
}

leaderboard.findRanker = async (req, res) => {
    try {
        const rankerLimemonId = await Limemon.findAll({
            attributes:[
                'limemon_id',
            ],
            order: [['power','DESC']],
            limit: 3,
            raw: true,
        });

        const limemonIdArr = [];
        rankerLimemonId.forEach(ranker => {
            limemonIdArr.push(ranker.limemon_id);
        });

        const ranker = await Limemon.findAll({
            include:[
                {
                    model: User,
                    required: true,
                    attributes: [['discord_handle', 'username']],
                },
                {
                    model: OwnerdItems,
                    required: false,
                    where: { equip_yn: 'Y' },
                    include: [
                        {
                            model: Items,
                            required: true,
                        }
                    ],
                }
            ],
            where: {
                limemon_id: {[Op.in]: limemonIdArr}
            }
        })
        return res.status(CODE.OK).send(UTIL.success(ranker));
    } catch (error) {
        console.log(error)
        return res.status(CODE.INTERNAL_SERVER_ERROR).send(UTIL.fail(MSG.SEARCH_FAIL));
    }
}

module.exports = leaderboard;