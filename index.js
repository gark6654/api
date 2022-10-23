const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth.routes');
const usersRouter = require('./routes/users.route');
const meRouter = require('./routes/me.route');
const blogsRouter = require('./routes/blogs.route');

const port = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/me', meRouter);
app.use('/api/blogs', blogsRouter);

app.listen(port, async () => {
  try {
    console.log('Try to start service...');
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
    console.log(`App listen to ${port} port`);
  } catch (e) {
    console.log(e);
  }
})

module.exports = app;