const Joi = require("joi");

const postPlayistValidationSdhema = Joi.object({
    name: Joi.string().required(),
});

const postSongToPlayistValidationSdhema = Joi.object({
    songId: Joi.string().required(),
});

module.exports = {
    postPlayistValidationSdhema,
    postSongToPlayistValidationSdhema,
};