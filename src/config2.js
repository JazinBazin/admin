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
    serverPort: 3000,
    serverIP: "127.0.0.1",
    saltRounds: 10,
}