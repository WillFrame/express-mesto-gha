const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then(users => res.send( {data: users} ))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка'}));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then(user => res.send( {data: user} ))
    .catch(err => {
      if (err.name === 'CastError') {
        res.status(404).send({ message: 'Пользователь по указанному _id не найден.'});
      } else {
        res.status(500).send({ message: 'Произошла ошибка'});
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send( {data: user} ))
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(404).send({ message: 'Переданы некорректные данные при создании пользователя.'});
      } else {
        res.status(500).send({ message: 'Произошла ошибка'});
      }
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then(user => res.send( {data: user} ))
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(404).send({ message: 'Переданы некорректные данные при создании пользователя.'});
      } else {
        if (err.name === 'CastError') {
          res.status(404).send({ message: 'Пользователь по указанному _id не найден.'});
        } else {
          res.status(500).send({ message: 'Произошла ошибка'});
        }
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then(user => res.send( {data: user} ))
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(404).send({ message: 'Переданы некорректные данные при создании пользователя.'});
      } else {
        if (err.name === 'CastError') {
          res.status(404).send({ message: 'Пользователь по указанному _id не найден.'});
        } else {
          res.status(500).send({ message: 'Произошла ошибка'});
        }
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar
}