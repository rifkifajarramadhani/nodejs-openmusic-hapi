const InvariantError = require("../../exceptions/invariant-error");
const { songValidationSchema } = require("./schema");

const songValidator = {
    validateSongPayload: (payload) => {
        const result = songValidationSchema.validate(payload);

        if (result.error) throw new InvariantError(result.error.message);
    }
}

module.exports = songValidator;