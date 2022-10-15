const {Sequelize} = require('sequelize');
const Promise = require('bluebird');
const { Model } = require('sequelize');

Model.createOrUpdate = async function (
  options = {
    defaults: {},
    where: {},
  },
) {
  const rows = await this.findOrCreate(options);

  if (rows && rows.length) {
    const { defaults, ...opt } = options;

    opt.returning = true;

    const res = await this.update(defaults, opt);

    return res[1];
  }
  return rows;
};



const {Op} = Sequelize;
Sequelize.Promise = Promise;

const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col,
};

const {
  DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_LOG,
} = process.env;

const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true,
  },
  logging: !!+DB_LOG,
  operatorsAliases,
});

module.exports = db;