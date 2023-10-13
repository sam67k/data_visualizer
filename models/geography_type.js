("use strict");
const moment = require("moment");

const table = "geography_types";

module.exports = (sequelize, DataTypes) => {
  const GeographyType = sequelize.define(table, {
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

  GeographyType.beforeCreate((geographyType) => {
    geographyType.dataValues.createdAt = moment().unix();
    geographyType.dataValues.updatedAt = moment().unix();
  });

  GeographyType.beforeUpdate((geographyType) => {
    geographyType.dataValues.updatedAt = moment().unix();
  });

  GeographyType.associate = (models) => {
    GeographyType.hasMany(models.Histories, {
      as: "history",
      foreignKey: "fk_geography_type_id",
    });
  };

  return GeographyType;
};
