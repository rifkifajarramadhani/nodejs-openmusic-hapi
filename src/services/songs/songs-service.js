const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const InvariantError = require("../../exceptions/invariant-error");
const NotFoundError = require("../../exceptions/not-found-error");
const { mapSongDBToModel } = require("../../utils");

class SongsService {
    constructor() {
        this._pool = new Pool();
    }

    async addSong({ title, year, genre, performer, duration = null, albumId = null }) {
        const id = `song-${nanoid(16)}`;
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;
        
        const query = {
            text: `INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
            values: [id, title, year, genre, performer, duration, albumId, createdAt, updatedAt],
        };

        const result = await this._pool.query(query);

        if (!result.rows[0].id) throw new InvariantError('Failed to add album');

        return result.rows[0].id;
    }

    async getSongs() {
        const query = {
            text: `SELECT id, title, performer FROM songs`
        };

        const result = await this._pool.query(query);

        return result.rows;
    }

    async getSongById(id) {
        const query = {
            text: `SELECT id, title, year, performer, genre, duration, album_id FROM songs WHERE id = $1`,
            values: [id]
        };

        const result = await this._pool.query(query);
        
        if (!result.rowCount) throw new NotFoundError('Song not found');

        return mapSongDBToModel(result.rows[0]);
    }

    async editSongById(id, { title, year, genre, performer, duration, albumId }) {
        const query = {
            text: `UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, album_id = $6 WHERE id = $7 RETURNING id`,
            values: [title, year, genre, performer, duration, albumId, id],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) throw new NotFoundError('Failed to update song, ID not found');
    }

    async deleteSongById(id) {
        const query = {
            text: `DELETE FROM songs WHERE id = $1 RETURNING id`,
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) throw new NotFoundError('Failed to delete song, ID not found');
    }
}

module.exports = SongsService;