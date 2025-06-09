/**
 * Joi schema for validating user input in API Gateway.
 *
 * - Ensures 'name' is a required string
 * - Ensures 'email' is a required, valid email address
 */

import Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});
