const InvariantError = require("../../exceptions/invariant-error");
const { userValidationSchema } = require("./schema")

const userValidator = {
    validateUserPayload: (payload) => {
        const result = userValidationSchema.validate(payload);

        if (result.error) throw new InvariantError(result.error.message);
    }
}

module.exports = userValidator;