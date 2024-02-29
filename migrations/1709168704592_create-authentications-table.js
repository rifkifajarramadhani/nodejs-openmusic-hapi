exports.up = pgm => {
    pgm.createTable('authentications', {
        token: {
            type: 'TEXT',
            noNull: true,
        },
    });
};

exports.down = pgm => {
    pgm.dropTable('authentications');
};
