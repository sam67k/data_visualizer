("use strict");
const moment = require("moment");

const table = "indicator_categories";

module.exports = (sequelize, DataTypes) => {
  const IndicatorCategory = sequelize.define(table, {
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

  IndicatorCategory.beforeCreate((indicatorCategory) => {
    indicatorCategory.dataValues.createdAt = moment().unix();
    indicatorCategory.dataValues.updatedAt = moment().unix();
  });

  IndicatorCategory.beforeUpdate((indicatorCategory) => {
    indicatorCategory.dataValues.updatedAt = moment().unix();
  });

  IndicatorCategory.associate = (models) => {
    IndicatorCategory.hasMany(models.Histories, {
      as: "history",
      foreignKey: "fk_indicator_category_id",
    });
  };

  return IndicatorCategory;
};
