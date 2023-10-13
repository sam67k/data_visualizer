("use strict");
const moment = require("moment");

const table = "time_periods";

module.exports = (sequelize, DataTypes) => {
  const TimePeriod = sequelize.define(table, {
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

  TimePeriod.beforeCreate((timePeriod) => {
    timePeriod.dataValues.createdAt = moment().unix();
    timePeriod.dataValues.updatedAt = moment().unix();
  });

  TimePeriod.beforeUpdate((timePeriod) => {
    timePeriod.dataValues.updatedAt = moment().unix();
  });

  TimePeriod.associate = (models) => {
    TimePeriod.hasMany(models.Histories, {
      as: "history",
      foreignKey: "fk_time_period_id",
    });
  };

  return TimePeriod;
};
