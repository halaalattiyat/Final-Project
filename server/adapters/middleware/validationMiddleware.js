// Removed invalid line
// Added a validation middleware to handle request body, query, and parameter validation based on a schema.

const validateRequest = (schema) => (req, res, next) => {
  try {
    const { body, query, params } = req;

    // Validate body
    if (schema.body) {
      for (const [key, rules] of Object.entries(schema.body)) {
        if (rules.required && !body[key]) {
          return res.status(400).json({
            success: false,
            status: 400,
            message: `Missing required field: ${key}`
          });
        }
        if (rules.type && typeof body[key] !== rules.type) {
          return res.status(400).json({
            success: false,
            status: 400,
            message: `Invalid type for field: ${key}`
          });
        }
        if (rules.min !== undefined && body[key] < rules.min) {
          return res.status(400).json({
            success: false,
            status: 400,
            message: `Value for field ${key} is below minimum: ${rules.min}`
          });
        }
      }
    }

    // Validate query
    if (schema.query) {
      for (const [key, rules] of Object.entries(schema.query)) {
        if (rules.required && !query[key]) {
          return res.status(400).json({
            success: false,
            status: 400,
            message: `Missing required query parameter: ${key}`
          });
        }
        if (rules.type && typeof query[key] !== rules.type) {
          return res.status(400).json({
            success: false,
            status: 400,
            message: `Invalid type for query parameter: ${key}`
          });
        }
      }
    }

    // Validate params
    if (schema.params) {
      for (const [key, rules] of Object.entries(schema.params)) {
        if (rules.required && !params[key]) {
          return res.status(400).json({
            success: false,
            status: 400,
            message: `Missing required parameter: ${key}`
          });
        }
        if (rules.type && typeof params[key] !== rules.type) {
          return res.status(400).json({
            success: false,
            status: 400,
            message: `Invalid type for parameter: ${key}`
          });
        }
      }
    }

    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      status: 400,
      message: "Validation Error",
      error: error.message
    });
  }
};

module.exports = { validateRequest };