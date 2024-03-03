exports.up = pgm => {
    pgm.createTable('playlist_songs', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        playlist_id: {
            type: 'VARCHAR(50)',
            notNul: true,
        },
        song_id: {
            type: 'VARCHAR(50)',
            notNul: true,
        },
        created_at: {
            type: 'VARCHAR(50)',
            notnull: true,
        },
        updated_at: {
            type: 'VARCHAR(50)',
            notnull: true,
        }
    });

    pgm.addConstraint('playlist_songs', 'fk_playlist_song.playlists.id', `FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE`);

    pgm.addConstraint('playlist_songs', 'fk_playlist_song.songs.id', `FOREIGN KEY(song_id) REFERENCES songs(id) ON DELETE CASCADE`);
};

exports.down = pgm => {
    pgm.dropConstraint('playlist_songs', 'fk_playlist_song.playlists.id');

    pgm.dropConstraint('playlist_songs', 'fk_playlist_song.songs.id');

    pgm.dropTable('playlist_songs');
};
