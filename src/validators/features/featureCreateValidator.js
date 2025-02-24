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
});
export default featureCreateSchema;