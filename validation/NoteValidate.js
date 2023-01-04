const Joi = require('joi');
const notesSchema = Joi.object({
    userId : Joi.string(),
    title : Joi.string().min(3).max(100).required(),
    isCompleted : Joi.boolean().default(false),
    createdAt : Joi.string()
})

module.exports = notesSchema;