class SongsController {
    constructor(songsService, playlistsService, validator) {
        this._songsService = songsService;
        this._playlistsService = playlistsService;
        this._validator = validator;
    }

    async postSongController(req, h) {
        this._validator.validateSongPayload(req.payload);
        const { title, year, genre, performer, duration = null, albumId = null } = req.payload;

        const songId = await this._songsService.addSong({ title, year, genre, performer, duration, albumId });

        const res = h.response({
            status: 'success',
            message: 'Success add song',
            data: {
                songId
            },
        });
        res.code(201);
        return res;
    }

    async getSongsController(req, h) {
        const { title = '', performer = '' } = req.query;
        const songs = await this._songsService.getSongs({ title, performer });

        const res = h.response({
            status: 'success',
            data: {
                songs,
            },
        });
        res.code(200);
        return res;
    }

    async getSongByIdController(req, h) {
        const { id } = req.params;

        const song = await this._songsService.getSongById(id);

        const res = h.response({
            status: 'success',
            data: {
                song,
            },
        });
        res.code(200);
        return res;
    }

    async putSongByIdController(req, h) {
        this._validator.validateSongPayload(req.payload);
        const { id } = req.params;

        await this._songsService.editSongById(id, req.payload);

        const res = h.response({
            status: 'success',
            message: 'Success update song',
        });
        res.code(200);
        return res;
    }

    async deleteSongByIdController(req, h) {
        const { id } = req.params;

        await this._songsService.deleteSongById(id);

        const res = h.response({
            status: 'success',
            message: 'Success delete song',
        });
        res.code(200);
        return res;
    }

    async postSongToPlaylistController(req, h) {
        this._validator.validatePostSongToPlaylistPayload(req.payload);
        
        const { id: playlistId } = req.params;
        const { id: credentialId } = req.auth.credentials;
        const { songId } = req.payload;

        await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
        await this._songsService.getSongById(songId);
        await this._songsService.checkExistsSongInPlaylist(playlistId, songId);
        await this._songsService.addSongToPlaylist(playlistId, songId);
        await this._playlistsService.addPlaylistActivities({ playlistId, songId, credentialId, action: 'add' });

        const res = h.response({
            status: 'success',
            message: 'Success add song to playlist',
        });
        res.code(201);
        return res;
    }

    async deleteSongInPlaylistController(req, h) {
        this._validator.validateDeleteSongInPlaylistPayload(req.payload);

        const { id: playlistId } = req.params;
        const { id: credentialId } = req.auth.credentials;
        const { songId } = req.payload;

        await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
        await this._songsService.deleteSongFromPlaylist(songId, playlistId);
        await this._playlistsService.addPlaylistActivities({ playlistId, songId, credentialId, action: 'delete' });

        const res = h.response({
            status: 'success',
            message: 'Success delete song in playlist',
        });
        res.code(200);
        return res;
    }
}

module.exports = SongsController;