const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const createAPI = require("../utils").createAPI;

const schema = new Schema({
    login: {
        type: String,
        required: true,
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

const Model = mongoose.model('User', schema);

function extractDataToSend(data) {
    return {
        id: data.id,
        login: data.login,
        password: data.password,
        isAdmin: data.isAdmin,
        firstCreationDate: data.firstCreationDate,
    }
}

function extractDataFromRequest(req) {
    return {
        "login": req.body.login,
        "password": req.body.password,
        "isAdmin": req.body.isAdmin,
    }
}

const resource = "users";

module.exports = function (app) {
    createAPI(app, resource, Model, extractDataToSend, extractDataFromRequest);
}