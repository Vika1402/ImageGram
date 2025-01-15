const validate = (schema) => {
  return async (req, res, next) => {
    try {
      console.log("Request Body:", req.body);
      schema.parse(req.body);
      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: error.errors.map((err) => ({
          field: err.path[0],
          message: err.message,
        })),
      });
    }
  };
};

export default validate;
