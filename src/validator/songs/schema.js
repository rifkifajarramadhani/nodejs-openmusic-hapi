const Joi = require('joi');

const songValidationSchema = Joi.object({
    title: Joi.string().required(),
    year: Joi.number().required(),
    genre: Joi.string().required(),
    performer: Joi.string().required(),
    duration: Joi.number().optional(),
    albumId: Joi.string().optional(),
});

const postSongToPlaylistValidationSchema = Joi.object({
    songId: Joi.string().required(),
});

const deleteSongInPlaylistValidationSchema = Joi.object({
    songId: Joi.string().required(),
});

module.exports = {
    songValidationSchema,
    postSongToPlaylistValidationSchema,
    deleteSongInPlaylistValidationSchema
};