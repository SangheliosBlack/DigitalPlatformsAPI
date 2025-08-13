import Joi from 'joi';

const versionCodeCreateSchema = Joi.object({
   code: Joi.string()
    .trim()
    .pattern(/^\d+\.\d+\.\d+$/)
    .required()
    .messages({
      "string.empty": "Code cannot be empty",
      "any.required": "Code is required",
      "string.pattern.base": "Code must be in format X.Y.Z (e.g. 1.4.0)"
    }),
});

export default versionCodeCreateSchema;
