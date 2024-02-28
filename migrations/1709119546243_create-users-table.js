exports.up = pgm => {
    pgm.createTable('users', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        username: {
            type: 'VARCHAR(255)',
            notnull: true,
        },
        password: {
            type: 'VARCHAR(255)',
            notnull: true,
        },
        fullname: {
            type: 'VARCHAR(255)',
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
    });
};

exports.down = pgm => {
    pgm.dropTable('users');
};
