class PlaylistsController {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
    }

    async postPlaylistController(req, h) {
        this._validator.validatePlaylistPayload(req.payload);
        const { name } = req.payload;
        const { id: credentialId } = req.auth.credentials;

        const playlistId = await this._service.addPlaylist({ name, owner: credentialId });

        const res = h.response({
            status: 'success',
            message: 'Playlist added',
            data: {
                playlistId,
            },
        });
        res.code(201);
        return res;
    }

    async getPlaylistsController(req, h) {
        const { id: credentialId } = req.auth.credentials;

        const playlists = await this._service.getPlaylists(credentialId);

        const res = h.response({
            status: 'success',
            data: {
                playlists,
            },
        });
        res.code(200);
        return res;
    }

    async getPlaylistByIdWithSongsController(req, h) {
        const { id: credentialId } = req.auth.credentials;
        const { id: playlistId } = req.params;

        await this._service.verifyPlaylistOwner(playlistId, credentialId);

        const playlist = await this._service.getPlaylistWithSongs(playlistId);

        const res = h.response({
            status: 'success',
            data : {
                playlist
            },
        });
        res.code(200);
        return res;

    }

    async deletePlaylistByIdController(req, h) {
        const { id } = req.params;
        const { id: credentialId } = req.auth.credentials;

        await this._service.verifyPlaylistOwner(id, credentialId);

        await this._service.deletePlaylistById(id);

        const res = h.response({
            status: 'success',
            message: 'Playlist deleted'
        });
        res.code(200);
        return res;
    }
}

module.exports = PlaylistsController;