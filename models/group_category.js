("use strict");
const moment = require("moment");

const table = "group_categories";

module.exports = (sequelize, DataTypes) => {
  const GroupCategory = sequelize.define(table, {
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

  GroupCategory.beforeCreate((groupCategory) => {
    groupCategory.dataValues.createdAt = moment().unix();
    groupCategory.dataValues.updatedAt = moment().unix();
  });

  GroupCategory.beforeUpdate((groupCategory) => {
    groupCategory.dataValues.updatedAt = moment().unix();
  });

  GroupCategory.associate = (models) => {
    GroupCategory.hasMany(models.Histories, {
      as: "history",
      foreignKey: "fk_group_category_id",
    });
  };

  return GroupCategory;
};
