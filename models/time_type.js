("use strict");
const moment = require("moment");

const table = "time_types";

module.exports = (sequelize, DataTypes) => {
  const TimeType = sequelize.define(table, {
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

  TimeType.beforeCreate((timeType) => {
    timeType.dataValues.createdAt = moment().unix();
    timeType.dataValues.updatedAt = moment().unix();
  });

  TimeType.beforeUpdate((timeType) => {
    timeType.dataValues.updatedAt = moment().unix();
  });

  TimeType.associate = (models) => {
    TimeType.hasMany(models.Histories, {
      as: "history",
      foreignKey: "fk_time_type_id",
    });
  };

  return TimeType;
};
