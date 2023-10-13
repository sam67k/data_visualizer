const { UniqueConstraintError, Op } = require("sequelize");
const { Users } = require("../models");
const ApiError = require("../utils/apiError");
const {
  hashPassword,
  checkPasswordValidity,
} = require("../utils/hashPassword");
const { generateAccessToken } = require("../utils/accessToken");

module.exports = {
  username: async (req, res, next) => {
    try {
      const {
        query: { username },
      } = req;

      const usernameExists = await Users.usernameExists(username);

      res.send({
        status: 200,
        success: true,
        message: "Username fetched",
        data: { usernameExists },
      });
    } catch (err) {
      next(err);
    }
  },
  email: async (req, res, next) => {
    try {
      const {
        query: { email },
      } = req;

      const emailExists = await Users.usernameExists(email);

      res.send({
        status: 200,
        success: true,
        message: "Email fetched",
        data: { emailExists },
      });
    } catch (err) {
      next(err);
    }
  },
  signup: async (req, res, next) => {
    try {
      const {
        body: { username, fullname, email, password },
      } = req;

      const hashedPassword = hashPassword(password);

      await Users.create({
        username,
        fullname,
        email,
        password: hashedPassword,
      });

      res.send({
        status: 200,
        success: true,
        message: "User Created",
      });
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        let msg = err.errors[0].message;
        err.message = msg;
      }
      next(err);
    }
  },
  signin: async (req, res, next) => {
    try {
      const {
        query: { usernameOrEmail, password },
      } = req;

      let user = await Users.findOne({
        attributes: { exclude: ["updatedAt", "createdAt"] },
        where: {
          [Op.or]: {
            email: usernameOrEmail.toString(),
            username: usernameOrEmail.toString(),
          },
        },
      });

      if (!user) {
        throw new ApiError(404, "User not found.");
      }

      checkPasswordValidity(password, user.password);

      const accessToken = generateAccessToken(user.id);

      user = { ...user.get({ plain: true }), accessToken, password: undefined };

      res.send({
        status: 200,
        success: true,
        message: "Users",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  },
};
