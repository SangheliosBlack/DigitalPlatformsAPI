import Joi from 'joi';

const featureSurveyUpdateSchema = Joi.object({
  rating_feature: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
    "string.pattern.base": "ID must be a valid MongoDB ObjectId",
    "any.required": "ID is required"
  }),
  comment: Joi.string().optional().messages({
    "string.base": "Optional field must be a string"
  }),
  survey_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
    "string.pattern.base": "ID must be a valid MongoDB ObjectId",
    "any.required": "ID is required"
  }),
});
export default featureSurveyUpdateSchema;