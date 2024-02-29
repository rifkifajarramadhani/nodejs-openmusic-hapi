const { Pool } = require("pg");
const { nanoid } = require("nanoid");
const bcrypt = require('bcrypt');
const InvariantError = require("../exceptions/invariant-error");
const NotFoundError = require("../exceptions/not-found-error");
const AuthenticationError = require("../exceptions/authentication-error");

class UsersService {
    constructor() {
        this._pool = new Pool();
    }

    async addUser({ username, password, fullname }) {
        await this.verifyNewUsername(username);

        const id = `user-${nanoid(16)}`;
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdAt = new Date().toISOString();

        const query = {
            text: `INSERT INTO users VALUES($1, $2, $3, $4, $5, $5) RETURNING id`,
            values: [id, username, hashedPassword, fullname, createdAt],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) throw new InvariantError('Failed to register new user');

        return id;
    }

    async verifyNewUsername(username) {
        const query = {
            text: `SELECT username FROM users WHERE username = $1`,
            values: [username],
        };

        const result = await this._pool.query(query);

        if (result.rowCount > 0) throw new InvariantError('Failed to register new user, usrname already exists');
    }
    
    async getUserById(userId) {
        const query = {
            text: `SELECT id, username, fullname FROM users WHERE id = $1`,
            values: [userId],
        };

        const result = await this._pool(query);

        if (!result.rowCount) throw new NotFoundError('User not found');

        return result.rows[0];
    }

    async verifyUserCredential(username, password) {
        const query = {
            text: `SELECT username, password FROM users WHERE username = $1`,
            values: [username],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) throw new AuthenticationError('Invalid credentials');

        const { id, password: hashedPassword } = result.rows[0];

        const isMatch = await bcrypt.compare(password, hashedPassword);

        if (!isMatch) throw new AuthenticationError('Invalid credentials');

        return id;
    }
}

module.exports = UsersService;