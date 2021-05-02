var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var cors = require('cors');
var cookieSession = require('cookie-session')
var passport = require('passport')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var coffeeRouter = require('./routes/coffee');
var subscriptionRouter = require('./routes/subscription');
var processRouter = require('./routes/process')
var methodRouter = require('./routes/method')
var quotePriceRouter = require('./routes/quotePrice')
var purchaseRouter = require('./routes/purchase')
var serviceRouter = require('./routes/service')
var sessionRouter = require('./routes/session')

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

require('dotenv-flow').config()

// mongodb connection throug mongoose
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

app.use(cookieSession({
    name: 'session',
    keys: [process.env.cookiekey1, process.env.cookiekey2],
    maxAge: 7200000 // two hours
}));

app.use(passport.initialize());
app.use(passport.session());

// use the routes
app.use('/api/v1/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/coffee', coffeeRouter);
app.use('/api/v1/subscription', subscriptionRouter);
app.use('/api/v1/process', processRouter);
app.use('/api/v1/method', methodRouter);
app.use('/api/v1/quotePrice', quotePriceRouter);
app.use('/api/v1/purchase', purchaseRouter);
app.use('/api/v1/service', serviceRouter);
app.use('/api/v1/session', sessionRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('error');
});

module.exports = app;