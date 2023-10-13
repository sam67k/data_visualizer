const { Histories } = require("../models");
const { getPreviousPage, getNextPage } = require("../utils/pagination");

module.exports = {
  get: async (req, res, next) => {
    try {
      const {
        query: {
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
          pageLimit,
          pageNumber,
        },
      } = req;
      const limit = Number(pageLimit) || 10;
      const page = Number(pageNumber) || 1;

      const { count, rows } = await Histories.getPaginatedHistory(
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
      );

      const structuredHistories = Histories.structurizeHistories(rows);

      res.send({
        status: 200,
        success: true,
        message: "History fetched",
        data: {
          previousPage: getPreviousPage(page),
          currentPage: page,
          nextPage: getNextPage(page, limit, count),
          total: count,
          limit: limit,
          history: structuredHistories,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};
