var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { encodePwd } = require('./utils/tools');

var app = express();
const {prisma} = require('./db');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1/common', require('./routes/api/v1/common'));
app.use('/api/v1/admin/managers', require('./routes/admin/managers'));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// 初始化管理员
async function initDbData() {
  const countAdmin = await prisma.manager.count({
    where: {
      userName: 'admin',
    }
  });
  if (countAdmin === 0) {
    let pwd = await encodePwd('admin');
    await prisma.manager.create({
      data: {
        userName: 'admin',
        password: pwd,
        nickName: '管理员',
        avatar: 'https://img2.baidu.com/it/u=451585053,4284362377&fm=253&fmt=auto&app=120&f=JPEG?w=200&h=200',
      }
    });
  }
  
}
// 初始化管理员
initDbData()
module.exports = app;
