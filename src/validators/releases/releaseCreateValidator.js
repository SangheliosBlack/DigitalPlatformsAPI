import { QueryDocumentSnapshot } from 'firebase-admin/firestore';
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
  quarter: Joi.number().integer().required().messages({
    "number.base": "Quarter must be a number",
    "number.integer": "Quarter must be an integer",
    "any.required": "Quarter is required"
  }),
  commercial_figure: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
    "string.pattern.base": "ID must be a valid MongoDB ObjectId",
    "any.required": "ID is required"
  }),
});

export default releaseCreateSchema;