const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';

// config/config.json 파일에 있는 설정값들을 불러온다.
// config객체의 env변수(development)키 의 객체값들을 불러온다.
// 즉, 데이터베이스 설정을 불러온다고 말할 수 있다.
const config = require("../config/config.json")[env]

const db = {};

// new Sequelize를 통해 MySQL 연결 객체를 생성한다.
const sequelize = new Sequelize(config.database, config.username, config.password, config)

// 연결객체를 나중에 재사용하기 위해 db.sequelize에 넣어둔다.
db.sequelize = sequelize; 

// 클래스를 불러온다.
const User = require('./user')
const Raffle = require('./raffle')
const RaffleApcList = require('./raffleApcList')
const Quest = require('./quest')
const QuestStatus = require('./questStatus')
const Submission = require('./submission')
const Reward = require('./reward')
const Limemon = require('./limemon')
const Items = require('./items')
const OwnerdItems = require('./ownerdItems')
const QuestClaimHistory = require('./questClaimHistory')
const PointHistory = require('./pointHistory')

// 모델 클래스를 넣음.
db.User = User;
db.Raffle = Raffle;
db.RaffleApcList = RaffleApcList;
db.Quest = Quest;
db.QuestStatus = QuestStatus;
db.Submission = Submission;
db.Reward = Reward;
db.Limemon = Limemon;
db.Items = Items;
db.OwnerdItems = OwnerdItems;
db.QuestClaimHistory = QuestClaimHistory;
db.PointHistory = PointHistory;

// 모델과 테이블 종합적인 연결이 설정된다.
User.init(sequelize); 
Raffle.init(sequelize); 
RaffleApcList.init(sequelize); 
Quest.init(sequelize); 
QuestStatus.init(sequelize);
Submission.init(sequelize);
Reward.init(sequelize);
Limemon.init(sequelize);
Items.init(sequelize);
OwnerdItems.init(sequelize);
QuestClaimHistory.init(sequelize);
PointHistory.init(sequelize);


// db객체 안에 있는 모델들 간의 관계가 설정된다.
User.associate(db);
Raffle.associate(db);
RaffleApcList.associate(db);
Quest.associate(db);
QuestStatus.associate(db);
Submission.associate(db);
Reward.associate(db);
Limemon.associate(db);
Items.associate(db);
OwnerdItems.associate(db);
QuestClaimHistory.associate(db);
PointHistory.associate(db);

// 모듈로 꺼낸다.
module.exports = db;