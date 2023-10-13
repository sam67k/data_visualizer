const {
  history: { validateHistory },
} = require("./schemas");
const ApiError = require("../../utils/apiError");
module.exports = {
  validateHistory: (req, res, next) => {
    const { error } = validateHistory.validate(req.query, {
      errors: { label: "key", wrap: { label: false } },
    });
    if (error) {
      throw new ApiError(404, error.details[0].message);
    } else {
      next();
    }
  },
};
