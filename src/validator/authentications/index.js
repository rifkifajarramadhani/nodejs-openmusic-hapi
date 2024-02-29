const InvariantError = require("../../exceptions/invariant-error");
const { 
    postAuthenticationPayloadSchema, 
    putAuthenticationPayloadSchema, 
    deleteAuthenticationPayloadSchema 
} = require("./schema")

const authenticationsValidator = {
    validatePostAuthenticationPayload: (payload) => {
        const result = postAuthenticationPayloadSchema.validate(payload);

        if (result.error) throw new InvariantError(result.error.message);
    },
    validatePutAuthenticationPayload: (payload) => {
        const result = putAuthenticationPayloadSchema.validate(payload);

        if (result.error) throw new InvariantError(result.error.message);
    },
    validateDeleteAuthenticationPayload: (payload) => {
        const result = deleteAuthenticationPayloadSchema.validate(payload);

        if (result.error) throw new InvariantError(result.error.message);
    },
}

module.exports = authenticationsValidator;