const InvariantError = require("../../exceptions/invariant-error");
const { albumValidationSchema, songValidationSchema } = require("./schema");

const musicValidator = {
    validateAlbumPayload: (payload) => {
        const result = albumValidationSchema.validate(payload);

        if (result.error) throw new InvariantError(result.error.message);
    },
    validateSongPayload: (payload) => {
        const result = songValidationSchema.validate(payload);

        if (result.error) throw new InvariantError(result.error.message);
    }
}

module.exports = musicValidator;