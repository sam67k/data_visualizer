("use strict");
const moment = require("moment");

const table = "indicator_names";

module.exports = (sequelize, DataTypes) => {
  const IndicatorName = sequelize.define(table, {
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

  IndicatorName.beforeCreate((indicatorName) => {
    indicatorName.dataValues.createdAt = moment().unix();
    indicatorName.dataValues.updatedAt = moment().unix();
  });

  IndicatorName.beforeUpdate((indicatorName) => {
    indicatorName.dataValues.updatedAt = moment().unix();
  });

  IndicatorName.associate = (models) => {
    IndicatorName.hasMany(models.Histories, {
      as: "history",
      foreignKey: "fk_indicator_name_id",
    });
  };

  return IndicatorName;
};
