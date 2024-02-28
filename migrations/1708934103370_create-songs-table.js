exports.up = pgm => {
    pgm.createTable('songs', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        title: {
            type: 'VARCHAR(255)',
            notnull: true,
        },
        year: {
            type: 'INT',
            notnull: true,
        },
        genre: {
            type: 'VARCHAR(50)',
            notnull: true,
        },
        performer: {
            type: 'VARCHAR(255)',
            notnull: true,
        },
        duration: {
            type: 'INT',
            notnull: false,
        },
        album_id: {
            type: 'VARCHAR(50)',
            notnull: false,
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
};

exports.down = pgm => {
    pgm.dropTable('songs');
};
