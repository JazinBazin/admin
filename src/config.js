module.exports = {
    databaseName: "era",
    ip: "localhost",
    port: 27017,
    secretKey: "mysecterkey",
    mongodbConfig: {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
}