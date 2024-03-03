const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const InvariantError = require("../exceptions/invariant-error");
const NotFoundError = require("../exceptions/not-found-error");
const { mapSongDBToModel } = require("../utils");

class SongsService {
    constructor() {
        this._pool = new Pool();
    }

    async addSong({ title, year, genre, performer, duration = null, albumId = null }) {
        const id = `song-${nanoid(16)}`;
        const createdAt = new Date().toISOString();
        
        const query = {
            text: `INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7, $8, $8) RETURNING id`,
            values: [id, title, year, genre, performer, duration, albumId, createdAt],
        };

        const result = await this._pool.query(query);

        if (!result.rows[0].id) throw new InvariantError('Failed to add album');

        return result.rows[0].id;
    }

    async getSongs({ title, performer }) {
        let text = 'SELECT id, title, performer FROM songs';
        let values = [];

        if (title && performer) {
            text += ' WHERE LOWER(title) LIKE $1 AND LOWER(performer) LIKE $2';
            values.push(`%${title}%`);
            values.push(`%${performer}%`);
        } else if (title) {
            text += ' WHERE LOWER(title) LIKE $1';
            values.push(`%${title}%`);
        } else if (performer) {
            text += ' WHERE LOWER(performer) LIKE $1';
            values.push(`%${performer}%`);
        }

        const query = {
            text,
            values,
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

    async addSongToPlaylist(playlistId, songId) {
        const id = `playlist-song-${nanoid(16)}`;
        const createdAt = new Date().toISOString();

        const query = {
            text: `INSERT INTO playlist_songs VALUES($1, $2, $3, $4, $4) RETURNING id`,
            values: [id, playlistId, songId, createdAt],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) throw new InvariantError('Failed to add song to playlist');
    }

    async checkExistsSongInPlaylist(playlistId, songId) {
        const query = {
            text: `SELECT id FROM playlist_songs WHERE playlist_id = $1 AND song_id = $2`,
            values: [playlistId, songId],
        };

        const result = await this._pool.query(query);

        if (result.rowCount > 0) throw new InvariantError('Song already exists in current playlist');
    }

    async deleteSongFromPlaylist(songId, playlistId) {
        const query = {
            text: `DELETE FROM playlist_songs WHERE playlist_id = $1 AND song_id = $2 RETURNING id`,
            values: [playlistId, songId],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) throw new InvariantError('Failed to delete song');
    }
}

module.exports = SongsService;