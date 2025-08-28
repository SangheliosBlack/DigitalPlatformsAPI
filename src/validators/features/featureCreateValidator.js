import Joi from 'joi';

const featureCreateSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    "string.empty": "Title cannot be empty",
    "any.required": "Title is required"
  }),
  description: Joi.string().trim().required().messages({
    "string.empty": "Description cannot be empty",
    "any.required": "Description is required"
  }),
  list_improvements: Joi.array().items(Joi.string().trim()).required().messages({
    "array.base": "List improvements must be an array",
    "array.includes": "List improvements must be an array of strings",
    "any.required": "List improvements are required"
  }),
  status: Joi.number().required().messages({
    "number.base": "Status field must be a number",
    "any.required": "Status field is required"
  }),
  commercial_figure: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
    "string.pattern.base": "ID must be a valid MongoDB ObjectId",
    "any.required": "ID is required"
  }),
  version_code: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
    "string.pattern.base": "Version code must be a valid MongoDB ObjectId",
    "any.required": "Version code is required"
  })
});
export default featureCreateSchema;