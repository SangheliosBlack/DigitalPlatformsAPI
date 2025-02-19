import Joi from 'joi';

const releaseUpdateSchema = Joi.object({
  title: Joi.string().trim().messages({
    "string.empty": "Title cannot be empty"
  }),
  description: Joi.string().trim().messages({
    "string.empty": "Description cannot be empty"
  }),
  imageUrl: Joi.string().trim().uri().messages({
    "string.uri": "Image must be a valid URL"
  }),
  user: Joi.string().trim().messages({
    "string.empty": "User cannot be empty"
  })
}).min(1).messages({
  "object.min": "At least one field must be provided for update"
});

export default releaseUpdateSchema;