export default {
    db: {
        user: null,
        pass: null,
        host: 'localhost',
        port: 27017,
        database: 'testdb',
        authSource: null,
    },
    host: {
        url: 'http://localhost',
        port: 4200,
    },
    jwt: {
        secretOrKey: 'secret',
        expiresIn: '36000000',
    },
    mail: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        user: 'germangaristo1989@gmail.com',
        pass: 'Abc123..',
    },
};
