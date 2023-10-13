("use strict");
const moment = require("moment");
const { getOffset } = require("../utils/pagination");

const table = "histories";

module.exports = (sequelize, DataTypes) => {
  const Models = sequelize.models;
  const History = sequelize.define(table, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
    fk_geography_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fk_geography_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fk_group_name_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fk_group_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fk_indicator_name_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fk_indicator_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fk_time_period_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fk_time_year_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fk_time_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estimate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    coninf95: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sample_size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    suppression_flag: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

  History.beforeCreate((history) => {
    history.dataValues.createdAt = moment().unix();
    history.dataValues.updatedAt = moment().unix();
  });

  History.beforeUpdate((history) => {
    history.dataValues.updatedAt = moment().unix();
  });

  History.associate = (models) => {
    History.belongsTo(models.GeographyTypes, {
      as: "geographyTypes",
      foreignKey: "fk_geography_type_id",
    });

    History.belongsTo(models.Geographies, {
      as: "geographies",
      foreignKey: "fk_geography_id",
    });

    History.belongsTo(models.GroupNames, {
      as: "groupNames",
      foreignKey: "fk_group_name_id",
    });

    History.belongsTo(models.GroupCategories, {
      as: "groupCategories",
      foreignKey: "fk_group_category_id",
    });

    History.belongsTo(models.IndicatorNames, {
      as: "indicatorNames",
      foreignKey: "fk_indicator_name_id",
    });

    History.belongsTo(models.IndicatorCategories, {
      as: "indicatorCategories",
      foreignKey: "fk_indicator_category_id",
    });

    History.belongsTo(models.TimePeriods, {
      as: "timePeriods",
      foreignKey: "fk_time_period_id",
    });

    History.belongsTo(models.TimeYears, {
      as: "timeYears",
      foreignKey: "fk_time_year_id",
    });

    History.belongsTo(models.TimeTypes, {
      as: "timeTypes",
      foreignKey: "fk_time_type_id",
    });
  };

  History.structurizeHistories = (histories) => {
    const structuredHistories = histories.map((history) => {
      return {
        id: history.id,
        geographyTypes: history.geographyTypes.name,
        geographies: history.geographies.name,
        groupNames: history.groupNames.name,
        groupCategories: history.groupCategories.name,
        indicatorNames: history.indicatorNames.name,
        indicatorCategories: history.indicatorCategories.name,
        timePeriods: history.timePeriods.name,
        timeYears: history.timeYears.name,
        timeTypes: history.timeTypes.name,
        estimate: history.estimate,
        coninf95: history.coninf95,
        sampleSize: history.sample_size,
        suppressionFlag: history.suppression_flag,
      };
    });

    return structuredHistories;
  };

  History.getPaginatedHistory = async (
    geographyType,
    geography,
    groupName,
    groupCategory,
    indicatorName,
    indicatorCategory,
    timePeriod,
    timeYear,
    timeType,
    estimate,
    coninf95,
    sampleSize,
    limit,
    page
  ) => {
    let whereClause = {};

    geographyType &&
      (whereClause = {
        ...whereClause,
        "$geographyTypes.name$": geographyType,
      });
    geography &&
      (whereClause = { ...whereClause, "$geographies.name$": geography });
    groupName &&
      (whereClause = { ...whereClause, "$groupNames.name$": groupName });
    groupCategory &&
      (whereClause = {
        ...whereClause,
        "$groupCategories.name$": groupCategory,
      });
    indicatorName &&
      (whereClause = {
        ...whereClause,
        "$indicatorNames.name$": indicatorName,
      });
    indicatorCategory &&
      (whereClause = {
        ...whereClause,
        "$indicatorCategories.name$": indicatorCategory,
      });
    timePeriod &&
      (whereClause = { ...whereClause, "$timePeriods.name$": timePeriod });
    timeYear &&
      (whereClause = { ...whereClause, "$timeYears.name$": timeYear });
    timeType &&
      (whereClause = { ...whereClause, "$timeTypes.name$": timeType });
    estimate && (whereClause = { ...whereClause, estimate });
    coninf95 &&
      (whereClause = {
        ...whereClause,
        coninf95,
      });
    sampleSize &&
      (whereClause = {
        ...whereClause,
        sample_size: sampleSize,
      });

    const { count, rows } = await History.findAndCountAll({
      include: [
        {
          model: Models.geography_types,
          as: "geographyTypes",
          required: false,
        },
        {
          model: Models.geographies,
          as: "geographies",
          required: false,
        },
        {
          model: Models.group_names,
          as: "groupNames",
          required: false,
        },
        {
          model: Models.group_categories,
          as: "groupCategories",
          required: false,
        },
        {
          model: Models.indicator_names,
          as: "indicatorNames",
          required: false,
        },
        {
          model: Models.indicator_categories,
          as: "indicatorCategories",
          required: false,
        },
        {
          model: Models.time_periods,
          as: "timePeriods",
          required: false,
        },
        {
          model: Models.time_years,
          as: "timeYears",
          required: false,
        },
        {
          model: Models.time_types,
          as: "timeTypes",
          required: false,
        },
      ],
      where: whereClause,
      offset: getOffset(page, limit),
      limit: limit,
    });

    return { count, rows };
  };

  return History;
};
