const niv = require('node-input-validator');
const { Validator } = require('node-input-validator');
const {
  Trainers,
} = require('../database');
const HttpError = require('http-errors');
const _ = require('lodash');

module.exports = async function validate(inputs, rules, customMessages) {
  const validate = new Validator(inputs, rules, customMessages);

  const matched = await validate.check();
  if (!matched) {
    const errors = validate.errors;
    throw new HttpError(400, {
      stack: 'Input validator',
      message: errors,
    });
  }
}
