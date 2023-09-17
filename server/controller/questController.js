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

    try {
        // param
        const userId = req.session.userId;
        const { questId } = req.body;

        // 퀘스트 서브미션 정보 조회
        const {submissionType, submissionValue} = await Submission.findOne({
            attributes: [['type', 'submissionType'], ['value', 'submissionValue']],
            where: {
                quest_id: questId,
            },
            raw:true,
            transaction: t,
        })

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
                return res.status(CODE.BAD_REQUEST).send(UTIL.fail('User not have Discord role'));
            }
        }else if(submissionType === 'TEXT'){
            const { inputText } = req.body;
            if(inputText !== submissionValue){
                return res.status(CODE.BAD_REQUEST).send(UTIL.fail('Input Text Not Matched'));
            }
        }

        // 퀘스트 상태 INSERT
        await QuestStatus.create({
            userId: userId,
            questId: questId,
            status: true,
            transaction: t,
        });


        // 퀘스트 보상 조회
        const rewards = await Reward.findAll({
            attributes: [['type', 'rewardType'], ['value', 'rewardValue'], 'itemId'],
            where: {
                quest_id: questId,
            },
            raw:true,
            transaction: t,
        })

        // 보상 지급
        for(let reward of rewards){
            const {rewardType, rewardValue, itemId} = reward;

            // 경험치
            if(rewardType === 'EXP'){
                const limemon = await Limemon.findOne({
                    where: {
                        userId: userId,
                    },
                    transaction: t,
                });

                if(limemon === null){
                    return res.status(CODE.BAD_REQUEST).send(UTIL.fail('User not have Limemon'));
                }else{
                    await Limemon.update({
                        exp: parseInt(limemon.exp) + parseInt(rewardValue)
                    },{
                        where: {
                            userId: userId,
                        },
                        transaction: t,
                    })
                }
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
        }

        // 커밋
        await t.commit();

        return res.status(CODE.OK).send(UTIL.success(1));
    } catch (error) {
        // 롤백
        await t.rollback();
        console.log(error)
        return res.status(CODE.INTERNAL_SERVER_ERROR).send(UTIL.fail(MSG.QUEST_CLAIM_FAIL));
    }
}

module.exports = quest;