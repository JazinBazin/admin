const minimist = require('minimist');
const mongoose = require("mongoose");
const schema = require('../server/schemas').userSchema;
const config = require("../config");
const bcrypt = require('bcrypt');

const args = minimist(process.argv.slice(2));
if (!args.login) return console.log("login required");
if (!args.password) return console.log("password required");

mongoose.connect(`mongodb://${config.ip}:${config.port}/${config.databaseName}`, config.mongodbConfig)
    .then(() => {
        const User = mongoose.model("User", schema);
        User.findOne({ login: args.login })
            .then(user => {
                if (user) throw Error("login exists");
                bcrypt.hash(args.password, config.saltRounds)
                    .then(hash => {
                        const userData = {
                            login: args.login,
                            password: hash,
                            isAdmin: true,
                            firstCreationDate: new Date(),
                        }
                        const modelRecord = new User(userData);
                        modelRecord.save()
                            .then(() => console.log("User added"))
                            .catch(error => console.log(error.message))
                            .finally(() => mongoose.disconnect());
                    })
                    .catch(error => {
                        console.log(error.message);
                        mongoose.disconnect();
                    });
            })
            .catch(error => {
                console.log(error.message);
                mongoose.disconnect();
            });
    })
    .catch(error => {
        console.log(error.message);
        mongoose.disconnect()
    });