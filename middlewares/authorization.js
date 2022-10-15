const HttpError = require("http-errors");
const {User} = require('../database');
const JWT = require("jsonwebtoken");
const _ = require("lodash");
const {JWT_SECRET} = process.env;

async function authorization(req, res, next) {
  try {
    const paths = [
      "/sign-up",
      "/sign-in",
    ];


    if (paths.includes(req.path)) {
      return next();
    }
    const token = req.headers['x-authorization'];
    console.log(token)
    if (token) {
      const decoded = JWT.verify(token, JWT_SECRET);
      console.log(decoded)
      const id = decoded.id;

      if (!id) {
        throw new HttpError(401, 'Unauthorized');
      }

      const userData = await User.findByPk(id);
      if (!userData) {
        throw new HttpError(401, 'Unauthorized');
      }

      if (userData) {
        req.user = userData;
        return next();
      }

      throw new HttpError(401, 'Unauthorized');

    }

    throw new HttpError(401, 'Unauthorized');

  } catch (e) {
    return next(e)
  }
}

module.exports = authorization;
