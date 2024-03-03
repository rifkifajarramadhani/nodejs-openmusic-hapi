exports.up = pgm => {
    pgm.createTable('playlists', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        name: {
            type: 'VARCHAR(255)',
            notNul: true,
        },
        owner: {
            type: 'VARCHAR(255)',
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

    pgm.addConstraint('playlists', 'fk_playlists.owner_users.id', `FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE`);
};

exports.down = pgm => {
    pgm.dropConstraint('playlists', 'fk_playlists.owner_users.id');

    pgm.dropTable('playlists');
};
