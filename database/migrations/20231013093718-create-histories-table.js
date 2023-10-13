"use strict";

const table = "histories";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(table, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true,
      },
      fk_geography_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fk_geography_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fk_group_name_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fk_group_category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fk_indicator_name_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fk_indicator_category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fk_time_period_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fk_time_year_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fk_time_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      estimate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      coninf95: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sample_size: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      suppression_flag: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable(table);
  },
};
