const minimist = require('minimist');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const config = require("./config");

const args = minimist(process.argv.slice(2));
if (!args.login) return console.log("login required");
if (!args.password) return console.log("password required");

mongoose.connect(
    `mongodb://${config.ip}:${config.port}/${config.databaseName}`,
    config.mongodbConfig)
    .then(() => {
        const schema = new Schema({
            login: {
                type: String,
                required: true,
                unique: true
            },
            password: {
                type: String,
                required: true
            },
            isAdmin: {
                type: Boolean,
                default: false
            },
            firstCreationDate: {
                type: Date,
                required: true
            },
        },
            { versionKey: false });

        const userData = {
            login: args.login,
            password: args.password,
            isAdmin: true,
            firstCreationDate: new Date(),
        }

        const User = mongoose.model("User", schema);
        const modelRecord = new User(userData);
        modelRecord.save()
            .then(() => console.log("User added"))
            .catch(error => console.log(error))
            .finally(() => mongoose.disconnect())
    })
    .catch(error => console.log(error));