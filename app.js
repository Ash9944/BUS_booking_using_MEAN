var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')

var bookingRouter = require('./routes/booking');
var busRouter = require('./routes/bus');
var busserviceRouter = require('./routes/busservice');
var customerRouter = require('./routes/customer');
var routeRouter = require('./routes/route');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(bookingRouter);
app.use(busRouter);
app.use(busserviceRouter);
app.use(customerRouter);
app.use(routeRouter)
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

mongoose.connect("mongodb://localhost:27017/BUS_APP",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );


mongoose.connection.once("open",()=>{
  console.log("Database Connected !")
})


module.exports = app;
