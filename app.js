var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var storesRouter = require('./routes/stores');
var colorRouter = require('./routes/color');
var adminRouter = require('./routes/admin');
var categoriesRouter = require('./routes/categories');
var frametypesRouter = require('./routes/frametypes');
var materialRouter = require('./routes/material');
var shapesRouter = require('./routes/shapes');
var productRouter = require('./routes/product');
var priceRouter = require('./routes/price');
var finalRouter = require('./routes/finalproduct');
var mainpageRouter = require('./routes/mainpage');
var userdetailsRouter = require('./routes/userdetails');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/stores',storesRouter);
app.use('/color',colorRouter);
app.use('/admin',adminRouter);
app.use('/categories',categoriesRouter);
app.use('/frametypes',frametypesRouter);
app.use('/material',materialRouter);
app.use('/shapes',shapesRouter);
app.use('/product',productRouter);
app.use('/price',priceRouter);
app.use('/finalproduct',finalRouter);
app.use('/mainpage',mainpageRouter);
app.use('/userdetails',userdetailsRouter);



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

module.exports = app;
