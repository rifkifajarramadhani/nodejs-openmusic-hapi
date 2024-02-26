const ClientError = require("./client-error");

class InvariantError extends ClientError {
    constructor(message) {
        super(message);
        this.name = 'InvariantError';
    }
}

module.exports = InvariantError;