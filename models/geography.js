("use strict");
const moment = require("moment");

const table = "geographies";

module.exports = (sequelize, DataTypes) => {
  const Geography = sequelize.define(table, {
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

  Geography.beforeCreate((geography) => {
    geography.dataValues.createdAt = moment().unix();
    geography.dataValues.updatedAt = moment().unix();
  });

  Geography.beforeUpdate((geography) => {
    geography.dataValues.updatedAt = moment().unix();
  });

  Geography.associate = (models) => {
    Geography.hasMany(models.Histories, {
      as: "history",
      foreignKey: "fk_geography_id",
    });
  };

  return Geography;
};
