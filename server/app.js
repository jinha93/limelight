const express = require("express");
const cors = require('cors');
const CODE = require("./modules/status-code");
const createError = require('http-errors');
const session = require('express-session');
// const bodyParser = require('body-parser');

// index.js에 있는 db.sequelize 객체 모듈을 구조분해로 불러온다.
const { sequelize } = require('./models');
sequelize.sync({ force: false })
   .then(() => {
      console.log('데이터베이스 연결됨.');
   }).catch((err) => {
      console.error(err);
   });

const app = express();

//env
const dotenv = require('dotenv');
dotenv.config();

//cors
app.use(cors());
app.use(express.json())
//body-parser
// app.use(bodyParser.json);

// express-session 라이브러리를 이용해 쿠키 설정
app.use(
  session({
    key: process.env.SESSION_KEY,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 30 }
  })
);

// Router 설정
const testRouter = require("./router/testRouter");
const pointRouter = require("./router/pointRouter");
const authRouter = require("./router/authRouter");
const raffleRouter = require("./router/raffleRouter");
const myPageRouter = require("./router/myPageRouter");
const imgRouter = require("./router/imgRouter");
const questRouter = require("./router/questRouter");
const limemonRouter = require("./router/limemonRouter");
const discordRouter = require("./router/discordRouter");

// Router 주소 지정
app.use('/api/test', testRouter);
app.use('/api/point', pointRouter);
app.use('/api/auth', authRouter);
app.use('/api/raffle', raffleRouter);
app.use('/api/myPage', myPageRouter);
app.use('/api/img', imgRouter);
app.use('/api/quest', questRouter);
app.use('/api/limemon', limemonRouter);
app.use('/api/discord', discordRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(CODE.NOT_FOUND));
  next();
});

app.listen(process.env.PORT, function () {
  console.log("Express app running on port : ", process.env.PORT);
}); 