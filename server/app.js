const express = require("express");
const cors = require('cors');
const CODE = require("./modules/status-code");
const createError = require('http-errors');
const session = require('express-session');

const app = express();

//env
const dotenv = require('dotenv');
dotenv.config();

//cors
app.use(cors());

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

// Router 주소 지정
app.use('/api/test', testRouter);
app.use('/api/point', pointRouter);
app.use('/api/auth', authRouter);
app.use('/api/raffle', raffleRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(CODE.NOT_FOUND));
  next();
});

app.listen(process.env.PORT, function () {
  console.log("Express app running on port : ", process.env.PORT);
}); 