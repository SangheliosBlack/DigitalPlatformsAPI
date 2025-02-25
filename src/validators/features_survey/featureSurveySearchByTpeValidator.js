import Joi from 'joi';

const featureSurveySearchByTpeValidatorSchema = Joi.object({
  type: Joi.string().required().messages({
    "string.base": "Type field must be a string",
    "any.required": "Type field is required"
  }),
});

export default featureSurveySearchByTpeValidatorSchema;