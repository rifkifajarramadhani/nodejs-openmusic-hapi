const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const InvariantError = require("../../exceptions/invariant-error");
const NotFoundError = require("../../exceptions/not-found-error");

class AlbumsService {
    constructor() {
        this._pool = new Pool();
    }

    async addAlbum({ name, year }) {
        const id = `album-${nanoid(16)}`;
        const createdAt = new Date().toISOString();
        
        const query = {
            text: `INSERT INTO albums VALUES($1, $2, $3, $4, $4) RETURNING id`,
            values: [id, name, year, createdAt],
        };

        const result = await this._pool.query(query);
        
        if (!result.rows[0].id) throw new InvariantError('Failed to add album');

        return result.rows[0].id;
    }

    async getAlbumById(id) {
        const queryAlbum = {
            text: `SELECT id, name, year FROM albums WHERE id = $1`,
            values: [id]
        };

        const album = await this._pool.query(queryAlbum);

        if (!album.rowCount) throw new NotFoundError('Album not found.');

        const result = album.rows[0];
        const albumId = album.rows[0].id;
        const querySongs = {
            text: `SELECT id, title, performer FROM songs WHERE album_id = $1`,
            values: [albumId],
        };
        const songs = await this._pool.query(querySongs);
        result.songs = songs.rows;

        return result;
    }

    async editAlbumById(id, { name, year }) {
        const updatedAt = new Date().toISOString();
        const query = {
            text: `UPDATE albums SET name = $1, year = $2, updated_at = $3 WHERE id = $4 RETURNING id`,
            values: [name, year, updatedAt, id],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) throw new NotFoundError('Failed to update album, ID not found');
    }

    async deleteAlbumById(id) {
        const query = {
            text: `DELETE FROM albums WHERE id = $1 RETURNING id`,
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) throw new NotFoundError('Failed to delete album, ID not found');
    }
}

module.exports = AlbumsService;