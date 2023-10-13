("use strict");
const moment = require("moment");

const table = "group_names";

module.exports = (sequelize, DataTypes) => {
  const GroupName = sequelize.define(table, {
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

  GroupName.beforeCreate((groupName) => {
    groupName.dataValues.createdAt = moment().unix();
    groupName.dataValues.updatedAt = moment().unix();
  });

  GroupName.beforeUpdate((groupName) => {
    groupName.dataValues.updatedAt = moment().unix();
  });

  GroupName.associate = (models) => {
    GroupName.hasMany(models.Histories, {
      as: "history",
      foreignKey: "fk_group_name_id",
    });
  };

  return GroupName;
};
