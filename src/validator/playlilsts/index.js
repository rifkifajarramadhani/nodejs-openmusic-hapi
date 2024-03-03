const InvariantError = require("../../exceptions/invariant-error");
const { postPlayistValidationSdhema, postSongToPlayistValidationSdhema } = require("./schema")

const playlistsValidator = {
    validatePlaylistPayload: (payload) => {
        const result = postPlayistValidationSdhema.validate(payload);

        if (result.error) throw new InvariantError(result.error.message);
    },
    validateSongPayload: (payload) => {
        const result = postSongToPlayistValidationSdhema.validate(payload);

        if (result.error) throw new InvariantError(result.error.message);
    }
};

module.exports = playlistsValidator;