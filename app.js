const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/mestodb');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = { _id: '62b14af3651c5ec8bc07a2b0' };
  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use((req, res) => {
  res.status(404).send({ message: 'Страницы с таким адресом не существует' });
});

app.listen(PORT);
