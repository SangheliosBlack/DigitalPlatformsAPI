import Joi from 'joi';

const commercialFigureUpdateSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Name cannot be empty",
    "any.required": "Name is required"
  }),
});
export default commercialFigureUpdateSchema;