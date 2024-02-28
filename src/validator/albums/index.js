const InvariantError = require("../../exceptions/invariant-error");
const { albumValidationSchema } = require("./schema");

const albumValidator = {
    validateAlbumPayload: (payload) => {
        const result = albumValidationSchema.validate(payload);

        if (result.error) throw new InvariantError(result.error.message);
    }
}

module.exports = albumValidator;