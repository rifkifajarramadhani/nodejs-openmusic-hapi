const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const InvariantError = require("../exceptions/invariant-error");
const NotFoundError = require("../exceptions/not-found-error");
const { mapSongDBToModel } = require("../utils");

class MusicService {
    constructor() {
        this._pool = new Pool();
    }

    async addAlbum({ name, year }) {
        const id = `album-${nanoid(16)}`;
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;
        
        const query = {
            text: `INSERT INTO albums VALUES($1, $2, $3, $4, $5) RETURNING id`,
            values: [id, name, year, createdAt, updatedAt],
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

        if (!album.rows.length) throw new NotFoundError('Album not found.');

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

        if (!result.rows.length) throw new NotFoundError('Failed to update album, ID not found');
    }

    async deleteAlbumById(id) {
        const query = {
            text: `DELETE FROM albums WHERE id = $1 RETURNING id`,
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) throw new NotFoundError('Failed to delete album, ID not found');
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
        
        if (!result.rows.length) throw new NotFoundError('Song not found');

        return result.rows.map(mapSongDBToModel)[0];
    }

    async editSongById(id, { title, year, genre, performer, duration, albumId }) {
        const query = {
            text: `UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, album_id = $6 WHERE id = $7 RETURNING id`,
            values: [title, year, genre, performer, duration, albumId, id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) throw new NotFoundError('Failed to update song, ID not found');
    }

    async deleteSongById(id) {
        const query = {
            text: `DELETE FROM songs WHERE id = $1 RETURNING id`,
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) throw new NotFoundError('Failed to delete song, ID not found');
    }
}

module.exports = MusicService;