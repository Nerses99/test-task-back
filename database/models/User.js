const { Model, DataTypes } = require('sequelize');
const  db = require('../../configurations/db');
const bcrypt = require("bcrypt-nodejs");

class User extends Model {}

User.init(
  {
      id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
      },
      first_name: {
          type: DataTypes.STRING(255),
          allowNull: false,
      },
      last_name: {
          type: DataTypes.STRING(255),
          allowNull: false,
      },
      email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          validate: {
              isEmail:true
          },
          unique: {
              args: true,
              msg: 'Email address already in use!'
          }
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false,
          get: () => null,
      },
      createdAt: {
          type: DataTypes.DATE,
          field: 'created_at'
      },

      updatedAt: {
          type: DataTypes.DATE,
          field: 'updated_at'
      }
  },
  {
      sequelize: db,
      tableName: 'users',
      timestamps: true,
  }
);

User.prototype.toJSON =  function () {
    let values = Object.assign({}, this.get());
    delete values.password;
    return values;
}
User.prototype.validPassword = async function(password, hash) {
    return bcrypt.compareSync(password, hash);
}
User.beforeCreate(async (user, options) => {
    user.password = bcrypt.hashSync(user.dataValues.password, bcrypt.genSaltSync(8));
});

module.exports = User;
