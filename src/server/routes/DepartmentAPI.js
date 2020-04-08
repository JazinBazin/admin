const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const createAPI = require("../utils").createAPI;

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    firstCreationDate: {
        type: Date,
        required: true
    },
},
    { versionKey: false });

const Model = mongoose.model('Department', schema);

function extractDataToSend(data) {
    return {
        id: data.id,
        name: data.name,
        rating: data.rating,
        firstCreationDate: data.firstCreationDate,
    }
}

function extractDataFromRequest(req) {
    return {
        "name": req.body.name,
    }
}

const resource = "departments";

module.exports = function (app) {
    createAPI(app, resource, Model, extractDataToSend, extractDataFromRequest);
}