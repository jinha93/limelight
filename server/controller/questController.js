const { request } = require('undici');

const CODE = require("../modules/status-code");
const MSG = require("../modules/response-message");
const UTIL = require("../modules/util");

const { sequelize } = require('../models/index');
const { addRole } = require('../bot');

const Quest = require("../models/quest");
const QuestStatus = require("../models/questStatus");
const QuestClaimHistory = require("../models/questClaimHistory");
const Submission = require("../models/submission");
const User = require("../models/user");
const Reward = require("../models/reward");
const Limemon = require("../models/limemon");
const PointHistory = require("../models/pointHistory");

const pointModel = require('../model/pointModel');

const quest = {};

// 퀘스트 목록 조회
quest.findAll = async (req, res) => {

    try {
        const userId = req.session.userId ? req.session.userId : null;

        const quest = await Quest.findAll({
            order: [['updated_at','DESC']],
            include: [{
                model: Submission,
                attributes: ['type'],
                //where: {userId: userId},
                required: true // inner join
            },
            {
                model: Reward,
                attributes: ['type','value'],
                //where: {userId: userId},
                required: true // inner join
            },
            {
                model: QuestStatus,
                attributes: [
                    [sequelize.literal(`
                        CASE
                            WHEN Quest.recurrence ='ONCE'
                                THEN QuestStatus.status
                            WHEN Quest.recurrence ='DAILY' AND TIMESTAMPDIFF(DAY, QuestStatus.updated_at, now()) = 0 
                                THEN 1
                            WHEN Quest.recurrence ='WEEKLY' AND TIMESTAMPDIFF(WEEK, QuestStatus.updated_at, now()) = 0
                                THEN 1
                            WHEN Quest.recurrence ='MONTHLY' AND TIMESTAMPDIFF(WEEK, QuestStatus.updated_at, now()) = 0
                                THEN 1
                            WHEN Quest.recurrence ='TEST' AND TIMESTAMPDIFF(SECOND, QuestStatus.updated_at, now()) < 10
                                THEN 1
                            ELSE 0 
                        END`), 
                        'status'
                    ],
                ],
                where: {userId: userId},
                required: false // left outer join
            }]
        });
        return res.status(CODE.OK).send(UTIL.success(quest));
    } catch (error) {
        console.log(error)
        return res.status(CODE.INTERNAL_SERVER_ERROR).send(UTIL.fail(MSG.SEARCH_FAIL));
    }
}

quest.claim = async (req, res) => {

    // 트랜잭션 설정
    const t = await sequelize.transaction();
    const result = {};

    try {
        // param
        const userId = req.session.userId;
        const { questId } = req.body;

        // 퀘스트 서브미션 정보 조회
        const submissions = await Submission.findAll({
            attributes: [['type', 'submissionType'], ['value', 'submissionValue']],
            where: {
                quest_id: questId,
            },
            raw:true,
            transaction: t,
        })

        for(let submission of submissions){
            const {submissionType, submissionValue} = submission;

            // DISCORD ROLE CHECK
            if(submissionType === 'DISCORD_ROLE'){
                const {tokenType, accessToken} = await User.findOne({
                    attributes: ['tokenType', 'accessToken'],
                    where: {
                        user_id: userId,
                    },
                    transaction: t,
                })

                const guildId = process.env.LIMELIGHT_DISCORD_GUILD_ID;
                const userGuildResponseData = await request(`https://discord.com/api/users/@me/guilds/${guildId}/member`, {
                    headers: {
                        authorization: `${tokenType} ${accessToken}`,
                    },
                });

                const userGuildData = await userGuildResponseData.body.json();

                // 보유 role 중 quest 요구사항 role id가 존재하지 않는 경우
                const result = userGuildData.roles.includes(submissionValue);
                if(!result){
                    await t.rollback();
                    return res.status(CODE.BAD_REQUEST).send(UTIL.fail('User not have Discord role'));
                }
            }else if(submissionType === 'TEXT'){
                const { inputText } = req.body;
                if(inputText !== submissionValue){
                    await t.rollback();
                    return res.status(CODE.BAD_REQUEST).send(UTIL.fail('Input Text Not Matched'));
                }
            }
        }
      

        // 퀘스트 상태 INSERT
        await QuestStatus.upsert({
            userId: userId,
            questId: questId,
            status: true,
        },{
            transaction: t,
        });

        // 퀘스트 Claim 이력 INSERT
        await QuestClaimHistory.create({
            userId: userId,
            questId: questId,
        },{
            transaction: t,
        })


        // 퀘스트 보상 조회
        const rewards = await Reward.findAll({
            attributes: [['type', 'rewardType'], ['value', 'rewardValue'], 'itemId', 'roleId'],
            where: {
                quest_id: questId,
            },
            raw:true,
            transaction: t,
        })

        // 보상 지급
        for(let reward of rewards){
            const {rewardType, rewardValue, itemId, roleId} = reward;

            // 포인트
            if(rewardType === 'POINT'){
                // 퀘스트 서브미션 정보 조회
                const questInfo = await Quest.findOne({
                    attributes: ['name'],
                    where: {
                        quest_id: questId,
                    },
                    raw:true,
                    transaction: t,
                })

                await PointHistory.create({
                    userId: userId,
                    point: rewardValue,
                    cts: `'${questInfo.name}' Quest Claim`,
                },{
                    transaction: t,
                })

                // 현재 보유 포인트 조회
                let userPoint;
                await pointModel.get(userId).then((resultData) => {
                    userPoint = resultData['총 획득 포인트'];
                })
                // 보유 포인트 + 보상포인트 업데이트
                const resultPoint = Number(userPoint)+Number(rewardValue);
                await pointModel.updatePoint(userId, resultPoint);

                // 세션 포인트 변경
                req.session.point = resultPoint;

                // 결과 포인트 변경
                result.point = resultPoint;
                
            }
            // 아이템
            else if(rewardType === 'ITEM'){
                const [userItem, created] = await UserItem.findOrCreate({
                    where: {
                        userId: userId,
                        itemId: itemId,
                    },
                    defaults: {
                        value: 0
                    },
                    transaction: t,
                })

                await UserItem.update({
                    value: parseInt(userItem.value) + 1
                }, {
                    where: {
                        userId: userId,
                        itemId: itemId,
                    },
                    transaction: t,
                })
            }
            // 라임몬
            else if(rewardType === 'LIMEMON'){
                await Limemon.create({
                    level: 1,
                    exp: 0,
                    mainYn: 'Y',
                    imgSrc: 'limemon/baby/babyLimemon.png',
                    userId: userId,
                },{
                    transaction: t,
                })
            }
            // DISCORD ROLE
            else if(rewardType === 'ROLE'){
                addRole(roleId, userId);
            }
        }

        // 커밋
        await t.commit();

        return res.status(CODE.OK).send(UTIL.success(result));
    } catch (error) {
        // 롤백
        await t.rollback();
        console.log(error)
        return res.status(CODE.INTERNAL_SERVER_ERROR).send(UTIL.fail('Claim is Fail'));
    }
}


quest.create = async (req, res) => {
    // 트랜잭션 설정
    const t = await sequelize.transaction();

    try {

        // param
        const userId = req.session.userId;
        const { title, content, repeat, mission, rewards } = req.body;

        const quest = await Quest.create({
            name: title,
            content: content,
            recurrence: repeat,
            conditionOperator: 'AND',
        },{
            transaction: t,
        })

        await Submission.create({
            type: mission.type,
            value: mission.value,
            questId: quest.questId,
        },{
            transaction: t,
        })

        for(let reward of rewards){
            await Reward.create({
                type: reward.type,
                value: reward.value,
                questId: quest.questId,
                itemId: reward.itemId,
                roleId: reward.roleId,
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
        return res.status(CODE.INTERNAL_SERVER_ERROR).send(UTIL.fail(MSG.DATA_ADD_FAIL));
    }
}

module.exports = quest;