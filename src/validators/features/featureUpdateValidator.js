import Joi from 'joi';

const featureUpdateSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    "string.empty": "Title cannot be empty",
    "any.required": "Title is required"
  }),
  description: Joi.string().trim().required().messages({
    "string.empty": "Description cannot be empty",
    "any.required": "Description is required"
  }),
  version_code: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
    "string.pattern.base": "Version code must be a valid MongoDB ObjectId",
    "any.required": "Version code is required"
  })
});
export default featureUpdateSchema;