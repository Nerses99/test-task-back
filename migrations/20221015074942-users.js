module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable("users", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      first_name: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: Sequelize.DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable("users");
  },
};