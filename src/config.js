module.exports = {
    databaseName: "era",
    ip: "localhost",
    port: 27017,
    secretKey: "mysecretkey",
    mongodbConfig: {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    saltRounds: 10,
}