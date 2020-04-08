const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const createAPI = require("../utils").createAPI;

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        required: true,
    },
    firstCreationDate: {
        type: Date,
        required: true
    },
},
    { versionKey: false });

const Model = mongoose.model('PublicationPlace', schema);

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
        "rating": req.body.rating
    }
}

const resource = "publication";

module.exports = function (app) {
    createAPI(app, resource, Model, extractDataToSend, extractDataFromRequest);
}