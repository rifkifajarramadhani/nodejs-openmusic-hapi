const InvariantError = require("../../exceptions/invariant-error");
const { 
    songValidationSchema, 
    postSongToPlaylistValidationSchema,
    deleteSongInPlaylistValidationSchema 
} = require("./schema");

const songValidator = {
    validateSongPayload: (payload) => {
        const result = songValidationSchema.validate(payload);

        if (result.error) throw new InvariantError(result.error.message);
    },
    validatePostSongToPlaylistPayload: (payload) => {
        const result = postSongToPlaylistValidationSchema.validate(payload);

        if (result.error) throw new InvariantError(result.error.message);
    },
    validateDeleteSongInPlaylistPayload: (payload) => {
        const result = deleteSongInPlaylistValidationSchema.validate(payload);
        
        if (result.error) throw new InvariantError(result.error.message);
    }
}

module.exports = songValidator;