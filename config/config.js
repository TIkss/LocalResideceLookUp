module.exports = {
    development: {
        db: 'mongodb://localhost/passport-tut',
        app: {
            name: 'Homestay'
        },
    },
    production: {
        db: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL,
        app: {
            name: 'Passport Authentication Tutorial'
        },
        facebook: {
            clientID: "clientID",
            clientSecret: "clientSecret",
            callbackURL: "{{production callbackURL}}"
        }
    }
}
