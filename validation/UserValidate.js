const Joi = require('joi');

const registerSchema = Joi.object({
    name : Joi.string().min(3).max(20).required(),
    email : Joi.string().email().required(),
    password : Joi.string().alphanum().min(5).max(25).required(),
    gender : Joi.string().required()
})

const loginSchema = Joi.object({
    email : Joi.string().email().required(),
    password : Joi.string().alphanum().min(5).max(25).required(),
})

module.exports = {
    registerSchema,
    loginSchema
};