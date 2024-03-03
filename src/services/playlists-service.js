const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const InvariantError = require("../exceptions/invariant-error");
const NotFoundError = require("../exceptions/not-found-error");
const AuthorizationError = require("../exceptions/authorization-error");

class PlaylistsService {
    constructor() {
        this._pool = new Pool();
    }

    async addPlaylist({ name, owner }) {
        const id = `playlists-${nanoid(16)}`;console.log(1 + ` ` + owner)
        const createdAt = new Date().toISOString();

        const query = {
            text: `INSERT INTO playlists VALUES($1, $2, $3, $4, $4) RETURNING id`,
            values: [id, name, owner, createdAt],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) throw new InvariantError('Failed to add palaylist');

        return id;
    }

    async getPlaylists(owner) {
        const query = {
            text: `SELECT p.id, p.name, u.username 
            FROM playlists p 
            LEFT JOIN users u 
            ON p.owner = u.id 
            WHERE p.owner = $1 OR u.id = $1`,
            values: [owner],
        };

        const result = await this._pool.query(query);

        return result.rows;
    }

    async getPlaylistById(id) {
        const query = {
            text: `SELECT playlists.id, playlists.name, playlists.username FROM playlists WHERE id = $1`,
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) throw new NotFoundError('Playlist not found');
    }
    
    async getPlaylistWithSongs(playlistId) {
        const queryPlaylist = {
            text: `SELECT p.id, p.name, u.username
            FROM playlists p LEFT JOIN users u
            ON p.owner = u.id
            WHERE p.id = $1`,
            values: [playlistId],
        };

        const playlist = await this._pool.query(queryPlaylist);

        if (!playlist.rowCount) throw new NotFoundError('Playlist not found');

        const querySongs = {
            text: `SELECT s.id, s.title, s.performer
            FROM songs s LEFT JOIN playlist_songs p
            ON s.id = p.song_id
            WHERE p.playlist_id = $1`,
            values: [playlistId],
        };

        const songs = await this._pool.query(querySongs);

        const result = playlist.rows[0];
        result.songs = songs.rows;
        
        return result;
    }

    async deletePlaylistById(id) {
        const query = {
            text: `DELETE FROM playlists WHERE id = $1 RETURNING id`,
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) throw new InvariantError('Failed to delete playlist, ID not found');
    }

    async verifyPlaylistOwner(id, owner) {
        const query = {
            text: `SELECT owner FROM playlists WHERE id = $1`,
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) throw new NotFoundError('Playlist not found');

        const playlist = result.rows[0];

        if(playlist.owner !== owner) throw new AuthorizationError('Cannot access this resource');
    }

    async verifyPlaylistAccess(playlistId, userId) {
        try {
            
        } catch (e) {
            if (e instanceof NotFoundError) throw e;

            try {
                
            } catch {
                throw e;
            }
        }
    }
}

module.exports = PlaylistsService;