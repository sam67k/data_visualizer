const Joi = require("joi");
module.exports = {
  validateHistory: Joi.object({
    geographyType: Joi.string()
      .optional()
      .allow(null, "")
      .label("Geography Type"),
    geography: Joi.string().optional().allow(null, "").label("Geography"),
    groupName: Joi.string().optional().allow(null, "").label("Group Name"),
    groupCategory: Joi.string()
      .optional()
      .allow(null, "")
      .label("Group Category"),
    indicatorName: Joi.string()
      .optional()
      .allow(null, "")
      .label("Indicator Name"),
    indicatorCategory: Joi.string()
      .optional()
      .allow(null, "")
      .label("Indicator Category"),
    timePeriod: Joi.string().optional().allow(null, "").label("Time Period"),
    timeYear: Joi.string().optional().allow(null, "").label("Time Year"),
    timeType: Joi.string().optional().allow(null, "").label("Time Type"),
    estimate: Joi.string().optional().allow(null, "").label("Estimate"),
    coninf95: Joi.string().optional().allow(null, "").label("Coninf 95"),
    sampleSize: Joi.string().optional().allow(null, "").label("Sample Size"),
    pageNumber: Joi.string().optional().allow(null, "").label("Page Number"),
    pageLimit: Joi.string().optional().allow(null, "").label("Page Limit"),
  }),
};
