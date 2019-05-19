const User = require('../models/User');

const { createAccessToken } = require('../helpers/token');
const { verifyPassword } = require('../helpers/entry');

class EntryController {

  static postUserRegister(req, res, next) {
    const {
      username,
      email,
      password,
    } = req.body;

    const newUser = new User({
      username,
      email,
      password,
    });

    newUser.save()
      .then((user) => {
        const accessToken = createAccessToken({
          id: user._id,
          email: user.email,
        });

        res.status(201).json({
          token: accessToken,
          currentUser: {
            userId: user._id,
            email: user.email,
          },
        });
      })
      .catch((error) => {
        next(error);
      });
  };

  static postUserLogin(req, res, next) {
    const {
      email,
      password,
    } = req.body;

    User.findOne({ email })
      .then((user) => {
        if(user && verifyPassword(password, user.password)) {
          const accessToken = createAccessToken({
            id: user._id,
            email: user.email,
          });

          res.status(200).json({
            token: accessToken,
            currentUser: {
              userId: user._id,
              email: user.email,
            },
          });
        } else {
          throw new Error('Wrong email/password');
        };
      })
      .catch((error) => {
        next(error);
      });
  };

};

module.exports = EntryController;
