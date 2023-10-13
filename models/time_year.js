("use strict");
const moment = require("moment");

const table = "time_years";

module.exports = (sequelize, DataTypes) => {
  const TimeYear = sequelize.define(table, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  });

  TimeYear.beforeCreate((timeYear) => {
    timeYear.dataValues.createdAt = moment().unix();
    timeYear.dataValues.updatedAt = moment().unix();
  });

  TimeYear.beforeUpdate((timeYear) => {
    timeYear.dataValues.updatedAt = moment().unix();
  });

  TimeYear.associate = (models) => {
    TimeYear.hasMany(models.Histories, {
      as: "history",
      foreignKey: "fk_time_year_id",
    });
  };

  return TimeYear;
};
