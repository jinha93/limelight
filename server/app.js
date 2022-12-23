const express = require("express");
const cors = require('cors');
const CODE = require("./modules/status-code");
const createError = require('http-errors');
const app = express();
const session = require('express-session');
const PORT = 3001;

app.use(cors());

// express-session 라이브러리를 이용해 쿠키 설정
app.use(
  session({
    secret: '@limelight',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 30 }
  })
);

// Router 설정
const testRouter = require("./router/test.router");
const pointRouter = require("./router/point.router");
const authRouter = require("./router/auth.router");

// Router 주소 지정
app.use('/api/test', testRouter);
app.use('/api/point', pointRouter);
app.use('/api/auth', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(CODE.NOT_FOUND));
  next();
});

app.listen(PORT, function () {
  console.log("Express app running on port : ", PORT);
}); 