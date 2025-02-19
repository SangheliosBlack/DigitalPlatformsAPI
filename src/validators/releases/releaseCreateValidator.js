import Joi from 'joi';

const releaseCreateSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    "string.empty": "Title cannot be empty",
    "any.required": "Title is required"
  }),
  description: Joi.string().trim().required().messages({
    "string.empty": "Description cannot be empty",
    "any.required": "Description is required"
  }),
  imageUrl: Joi.string().trim().uri().required().messages({
    "string.uri": "Image must be a valid URL",
    "any.required": "Image is required"
  }),
  user: Joi.string().trim().required().messages({
    "any.required": "User is required"
  })
});

export default releaseCreateSchema;