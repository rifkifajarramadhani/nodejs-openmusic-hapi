class MusicController {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
    }

    async postAlbumController(req, h) {
        this._validator.validateAlbumPayload(req.payload);
        const { name, year } = req.payload;

        const albumId = await this._service.addAlbum({ name, year });

        const res = h.response({
            status: 'success',
            message: 'Success add album',
            data: {
                albumId
            },
        });
        res.code(201);
        return res;
    }

    async getAlbumByIdController(req, h) {
        const { id } = req.params;
        const album = await this._service.getAlbumById(id);

        const res = h.response({
            status: 'success',
            data: {
                album,
            },
        });
        res.code(200);
        return res;
    }

    async putAlbumByIdController(req, h) {
        this._validator.validateAlbumPayload(req.payload);
        const { id } = req.params;
        
        await this._service.editAlbumById(id, req.payload);

        const res = h.response({
            status: 'success',
            message: `Success update album`,
        });
        res.code(200);
        return res;
    }

    async deleteAlbumByIdController(req, h) {
        const { id } = req.params;

        await this._service.deleteAlbumById(id);

        const res = h.response({
            status: 'success',
            message: 'Success delete album',
        });
        res.code(200);
        return res;
    }

    async postSongController(req, h) {
        this._validator.validateSongPayload(req.payload);
        const { title, year, genre, performer, duration = null, albumId = null } = req.payload;

        const songId = await this._service.addSong({ title, year, genre, performer, duration, albumId });

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
        const songs = await this._service.getSongs();

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

        const song = await this._service.getSongById(id);

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

        await this._service.editSongById(id, req.payload);

        const res = h.response({
            status: 'success',
            message: 'Success update song',
        });
        res.code(200);
        return res;
    }

    async deleteSongByIdController(req, h) {
        const { id } = req.params;

        await this._service.deleteSongById(id);

        const res = h.response({
            status: 'success',
            message: 'Success delete song',
        });
        res.code(200);
        return res;
    }
}

module.exports = MusicController;