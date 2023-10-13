"use strict";

const moment = require("moment");

const seedData = require("../seeds/seed-data");

const tableGeographyTypes = "geography_types";
const tableGeographies = "geographies";
const tableGroupNames = "group_names";
const tableGroupCategories = "group_categories";
const tableIndicatorNames = "indicator_names";
const tableIndicatorCategories = "indicator_categories";
const tableTimePeriods = "time_periods";
const tableTimeYears = "time_years";
const tableTimeTypes = "time_types";
const tableHistories = "histories";

const createdAt = moment().unix();
const updatedAt = moment().unix();

module.exports = {
  async up(queryInterface) {
    for (const data of seedData) {
      // Fetch Geography Type
      let [geographyTypesFromDB] = await queryInterface.sequelize.query(
        `SELECT id FROM ${tableGeographyTypes} where name='${data.geography_type}'`,
        {
          type: queryInterface.sequelize.QueryTypes.SELECT,
          logging: console.log,
        }
      );
      if (!geographyTypesFromDB) {
        // Create Geography Type if not exists
        const [createdGeographyType] = await queryInterface.sequelize.query(
          `INSERT INTO ${tableGeographyTypes} (name, "createdAt", "updatedAt") VALUES ('${data.geography_type}', '${createdAt}', '${updatedAt}') RETURNING id`,
          {
            type: queryInterface.sequelize.QueryTypes.INSERT,
            logging: console.log,
          }
        );
        geographyTypesFromDB = createdGeographyType[0];
      }

      // Fetch Geography
      let [geographyFromDB] = await queryInterface.sequelize.query(
        `SELECT id FROM ${tableGeographies} where name='${data.geography}'`,
        {
          type: queryInterface.sequelize.QueryTypes.SELECT,
          logging: console.log,
        }
      );

      if (!geographyFromDB) {
        // Create Geography if not exists
        const [createdGeography] = await queryInterface.sequelize.query(
          `INSERT INTO ${tableGeographies} (name, "createdAt", "updatedAt") VALUES ('${data.geography}', '${createdAt}', '${updatedAt}') RETURNING id`,
          {
            type: queryInterface.sequelize.QueryTypes.INSERT,
            logging: console.log,
          }
        );
        geographyFromDB = createdGeography[0];
      }

      // Fetch Group Name
      let [groupNameFromDB] = await queryInterface.sequelize.query(
        `SELECT id FROM ${tableGroupNames} where name='${data.group_name}'`,
        {
          type: queryInterface.sequelize.QueryTypes.SELECT,
          logging: console.log,
        }
      );

      if (!groupNameFromDB) {
        // Create Group Name if not exists
        const [createdGroupName] = await queryInterface.sequelize.query(
          `INSERT INTO ${tableGroupNames} (name, "createdAt", "updatedAt") VALUES ('${data.group_name}', '${createdAt}', '${updatedAt}') RETURNING id`,
          {
            type: queryInterface.sequelize.QueryTypes.INSERT,
            logging: console.log,
          }
        );
        groupNameFromDB = createdGroupName[0];
      }

      // Fetch Group Category
      let [groupCategoryFromDB] = await queryInterface.sequelize.query(
        `SELECT id FROM ${tableGroupCategories} where name='${data.group_category}'`,
        {
          type: queryInterface.sequelize.QueryTypes.SELECT,
          logging: console.log,
        }
      );

      if (!groupCategoryFromDB) {
        // Create Group Category if not exists
        const [createdGroupCategory] = await queryInterface.sequelize.query(
          `INSERT INTO ${tableGroupCategories} (name, "createdAt", "updatedAt") VALUES ('${data.group_category}', '${createdAt}', '${updatedAt}') RETURNING id`,
          {
            type: queryInterface.sequelize.QueryTypes.INSERT,
            logging: console.log,
          }
        );
        groupCategoryFromDB = createdGroupCategory[0];
      }

      // Fetch Indicator Name
      let [indicatorNameFromDB] = await queryInterface.sequelize.query(
        `SELECT id FROM ${tableIndicatorNames} where name='${data.indicator_name}'`,
        {
          type: queryInterface.sequelize.QueryTypes.SELECT,
          logging: console.log,
        }
      );

      if (!indicatorNameFromDB) {
        // Create Indicator Name if not exists
        const [createdIndicatorName] = await queryInterface.sequelize.query(
          `INSERT INTO ${tableIndicatorNames} (name, "createdAt", "updatedAt") VALUES ('${data.indicator_name}', '${createdAt}', '${updatedAt}') RETURNING id`,
          {
            type: queryInterface.sequelize.QueryTypes.INSERT,
            logging: console.log,
          }
        );
        indicatorNameFromDB = createdIndicatorName[0];
      }

      // Fetch Indicator Category
      let [indicatorCategoryFromDB] = await queryInterface.sequelize.query(
        `SELECT id FROM ${tableIndicatorCategories} where name='${data.indicator_category}'`,
        {
          type: queryInterface.sequelize.QueryTypes.SELECT,
          logging: console.log,
        }
      );

      if (!indicatorCategoryFromDB) {
        // Create Indicator Category if not exists
        const [createdIndicatorCategory] = await queryInterface.sequelize.query(
          `INSERT INTO ${tableIndicatorCategories} (name, "createdAt", "updatedAt") VALUES ('${data.indicator_category}', '${createdAt}', '${updatedAt}') RETURNING id`,
          {
            type: queryInterface.sequelize.QueryTypes.INSERT,
            logging: console.log,
          }
        );
        indicatorCategoryFromDB = createdIndicatorCategory[0];
      }

      // Fetch Time Period
      let [timePeriodFromDB] = await queryInterface.sequelize.query(
        `SELECT id FROM ${tableTimePeriods} where name='${data.time_period}'`,
        {
          type: queryInterface.sequelize.QueryTypes.SELECT,
          logging: console.log,
        }
      );

      if (!timePeriodFromDB) {
        // Create Time Period if not exists
        const [createdTimePeriod] = await queryInterface.sequelize.query(
          `INSERT INTO ${tableTimePeriods} (name, "createdAt", "updatedAt") VALUES ('${data.time_period}', '${createdAt}', '${updatedAt}') RETURNING id`,
          {
            type: queryInterface.sequelize.QueryTypes.INSERT,
            logging: console.log,
          }
        );
        timePeriodFromDB = createdTimePeriod[0];
      }

      // Fetch Time Year Seasonality
      let [timeYearFromDB] = await queryInterface.sequelize.query(
        `SELECT id FROM ${tableTimeYears} where name='${data.time_year}'`,
        {
          type: queryInterface.sequelize.QueryTypes.SELECT,
          logging: console.log,
        }
      );
      if (!timeYearFromDB) {
        // Create Time Year Seasonality if not exists
        const [createdTimeYear] = await queryInterface.sequelize.query(
          `INSERT INTO ${tableTimeYears} (name, "createdAt", "updatedAt") VALUES ('${data.time_year}', '${createdAt}', '${updatedAt}') RETURNING id`,
          {
            type: queryInterface.sequelize.QueryTypes.INSERT,
            logging: console.log,
          }
        );
        timeYearFromDB = createdTimeYear[0];
      }

      // Fetch Time Type
      let [timeTypeFromDB] = await queryInterface.sequelize.query(
        `SELECT id FROM ${tableTimeTypes} where name='${data.time_type}'`,
        {
          type: queryInterface.sequelize.QueryTypes.SELECT,
          logging: console.log,
        }
      );

      if (!timeTypeFromDB) {
        // Creating Time Type if not exists
        const [createdTimeType] = await queryInterface.sequelize.query(
          `INSERT INTO ${tableTimeTypes} (name, "createdAt", "updatedAt") VALUES ( '${data.time_type}', '${createdAt}', '${updatedAt}') RETURNING id`,
          {
            type: queryInterface.sequelize.QueryTypes.INSERT,
            logging: console.log,
          }
        );
        timeTypeFromDB = createdTimeType[0];
      }

      // Create History
      await queryInterface.sequelize.query(
        `INSERT INTO ${tableHistories} (fk_geography_type_id, fk_geography_id, fk_group_name_id, fk_group_category_id, fk_indicator_name_id, fk_indicator_category_id, fk_time_period_id, fk_time_year_id, fk_time_type_id, estimate, coninf95, sample_size, suppression_flag, "createdAt", "updatedAt") VALUES ('${
          geographyTypesFromDB.id || geographyTypesFromDB
        }', '${geographyFromDB.id || geographyFromDB}', '${
          groupNameFromDB.id || groupNameFromDB
        }', '${groupCategoryFromDB.id || groupCategoryFromDB}', '${
          indicatorCategoryFromDB.id || indicatorCategoryFromDB
        }', '${indicatorCategoryFromDB.id || indicatorCategoryFromDB}', '${
          timePeriodFromDB.id || timePeriodFromDB
        }', '${timeYearFromDB.id || timeYearFromDB}', '${
          timeTypeFromDB.id || timeTypeFromDB
        }', '${data.estimate}', '${data.coninf_95}', '${data.sample_size}', '${
          data.suppression_flag
        }', '${createdAt}', '${updatedAt}') RETURNING id`,
        {
          type: queryInterface.sequelize.QueryTypes.INSERT,
          logging: console.log,
        }
      );
    }
  },

  async down() {
    console.log("Down Migration");
  },
};
