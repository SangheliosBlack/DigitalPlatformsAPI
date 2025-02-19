import RequestUtil from '../utils/requestUtils.js';

const validateSchema = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        status: "FAIL",
        statusCode: 400,
        message: "Validation failed",
        errors: error.details.map((err) => ({
          field: err.context.key,
          message: err.message
        }))
      });
    }

    next();
  };
};

export default validateSchema;