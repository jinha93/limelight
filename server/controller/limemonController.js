const CODE = require("../modules/status-code");
const MSG = require("../modules/response-message");
const UTIL = require("../modules/util");

const { sequelize } = require('../models/index');
const { Op } = require("sequelize");

const Limemon = require("../models/limemon");
const LimemonLevelInfo = require("../models/limemonLevelInfo");
const LimemonItem = require("../models/limemonItem");
const Items = require("../models/items");

const QuestStatus = require("../models/questStatus");
const QuestClaimHistory = require("../models/questClaimHistory");

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

// 장착 장비 조회
limemon.findAllEquipItems = async (req, res) => {
    try {
        const { limemonId } = req.query;

        const equipItems = await LimemonItem.findAll({
            include:[
                {
                    model: Items,
                    required: true
                },
            ],
            where: {
                limemonId: limemonId,
                equipYn: 'Y',
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

    // 트랜잭션 설정
    const t = await sequelize.transaction();

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
            transaction: t,
        });

        if(level+1 > 8){
            await t.rollback();
            return res.status(CODE.BAD_REQUEST).send(UTIL.fail('Leveling up is not possible in the current version.'));
        }

        const {requiredExp} = await LimemonLevelInfo.findOne({
            attributes: [
                ['required_exp', 'requiredExp']
            ],
            where: {
                level: level
            },
            raw: true,
            transaction: t,
        });

        await Limemon.update({
            level: sequelize.literal("level + 1"),
            exp: exp - requiredExp
        },{
            where: {
                limemonId: limemonId,
                userId: userId
            },
            transaction: t,
        });

        // 레벨 1~8 구간에서 랜덤 아이템 지급
        if(level+1 < 9){

            // 보유 아이템 조회
            const ownedItems = await LimemonItem.findAll({
                attributes: [
                    ['item_id', 'itemId']
                ],
                include:[
                    {
                        model: Items,
                        required: true,
                        raw: true,
                        
                    },
                ],
                where: {
                    limemonId: limemonId,
                },
                raw: true,
                transaction: t,
            });

            let ownedItemIdArr = [];
            for(let item of ownedItems){
                ownedItemIdArr.push(item.itemId);
            }

            // 배경 아이템 보유 여부
            let bgItemYn = 'N';
            for(let item of ownedItems){
                if(item['Item.part'] === 'BACKGROUND'){
                    bgItemYn = 'Y';
                }
            }

            const dynamicConditions = {};
            dynamicConditions.itemId = {[Op.notIn]: ownedItemIdArr};
            if(bgItemYn === 'Y'){
                dynamicConditions.part = {[Op.ne]: 'BACKGROUND'}
            }

            // 보유 아이템을 제외한 아이템목록 조회
            const items = await Items.findAll({
                where: dynamicConditions,
                raw: true,
                transaction: t,
            });

            // 아이템 목록 중 랜덤한 아이템 1개 보유아이템으로 등록
            const rand = Math.floor(Math.random() * items.length);
            await LimemonItem.create({
                limemonId: limemonId,
                itemId: items[rand].itemId,
                equipYn: 'Y',
            },{
                transaction: t,
            })
        }
        
        // 커밋
        await t.commit();

        return res.status(CODE.OK).send(UTIL.success(1));
    } catch (error) {
        // 롤백
        await t.rollback();
        console.log(error)
        return res.status(CODE.INTERNAL_SERVER_ERROR).send(UTIL.fail('Level Up Fail'));
    }
}

limemon.reset = async (req, res) => {

    // 트랜잭션 설정
    const t = await sequelize.transaction();

    try {
        const {limemonId} = req.params;
        const userId = req.session.userId ? req.session.userId : null;
        
        await Limemon.update({
            level: 1,
            exp: 0,
        },{
            where: {
                limemonId: limemonId,
                userId: userId
            },
            transaction: t,
        });

        await LimemonItem.destroy({
            where: {
                limemonId: limemonId,
            },
            transaction: t,
        })

        await QuestStatus.destroy({
            where: {
                userId: userId,
            },
            transaction: t,
        })

        await QuestClaimHistory.destroy({
            where: {
                userId: userId,
            },
            transaction: t,
        })
        
        // 커밋
        await t.commit();

        return res.status(CODE.OK).send(UTIL.success(1));
    } catch (error) {
        // 롤백
        await t.rollback();
        console.log(error)
        return res.status(CODE.INTERNAL_SERVER_ERROR).send(UTIL.fail('Level Up Fail'));
    }
}

module.exports = limemon;