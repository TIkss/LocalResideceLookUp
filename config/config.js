module.exports = {
    development: {
        db: 'mongodb://localhost/development_LRLU',
        app: {
            name: 'Local residence look up'
        }
    },
    production: {
        db: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL,
        app: {
            name: 'Local residence look up'
        },
        facebook: {
            clientID: "clientID",
            clientSecret: "clientSecret",
            callbackURL: "{{production callbackURL}}"
        }
    }
};
