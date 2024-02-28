const Joi = require('joi');

const albumValidationSchema = Joi.object({
    name: Joi.string().required(),
    year: Joi.number().required(),
});

module.exports = {
    albumValidationSchema,
};