import Joi from 'joi';

const featureSurveyCreateSchema = Joi.object({
  rating_feature_type: Joi.number().required().messages({
    "number.base": "Status field must be a number",
    "any.required": "Status field is required"
  }),
  comment: Joi.string().optional().messages({
    "string.base": "Optional field must be a string"
  }),
  feature: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
    "string.pattern.base": "ID must be a valid MongoDB ObjectId",
    "any.required": "ID is required"
  }),
  anonymous: Joi.boolean().required().messages({
    "boolean.base": "Anonymous field must be a boolean",
    "any.required": "Anonymous field is required"
  }),
});
export default featureSurveyCreateSchema;