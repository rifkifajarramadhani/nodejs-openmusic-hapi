exports.up = pgm => {
    pgm.createTable('playlist_song_activities', {
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
        user_id: {
            type: 'VARCHAR(50)',
            notNul: true,
        },
        action: {
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

    pgm.addConstraint('playlist_song_activities', 'fk_playlist_song_activities.playlists.id', `FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE`);
};

exports.down = pgm => {
    pgm.dropConstraint('playlist_song_activities', 'fk_playlist_song.playlists.id');

    pgm.dropTable('playlist_song_activities');
};
