/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('albums', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        name: {
            type: 'VARCHAR(255)',
            notnull: true,
        },
        year: {
            type: 'INT',
            notnull: true,
        },
        created_at: {
            type: 'VARCHAR(50)',
            notnull: true,
        },
        updated_at: {
            type: 'VARCHAR(50)',
            notnull: true,
        }
    })
};

exports.down = pgm => {
    pgm.dropTable('albums');
};
